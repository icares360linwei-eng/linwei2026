/** 复选框：18×18px，选中品牌色填充 + 白对勾，半选用横线。 */
export interface CheckboxProps {
  checked?: boolean;
  /** 半选（表头全选的部分选中态） */
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
