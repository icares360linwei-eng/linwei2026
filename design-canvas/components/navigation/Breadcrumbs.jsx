import React from "react";
import { Icon } from "../core/Icon.jsx";

/** 面包屑 — md 断点以上使用；最后一项为当前位置，不可点击。 */
export function Breadcrumbs({ items = [], onSelect, style }) {
  return (
    <nav aria-label="面包屑" style={{
      display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap",
      fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-s)", ...style,
    }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={it.key || i}>
            {last ? (
              <span aria-current="page" style={{ color: "var(--text-heading)", fontWeight: "var(--fw-medium)" }}>{it.label}</span>
            ) : (
              <button type="button" onClick={() => onSelect && onSelect(it.key)}
                style={{ border: 0, background: "none", padding: 0, cursor: "pointer", font: "inherit", color: "var(--text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-brand)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
              >{it.label}</button>
            )}
            {!last ? <Icon name="chevron_right" size={16} color="var(--text-subtle)" /> : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
