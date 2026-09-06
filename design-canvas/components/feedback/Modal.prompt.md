打断式确认与表单；不可逆的批量操作必须走它。

```jsx
<Modal open={open} onClose={close} title="删除 3 张报关单？"
  footer={<><Button variant="secondary" onClick={close}>取消</Button><Button variant="danger">删除</Button></>}>
  删除后无法恢复，关联的物流记录会保留。
</Modal>
```

- 关闭后焦点必须回到触发元素（§20 无键盘陷阱）。
- 低风险操作用 Popconfirm / Toast，不要动用 Modal。
