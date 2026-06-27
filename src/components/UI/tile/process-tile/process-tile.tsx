import type { ProcessItem } from "@/data/wow";
import type { BackgroundColorToken } from "@/types/common";

import styles from "./styles.module.css";
import React from "react";

type Props = {
  range: number;
  index: number;
  step: ProcessItem;
  children?: React.ReactNode;
};

export default function ProcessTile({ range, index, step, children }: Props) {
  const childrenArray = React.Children.toArray(children);
  const rangeArray = [...Array(range)];

  const backgrounds = childrenArray.filter(
    (child) =>
      React.isValidElement(child) && child.type === ProcessTile.Background,
  );

  return (
    <div className={styles.processTile}>
      {backgrounds.length > 0 && (
        <div className={styles.background}>{backgrounds}</div>
      )}
      <div className={styles.header}>
        <div className={styles.dots}>
          {rangeArray.map((e, i) => (
            <span
              key={i}
              className={`${styles.dot} ${index >= i ? styles.active : ""}`}
            ></span>
          ))}
        </div>
        <span className={styles.index}>{`0${String(index + 1)}`}</span>
      </div>
      <div className={styles.textStack}>
        <h1 className={styles.title}>{step.label}</h1>
        <p className={styles.body}>{step.description}</p>
      </div>
    </div>
  );
}

type BackgroundProps = React.PropsWithChildren<{
  color?: BackgroundColorToken;
}>;

function Background({ children, color }: BackgroundProps) {
  return (
    <div
      className={styles.backgroundLayer}
      data-color={color}
      style={{
        backgroundColor: `var(--sys-color-bg-${color})`,
      }}
    >
      {children}
    </div>
  );
}

ProcessTile.Background = Background;