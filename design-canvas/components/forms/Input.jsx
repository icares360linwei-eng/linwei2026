import React from "react";
import { Icon } from "../core/Icon.jsx";

const STATUS = {
  default: "var(--field-border)",
  error: "var(--state-error)",
  success: "var(--state-success)",
};

/** 单行输入框 — 40px 高、6px 圆角、聚焦品牌色描边 + 3px 光环。 */
export function Input({
  value, onChange, placeholder, type = "text", status = "default",
  icon, suffix, disabled, readOnly, id, size = "m", style, ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const h = size === "l" ? 48 : size === "s" ? 32 : "var(--field-height)";
  const border = focus && status === "default" ? "var(--field-border-focus)"
    : hover && status === "default" && !disabled ? "var(--field-border-hover)"
    : STATUS[status];
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "var(--space-2)",
        height: h, padding: `0 var(--field-pad-x)`,
        background: disabled ? "var(--surface-sunken)" : "var(--field-bg)",
        border: `1px solid ${border}`, borderRadius: "var(--field-radius)",
        boxShadow: focus ? "var(--ring-focus)" : "none",
        transition: "border-color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out)",
        opacity: disabled ? "var(--state-disabled-opacity)" : 1, minWidth: 0, ...style,
      }}
    >
      {icon ? <Icon name={icon} size={18} color="var(--text-subtle)" /> : null}
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        disabled={disabled} readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        aria-invalid={status === "error" || undefined}
        style={{
          flex: 1, minWidth: 0, border: 0, outline: "none", background: "transparent",
          font: "inherit", fontFamily: "var(--font-sans)",
          fontSize: size === "s" ? "var(--fs-body-s)" : "var(--fs-body-m)",
          color: "var(--text-heading)",
        }}
        {...rest}
      />
      {status === "error" ? <Icon name="error" size={18} color="var(--state-error)" /> : null}
      {status === "success" ? <Icon name="check_circle" size={18} color="var(--state-success)" /> : null}
      {suffix && status === "default" ? (
        <span style={{ fontSize: "var(--fs-caption)", color: "var(--text-subtle)", flex: "0 0 auto" }}>{suffix}</span>
      ) : null}
    </div>
  );
}
