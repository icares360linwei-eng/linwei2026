/** 模态弹窗：400 / 600 / 900px 三档宽，16px 圆角，45% 暖墨遮罩，Escape 与遮罩点击可关。 */
export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** 底栏操作区，右对齐（取消在左、确认在右） */
  footer?: React.ReactNode;
  /** s 400 / m 600（默认）/ l 900 */
  size?: "s" | "m" | "l";
  /** false 时隐藏关闭按钮且禁用 Escape / 遮罩关闭（仅用于必须完成的流程） */
  closable?: boolean;
  style?: React.CSSProperties;
}
export function Modal(props: ModalProps): JSX.Element | null;
