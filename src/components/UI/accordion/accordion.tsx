"use client";

import { createContext, useContext, useState } from "react";
import styles from "./styles.module.css";

type AccordionContextValue = {
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion.Item must be used inside <Accordion>");
  return ctx;
}

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
  defaultOpenIndex?: number | null;
};

function Accordion({
  children,
  className,
  defaultOpenIndex = null,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <ul className={`${styles.accordion} ${className ?? ""}`}>{children}</ul>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = {
  index: number;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  bodyClassName?: string;
};

function AccordionItem({
  index,
  trigger,
  children,
  className,
  triggerClassName,
  bodyClassName,
}: AccordionItemProps) {
  const { openIndex, setOpenIndex } = useAccordionContext();
  const isOpen = openIndex === index;

  const toggle = () => setOpenIndex(isOpen ? null : index);

  return (
    <li className={`${styles.item} ${className ?? ""}`} data-item-open={isOpen}>
      <button
        className={`${styles.trigger} ${triggerClassName ?? ""}`}
        onClick={toggle}
        aria-expanded={isOpen}
      >
        {trigger}
      </button>
      <div
        className={`${styles.body} ${bodyClassName ?? ""}`}
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className={styles.bodyInner}>{children}</div>
      </div>
    </li>
  );
}

Accordion.Item = AccordionItem;
export default Accordion;
