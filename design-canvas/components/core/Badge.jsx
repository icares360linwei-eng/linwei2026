import React from "react";

const DOT = {
  neutral: "var(--ink-400)", brand: "var(--brand-600)", success: "var(--state-success)",
  warning: "var(--state-warning)", error: "var(--state-error)", info: "var(--state-info)",
};

/** 状态点 / 计数徽标。dot=运行状态；count=未读数（>max 显示 max+）。 */
export function Badge({ tone = "neutral", count, max = 99, label, dot = false, pulse = false, style }) {
  if (dot || count == null) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, ...style }}>
        <span style={{ position: "relative", width: 8, height: 8, flex: "0 0 auto" }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-full)", background: DOT[tone] }} />
          {pulse ? (
            <span style={{
              position: "absolute", inset: -4, borderRadius: "var(--radius-full)",
              border: `1px solid ${DOT[tone]}`, opacity: .35,
            }} />
          ) : null}
        </span>
        {label ? (
          <span style={{ fontSize: "var(--fs-caption)", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{label}</span>
        ) : null}
      </span>
    );
  }
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 18, height: 18, padding: "0 5px",
      borderRadius: "var(--radius-full)", background: DOT[tone === "neutral" ? "error" : tone], color: "#fff",
      fontFamily: "var(--font-western)", fontSize: 11, fontWeight: "var(--fw-medium)",
      fontVariantNumeric: "tabular-nums", lineHeight: 1, ...style,
    }}>
      {count > max ? `${max}+` : count}
    </span>
  );
}
