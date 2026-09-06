/** 状态点（设备在线 / 审批中）或计数徽标（未读消息）。 */
export interface BadgeProps {
  tone?: "neutral" | "brand" | "success" | "warning" | "error" | "info";
  /** 计数模式：传入数字即渲染胶囊数字徽标 */
  count?: number;
  /** 计数上限，超出显示 "99+" */
  max?: number;
  /** 状态点右侧的文字说明 */
  label?: string;
  /** 强制状态点模式 */
  dot?: boolean;
  /** 状态点外加一圈脉动光环（运行中 / 实时） */
  pulse?: boolean;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;
