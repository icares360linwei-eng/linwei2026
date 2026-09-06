/** 空状态：无数据 / 无搜索结果 / 无权限 / 404。必须给出下一步，而不是只报「无」。 */
export interface EmptyStateProps {
  /** Material Symbols 字形名，默认 "inbox" */
  icon?: string;
  title?: string;
  /** 一句说明 + 引导，如「创建第一条记录，从这里开始。」 */
  hint?: React.ReactNode;
  /** 主操作按钮 */
  action?: React.ReactNode;
  /** 紧凑内边距（嵌在卡片 / 表格里时） */
  compact?: boolean;
  style?: React.CSSProperties;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
