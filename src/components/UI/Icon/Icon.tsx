import React from "react";

import type { ForegroundColorToken, IconSizeToken } from "@/types/common";

export type IconProps = {
  iconName: string;
  color?: ForegroundColorToken;
  size?: IconSizeToken;
  filled?: boolean;
};

export const Icon: React.FC<IconProps> = ({
  iconName,
  size = "small",
  color = "inherit",
  filled = false,
}) => {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "material-symbols-filled" : ""}`}
      style={{ color: `rgb(var(--sys-color-fg-${color}))`, fontSize: `var(--sys-icon-size-${size})`}}
    >
      {iconName}
    </span>
  );
};
