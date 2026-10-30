import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";

// Config
const SECTIONS = ["work", "about"];
const VALID_EXTENSIONS = /\.(mp4|mov)$/i;

const PREVIEW = {
    width: 640,
    height: 360,
    duration: 5, // seconds to trim for preview
    mp4: { crf: 28, preset: "fast", audioBitrate: null }, // no audio for preview
    webm: { crf: 35, audioBitrate: null },
};

const FULL = {
    width: 1280,
    height: 720,
    mp4: { crf: 23, preset: "fast", audioBitrate: "128k" },
    webm: { crf: 31, audioBitrate: "128k" },
};

let processed = 0;
let skipped = 0;
let errors = 0;

function checkFfmpeg() {
    try {
        execSync("ffmpeg -version", { stdio: "ignore" });
    } catch {
        console.error("❌ ffmpeg not found. Install it with: brew install ffmpeg");
        process.exit(1);
    }
}

function runFfmpeg(command) {
    try {
        execSync(command, { stdio: "ignore" });
        return true;
    } catch (err) {
        console.error(`  ❌ ffmpeg error: ${err.message}`);
        errors++;
        return false;
    }
}

function generatePreviewMp4(inputPath, outputPath) {
    const cmd = [
        "ffmpeg -y",
        `-i "${inputPath}"`,
        `-t ${PREVIEW.duration}`,
        `-vf "scale=${PREVIEW.width}:${PREVIEW.height}:force_original_aspect_ratio=decrease,pad=${PREVIEW.width}:${PREVIEW.height}:(ow-iw)/2:(oh-ih)/2"`,
        `-c:v libx264`,
        `-crf ${PREVIEW.mp4.crf}`,
        `-preset ${PREVIEW.mp4.preset}`,
        `-movflags +faststart`,
        `-an`, // no audio for preview
        `-pix_fmt yuv420p`,
        `"${outputPath}"`,
    ].join(" ");
    return runFfmpeg(cmd);
}

function generatePreviewWebm(inputPath, outputPath) {
    const cmd = [
        "ffmpeg -y",
        `-i "${inputPath}"`,
        `-t ${PREVIEW.duration}`,
        `-vf "scale=${PREVIEW.width}:${PREVIEW.height}:force_original_aspect_ratio=decrease,pad=${PREVIEW.width}:${PREVIEW.height}:(ow-iw)/2:(oh-ih)/2"`,
        `-c:v libvpx-vp9`,
        `-crf ${PREVIEW.webm.crf}`,
        `-b:v 0`,
        `-an`, // no audio for preview
        `"${outputPath}"`,
    ].join(" ");
    return runFfmpeg(cmd);
}

function generateFullMp4(inputPath, outputPath) {
    const cmd = [
        "ffmpeg -y",
        `-i "${inputPath}"`,
        `-vf "scale=${FULL.width}:${FULL.height}:force_original_aspect_ratio=decrease,pad=${FULL.width}:${FULL.height}:(ow-iw)/2:(oh-ih)/2"`,
        `-c:v libx264`,
        `-crf ${FULL.mp4.crf}`,
        `-preset ${FULL.mp4.preset}`,
        `-movflags +faststart`, // enables progressive download
        `-c:a aac`,
        `-b:a ${FULL.mp4.audioBitrate}`,
        `-pix_fmt yuv420p`,
        `"${outputPath}"`,
    ].join(" ");
    return runFfmpeg(cmd);
}

function generateFullWebm(inputPath, outputPath) {
    const cmd = [
        "ffmpeg -y",
        `-i "${inputPath}"`,
        `-vf "scale=${FULL.width}:${FULL.height}:force_original_aspect_ratio=decrease,pad=${FULL.width}:${FULL.height}:(ow-iw)/2:(oh-ih)/2"`,
        `-c:v libvpx-vp9`,
        `-crf ${FULL.webm.crf}`,
        `-b:v 0`,
        `-c:a libopus`,
        `-b:a ${FULL.webm.audioBitrate}`,
        `"${outputPath}"`,
    ].join(" ");
    return runFfmpeg(cmd);
}

async function processVideo(filePath, videosDir, filename) {
    const name = basename(filename, extname(filename));
    const previewDir = join(videosDir, "preview");
    const fullDir = join(videosDir, "full");

    mkdirSync(previewDir, { recursive: true });
    mkdirSync(fullDir, { recursive: true });

    const outputs = [
        {
            path: join(previewDir, `${name}.mp4`),
            generate: () => generatePreviewMp4(filePath, join(previewDir, `${name}.mp4`)),
        },
        {
            path: join(previewDir, `${name}.webm`),
            generate: () => generatePreviewWebm(filePath, join(previewDir, `${name}.webm`)),
        },
        {
            path: join(fullDir, `${name}.mp4`),
            generate: () => generateFullMp4(filePath, join(fullDir, `${name}.mp4`)),
        },
        {
            path: join(fullDir, `${name}.webm`),
            generate: () => generateFullWebm(filePath, join(fullDir, `${name}.webm`)),
        },
    ];

    for (const output of outputs) {
        if (existsSync(output.path)) {
            console.log(`  ⏭  Skipping existing: ${basename(output.path)}`);
            skipped++;
            continue;
        }
        console.log(`  ⚙️  Generating: ${basename(output.path)}`);
        if (output.generate()) processed++;
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
