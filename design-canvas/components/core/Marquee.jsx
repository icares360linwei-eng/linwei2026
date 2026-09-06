import React from "react";

/**
 * 走马灯 —— 品牌词条 / 实体名的连续横向滚动带，用作章节之间的呼吸段。
 * prefers-reduced-motion 下停止滚动并居中静态显示。
 */
export function Marquee({
  items = [], speed = 42, tone = "ink", separator = "·", size = "clamp(28px, 4vw, 56px)", style,
}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const inverse = tone === "ink";
  const run = [...items, ...items];
  return (
    <div style={{
      position: "relative", overflow: "hidden",
      background: inverse ? "var(--ink-900)" : "var(--surface-page)",
      borderTop: inverse ? "1px solid rgba(255,251,245,.12)" : "var(--hairline)",
      borderBottom: inverse ? "1px solid rgba(255,251,245,.12)" : "var(--hairline)",
      padding: "clamp(28px,3.4vw,52px) 0", ...style,
    }}>
      <style>{`@keyframes mq${uid}{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
      @media (prefers-reduced-motion:reduce){.mq${uid}{animation:none!important;justify-content:center}}`}</style>
      <div className={`mq${uid}`} style={{
        display: "flex", alignItems: "center", gap: "clamp(28px,3vw,56px)", width: "max-content",
        animation: `mq${uid} ${speed}s linear infinite`,
      }}>
        {run.map((it, i) => (
          <React.Fragment key={i}>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: size, fontWeight: 200,
              letterSpacing: "-.03em", whiteSpace: "nowrap",
              color: inverse ? "var(--ink-50)" : "var(--text-heading)",
            }}>{it}</span>
            <span style={{
              fontFamily: "var(--font-western)", fontSize: 14,
              color: inverse ? "var(--gold-400)" : "var(--seal)", flex: "0 0 auto",
            }}>{separator}</span>
          </React.Fragment>
        ))}
      </div>
      <span style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: inverse
          ? "linear-gradient(90deg, var(--ink-900) 0%, transparent 12%, transparent 88%, var(--ink-900) 100%)"
          : "linear-gradient(90deg, var(--surface-page) 0%, transparent 12%, transparent 88%, var(--surface-page) 100%)",
      }} />
    </div>
  );
}
