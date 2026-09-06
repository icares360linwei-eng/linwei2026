import React from "react";

/** Material Symbols Rounded 包装器 — 全系统唯一图标入口。 */
export function Icon({ name, size = 20, weight = 400, fill = 0, color, style, className = "", ...rest }) {
  return (
    <span
      className={`material-symbols-rounded ${className}`}
      aria-hidden="true"
      style={{
        fontSize: size,
        color: color || "inherit",
        fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" 0, "opsz" ${size}`,
        flex: "0 0 auto",
        ...style,
      }}
      {...rest}
    >
      {name}
    </span>
  );
}
