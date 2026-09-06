import React from "react";
import { Icon } from "../core/Icon.jsx";

/** 选择器 — 触发区同 Input；下拉面板 10px 圆角，选中项品牌色 + 对勾。 */
export function Select({
  value, onChange, options = [], placeholder = "请选择", disabled, id, status = "default", style,
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);
  const current = options.find((o) => o.value === value);
  const border = status === "error" ? "var(--state-error)" : open ? "var(--field-border-focus)" : "var(--field-border)";
  return (
    <div ref={ref} style={{ position: "relative", minWidth: 0, ...style }}>
      <button
        type="button" id={id} disabled={disabled}
        aria-haspopup="listbox" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", height: "var(--field-height)", padding: "0 10px 0 var(--field-pad-x)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2)",
          background: disabled ? "var(--surface-sunken)" : "var(--field-bg)",
          border: `1px solid ${border}`, borderRadius: "var(--field-radius)",
          boxShadow: open ? "var(--ring-focus)" : "none",
          fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-m)",
          color: current ? "var(--text-heading)" : "var(--field-placeholder)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? "var(--state-disabled-opacity)" : 1,
          transition: "border-color var(--dur-micro) var(--ease-out)",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {current ? current.label : placeholder}
        </span>
        <Icon name="expand_more" size={20} color="var(--text-subtle)"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-micro) var(--ease-out)" }} />
      </button>
      {open ? (
        <ul role="listbox" style={{
          position: "absolute", zIndex: 40, top: "calc(100% + 4px)", left: 0, right: 0,
          margin: 0, padding: "var(--space-1)", listStyle: "none",
          maxHeight: 256, overflowY: "auto",
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)",
        }}>
          {options.map((o) => {
            const sel = o.value === value;
            return (
              <li key={o.value} role="option" aria-selected={sel}>
                <button
                  type="button"
                  onClick={() => { onChange && onChange(o.value); setOpen(false); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                    padding: "8px 10px", border: 0, borderRadius: "var(--radius-sm)",
                    background: sel ? "var(--surface-brand-subtle)" : "transparent",
                    color: sel ? "var(--text-brand)" : "var(--text-body)",
                    fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-m)",
                    textAlign: "left", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "var(--surface-hover)"; }}
                  onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = "transparent"; }}
                >
                  <span>{o.label}</span>
                  {sel ? <Icon name="check" size={18} /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
