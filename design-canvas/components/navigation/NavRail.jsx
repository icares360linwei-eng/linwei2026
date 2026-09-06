import React from "react";
import { Icon } from "../core/Icon.jsx";

/** 侧轨导航 — 76px 收起 / 264px 展开；4–7 个一级节点，桌面端首选。 */
export function NavRail({
  items = [], activeKey, onSelect, expanded = false, header, footer, style,
}) {
  return (
    <nav style={{
      width: expanded ? "var(--drawer-width)" : "var(--rail-width)",
      flex: "0 0 auto", alignSelf: "stretch",
      display: "flex", flexDirection: "column", gap: "var(--space-2)",
      padding: "var(--space-4) var(--space-3)",
      background: "var(--surface-card)", borderRight: "1px solid var(--border-subtle)",
      transition: "width var(--dur-transition) var(--ease-emphasized)",
      ...style,
    }}>
      {header ? <div style={{ padding: "0 var(--space-1) var(--space-3)" }}>{header}</div> : null}
      {items.map((it) => {
        const on = it.key === activeKey;
        return (
          <button key={it.key} type="button" onClick={() => onSelect && onSelect(it.key)}
            aria-current={on ? "page" : undefined} title={expanded ? undefined : it.label}
            style={{
              display: "flex", alignItems: "center",
              gap: expanded ? "var(--space-3)" : 0,
              justifyContent: expanded ? "flex-start" : "center",
              height: 44, padding: expanded ? "0 var(--space-3)" : 0,
              border: 0, borderRadius: "var(--radius-lg)",
              background: on ? "var(--surface-brand-subtle)" : "transparent",
              color: on ? "var(--text-brand)" : "var(--text-muted)",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-s)",
              fontWeight: on ? "var(--fw-medium)" : "var(--fw-regular)",
              cursor: "pointer", position: "relative", overflow: "hidden",
              transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)",
            }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--surface-hover)"; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
          >
            <Icon name={it.icon} size={22} fill={on ? 1 : 0} />
            {expanded ? <span style={{ whiteSpace: "nowrap" }}>{it.label}</span> : null}
            {it.badge ? (
              <span style={{
                marginLeft: "auto", minWidth: 18, height: 18, padding: "0 5px",
                display: expanded ? "inline-flex" : "none", alignItems: "center", justifyContent: "center",
                borderRadius: "var(--radius-full)", background: "var(--state-error)", color: "#fff",
                fontFamily: "var(--font-western)", fontSize: 11,
              }}>{it.badge}</span>
            ) : null}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      {footer}
    </nav>
  );
}
