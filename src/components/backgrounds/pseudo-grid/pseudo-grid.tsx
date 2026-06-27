import styles from "../../layout/Grid/styles.module.css";

type PseudoGridProps = {
  columns?: number;
};

export default function PseudoGrid({ columns = 4 }: PseudoGridProps) {
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
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className={styles.pseudoColumn} />
      ))}
    </div>
  );
}
