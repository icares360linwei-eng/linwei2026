/** 提示气泡：玄墨底 + 宣纸字，hover / focus 触发。只放补充信息，关键信息不可只存在于此。 */
export interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  style?: React.CSSProperties;
}
export function Tooltip(props: TooltipProps): JSX.Element;
