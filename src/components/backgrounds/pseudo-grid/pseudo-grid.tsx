import styles from "../../layout/Grid/styles.module.css";

type PseudoGridProps = {
    columns?: number;
};

export default function PseudoGrid({ columns = 4 }: PseudoGridProps) {
    const columnIds = Array.from({ length: columns }, (_, i) => `column-${i}`);
    return (
        <div
            className={styles.pseudoGrid}
            style={
                {
                    "--pseudo-columns": columns,
                } as React.CSSProperties
            }
            aria-hidden
        >
            {columnIds.map((id) => (
                <div key={id} className={styles.pseudoColumn} />
            ))}
        </div>
    );
}
