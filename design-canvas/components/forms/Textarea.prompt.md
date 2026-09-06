备注、说明、审批意见等长文本录入。

```jsx
<Field label="审批意见" htmlFor="memo" hint="将同步至 Odoo 审批流水">
  <Textarea id="memo" rows={4} maxLength={500} value={v} onChange={setV} />
</Field>
```

- 只允许纵向拖拽调整高度，禁止横向。
- 有字数上限时必须显示计数，不要静默截断。
