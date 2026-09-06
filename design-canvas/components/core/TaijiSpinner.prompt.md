短时操作（<3 秒）的载入反馈；超过 3 秒改用进度条 + 预计剩余时间。

```jsx
<TaijiSpinner size={20} />
<TaijiSpinner size={32} color="var(--brand-600)" />
```

- Button 的 `loading` 内部已使用它，不必自己拼装。
- 阴阳双弧是 12 变体太极流纹的临时替代；拿到官方 SVG sprite 后应替换。
