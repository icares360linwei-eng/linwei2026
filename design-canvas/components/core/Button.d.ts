/**
 * 主操作按钮。6 型（primary / secondary / gold / text / link / danger / ghost）× 4 档尺寸。
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary=主操作（品牌色）；gold=品牌溢价时刻 CTA；danger=不可逆操作 */
  variant?: "primary" | "secondary" | "gold" | "text" | "link" | "danger" | "ghost";
  /** xl 48px / l 40px / m 36px（默认）/ s 28px */
  size?: "xl" | "l" | "m" | "s";
  /** default=6px 圆角（产品界面）；pill=全圆（营销面 CTA） */
  shape?: "default" | "pill";
  /** 前置 Material Symbols 字形名 */
  icon?: string;
  /** 后置 Material Symbols 字形名 */
  iconEnd?: string;
  /** 载入态：显示太极旋纹 Spinner 并禁用交互 */
  loading?: boolean;
  disabled?: boolean;
  /** 占满父容器宽度 */
  block?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
