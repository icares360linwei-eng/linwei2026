/**
 * 滚动揭示：进入视口后上浮淡入。只做位移 + 透明度，尊重 prefers-reduced-motion。
 */
export interface RevealProps {
  children?: React.ReactNode;
  /** 渲染的标签，默认 div */
  as?: keyof JSX.IntrinsicElements;
  /** 上浮距离 px，默认 24；大区块可到 40，行内元素 12 */
  rise?: number;
  /** 基础延迟 ms */
  delay?: number;
  /** 序号，与 stagger 相乘形成错峰 */
  index?: number;
  /** 每级错峰 ms，默认 70 */
  stagger?: number;
  /** 时长 ms，默认 700（品牌缓动 --ease-emphasized） */
  duration?: number;
  threshold?: number;
  /** false 时离开视口会重新隐藏，默认 true 只播一次 */
  once?: boolean;
  style?: React.CSSProperties;
}
export function Reveal(props: RevealProps): JSX.Element;

/** 细线绘入：1px 墨线从左向右展开，用作章节分隔的入场动作。 */
export interface RuleRevealProps {
  delay?: number;
  duration?: number;
  color?: string;
  style?: React.CSSProperties;
}
export function RuleReveal(props: RuleRevealProps): JSX.Element;
