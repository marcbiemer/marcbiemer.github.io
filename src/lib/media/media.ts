import type { MediaSection, MediaSize } from "@/types/common";
import { SIZES } from "@/types/common";

type MediaPathOptions = {
  section?: MediaSection;
  project: string;
  filename: string;
  size: MediaSize;
};

export function mediaPath({
  section = 'work',
  project,
  filename,
  size,
}: MediaPathOptions): string {
  const name = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '.webp');
  return `/media/${section}/${project}/images/${size}/${name}`;
}

export function getOptimisedSrc(
  src: string,
  section: MediaSection = 'work'
): string {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const size = SIZES.find((s) => width <= s) ?? 2560;
  const [project, filename] = src.split('/');
  return mediaPath({ section, project, filename, size });
}