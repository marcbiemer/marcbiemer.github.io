import styles from "./styles.module.css";

type Props = {
  base?: string;
  md?: string;
  lg?: string;
  children: React.ReactNode;
  className?: string;
};

export default function GridItem({
  base = "1 / -1",
  md,
  lg,
  children,
  className,
}: Props) {
  return (
    <div
      className={`${styles.item} ${className ?? ""}`}
      style={
        {
          "--col-base": base,
          ...(md && { "--col-md": md }),
          ...(lg && { "--col-lg": lg }),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
