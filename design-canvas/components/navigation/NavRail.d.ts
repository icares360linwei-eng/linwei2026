/**
 * 侧轨导航：76px 收起 / 264px 展开，md 断点以上使用，承载 4–7 个一级节点。
 */
export interface NavRailItem { key: string; label: string; icon: string; badge?: number }
export interface NavRailProps {
  items?: NavRailItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  /** 展开为 264px 抽屉（显示文字标签） */
  expanded?: boolean;
  /** 顶部区域（字标 / 实体切换器） */
  header?: React.ReactNode;
  /** 底部区域（设置 / 头像） */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export function NavRail(props: NavRailProps): JSX.Element;
