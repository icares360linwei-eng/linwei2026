/**
 * 面板容器。默认 flat —— 无描边、无阴影、32px 内边距，靠表面色与留白划界。
 * 一屏内不要出现两种以上 variant，也不要让每个信息块都成为面板。
 */
export interface CardProps {
  children?: React.ReactNode;
  /** 面板标题（宋体 H3 24px，比原来的 H5 更有分量） */
  title?: React.ReactNode;
  /** 标题上方的眼标（大写西文 + 0.18em 字距，勿传中文）；自动带一枚 6px 印章方块 */
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
  /** 底栏（自带上细线） */
  footer?: React.ReactNode;
  /** 内边距覆盖，默认 var(--card-pad-lg) = 32px */
  padding?: number | string;
  /** flat 平面（默认）/ outlined 描边（与同色背景区分时）/ elevated 阴影（仅悬浮层） */
  variant?: "flat" | "outlined" | "elevated";
  tone?: "default" | "sunken" | "brand" | "inverse" | "bare";
  /** 左侧 3px 品牌色指示条，只表示「当前选中 / 重点」 */
  accent?: boolean;
  interactive?: boolean;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
