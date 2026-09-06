import React from "react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

/**
 * 揭示判定的共用钩子。
 *
 * 为什么不只用 IntersectionObserver：按规范，只有 isIntersecting / thresholdIndex
 * 发生「变化」时才会入队条目。瞬时跳过某元素（scrollTo、End 键、页内锚点、刷新恢复
 * 滚动位置）时，它始终是 false → false，回调永不执行，内容会永久停在 opacity:0。
 * 因此这里三层保障：挂载时同步测一次 → IO 负责常规滚动 → 被动滚动监听兜底跳跃场景，
 * 三者任一命中即置显并自行摘除。
 */
function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(() => reduced());

  React.useEffect(() => {
    if (reduced()) { setShown(true); return; }
    const el = ref.current;
    if (!el) { setShown(true); return; }

    let done = false;
    const inRange = () => {
      // top 小于视口高度即成立：既覆盖「从下方进入」，也覆盖「已被掠过」（top < 0）
      return el.getBoundingClientRect().top < window.innerHeight;
    };
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (io) io.disconnect();
    };
    const onScroll = () => { if (inRange()) { if (once) reveal(); else setShown(true); } };

    // 第一层：挂载时同步判定，覆盖刷新恢复滚动位置。
    // once: false 时仍需继续挂 IO —— 否则元素离开视口后无法重新隐藏。
    if (inRange()) { setShown(true); if (once) return; }

    // 第二层：IO 负责常规滚动
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            if (once) reveal(); else setShown(true);
          } else if (!once) setShown(false);
        });
      }, { threshold, rootMargin: "0px 0px -8% 0px" });
      io.observe(el);
    }

    // 第三层：被动滚动 / 缩放监听兜底跳跃场景，命中后自行摘除
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (io) io.disconnect();
    };
  }, [threshold, once]);

  return [ref, shown];
}

/**
 * 滚动揭示 —— 进入视口后上浮淡入，可按 index 错峰。
 * 只做「位移 + 透明度」，不做缩放、不做弹跳；尊重 prefers-reduced-motion。
 */
export function Reveal({
  children, as = "div", rise = 24, delay = 0, index = 0, stagger = 70,
  duration = 700, threshold = 0.15, once = true, style, ...rest
}) {
  const [ref, shown] = useReveal({ threshold, once });
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translate3d(0, ${rise}px, 0)`,
      transition: `opacity ${duration}ms var(--ease-emphasized) ${delay + index * stagger}ms, transform ${duration}ms var(--ease-emphasized) ${delay + index * stagger}ms`,
      willChange: shown ? "auto" : "opacity, transform",
      ...style,
    }} {...rest}>{children}</Tag>
  );
}

/**
 * 细线绘入 —— 1px 墨线从左向右展开，用作章节分隔的入场动作。
 */
export function RuleReveal({ delay = 0, duration = 900, color = "var(--border-subtle)", style }) {
  const [ref, shown] = useReveal({ threshold: 0.9, once: true });
  return (
    <span ref={ref} style={{ display: "block", height: 1, overflow: "hidden", ...style }}>
      <span style={{
        display: "block", height: 1, background: color,
        transform: shown ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left center",
        transition: `transform ${duration}ms var(--ease-emphasized) ${delay}ms`,
      }} />
    </span>
  );
}
