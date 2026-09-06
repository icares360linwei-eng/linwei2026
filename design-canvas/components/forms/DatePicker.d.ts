/** 日期选择器：值与显示统一 ISO 8601（2026-07-20），周一为一周首日。 */
export interface DatePickerProps {
  /** ISO 日期字符串 YYYY-MM-DD */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  status?: "default" | "error";
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
export function DatePicker(props: DatePickerProps): JSX.Element;
