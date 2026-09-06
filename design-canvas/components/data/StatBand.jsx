import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * 指标带 —— 一行细线分隔的关键指标，替代「四张并排卡片」。
 * 数值 clamp(30–44px) 西文 300 字重，标签 12px 中文小标签（零字距）；除细线外没有任何边框与阴影。
 */
export function StatBand({ items = [], size = "l", style }) {
  const fs = size === "l" ? "clamp(30px, 3.1vw, 44px)" : "clamp(24px, 2.4vw, 32px)";
  return (
    <div style={{
      display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(190px, 1fr))`,
      background: "var(--surface-card)", borderRadius: "var(--card-radius)",
      overflow: "hidden", ...style,
    }}>
      {items.map((it, i) => {
        const up = typeof it.delta === "number" ? it.delta >= 0 : null;
        return (
          <div key={it.label} style={{
            padding: "var(--space-6) var(--space-6)",
            borderLeft: i ? "var(--hairline)" : "0", minWidth: 0,
            display: "flex", flexDirection: "column", gap: "var(--space-4)",
          }}>
            <span style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-medium)",
              letterSpacing: 0, color: "var(--text-subtle)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {it.icon ? <Icon name={it.icon} size={16} /> : null}{it.label}
            </span>
            <span style={{ display: "flex", alignItems: "baseline", gap: 6, minWidth: 0 }}>
              <span style={{
                fontFamily: "var(--font-western)", fontSize: fs, fontWeight: "var(--fw-light)",
                letterSpacing: "-.03em", lineHeight: 1, color: "var(--text-heading)",
                fontVariantNumeric: "tabular-nums",
              }}>{it.value}</span>
              {it.unit ? <span style={{ fontSize: "var(--fs-body-s)", color: "var(--text-subtle)" }}>{it.unit}</span> : null}
            </span>
            {(it.delta != null || it.deltaLabel) ? (
              <span style={{
                display: "flex", alignItems: "center", gap: 4, fontSize: "var(--fs-caption)",
                color: up == null ? "var(--text-muted)" : up ? "var(--state-success)" : "var(--state-error)",
              }}>
                {up != null ? <Icon name={up ? "arrow_upward" : "arrow_downward"} size={14} /> : null}
                {it.delta != null ? (
                  <span style={{ fontFamily: "var(--font-western)", fontVariantNumeric: "tabular-nums" }}>{Math.abs(it.delta)}%</span>
                ) : null}
                {it.deltaLabel ? <span style={{ color: "var(--text-subtle)" }}>{it.deltaLabel}</span> : null}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
