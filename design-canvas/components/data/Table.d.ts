/**
 * 数据表格：表头轻霜底 + 品牌色 2px 下划线，选中行品牌 6% 底 + 左侧 3px 指示条。
 */
export interface TableColumn {
  key: string;
  title: React.ReactNode;
  width?: number | string;
  /** right 会自动切换为西文等宽数字 */
  align?: "left" | "center" | "right";
  /** (cellValue, row) => ReactNode */
  render?: (value: any, row: any) => React.ReactNode;
  /** 允许该列文本换行（默认单行 + 省略号） */
  wrap?: boolean;
  sortable?: boolean;
}
export interface TableProps {
  columns?: TableColumn[];
  rows?: any[];
  /** 行主键字段名或取值函数，默认 "id" */
  rowKey?: string | ((row: any) => string | number);
  selectable?: boolean;
  selected?: Array<string | number>;
  onSelectedChange?: (keys: Array<string | number>) => void;
  sort?: { key: string; dir: "asc" | "desc" };
  onSortChange?: (sort: { key: string; dir: "asc" | "desc" }) => void;
  onRowClick?: (row: any) => void;
  /** 无数据时渲染的节点，请传 <EmptyState /> */
  empty?: React.ReactNode;
  /** 紧凑行高 40px（默认 48px） */
  dense?: boolean;
  style?: React.CSSProperties;
}
export function Table(props: TableProps): JSX.Element;
