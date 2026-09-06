import React from "react";

/** 多行输入 — 与 Input 同描边逻辑，最小 3 行，可选字数计数。 */
export function Textarea({
  value, onChange, placeholder, rows = 4, maxLength, status = "default", disabled, id, style, ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const border = status === "error" ? "var(--state-error)"
    : status === "success" ? "var(--state-success)"
    : focus ? "var(--field-border-focus)" : "var(--field-border)";
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      background: disabled ? "var(--surface-sunken)" : "var(--field-bg)",
      border: `1px solid ${border}`, borderRadius: "var(--field-radius)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      transition: "border-color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out)",
      opacity: disabled ? "var(--state-disabled-opacity)" : 1, ...style,
    }}>
      <textarea
        id={id} value={value} rows={rows} placeholder={placeholder} maxLength={maxLength} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        aria-invalid={status === "error" || undefined}
        style={{
          border: 0, outline: "none", background: "transparent", resize: "vertical",
          padding: "10px var(--field-pad-x)", fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-body-m)", lineHeight: "var(--lh-body-m)", color: "var(--text-heading)",
        }}
        {...rest}
      />
      {maxLength ? (
        <div style={{
          padding: "0 var(--field-pad-x) 8px", textAlign: "right",
          fontFamily: "var(--font-western)", fontSize: "var(--fs-caption)", color: "var(--text-subtle)",
        }}>{(value || "").length} / {maxLength}</div>
      ) : null}
    </div>
  );
}
