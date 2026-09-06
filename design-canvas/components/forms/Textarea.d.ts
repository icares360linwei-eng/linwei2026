/** 多行输入：与 Input 同一描边 / 聚焦逻辑，可选字数计数。 */
export interface TextareaProps {
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  /** 可见行数，默认 4 */
  rows?: number;
  /** 传入即显示右下角字数计数 */
  maxLength?: number;
  status?: "default" | "error" | "success";
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
export function Textarea(props: TextareaProps): JSX.Element;
