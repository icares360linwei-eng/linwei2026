文本录入的默认控件；请始终包一层 `<Field>` 提供标签。

```jsx
<Field label="报关单号" htmlFor="no"><Input id="no" icon="search" placeholder="STI-2026-0718" value={v} onChange={setV} /></Field>
<Input value={v} onChange={setV} suffix="吨" size="s" />
```

- placeholder 写示例值，不写「请输入」以外的指令；标签才是说明。
- 校验态由 `status` 驱动，错误文字放在 `<Field error>`。
