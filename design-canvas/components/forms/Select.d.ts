/** 单选选择器：触发区同 Input，下拉面板 10px 圆角、最大 256px 高、选中项品牌色 + 对勾。 */
export interface SelectOption { value: string; label: string }
export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  status?: "default" | "error";
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
