/** 单行输入框：40px 高、6px 圆角、聚焦品牌色描边 + 3px 品牌色光环。 */
export interface InputProps {
  value?: string;
  /** (nextValue, event) => void */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "tel" | "number" | "search" | "url";
  /** 校验态：error 朱砂红描边 + 图标；success 苍木绿 */
  status?: "default" | "error" | "success";
  /** 前置 Material Symbols 字形名 */
  icon?: string;
  /** 后置文字（单位 / 计数），default 态才显示 */
  suffix?: React.ReactNode;
  /** l 48px / m 40px（默认）/ s 32px */
  size?: "l" | "m" | "s";
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
