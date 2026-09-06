import React from "react";

const DIMS = {
  "守正": { color: "var(--ink-900)", surface: "var(--zhu-50)", en: "Preserving Integrity" },
  "开物": { color: "var(--sti-600)", surface: "var(--sti-50)", en: "Pioneering Innovation" },
  "共生": { color: "var(--ste-600)", surface: "var(--ste-50)", en: "Symbiotic Coexistence" },
};

/** 哲学锚点 — 把「守正 / 开物 / 共生」的设计依据显式挂在章节或组件说明上。 */
export function PhiAnchor({ dimensions = ["守正"], children, source, style }) {
  const primary = DIMS[dimensions[0]] || DIMS["守正"];
  return (
    <aside style={{
      display: "flex", flexDirection: "column", gap: "var(--space-3)",
      padding: "var(--space-5)", borderRadius: "var(--radius-lg)",
      background: "var(--surface-sunken)",
      borderLeft: `var(--border-indicator) solid ${primary.color}`,
      ...style,
    }}>
      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
        {dimensions.map((d) => {
          const dim = DIMS[d] || DIMS["守正"];
          return (
            <span key={d} style={{
              display: "inline-flex", alignItems: "baseline", gap: 6,
              padding: "3px 10px", borderRadius: "var(--radius-sm)",
              background: dim.surface, color: dim.color,
              border: `1px solid ${dim.color}`,
              fontFamily: "var(--font-display)", fontSize: "var(--fs-body-s)", fontWeight: "var(--fw-medium)",
            }}>
              {d}
              <span style={{
                fontFamily: "var(--font-western)", fontSize: 10, letterSpacing: "var(--ls-eyebrow)",
                textTransform: "uppercase", opacity: .7,
              }}>{dim.en}</span>
            </span>
          );
        })}
      </div>
      <blockquote style={{
        margin: 0, fontFamily: "var(--font-serif)", fontSize: "var(--fs-body-l)",
        lineHeight: 1.8, color: "var(--text-heading)", maxWidth: "var(--measure-cn)",
      }}>{children}</blockquote>
      {source ? (
        <cite style={{
          fontStyle: "normal", fontSize: "var(--fs-caption)", color: "var(--text-subtle)",
          letterSpacing: "var(--ls-caption)",
        }}>— {source}</cite>
      ) : null}
    </aside>
  );
}
