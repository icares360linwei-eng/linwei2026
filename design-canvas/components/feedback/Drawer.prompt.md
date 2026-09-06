查看 / 编辑详情而不离开列表上下文（列表—详情模式）。

```jsx
<Drawer open={open} onClose={close} title="报关单 STI-2026-0718"
  footer={<Button variant="primary">保存并提交</Button>}>
  …
</Drawer>
```

- 需要专注决策时用 Modal；需要对照列表时用 Drawer。
