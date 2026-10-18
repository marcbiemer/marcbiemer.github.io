import type { ForegroundColorToken } from "@/types/common";

import styles from "./styles.module.css";

type Props = {
  color?: ForegroundColorToken;
};

export default function EdgeMarkers({ color = "default-subtle" }: Props) {
  return (
    <>
      {[styles.markerTL, styles.markerTR, styles.markerBL, styles.markerBR].map(
        (marker, index) => (
          <span
            key={index}
            className={marker}
            style={{ color: `rgb(var(--color-fg-${color}))` }}
          >
            +
          </span>
        ),
      )}
    </>
  );
}
