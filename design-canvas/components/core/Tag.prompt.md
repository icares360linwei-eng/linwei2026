表达状态或分类的静态标记；可点击的筛选器请用 Button size="s"。

```jsx
<Tag tone="success" icon="check_circle">已通过审核</Tag>
<Tag tone="warning">待复核</Tag>
<Tag tone="neutral" size="s" onRemove={() => {}}>CFB 一号炉</Tag>
```

- 颜色不是唯一信息载体：状态标签必须同时有文字（§20 无障碍）。
- `tone="gold"` 留给奖项 / 资质 / 溢价标识。
