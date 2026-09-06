任何「什么都没有」的位置都要有它；文案必须给出下一步动作。

```jsx
<EmptyState icon="search_off" title="未找到匹配结果" hint="试试调整关键词或放宽筛选条件？" />
<EmptyState title="暂无报关单" hint="创建第一条记录，从这里开始。"
  action={<Button icon="add">新建报关单</Button>} />
```

- 「太极流纹」品牌空状态插画尚未提供，暂用 Material Symbols 圆底图标占位。
