/**
 * KPI 卡：指标名 + 主数值（西文等宽数字）+ 单位 + 同比 + 可选迷你趋势条。
 */
export interface StatCardProps {
  /** 指标名，如「今日发电量」 */
  label: string;
  /** 主数值，已格式化的字符串（千分位 / 万亿单位） */
  value: string | number;
  /** 单位，如「万 kWh」 */
  unit?: string;
  /** 同比变化百分比；正数绿色向上，负数朱砂红向下 */
  delta?: number;
  /** 变化的说明文字，如「较上月」 */
  deltaLabel?: string;
  /** 迷你趋势条数据（6–12 个点为宜） */
  trend?: number[];
  /** 右上角 Material Symbols 字形名 */
  icon?: string;
  tone?: "default" | "brand";
  style?: React.CSSProperties;
}
export function StatCard(props: StatCardProps): JSX.Element;
