/** 单选组：2–5 个互斥选项；6 项以上改用 Select。 */
export interface RadioOption { value: string; label: string; hint?: string; disabled?: boolean }
export interface RadioProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: RadioOption[];
  /** 同组 name，同页多组时必填 */
  name?: string;
  direction?: "vertical" | "row";
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Radio(props: RadioProps): JSX.Element;
