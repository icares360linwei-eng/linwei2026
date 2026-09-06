/** 表单字段外壳：标签 + 必填星号 + 帮助 / 错误 / 成功文字。包裹任意输入组件。 */
export interface FieldProps {
  label?: React.ReactNode;
  /** 对应输入元素的 id */
  htmlFor?: string;
  required?: boolean;
  /** 常态帮助文字 */
  hint?: React.ReactNode;
  /** 错误文字（优先级最高，带 role="alert"） */
  error?: React.ReactNode;
  /** 成功文字 */
  success?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Field(props: FieldProps): JSX.Element;
