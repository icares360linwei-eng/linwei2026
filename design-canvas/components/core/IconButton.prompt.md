图标即全部含义时使用；`label` 必填，缺失即无障碍缺陷。

```jsx
<IconButton icon="filter_list" label="筛选" />
<IconButton icon="close" label="关闭" size="s" />
<IconButton icon="grid_view" label="卡片视图" active />
```

- 表格行内操作用 `size="s"` + `variant="ghost"`。
- 移动端触摸目标不足 44px 时，请在外层加 padding，不要放大图标。
