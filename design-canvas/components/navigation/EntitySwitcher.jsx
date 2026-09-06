import React from "react";
import { Icon } from "../core/Icon.jsx";

const ENTITIES = [
  { key: "stg", code: "STG", name: "源裕兴创新未来", color: "var(--stg-600)" },
  { key: "ste", code: "STE", name: "九派国有能源", color: "var(--ste-600)" },
  { key: "sti", code: "STI", name: "源裕兴进出口贸易", color: "var(--sti-600)" },
  { key: "sth", code: "STH", name: "源裕兴健康科技", color: "var(--sth-600)" },
  { key: "edu", code: "EDU", name: "崇仁教育", color: "var(--edu-600)" },
];

/** 五实体切换器 — 切换 data-theme，全站主色随之重映射。 */
export function EntitySwitcher({ value = "stg", onChange, compact = false, style }) {
  const [open, setOpen] = React.useState(false);
  const cur = ENTITIES.find((e) => e.key === value) || ENTITIES[0];
  const pick = (k) => {
    if (onChange) onChange(k);
    setOpen(false);
  };
  if (compact) {
    return (
      <div role="group" aria-label="实体切换" style={{ display: "flex", gap: 6, ...style }}>
        {ENTITIES.map((e) => (
          <button key={e.key} type="button" onClick={() => pick(e.key)} title={`${e.code} ${e.name}`}
            aria-pressed={e.key === value}
            style={{
              width: 20, height: 3, borderRadius: 0, cursor: "pointer",
              background: e.color, border: 0, outline: e.key === value ? "1px solid var(--text-subtle)" : "none", outlineOffset: 3,
              opacity: e.key === value ? 1 : .5,
            }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ position: "relative", ...style }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        style={{
          display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%",
          height: 44, padding: "0 10px", background: "var(--surface-sunken)",
          border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", cursor: "pointer",
        }}>
        <span style={{ width: 2, height: 20, background: cur.color, flex: "0 0 auto" }} />
        <span style={{ fontFamily: "var(--font-western)", fontSize: 11, letterSpacing: ".14em", color: "var(--text-subtle)", flex: "0 0 auto" }}>{cur.code}</span>
        <span style={{
          flex: 1, textAlign: "left", fontFamily: "var(--font-display)",
          fontSize: "var(--fs-body-s)", color: "var(--text-heading)", whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis",
        }}>{cur.name}</span>
        <Icon name="unfold_more" size={18} color="var(--text-subtle)" />
      </button>
      {open ? (
        <ul style={{
          position: "absolute", zIndex: 60, top: "calc(100% + 4px)", left: 0, right: 0,
          margin: 0, padding: "var(--space-1)", listStyle: "none",
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)",
        }}>
          {ENTITIES.map((e) => (
            <li key={e.key}>
              <button type="button" onClick={() => pick(e.key)}
                style={{
                  display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%",
                  padding: "8px 8px", border: 0, borderRadius: "var(--radius-sm)", cursor: "pointer",
                  background: e.key === value ? "var(--surface-hover)" : "transparent", textAlign: "left",
                }}>
                <span style={{ width: 2, height: 16, background: e.color, flex: "0 0 auto" }} />
                <span style={{ fontFamily: "var(--font-western)", fontSize: 11, color: "var(--text-subtle)", letterSpacing: ".04em" }}>{e.code}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-body-s)", color: "var(--text-heading)" }}>{e.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
