/**
 * 五实体切换器：把选中的实体 key 写到 <html data-theme>，全站主色族随之重映射。
 */
export interface EntitySwitcherProps {
  /** stg | ste | sti | sth | edu */
  value?: "stg" | "ste" | "sti" | "sth" | "edu";
  /** 回调里请同步执行 document.documentElement.dataset.theme = key */
  onChange?: (key: string) => void;
  /** 色点模式：5 个 22px 圆点，用于顶栏 / 页脚 */
  compact?: boolean;
  style?: React.CSSProperties;
}
export function EntitySwitcher(props: EntitySwitcherProps): JSX.Element;
