import React from "react";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";

const TONES = {
  success: { color: "var(--state-success)", icon: "check_circle" },
  warning: { color: "var(--state-warning)", icon: "warning" },
  error: { color: "var(--state-error)", icon: "error" },
  info: { color: "var(--state-info)", icon: "info" },
};

/** 轻量反馈 — 顶部居中，3s 自动消失，左侧 3px 语义色条。 */
export function Toast({ tone = "info", title, description, onClose, duration = 3000, style }) {
  React.useEffect(() => {
    if (!duration || !onClose) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);
  const t = TONES[tone] || TONES.info;
  return (
    <div role="status" aria-live="polite" style={{
      display: "flex", alignItems: "flex-start", gap: "var(--space-3)",
      minWidth: 320, maxWidth: 440, padding: "var(--space-3) var(--space-4)",
      background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)", borderLeft: `var(--border-indicator) solid ${t.color}`, ...style,
    }}>
      <Icon name={t.icon} size={20} color={t.color} style={{ marginTop: 2 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-m)", fontWeight: "var(--fw-medium)", color: "var(--text-heading)" }}>{title}</div>
        {description ? (
          <div style={{ marginTop: 2, fontSize: "var(--fs-body-s)", color: "var(--text-muted)", lineHeight: 1.5 }}>{description}</div>
        ) : null}
      </div>
      {onClose ? <IconButton icon="close" label="关闭提示" size="s" onClick={onClose} /> : null}
    </div>
  );
}
