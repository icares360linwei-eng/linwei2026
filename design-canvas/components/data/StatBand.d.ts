/**
 * 指标带：一行细线分隔的关键指标。标签走 12px 零字距（承载中文），数值走西文 300 字重。看板首屏用它，**不要**再用四张并排的 StatCard——
 * 那会让四个同权重的框争夺注意力。
 */
export interface StatBandItem {
  /** 指标名，渲染为 12px 中文小标签（零字距，不用大写眼标——那会把汉字拉散） */
  label: string;
  /** 已格式化的数值字符串 */
  value: string | number;
  unit?: string;
  /** 同比变化百分比；正数苍木绿向上，负数朱砂红向下 */
  delta?: number;
  /** 变化说明，如「较昨日」 */
  deltaLabel?: string;
  /** Material Symbols 字形名，渲染在标签前 */
  icon?: string;
}
export interface StatBandProps {
  items?: StatBandItem[];
  /** l 数值 44px（默认，首屏）/ m 32px（次级区块） */
  size?: "l" | "m";
  style?: React.CSSProperties;
}
export function StatBand(props: StatBandProps): JSX.Element;
