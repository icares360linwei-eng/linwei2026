/** 标签页：同级内容切换，2–6 项。选中项 2px 品牌色下划线 + 墨色文字。 */
export interface TabItem { key: string; label: string; icon?: string; count?: number }
export interface TabsProps {
  items?: TabItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  size?: "m" | "s";
  style?: React.CSSProperties;
}
export function Tabs(props: TabsProps): JSX.Element;
