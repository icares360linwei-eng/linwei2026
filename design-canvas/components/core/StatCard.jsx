import React from "react";
import { Icon } from "./Icon.jsx";

/** KPI 卡 — 指标名 + 主数值 + 单位 + 同比变化 + 可选迷你趋势条。 */
export function StatCard({
  label, value, unit, delta, deltaLabel, trend, icon, tone = "default", style,
}) {
  const up = typeof delta === "number" ? delta >= 0 : null;
  const deltaColor = up == null ? "var(--text-muted)" : up ? "var(--state-success)" : "var(--state-error)";
  const tMax = trend && trend.length ? Math.max(...trend) : 1;
  const tMin = trend && trend.length ? Math.min(...trend) : 0;
  const span = tMax - tMin || 1;
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "var(--space-3)",
      padding: "var(--space-5)", borderRadius: "var(--card-radius)",
      background: tone === "brand" ? "var(--surface-brand-subtle)" : "var(--surface-card)",
      border: `1px solid ${tone === "brand" ? "var(--brand-100)" : "var(--card-border)"}`,
      boxShadow: "var(--card-shadow)", minWidth: 0, ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2)" }}>
        <span style={{
          fontSize: "var(--fs-body-s)", color: "var(--text-muted)", fontFamily: "var(--font-sans)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0,
        }}>{label}</span>
        {icon ? <Icon name={icon} size={20} color="var(--text-subtle)" /> : null}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, minWidth: 0 }}>
        <span style={{
          fontFamily: "var(--font-western)", fontSize: "clamp(24px, 2.2vw, 34px)", fontWeight: "var(--fw-medium)",
          letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--text-heading)",
          fontVariantNumeric: "tabular-nums",
        }}>{value}</span>
        {unit ? <span style={{ fontSize: "var(--fs-body-s)", color: "var(--text-subtle)" }}>{unit}</span> : null}
      </div>
      {(delta != null || deltaLabel) ? (
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", fontSize: "var(--fs-caption)", color: deltaColor }}>
          {up != null ? <Icon name={up ? "trending_up" : "trending_down"} size={16} /> : null}
          <span style={{ fontFamily: "var(--font-western)", fontVariantNumeric: "tabular-nums" }}>
            {delta != null ? `${up ? "+" : ""}${delta}%` : null}
          </span>
          {deltaLabel ? <span style={{ color: "var(--text-subtle)" }}>{deltaLabel}</span> : null}
        </div>
      ) : null}
      {trend && trend.length ? (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 32 }}>
          {trend.map((v, i) => (
            <span key={i} style={{
              flex: 1, height: `${18 + ((v - tMin) / span) * 82}%`, borderRadius: "var(--radius-xs)",
              background: i === trend.length - 1 ? "var(--brand-600)" : "var(--brand-200)",
            }} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
