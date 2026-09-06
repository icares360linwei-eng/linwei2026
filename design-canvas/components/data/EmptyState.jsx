import React from "react";
import { Icon } from "../core/Icon.jsx";

/** 空状态 — 说明发生了什么 + 一个明确的下一步。 */
export function EmptyState({ icon = "inbox", title = "暂无数据", hint, action, compact = false, style }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: "var(--space-3)", padding: compact ? "var(--space-7) var(--space-5)" : "var(--space-11) var(--space-5)",
      textAlign: "center", ...style,
    }}>
      <span style={{
        width: 56, height: 56, borderRadius: "var(--radius-full)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
      }}>
        <Icon name={icon} size={24} color="var(--text-subtle)" />
      </span>
      <h4 style={{
        margin: 0, fontFamily: "var(--font-display)", fontWeight: "var(--fw-regular)",
        fontSize: "var(--fs-h4)", color: "var(--text-heading)",
      }}>{title}</h4>
      {hint ? (
        <p style={{ margin: 0, maxWidth: "36ch", fontSize: "var(--fs-body-s)", color: "var(--text-muted)" }}>{hint}</p>
      ) : null}
      {action ? <div style={{ marginTop: "var(--space-2)" }}>{action}</div> : null}
    </div>
  );
}
