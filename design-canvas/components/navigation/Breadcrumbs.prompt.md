深层级页面告诉用户「我在哪」。

```jsx
<Breadcrumbs items={[
  { key: "home", label: "经营看板" }, { key: "boiler", label: "锅炉工况" }, { label: "一号炉" },
]} onSelect={go} />
```

- 层级 ≥3 时必须出现；移动端隐藏，改用返回按钮。
