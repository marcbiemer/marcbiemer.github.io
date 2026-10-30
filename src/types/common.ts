export type SizeToken =
    | "xxxxsmall"
    | "xxxsmall"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "xxxlarge"
    | "xxxxlarge";

export type IconSizeToken = "small" | "medium" | "large" | "xlarge";

export type SpacingToken = "none" | "condensed" | "normal" | "spacious";

export type AlignmentToken =
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-evenly"
    | "space-around";

export type ThemeToken = "default" | "inverse" | "accent";

export type BackgroundColorToken = "default" | "inverse" | "accent" | "critical" | "success";

export type ForegroundColorToken =
    | "default"
    | "default-subtle"
    | "inverse"
    | "inverse-subtle"
    | "accent"
    | "critical"
    | "success";

export type TextContent = {
    title?: string;
    body: string[];
};

export type MediaSection = "work" | "about";

export const SIZES = [640, 1080, 1920, 2560] as const;

export type MediaSize = (typeof SIZES)[number];

export type FocusX = "left" | "center" | "right";

export type FocusY = "top" | "center" | "bottom";

export type ImageContent = {
    src: string;
    alt: string;
    caption?: string;
    credits?: string;
    aspect?: string;
    focusX?: FocusX;
    focusY?: FocusY;
};

export type VideoContent = {
    src: string;
    alt?: string;
    caption?: string;
    credits?: string;
    format?: string;
    opacity?: number;
    blur?: boolean;
    aspect?: string;
    muted?: boolean;
    loop?: boolean;
};

export type LogoContent = {
    src: string;
    label: string;
};

export type InputField = {
    type: string;
    id: string;
    label: string;
    placeholder: string;
};

export type FormContent = {
    title?: string;
    inputs: InputField[];
    cta: {
        default: string;
        inProgress: string;
    };
    messages: {
        success: string;
        error: string;
    };
};

export type LinkItem = {
    label: string;
    href: string;
};

export type GridItemLayout = {
    base?: string;
    md?: string;
    lg?: string;
};
