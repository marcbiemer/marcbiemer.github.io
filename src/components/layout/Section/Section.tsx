import type {
  AlignmentToken,
  BackgroundColorToken,
  SpacingToken,
  ThemeToken,
} from "@/types/common";

import React from "react";
import styles from "./styles.module.css";

type BackgroundProps = React.PropsWithChildren<{
  color?: BackgroundColorToken;
}>;

function Background({ children, color }: BackgroundProps) {
  return (
    <div className={styles.backgroundLayer} data-color={color}>
      {children}
    </div>
  );
}

type SectionProps = {
  children: React.ReactNode;
  theme?: ThemeToken;
  id?: string;
  pad?: SpacingToken;
  padStart?: SpacingToken;
  padEnd?: SpacingToken;
  gap?: SpacingToken;
  vh?: boolean;
  valign?: AlignmentToken;
  className?: string;
};

export default function Section({
  children,
  theme,
  id,
  pad,
  padStart,
  padEnd,
  gap = "normal",
  vh = false,
  valign,
  className,
}: SectionProps) {
  const childrenArray = React.Children.toArray(children);

  const backgrounds = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type === Section.Background,
  );

  const content = childrenArray.filter(
    (child) =>
      !(React.isValidElement(child) && child.type === Section.Background),
  );

  const padS = padStart ?? pad ?? "normal";
  const padE = padEnd ?? pad ?? "normal";

  return (
    <section
      data-theme={theme}
      className={`${styles.section} ${className}`}
      data-pad-start={padS}
      data-pad-end={padE}
      data-gap={gap}
      data-min-height={vh}
      data-v-align={valign}
      id={id}
    >
      {backgrounds.length > 0 && (
        <div className={styles.background}>{backgrounds}</div>
      )}

      {content}
    </section>
  );
}

Section.Background = Background;
