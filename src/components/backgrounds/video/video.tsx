import type { VideoContent } from "@/types/common";

export default function VideoBackground({
    src,
    format = "video/mp4",
    opacity,
    blur,
}: VideoContent) {
    return (
        <div
            style={{
                display: "flex",
                overflow: "hidden",
                opacity: opacity,
                filter: blur ? "blur(var(--sys-blur-video-background))" : "unset",
            }}
        >
            <video width="100%" height="100%" preload="auto" playsInline autoPlay loop muted>
                {/* <source src={`${base}/preview/${filename}.webm`} type="video/webm" />
        <source src={`${base}/preview/${filename}.mp4`} type="video/mp4" /> */}
                <source src={src} type={format} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
