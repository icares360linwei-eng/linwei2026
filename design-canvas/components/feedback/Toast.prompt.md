无风险操作的结果回执（导出、已读、保存成功）。

```jsx
<Toast tone="success" title="已提交报关单" description="预计 2 小时内完成审核。" onClose={close} />
<Toast tone="error" title="网络连接中断" description="请检查网络后重试。" duration={0} onClose={close} />
```

- 错误类 Toast 建议 `duration={0}`，让用户自行关闭。
- 需要用户做决定的信息不能用 Toast，请用 Modal / Popconfirm。
