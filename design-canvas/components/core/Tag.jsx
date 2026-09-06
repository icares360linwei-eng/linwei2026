import React from "react";
import { Icon } from "./Icon.jsx";

const TONES = {
  neutral: { background: "var(--ink-100)", color: "var(--text-body)", border: "var(--border-subtle)" },
  brand:   { background: "var(--surface-brand-subtle)", color: "var(--text-brand)", border: "var(--brand-100)" },
  success: { background: "var(--state-success-surface)", color: "var(--state-success)", border: "transparent" },
  warning: { background: "var(--state-warning-surface)", color: "var(--state-warning)", border: "transparent" },
  error:   { background: "var(--state-error-surface)", color: "var(--state-error)", border: "transparent" },
  info:    { background: "var(--state-info-surface)", color: "var(--state-info)", border: "transparent" },
  gold:    { background: "var(--gold-200)", color: "var(--gold-600)", border: "transparent" },
};

/** 标签 / Chip — 分类、状态、多选回填。 */
export function Tag({ children, tone = "neutral", size = "m", icon, onRemove, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  const s = size === "s" ? { h: 20, fs: 11, pad: "0 6px" } : { h: 24, fs: 12, pad: "0 8px" };
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        height: s.h, padding: s.pad, fontSize: s.fs, lineHeight: 1,
        fontFamily: "var(--font-sans)", fontWeight: "var(--fw-medium)",
        letterSpacing: "var(--ls-caption)",
        borderRadius: "var(--radius-sm)",
        background: t.background, color: t.color, border: `1px solid ${t.border}`,
        whiteSpace: "nowrap", ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={size === "s" ? 14 : 16} /> : null}
      {children}
      {onRemove ? (
        <button
          type="button" aria-label="移除" onClick={onRemove}
          style={{ display: "inline-flex", border: 0, background: "none", padding: 0, marginLeft: 2, cursor: "pointer", color: "inherit", opacity: .65 }}
        >
          <Icon name="close" size={14} />
        </button>
      ) : null}
    </span>
  );
}
