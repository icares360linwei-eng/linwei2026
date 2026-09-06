import React from "react";
import { Icon } from "../core/Icon.jsx";

const win = (page, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (page >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", page - 1, page, page + 1, "…", total];
};

/** 分页 — 36×36 方块按钮，当前页品牌色实底，可显示总数。 */
export function Pagination({ page = 1, pageSize = 20, total = 0, onChange, compact = false, style }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const go = (p) => { if (p >= 1 && p <= pages && p !== page && onChange) onChange(p); };
  const cell = (extra) => ({
    minWidth: 36, height: 36, padding: "0 8px", display: "inline-flex", alignItems: "center", justifyContent: "center",
    border: 0, borderRadius: "var(--radius-md)", background: "transparent", cursor: "pointer",
    fontFamily: "var(--font-western)", fontSize: "var(--fs-body-s)", fontVariantNumeric: "tabular-nums",
    color: "var(--text-body)", transition: "background var(--dur-micro) var(--ease-out)", ...extra,
  });
  return (
    <nav aria-label="分页" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", ...style }}>
      {!compact ? (
        <span style={{ fontSize: "var(--fs-body-s)", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
          共 <span className="u-num">{total.toLocaleString("zh-CN")}</span> 条
        </span>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <button type="button" aria-label="上一页" disabled={page <= 1} onClick={() => go(page - 1)}
          style={cell({ color: page <= 1 ? "var(--text-subtle)" : "var(--text-body)", cursor: page <= 1 ? "not-allowed" : "pointer" })}>
          <Icon name="chevron_left" size={20} />
        </button>
        {win(page, pages).map((p, i) =>
          p === "…" ? (
            <span key={`d${i}`} style={cell({ cursor: "default", color: "var(--text-subtle)" })}>…</span>
          ) : (
            <button key={p} type="button" aria-current={p === page ? "page" : undefined} onClick={() => go(p)}
              style={cell(p === page
                ? { background: "var(--brand-600)", color: "#fff", fontWeight: "var(--fw-medium)" }
                : null)}
              onMouseEnter={(e) => { if (p !== page) e.currentTarget.style.background = "var(--surface-hover)"; }}
              onMouseLeave={(e) => { if (p !== page) e.currentTarget.style.background = "transparent"; }}
            >{p}</button>
          )
        )}
        <button type="button" aria-label="下一页" disabled={page >= pages} onClick={() => go(page + 1)}
          style={cell({ color: page >= pages ? "var(--text-subtle)" : "var(--text-body)", cursor: page >= pages ? "not-allowed" : "pointer" })}>
          <Icon name="chevron_right" size={20} />
        </button>
      </div>
    </nav>
  );
}
