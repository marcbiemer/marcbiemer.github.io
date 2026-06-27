import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";

// Config
const SECTIONS = ["work", "about"];
const VALID_EXTENSIONS = /\.(mp4|mov)$/i;

// `box` is the bounding box for landscape video (long side = width).
// Portrait video automatically gets the box rotated (long side = height).
const PREVIEW = {
    box: { long: 640, short: 360 },
    duration: 5, // seconds to trim for preview
    mp4: { crf: 28, preset: "fast" }, // no audioBitrate = no audio
    webm: { crf: 35 },
};

const FULL = {
    box: { long: 1280, short: 720 },
    mp4: { crf: 23, preset: "fast", audioBitrate: "128k" },
    webm: { crf: 31, audioBitrate: "128k" },
};

let processed = 0;
let skipped = 0;
let errors = 0;

function checkFfmpeg() {
    try {
        execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    } catch {
        console.error("❌ ffmpeg not found. Install it with: brew install ffmpeg");
        process.exit(1);
    }
}

function runFfmpeg(args) {
    try {
        execFileSync("ffmpeg", args, { stdio: "ignore" });
        return true;
    } catch (err) {
        console.error(`  ❌ ffmpeg error: ${err.message}`);
        errors++;
        return false;
    }
}

// Fit inside the box without padding or upscaling the aspect ratio.
// iw/ih are measured after ffmpeg's automatic rotation, so phone footage
// that is only flagged as rotated is detected correctly.
function scaleFilter({ long, short }) {
    return [
        `scale='if(gte(iw,ih),${long},${short})'`,
        `'if(gte(iw,ih),${short},${long})'`,
        "force_original_aspect_ratio=decrease",
        "force_divisible_by=2",
    ].join(":");
}

function buildArgs(inputPath, outputPath, { box, duration, format, crf, preset, audioBitrate }) {
    const args = ["-y", "-i", inputPath];

    if (duration) args.push("-t", String(duration));

    args.push("-vf", scaleFilter(box));

    if (format === "mp4") {
        args.push(
            "-c:v", "libx264",
            "-crf", String(crf),
            "-preset", preset,
            "-movflags", "+faststart", // start playing before fully downloaded
            "-pix_fmt", "yuv420p",
        );
    } else {
        args.push("-c:v", "libvpx-vp9", "-crf", String(crf), "-b:v", "0");
    }

    if (audioBitrate) {
        args.push("-c:a", format === "mp4" ? "aac" : "libopus", "-b:a", audioBitrate);
    } else {
        args.push("-an");
    }

    args.push(outputPath);
    return args;
}

async function processVideo(filePath, videosDir, filename) {
    const name = basename(filename, extname(filename));

    const variants = [
        ["preview", PREVIEW],
        ["full", FULL],
    ];

    for (const [folder, config] of variants) {
        const outDir = join(videosDir, folder);
        mkdirSync(outDir, { recursive: true });

        for (const format of ["mp4", "webm"]) {
            const outPath = join(outDir, `${name}.${format}`);

            if (existsSync(outPath)) {
                console.log(`  ⏭  Skipping existing: ${folder}/${name}.${format}`);
                skipped++;
                continue;
            }

            console.log(`  ⚙️  Generating: ${folder}/${name}.${format}`);
            const args = buildArgs(filePath, outPath, {
                box: config.box,
                duration: config.duration,
                format,
                ...config[format],
            });
            if (runFfmpeg(args)) processed++;
        }
    }
}

async function processDir(dir) {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            // Skip generated output folders
            if (["preview", "full"].includes(entry.name)) continue;
            await processDir(fullPath);
        } else if (VALID_EXTENSIONS.test(entry.name)) {
            // Only process files in a /videos/ folder
            if (!dir.includes("videos")) continue;
            console.log(`\n📹 Processing: ${entry.name}`);
            await processVideo(fullPath, dir, entry.name);
        }
    }
}

// Run
checkFfmpeg();
console.log("🎬 Optimising videos...\n");

Promise.all(
    SECTIONS.map((section) => {
        const dir = `./public/media/${section}`;
        if (!existsSync(dir)) {
            console.warn(`⚠  Skipping missing directory: ${dir}`);
            return Promise.resolve();
        }
        return processDir(dir);
    }),
)
    .then(() => {
        console.log(
            `\n✅ Done — ${processed} generated, ${skipped} already existed${errors ? `, ${errors} errors` : ""}`,
        );
    })
    .catch((err) => {
        console.error("\n❌ Error:", err.message);
        process.exit(1);
    });
