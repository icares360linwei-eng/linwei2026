import React from "react";
import { Icon } from "../core/Icon.jsx";

/** 顶部应用栏 — 64px 高、宣纸底 + 1px 下描边；左侧 SINOTAO 字标，中部导航，右侧操作。 */
export function TopAppBar({
  logoSrc, brand, items = [], activeKey, onSelect, actions, sticky = true, tone = "paper", style,
}) {
  const inverse = tone === "inverse";
  return (
    <header style={{
      position: sticky ? "sticky" : "relative", top: 0, zIndex: 50,
      height: "var(--appbar-height)", display: "flex", alignItems: "center",
      gap: "var(--space-6)", padding: "0 var(--space-6)",
      background: inverse ? "var(--surface-inverse)" : "color-mix(in oklch, var(--surface-page) 88%, transparent)",
      backdropFilter: "saturate(160%) blur(12px)",
      borderBottom: `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-subtle)"}`,
      ...style,
    }}>
      <a href="#" style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-3)",
        textDecoration: "none", flex: "0 0 auto",
      }}>
        {logoSrc ? (
          <img src={logoSrc} alt="SINOTAO 源裕兴" style={{ height: 20, display: "block" }} />
        ) : (
          <span style={{
            fontFamily: "var(--font-wordmark)", fontWeight: 800, fontSize: 17, letterSpacing: "-0.01em",
            color: inverse ? "var(--ink-50)" : "var(--ink-900)",
          }}>SINOTAO</span>
        )}
        {brand ? (
          <span style={{
            paddingLeft: "var(--space-3)", borderLeft: `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-default)"}`,
            fontFamily: "var(--font-display)", fontSize: "var(--fs-body-m)",
            color: inverse ? "var(--ink-200)" : "var(--text-body)",
          }}>{brand}</span>
        ) : null}
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", flex: 1, minWidth: 0 }}>
        {items.map((it) => {
          const on = it.key === activeKey;
          return (
            <button key={it.key} type="button" onClick={() => onSelect && onSelect(it.key)}
              aria-current={on ? "page" : undefined}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                height: 34, padding: "0 12px", border: 0, borderRadius: "var(--radius-md)",
                background: on ? (inverse ? "rgba(255,251,245,.10)" : "var(--surface-brand-subtle)") : "transparent",
                color: on ? (inverse ? "var(--ink-50)" : "var(--text-brand)") : (inverse ? "var(--ink-300)" : "var(--text-body)"),
                fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-s)",
                fontWeight: on ? "var(--fw-medium)" : "var(--fw-regular)",
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)",
              }}>
              {it.icon ? <Icon name={it.icon} size={18} /> : null}
              {it.label}
            </button>
          );
        })}
      </nav>
      {actions ? <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flex: "0 0 auto" }}>{actions}</div> : null}
    </header>
  );
}
