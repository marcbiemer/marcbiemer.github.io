import type { SpacingToken } from "@/types/common";

import styles from "./styles.module.css";

type Props = {
    children: React.ReactNode;
    rowGap?: SpacingToken;
    colGap?: SpacingToken;
    className?: string;
};

export default function Grid({ children, rowGap, colGap, className }: Props) {
    return (
        <div
            className={`${styles.grid} ${className ?? ""}`}
            data-row-gap={rowGap}
            data-col-gap={colGap}
        >
            {children}
        </div>
    );
}
