"use client";

import type { FormContent } from "@/types/common";

import styles from "./styles.module.css";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Icon } from "@/components/ui/icon/icon";
import HighlightText from "@/components/ui/highlight-text/highlight-text";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function Form({ inputs, cta, messages }: FormContent) {
  const [state, setState] = useState<SubmitState>("idle");

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { success: boolean };

      if (data.success) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <div className={styles.formWrapper}>
      {state !== "success" && (
        <form onSubmit={onSubmit} className={styles.form}>
          {inputs.map((input, index) => (
            <div key={index} className={styles.inputWrapper}>
              <label htmlFor={input.id} className={styles.label}>
                {input.label}
              </label>
              {input.type === "textarea" && (
                <textarea
                  name={input.type}
                  id={input.id}
                  placeholder={input.placeholder}
                  required
                  disabled={state === "sending"}
                />
              )}
              {input.type !== "textarea" && (
                <input
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  placeholder={input.placeholder}
                  required
                  disabled={state === "sending"}
                />
              )}
            </div>
          ))}
          {state === "error" && (
            <div className={styles.error}>
              <Icon iconName="error" size="large" />
              <p>{messages.error}</p>
            </div>
          )}
          <div className={styles.btnWrapper}>
            <Button
              type="submit"
              size="medium"
              variant="primary"
              disabled={state === "sending"}
              label={state === "sending" ? cta.inProgress : cta.default}
              onClick={() => {}}
              iconPos="end"
              icon={{ iconName: "send" }}
            />
          </div>
        </form>
      )}
      {state === "success" && (
        <div className={styles.success}>
          <Icon iconName="mark_email_read" size="large" />
          <p>
            <HighlightText text={messages.success} />
          </p>
        </div>
      )}
    </div>
  );
}
