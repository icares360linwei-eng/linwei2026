所有输入组件的标签与消息层；错误文案写「怎么改」，不写「错了」。

```jsx
<Field label="手机号码" htmlFor="tel" required error="手机号应为 11 位数字">
  <Input id="tel" value={v} onChange={setV} status="error" />
</Field>
```

- 推荐失焦验证（6–12 字段表单）；实时验证只用于密码强度、用户名可用性。
- 错误必须文字 + 图标 + 颜色三重标识，颜色不可单独承载信息。
