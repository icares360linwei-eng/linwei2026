单个日期录入；日期格式全系统统一 ISO 8601。

```jsx
<Field label="报关日期" htmlFor="d"><DatePicker id="d" value={d} onChange={setD} /></Field>
```

- 周一为首日（中文习惯）；不要改成周日起。
- 区间选择尚未实现，请用两个 DatePicker + 校验。
