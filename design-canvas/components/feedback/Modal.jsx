import React from "react";
import { IconButton } from "../core/IconButton.jsx";

const W = { s: 400, m: 600, l: 900 };

/** 模态弹窗 — 16px 圆角、45% 暖墨遮罩、300ms 品牌缓动入场。Escape 可关。 */
export function Modal({ open, onClose, title, children, footer, size = "m", closable = true, style }) {
  React.useEffect(() => {
    if (!open) return;
    const esc = (e) => { if (e.key === "Escape" && closable && onClose) onClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, closable, onClose]);
  if (!open) return null;
  return (
    <div
      role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : undefined}
      onMouseDown={(e) => { if (e.target === e.currentTarget && closable && onClose) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 100, background: "var(--scrim)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-5)",
        animation: "none",
      }}
    >
      <div style={{
        width: "100%", maxWidth: W[size] || W.m, maxHeight: "86vh",
        display: "flex", flexDirection: "column",
        background: "var(--surface-card)", borderRadius: "var(--overlay-radius)",
        boxShadow: "var(--overlay-shadow)", overflow: "hidden", ...style,
      }}>
        {(title || closable) ? (
          <header style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
            padding: "var(--space-5) var(--space-5) var(--space-4)",
          }}>
            <h3 style={{
              margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--fs-h5)",
              fontWeight: "var(--fw-medium)", color: "var(--text-heading)",
            }}>{title}</h3>
            {closable ? <IconButton icon="close" label="关闭" size="s" onClick={onClose} /> : null}
          </header>
        ) : null}
        <div style={{
          padding: "0 var(--space-5) var(--space-5)", overflowY: "auto",
          fontSize: "var(--fs-body-m)", color: "var(--text-body)", lineHeight: "var(--lh-body-m)",
        }}>{children}</div>
        {footer ? (
          <footer style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "var(--space-3)",
            padding: "var(--space-4) var(--space-5)", borderTop: "1px solid var(--border-subtle)",
            background: "var(--surface-sunken)",
          }}>{footer}</footer>
        ) : null}
      </div>
    </div>
  );
}
