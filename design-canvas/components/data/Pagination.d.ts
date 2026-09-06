/** 分页：36×36 方块按钮，当前页品牌色实底，首尾省略号，默认显示「共 N 条」。 */
export interface PaginationProps {
  page?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number) => void;
  /** 紧凑模式：隐藏总数 */
  compact?: boolean;
  style?: React.CSSProperties;
}
export function Pagination(props: PaginationProps): JSX.Element;
