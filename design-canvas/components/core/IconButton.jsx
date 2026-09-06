import React from "react";
import { Icon } from "./Icon.jsx";

const SIZES = { l: 40, m: 36, s: 28 };

/** 纯图标按钮 — 工具条、表格行操作、关闭。必须提供 label。 */
export function IconButton({
  icon, label, size = "m", variant = "ghost", disabled = false, active = false, onClick, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const d = SIZES[size] || SIZES.m;
  const base = {
    ghost: { background: "transparent", border: "1px solid transparent", color: "var(--text-muted)" },
    outline: { background: "var(--surface-card)", border: "1px solid var(--border-default)", color: "var(--text-body)" },
    solid: { background: "var(--brand-600)", border: "1px solid transparent", color: "#fff" },
  }[variant];
  return (
    <button
      type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: d, height: d, display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-md)", cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "var(--state-disabled-opacity)" : 1,
        transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)",
        ...base,
        ...(active ? { background: "var(--surface-brand-subtle)", color: "var(--text-brand)" } : null),
        ...(hover && !disabled ? { background: variant === "solid" ? "var(--brand-700)" : "var(--surface-hover)", color: variant === "solid" ? "#fff" : "var(--text-heading)" } : null),
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={size === "s" ? 18 : 20} />
    </button>
  );
}
