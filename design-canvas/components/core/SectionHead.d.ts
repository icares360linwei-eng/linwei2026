/**
 * 章节起头：竖排序号 + 印章方块 + 大号宋体标题（clamp 34–64px，200 字重）+ 引言。
 * 只占左侧 8 列，右侧 4 列留白是设计的一部分。
 */
export interface SectionHeadProps {
  /** 竖排序号，如 "01 / 04"；省略则不渲染竖排轨道 */
  index?: string;
  /** 大写西文眼标（0.18em 字距，勿传中文），自动带一枚 8px 印章方块 */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** 引言，最多 26em 宽 */
  lede?: React.ReactNode;
  /** paper 宣纸底（默认）/ ink 玄墨底 */
  tone?: "paper" | "ink";
  align?: "left" | "center";
  style?: React.CSSProperties;
}
export function SectionHead(props: SectionHeadProps): JSX.Element;
