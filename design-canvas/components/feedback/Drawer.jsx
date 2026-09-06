import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/** 抽屉 — 右侧滑出，默认 380px；标题栏带 3px 品牌色强调线。 */
export function Drawer({ open, onClose, title, children, footer, width, side = "right", style }) {
  React.useEffect(() => {
    if (!open) return;
    const esc = (e) => { if (e.key === "Escape" && onClose) onClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      role="dialog" aria-modal="true"
      onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--scrim)", display: "flex", justifyContent: side === "right" ? "flex-end" : "flex-start" }}
    >
      <aside style={{
        width: width || "var(--panel-width)", maxWidth: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        background: "var(--surface-page)", boxShadow: "var(--shadow-xl)", ...style,
      }}>
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
          padding: "var(--space-5)", borderTop: "var(--border-indicator) solid var(--brand-600)",
          background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)",
        }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--fs-h5)", fontWeight: "var(--fw-medium)", color: "var(--text-heading)" }}>{title}</h3>
          <IconButton icon="close" label="关闭" size="s" onClick={onClose} />
        </header>
        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-5)", fontSize: "var(--fs-body-m)", color: "var(--text-body)" }}>{children}</div>
        {footer ? (
          <footer style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "var(--space-3)",
            padding: "var(--space-4) var(--space-5)", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)",
          }}>{footer}</footer>
        ) : null}
      </aside>
    </div>
  );
}
