import React from "react";

/**
 * 章节起头 —— 竖排序号 + 印章方块 + 大号宋体标题 + 引言，靠左 8 列、右侧留白 4 列。
 * 非对称留白本身就是版面的一部分，不要把右侧填满。
 */
export function SectionHead({ index, eyebrow, title, lede, tone = "paper", align = "left", style }) {
  const inverse = tone === "ink";
  return (
    <header style={{
      display: "grid",
      gridTemplateColumns: index ? "auto minmax(0,1fr)" : "minmax(0,1fr)",
      gap: index ? "var(--space-6)" : 0,
      marginBottom: "var(--space-11)",
      justifyItems: align === "center" ? "center" : "start",
      ...style,
    }}>
      {index ? (
        <span style={{
          writingMode: "vertical-rl", fontFamily: "var(--font-western)", fontSize: 12,
          letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase",
          color: inverse ? "var(--gold-400)" : "var(--text-subtle)",
          paddingTop: 6, whiteSpace: "nowrap",
        }}>{index}</span>
      ) : null}
      <div style={{ minWidth: 0 }}>
        {eyebrow ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-western)", fontSize: 12, fontWeight: "var(--fw-medium)",
            letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase",
            color: inverse ? "var(--gold-300)" : "var(--text-subtle)",
          }}>
            <span style={{ width: 8, height: 8, background: "var(--seal)", flex: "0 0 auto" }} />
            {eyebrow}
          </div>
        ) : null}
        <h2 style={{
          margin: "var(--space-5) 0 0", fontFamily: "var(--font-display)",
          maxWidth: "15em", textWrap: "balance", wordBreak: "keep-all",
          fontSize: "clamp(34px, 4.4vw, 64px)", fontWeight: "var(--fw-extralight)",
          letterSpacing: "-.032em", lineHeight: 1.12,
          color: inverse ? "var(--ink-50)" : "var(--text-heading)",
        }}>{title}</h2>
        {lede ? (
          <p style={{
            margin: "var(--space-6) 0 0", maxWidth: "26em",
            fontSize: "var(--fs-body-l)", lineHeight: 1.9,
            color: inverse ? "var(--ink-300)" : "var(--text-muted)",
          }}>{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
