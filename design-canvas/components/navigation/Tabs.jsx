import React from "react";
import { Icon } from "../core/Icon.jsx";

/** 标签页 — 同级内容切换，2–6 项；选中项 2px 品牌色下划线。 */
export function Tabs({ items = [], activeKey, onSelect, size = "m", style }) {
  return (
    <div role="tablist" style={{
      display: "flex", alignItems: "stretch", gap: "var(--space-5)",
      borderBottom: "1px solid var(--border-subtle)", ...style,
    }}>
      {items.map((it) => {
        const on = it.key === activeKey;
        return (
          <button key={it.key} type="button" role="tab" aria-selected={on}
            onClick={() => onSelect && onSelect(it.key)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: size === "s" ? "8px 0" : "12px 0", border: 0, background: "none",
              borderBottom: `var(--border-emphasis) solid ${on ? "var(--brand-600)" : "transparent"}`,
              marginBottom: -1, cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: size === "s" ? "var(--fs-body-s)" : "var(--fs-body-m)",
              fontWeight: on ? "var(--fw-medium)" : "var(--fw-regular)",
              color: on ? "var(--text-heading)" : "var(--text-muted)",
              transition: "color var(--dur-micro) var(--ease-out), border-color var(--dur-micro) var(--ease-out)",
            }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = "var(--text-heading)"; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            {it.icon ? <Icon name={it.icon} size={18} /> : null}
            {it.label}
            {it.count != null ? (
              <span style={{
                fontFamily: "var(--font-western)", fontSize: "var(--fs-caption)",
                color: "var(--text-subtle)", fontVariantNumeric: "tabular-nums",
              }}>{it.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
