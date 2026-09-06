/**
 * 走马灯：品牌词条 / 实体名的连续横向滚动带，两侧带保护渐变，
 * 用作章节之间的呼吸段。prefers-reduced-motion 下停止滚动。
 */
export interface MarqueeProps {
  /** 词条数组，组件内部自动复制一份以实现无缝循环 */
  items?: string[];
  /** 走完一圈的秒数，默认 42；越大越慢 */
  speed?: number;
  /** ink 玄墨底（默认）/ paper 宣纸底 */
  tone?: "ink" | "paper";
  /** 词条之间的分隔符，默认 "·"，以印章色渲染 */
  separator?: string;
  /** 词条字号，默认 clamp(28px, 4vw, 56px) */
  size?: string;
  style?: React.CSSProperties;
}
export function Marquee(props: MarqueeProps): JSX.Element;
