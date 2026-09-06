/** 载入指示器：阴阳双弧旋转，2.4s / 圈，线性缓动。短操作（<3s）用它，>3s 请改用进度条。 */
export interface TaijiSpinnerProps {
  size?: number;
  /** 默认继承父级 currentColor */
  color?: string;
  style?: React.CSSProperties;
}
export function TaijiSpinner(props: TaijiSpinnerProps): JSX.Element;
