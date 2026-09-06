/** 纯图标按钮 — 工具条 / 表格行操作 / 关闭。触摸场景请保证 ≥44px 命中区。 */
export interface IconButtonProps {
  /** Material Symbols 字形名 */
  icon: string;
  /** 无障碍标签，必填（同时作为 title 提示） */
  label: string;
  size?: "l" | "m" | "s";
  variant?: "ghost" | "outline" | "solid";
  /** 选中/激活态：品牌浅底 + 品牌字色 */
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): JSX.Element;
