/** 标签 / Chip：分类、状态、多选回填。4px 圆角，语义色浅底 + 同色深字。 */
export interface TagProps {
  children?: React.ReactNode;
  tone?: "neutral" | "brand" | "success" | "warning" | "error" | "info" | "gold";
  size?: "m" | "s";
  /** 前置 Material Symbols 字形名 */
  icon?: string;
  /** 传入即渲染移除按钮（多选回填场景） */
  onRemove?: () => void;
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): JSX.Element;
