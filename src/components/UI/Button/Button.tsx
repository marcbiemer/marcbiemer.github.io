"use client";

import styles from "./styles.module.css";

import { AppLink } from "@/components/ui/link/app-link/app-link";
import { Icon, IconProps } from "@/components/ui/icon/icon";
import { IconSizeToken } from "@/types/common";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "small" | "medium" | "large";

type BaseProps = {
  label: string;
  variant?: Variant;
  size?: Size;
  icon?: IconProps;
  iconPos?: "start" | "end" | "icon-only";
  disabled?: boolean;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  newTab?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

type ButtonAsLink = BaseProps & {
  href: string;
  newTab?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: undefined;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const iconSizeMap: Record<Size, IconSizeToken> = {
  small: "small",
  medium: "small",
  large: "medium",
};

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    label,
    variant = "primary",
    size = "medium",
    icon,
    iconPos,
    disabled = false,
  } = props;

  const isIconOnly = iconPos === "icon-only";

  const className = [
    styles.btn,
    isIconOnly ? styles.btn_icon_only : "",
    disabled ? styles.btn_disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconEl = icon ? (
    <div className={styles.iconWrapper}>
      <Icon {...icon} size={iconSizeMap[size]} />
    </div>
  ) : null;

  const content = (
    <>
      {(iconPos === "start" || isIconOnly) && iconEl}
      {!isIconOnly && <span className={`label-${size}`}>{label}</span>}
      {iconPos === "end" && iconEl}
    </>
  );

  const shared = {
    className,
    "data-variant": variant,
    "data-size": size,
    "aria-label": isIconOnly ? label : undefined,
  };

  if (props.href !== undefined) {
    const { href, newTab, onClick } = props;

    return (
      <AppLink
        {...shared}
        href={href}
        newTab={newTab}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
      >
        {content}
      </AppLink>
    );
  }

  return (
    <button
      {...shared}
      onClick={props.onClick}
      type={props.type ?? "button"}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
