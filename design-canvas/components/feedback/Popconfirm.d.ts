/** 气泡确认：中等风险操作的轻量二次确认，包裹触发元素使用。 */
export interface PopconfirmProps {
  open?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  /** 确认按钮转为朱砂红危险态 */
  danger?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** 触发元素 */
  children?: React.ReactNode;
  placement?: "top" | "bottom";
  style?: React.CSSProperties;
}
export function Popconfirm(props: PopconfirmProps): JSX.Element;
