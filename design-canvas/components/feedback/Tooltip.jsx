import React from "react";

/** 提示气泡 — 玄墨底 + 宣纸字，只承载补充信息，不承载唯一信息。 */
export function Tooltip({ content, children, placement = "top", style }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" },
  }[placement];
  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}
    >
      {children}
      {show ? (
        <span role="tooltip" style={{
          position: "absolute", zIndex: 80, ...pos,
          padding: "5px 9px", borderRadius: "var(--radius-sm)",
          background: "var(--tooltip-bg)", color: "var(--tooltip-fg)",
          fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", lineHeight: 1.5,
          whiteSpace: "nowrap", boxShadow: "var(--shadow-md)", pointerEvents: "none", ...style,
        }}>{content}</span>
      ) : null}
    </span>
  );
}
