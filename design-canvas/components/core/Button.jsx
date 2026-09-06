import React from "react";
import { Icon } from "./Icon.jsx";
import { TaijiSpinner } from "./TaijiSpinner.jsx";

const SIZES = {
  xl: { h: "var(--btn-height-xl)", pad: "0 32px", fs: 16, gap: 10, icon: 20 },
  l:  { h: "var(--btn-height-l)",  pad: "0 24px", fs: 15, gap: 8,  icon: 20 },
  m:  { h: "var(--btn-height-m)",  pad: "0 20px", fs: 14, gap: 8,  icon: 18 },
  s:  { h: "var(--btn-height-s)",  pad: "0 14px", fs: 12, gap: 6,  icon: 18 },
};

const VARIANTS = {
  primary: {
    background: "var(--btn-primary-bg)", color: "var(--btn-primary-fg)",
    border: "1px solid transparent", boxShadow: "var(--shadow-xs)",
  },
  secondary: {
    background: "var(--surface-card)", color: "var(--btn-secondary-fg)",
    border: "1px solid var(--btn-secondary-border)",
  },
  gold: {
    background: "var(--btn-gold-bg)", color: "var(--btn-gold-fg)",
    border: "1px solid transparent", boxShadow: "var(--shadow-xs)",
  },
  text: { background: "transparent", color: "var(--text-heading)", border: "1px solid transparent" },
  link: {
    background: "transparent", color: "var(--text-link)", border: "1px solid transparent",
    textDecoration: "underline", textUnderlineOffset: "0.2em", padding: 0, height: "auto",
  },
  danger: {
    background: "var(--state-error)", color: "#fff",
    border: "1px solid transparent", boxShadow: "var(--shadow-xs)",
  },
  ghost: {
    background: "transparent", color: "var(--text-body)",
    border: "1px solid var(--border-default)",
  },
};

const HOVER = {
  primary: { background: "var(--btn-primary-bg-hover)", boxShadow: "var(--shadow-sm)" },
  secondary: { background: "var(--surface-hover)", borderColor: "var(--border-strong)" },
  gold: { background: "var(--gold-500)", boxShadow: "var(--shadow-sm)" },
  text: { background: "var(--surface-hover)" },
  link: { color: "var(--text-link-hover)" },
  danger: { background: "var(--edu-700)" },
  ghost: { background: "var(--surface-hover)" },
};

/** 主操作按钮。6 型 × 4 档 × 8 状态。 */
export function Button({
  children, variant = "primary", size = "m", shape = "default",
  icon, iconEnd, loading = false, disabled = false, block = false,
  type = "button", onClick, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.m;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const off = disabled || loading;

  return (
    <button
      type={type}
      disabled={off}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      aria-busy={loading || undefined}
      style={{
        display: block ? "flex" : "inline-flex", width: block ? "100%" : undefined,
        alignItems: "center", justifyContent: "center", gap: s.gap,
        height: s.h, padding: s.pad, fontSize: s.fs,
        fontFamily: "var(--font-sans)", fontWeight: "var(--fw-medium)",
        lineHeight: 1, whiteSpace: "nowrap",
        borderRadius: shape === "pill" ? "var(--btn-radius-cta)" : "var(--btn-radius)",
        cursor: off ? "not-allowed" : "pointer",
        opacity: off ? "var(--state-disabled-opacity)" : 1,
        transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out), transform var(--dur-instant) var(--ease-out), border-color var(--dur-micro) var(--ease-out)",
        transform: active && !off ? "scale(.98)" : "none",
        ...v,
        ...(hover && !off ? HOVER[variant] : null),
        ...style,
      }}
      {...rest}
    >
      {loading ? <TaijiSpinner size={s.icon} /> : icon ? <Icon name={icon} size={s.icon} /> : null}
      {children}
      {iconEnd && !loading ? <Icon name={iconEnd} size={s.icon} /> : null}
    </button>
  );
}
