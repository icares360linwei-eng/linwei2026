看板首屏的核心指标；一行 3–4 张，数值已格式化后传入。

```jsx
<StatCard label="今日发电量" value="128.4" unit="万 kWh" delta={4.2} deltaLabel="较昨日"
  icon="bolt" trend={[42,48,45,52,58,61,64]} />
<StatCard label="碳配额剩余" value="12,800" unit="吨" delta={-3.1} deltaLabel="较上月" icon="eco" />
```

- 数值一律用西文字族 + `tabular-nums`，避免跳动。
- 单位不进数值，放 `unit`，字号降到 body-s。
