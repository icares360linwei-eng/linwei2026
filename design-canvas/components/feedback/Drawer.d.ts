/** 抽屉：右侧滑出，默认 380px（--panel-width），标题栏顶部 3px 品牌色强调线。 */
export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** 覆盖宽度，默认 var(--panel-width) = 380px */
  width?: number | string;
  side?: "right" | "left";
  style?: React.CSSProperties;
}
export function Drawer(props: DrawerProps): JSX.Element | null;
