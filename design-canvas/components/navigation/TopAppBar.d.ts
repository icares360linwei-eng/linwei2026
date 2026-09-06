/**
 * 顶部应用栏：64px 高、半透明宣纸底 + 背板模糊、1px 下描边。3–5 个一级节点。
 */
export interface TopAppBarItem { key: string; label: string; icon?: string }
export interface TopAppBarProps {
  /** SINOTAO 字标 SVG 路径；缺省时以 Poppins 字体渲染 SINOTAO 文字 */
  logoSrc?: string;
  /** 字标右侧的实体名，如「九派国有能源」 */
  brand?: string;
  items?: TopAppBarItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  /** 右侧操作区（搜索、通知、头像） */
  actions?: React.ReactNode;
  sticky?: boolean;
  /** paper 宣纸底（默认）/ inverse 玄墨底 */
  tone?: "paper" | "inverse";
  style?: React.CSSProperties;
}
export function TopAppBar(props: TopAppBarProps): JSX.Element;
