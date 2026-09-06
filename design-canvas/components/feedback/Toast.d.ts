/** 轻量反馈：顶部居中，3s 自动消失，左侧 3px 语义色条，role="status" aria-live="polite"。 */
export interface ToastProps {
  tone?: "success" | "warning" | "error" | "info";
  title: React.ReactNode;
  /** 补充说明，一行为宜 */
  description?: React.ReactNode;
  onClose?: () => void;
  /** 自动消失毫秒数，默认 3000；传 0 常驻 */
  duration?: number;
  style?: React.CSSProperties;
}
export function Toast(props: ToastProps): JSX.Element;
