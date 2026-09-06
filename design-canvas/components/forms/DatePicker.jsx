import React from "react";
import { Icon } from "../core/Icon.jsx";

const WEEK = ["一", "二", "三", "四", "五", "六", "日"];
const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

/** 日期选择器 — ISO 8601 值（2026-07-20），周一为首日。 */
export function DatePicker({ value, onChange, placeholder = "YYYY-MM-DD", disabled, id, status = "default", style }) {
  const [open, setOpen] = React.useState(false);
  const parsed = value ? new Date(value + "T00:00:00") : null;
  const [view, setView] = React.useState(() => parsed || new Date(2026, 6, 1));
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [open]);

  const y = view.getFullYear(), m = view.getMonth();
  const first = new Date(y, m, 1).getDay();
  const lead = (first + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const border = status === "error" ? "var(--state-error)" : open ? "var(--field-border-focus)" : "var(--field-border)";

  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      <button
        type="button" id={id} disabled={disabled} onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", height: "var(--field-height)", padding: "0 10px 0 var(--field-pad-x)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
          background: disabled ? "var(--surface-sunken)" : "var(--field-bg)",
          border: `1px solid ${border}`, borderRadius: "var(--field-radius)",
          boxShadow: open ? "var(--ring-focus)" : "none",
          fontFamily: "var(--font-western)", fontSize: "var(--fs-body-m)",
          color: value ? "var(--text-heading)" : "var(--field-placeholder)",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <span>{value || placeholder}</span>
        <Icon name="calendar_today" size={18} color="var(--text-subtle)" />
      </button>
      {open ? (
        <div style={{
          position: "absolute", zIndex: 40, top: "calc(100% + 4px)", left: 0, width: 288, padding: "var(--space-3)",
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-3)" }}>
            <button type="button" aria-label="上一月" onClick={() => setView(new Date(y, m - 1, 1))}
              style={{ border: 0, background: "none", cursor: "pointer", display: "flex", color: "var(--text-muted)" }}>
              <Icon name="chevron_left" size={20} />
            </button>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-m)", fontWeight: "var(--fw-medium)", color: "var(--text-heading)" }}>
              {y} 年 {m + 1} 月
            </span>
            <button type="button" aria-label="下一月" onClick={() => setView(new Date(y, m + 1, 1))}
              style={{ border: 0, background: "none", cursor: "pointer", display: "flex", color: "var(--text-muted)" }}>
              <Icon name="chevron_right" size={20} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
            {WEEK.map((w) => (
              <span key={w} style={{ textAlign: "center", fontSize: "var(--fs-caption)", color: "var(--text-subtle)", padding: "4px 0" }}>{w}</span>
            ))}
            {cells.map((d, i) => {
              if (d == null) return <span key={`e${i}`} />;
              const val = iso(y, m, d);
              const sel = val === value;
              return (
                <button key={val} type="button" onClick={() => { onChange && onChange(val); setOpen(false); }}
                  style={{
                    height: 32, border: 0, borderRadius: "var(--radius-sm)", cursor: "pointer",
                    background: sel ? "var(--brand-600)" : "transparent",
                    color: sel ? "#fff" : "var(--text-body)",
                    fontFamily: "var(--font-western)", fontSize: "var(--fs-body-s)", fontVariantNumeric: "tabular-nums",
                  }}
                  onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "var(--surface-hover)"; }}
                  onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = "transparent"; }}
                >{d}</button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
