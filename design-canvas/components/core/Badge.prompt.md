设备与流程状态的最小单元，或导航上的未读计数。

```jsx
<Badge tone="success" label="运行中" pulse />
<Badge tone="warning" label="待检修" />
<Badge count={12} />
```

- 状态点必须带 `label`，除非同行已有文字说明。
- 计数徽标默认朱砂红；品牌色计数请显式 `tone="brand"`。
