import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Checkbox } from "../forms/Checkbox.jsx";

/**
 * 数据表格 — 表头轻霜底 + 品牌色 2px 下划线；选中行 4% 品牌底 + 左侧 3px 指示条。
 * columns: [{ key, title, width, align, render, sortable }]
 */
export function Table({
  columns = [], rows = [], rowKey = "id", selectable = false,
  selected = [], onSelectedChange, sort, onSortChange, onRowClick, empty, dense = false, style,
}) {
  const h = dense ? 40 : "var(--table-row-height)";
  const keyOf = (r, i) => (typeof rowKey === "function" ? rowKey(r) : r[rowKey] != null ? r[rowKey] : i);
  const allOn = rows.length > 0 && selected.length === rows.length;
  const someOn = selected.length > 0 && !allOn;

  const toggleAll = (on) => onSelectedChange && onSelectedChange(on ? rows.map(keyOf) : []);
  const toggleOne = (k, on) => onSelectedChange && onSelectedChange(on ? [...selected, k] : selected.filter((x) => x !== k));

  return (
    <div style={{
      border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
      overflow: "hidden", background: "var(--surface-card)", ...style,
    }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 120 * columns.length + (selectable ? 44 : 0), borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
          <thead>
            <tr style={{ background: "var(--table-header-bg)", borderBottom: "var(--border-emphasis) solid var(--brand-600)" }}>
              {selectable ? (
                <th style={{ width: 44, padding: "0 0 0 var(--space-4)", textAlign: "left" }}>
                  <Checkbox checked={allOn} indeterminate={someOn} onChange={toggleAll} />
                </th>
              ) : null}
              {columns.map((c) => {
                const active = sort && sort.key === c.key;
                return (
                  <th key={c.key} style={{
                    padding: "10px var(--space-4)", textAlign: c.align || "left",
                    width: c.width, whiteSpace: "nowrap",
                    fontSize: "var(--fs-caption)", fontWeight: "var(--fw-medium)",
                    letterSpacing: "var(--ls-caption)", color: "var(--text-muted)",
                  }}>
                    {c.sortable ? (
                      <button type="button"
                        onClick={() => onSortChange && onSortChange({ key: c.key, dir: active && sort.dir === "asc" ? "desc" : "asc" })}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 2, border: 0, background: "none",
                          padding: 0, cursor: "pointer", font: "inherit",
                          color: active ? "var(--text-brand)" : "inherit",
                        }}>
                        {c.title}
                        <Icon name={active ? (sort.dir === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"} size={14} />
                      </button>
                    ) : c.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length + (selectable ? 1 : 0)} style={{ padding: 0 }}>{empty}</td></tr>
            ) : rows.map((r, i) => {
              const k = keyOf(r, i);
              const on = selected.includes(k);
              return (
                <tr key={k}
                  onClick={() => onRowClick && onRowClick(r)}
                  style={{
                    height: h, borderBottom: "1px solid var(--table-divider)",
                    background: on ? "var(--surface-selected)" : "transparent",
                    cursor: onRowClick ? "pointer" : undefined,
                    boxShadow: on ? "inset var(--border-indicator) 0 0 0 var(--brand-600)" : "none",
                    transition: "background var(--dur-micro) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--table-row-hover)"; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
                >
                  {selectable ? (
                    <td style={{ padding: "0 0 0 var(--space-4)" }} onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={on} onChange={(v) => toggleOne(k, v)} />
                    </td>
                  ) : null}
                  {columns.map((c) => (
                    <td key={c.key} style={{
                      padding: dense ? "6px var(--space-4)" : "10px var(--space-4)",
                      textAlign: c.align || "left",
                      fontSize: "var(--fs-body-s)", color: "var(--text-body)",
                      whiteSpace: c.wrap ? "normal" : "nowrap",
                      overflow: "hidden", textOverflow: "ellipsis", maxWidth: c.width || 320,
                      fontVariantNumeric: c.align === "right" ? "tabular-nums" : undefined,
                      fontFamily: c.align === "right" ? "var(--font-western)" : undefined,
                    }}>
                      {c.render ? c.render(r[c.key], r) : r[c.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
