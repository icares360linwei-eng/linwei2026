import React from "react";

/** 单选组 — 2–5 个互斥短选项；更多请用 Select。 */
export function Radio({ value, onChange, options = [], name, direction = "vertical", disabled, style }) {
  return (
    <div role="radiogroup" style={{
      display: "flex", flexDirection: direction === "row" ? "row" : "column",
      gap: direction === "row" ? "var(--space-5)" : "var(--space-3)", flexWrap: "wrap", ...style,
    }}>
      {options.map((o) => {
        const on = o.value === value;
        const off = disabled || o.disabled;
        return (
          <label key={o.value} style={{
            display: "inline-flex", alignItems: "flex-start", gap: "var(--space-2)",
            cursor: off ? "not-allowed" : "pointer", opacity: off ? "var(--state-disabled-opacity)" : 1,
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-m)", color: "var(--text-body)",
          }}>
            <input
              type="radio" name={name} checked={on} disabled={off}
              onChange={() => onChange && onChange(o.value)}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              width: 18, height: 18, marginTop: 3, flex: "0 0 auto", borderRadius: "var(--radius-full)",
              border: `1px solid ${on ? "var(--brand-600)" : "var(--border-default)"}`,
              background: "var(--surface-card)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "border-color var(--dur-micro) var(--ease-out)",
            }}>
              {on ? <span style={{ width: 9, height: 9, borderRadius: "var(--radius-full)", background: "var(--brand-600)" }} /> : null}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span>{o.label}</span>
              {o.hint ? <span style={{ fontSize: "var(--fs-caption)", color: "var(--text-subtle)" }}>{o.hint}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
