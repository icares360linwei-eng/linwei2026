import React from "react";
import { Button } from "../core/Button.jsx";

/** 气泡确认 — 中等风险操作的轻量二次确认，锚定在触发元素上方。 */
export function Popconfirm({
  open, title, description, confirmText = "确认", cancelText = "取消",
  danger = false, onConfirm, onCancel, children, placement = "top", style,
}) {
  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      {children}
      {open ? (
        <div role="dialog" style={{
          position: "absolute", zIndex: 60, width: 264,
          ...(placement === "top" ? { bottom: "calc(100% + 8px)" } : { top: "calc(100% + 8px)" }),
          left: 0,
          padding: "var(--space-4)", background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)", textAlign: "left", ...style,
        }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-m)", fontWeight: "var(--fw-medium)", color: "var(--text-heading)" }}>{title}</div>
          {description ? (
            <div style={{ marginTop: 4, fontSize: "var(--fs-body-s)", color: "var(--text-muted)", lineHeight: 1.5 }}>{description}</div>
          ) : null}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
            <Button size="s" variant="secondary" onClick={onCancel}>{cancelText}</Button>
            <Button size="s" variant={danger ? "danger" : "primary"} onClick={onConfirm}>{confirmText}</Button>
          </div>
        </div>
      ) : null}
    </span>
  );
}
