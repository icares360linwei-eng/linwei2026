import React from "react";

/**
 * 载入指示器 — 阴阳双弧旋转（太极流纹的临时数字化替代，2.4s 一圈）。
 * 正式的「太极流纹 12 变体」SVG sprite 尚未提供，见 readme.md ▸ ICONOGRAPHY。
 */
export function TaijiSpinner({ size = 20, color = "currentColor", style }) {
  const id = React.useId();
  return (
    <span style={{ display: "inline-flex", flex: "0 0 auto", ...style }}>
      <style>{`@keyframes taiji-spin-${id.replace(/[^a-zA-Z0-9]/g, "")}{to{transform:rotate(360deg)}}`}</style>
      <svg
        width={size} height={size} viewBox="0 0 24 24" role="status" aria-label="载入中"
        style={{
          animation: `taiji-spin-${id.replace(/[^a-zA-Z0-9]/g, "")} var(--dur-loop) linear infinite`,
          transformOrigin: "center",
        }}
      >
        <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="2" strokeOpacity=".18" />
        <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M12 21a9 9 0 0 1-9-9" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity=".55" />
      </svg>
    </span>
  );
}
