/** 面包屑：md 断点以上使用，最后一项是当前位置且不可点击。 */
export interface BreadcrumbItem { key?: string; label: string }
export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  onSelect?: (key?: string) => void;
  style?: React.CSSProperties;
}
export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
