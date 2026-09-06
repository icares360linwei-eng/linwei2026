选项需要一眼全见时使用；每项可带一行 `hint` 解释后果。

```jsx
<Radio name="verify" value={v} onChange={setV} options={[
  { value: "blur", label: "失焦验证", hint: "推荐：6–12 字段的中等表单" },
  { value: "submit", label: "提交时验证", hint: "≤5 字段的简短表单" },
]} />
```

- 横排（`direction="row"`）仅用于 2–3 个极短选项。
