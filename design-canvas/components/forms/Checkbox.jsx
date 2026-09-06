import React from "react";
import { Icon } from "../core/Icon.jsx";

/** 复选框 — 18×18px，选中品牌色填充 + 白对勾，支持半选。 */
export function Checkbox({ checked = false, indeterminate = false, onChange, label, disabled, id, style }) {
  const [hover, setHover] = React.useState(false);
  const on = checked || indeterminate;
  return (
    <label
      htmlFor={id}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "var(--state-disabled-opacity)" : 1,
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-m)", color: "var(--text-body)", ...style,
      }}
    >
      <input
        id={id} type="checkbox" checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        width: 18, height: 18, flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-sm)",
        background: on ? "var(--brand-600)" : "var(--surface-card)",
        border: `1px solid ${on ? "var(--brand-600)" : hover && !disabled ? "var(--brand-400)" : "var(--border-default)"}`,
        boxShadow: hover && !disabled && !on ? "0 0 0 4px var(--brand-50)" : "none",
        transition: "background var(--dur-micro) var(--ease-out), border-color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out)",
      }}>
        {indeterminate ? (
          <span style={{ width: 10, height: 2, borderRadius: 1, background: "#fff" }} />
        ) : checked ? (
          <Icon name="check" size={14} color="#fff" weight={500} />
        ) : null}
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
