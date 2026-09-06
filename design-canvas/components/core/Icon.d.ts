/** Material Symbols Rounded 包装器；全系统图标只经此组件渲染。 */
export interface IconProps {
  /** Material Symbols 字形名，如 "bolt" / "search" / "chevron_right" */
  name: string;
  /** 像素尺寸，图标尺寸体系 18 / 20 / 24 / 48 */
  size?: 18 | 20 | 24 | 48 | number;
  /** 光学字重 300–500，默认 400（对应 2px 笔画） */
  weight?: number;
  /** 0 描边（默认）/ 1 填充 */
  fill?: 0 | 1;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}
export function Icon(props: IconProps): JSX.Element;
