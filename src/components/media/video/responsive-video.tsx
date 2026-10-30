"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon/icon";
import type { MediaSection, VideoContent } from "@/types/common";
import styles from "./styles.module.css";

type Props = {
    section?: MediaSection;
    slug: string;
    video: VideoContent;
};

const toBase = (section: string, slug: string) => `/media/${section}/${slug}/videos`;

export default function ResponsiveVideo({ section = "work", slug, video }: Props) {
    const [loadFull, setLoadFull] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const base = toBase(section, slug);
    const name = video.src.replace(/\.[^.]+$/, "");

    const previewSrcWebm = `${base}/preview/${name}.webm`;
    const previewSrcMp4 = `${base}/preview/${name}.mp4`;
    const fullSrcWebm = `${base}/full/${name}.webm`;
    const fullSrcMp4 = `${base}/full/${name}.mp4`;

    return (
        <figure className={styles.figure}>
            <div className={styles.videoWrapper} data-aspect-ratio={video.aspect ?? "ignore"}>
                {!loadFull ? (
                    <>
                        <video className={styles.video} autoPlay loop muted playsInline>
                            <source src={previewSrcWebm} type="video/webm" />
                            <source src={previewSrcMp4} type="video/mp4" />
                        </video>
                        <button
                            type="button"
                            className={styles.playButton}
                            onClick={() => {
                                setLoadFull(true);
                                setIsLoading(true);
                                setError(null);
                            }}
                            aria-label="Play full video"
                        >
                            <Icon iconName="play_circle" size="large" color="inverse" />
                        </button>
                    </>
                ) : (
                    <>
                        {isLoading && (
                            <div className={styles.loadingOverlay}>
                                <span>Loading...</span>
                            </div>
                        )}
                        {error && (
                            <div className={styles.errorOverlay}>
                                <span>{error}</span>
                            </div>
                        )}
                        <video
                            key="full"
                            className={styles.video}
                            muted={video.muted}
                            loop={video.loop}
                            controls
                            autoPlay
                            playsInline
                            controlsList="nodownload noplaybackrate"
                            disablePictureInPicture
                            onCanPlay={() => setIsLoading(false)}
                            onError={() => {
                                setIsLoading(false);
                                setError("Video failed to load — check the file path");
                            }}
                        >
                            <source src={fullSrcWebm} type="video/webm" />
                            <source src={fullSrcMp4} type="video/mp4" />
                        </video>
                    </>
                )}
            </div>
            {(video.caption || video.credits) && (
                <figcaption>
                    {video.caption && <span className={styles.caption}>{video.caption}</span>}
                    {video.credits && <span className={styles.credits}>{video.credits}</span>}
                </figcaption>
            )}
        </figure>
    );
}
