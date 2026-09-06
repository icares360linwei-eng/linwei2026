import React from "react";

/** 表单字段外壳 — 标签、必填星号、帮助文字、错误文字。所有输入型组件共用。 */
export function Field({ label, htmlFor, required, hint, error, success, children, style }) {
  const msg = error || success || hint;
  const msgColor = error ? "var(--state-error)" : success ? "var(--state-success)" : "var(--text-subtle)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", minWidth: 0, ...style }}>
      {label ? (
        <label htmlFor={htmlFor} style={{
          fontSize: "var(--fs-body-s)", fontWeight: "var(--fw-medium)",
          color: "var(--text-heading)", fontFamily: "var(--font-sans)",
        }}>
          {label}
          {required ? <span style={{ color: "var(--state-error)", marginLeft: 4 }} aria-hidden="true">*</span> : null}
        </label>
      ) : null}
      {children}
      {msg ? (
        <span role={error ? "alert" : undefined} style={{ fontSize: "var(--fs-caption)", color: msgColor, lineHeight: 1.5 }}>
          {msg}
        </span>
      ) : null}
    </div>
  );
}
