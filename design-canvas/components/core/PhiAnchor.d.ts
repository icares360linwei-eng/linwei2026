/**
 * 哲学锚点：把一处设计决策的「守正 / 开物 / 共生」依据显式写在页面上。
 * 全典每章、每个组件文档都应有一个。
 */
export interface PhiAnchorProps {
  /** 哲学维度，首个为主维度（决定左侧色条） */
  dimensions?: Array<"守正" | "开物" | "共生">;
  /** 锚点正文（衬线字族，1.8 行高） */
  children?: React.ReactNode;
  /** 出处，如「§04 色彩系统 · 守正 + 共生」 */
  source?: string;
  style?: React.CSSProperties;
}
export function PhiAnchor(props: PhiAnchorProps): JSX.Element;
