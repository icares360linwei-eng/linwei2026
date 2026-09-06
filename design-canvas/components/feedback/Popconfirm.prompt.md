单条记录的可恢复操作（归档、取消关注）；批量删除请升级为 Modal。

```jsx
<Popconfirm open={open} title="归档这条记录？" description="归档后可在「已归档」中找回。"
  onConfirm={ok} onCancel={cancel}>
  <Button size="s" variant="text" icon="archive" onClick={() => setOpen(true)}>归档</Button>
</Popconfirm>
```

- 确认按钮文案写动作（「归档」），不写「确定」。
