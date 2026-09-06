表格 / 列表底部的翻页；总数是用户判断数据量的关键，默认不要隐藏。

```jsx
<Pagination page={p} pageSize={20} total={128} onChange={setP} />
<Pagination page={p} total={128} onChange={setP} compact />
```

- 超过 7 页自动折叠为首尾 + 当前页窗口。
- 无限滚动的长列表不要再加分页，二者择一。
