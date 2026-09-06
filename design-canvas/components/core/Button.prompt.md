页面上的操作入口；一屏内 primary 只出现一次，其余降级为 secondary / text。

```jsx
<Button variant="primary" size="l" icon="save">保存并提交</Button>
<Button variant="secondary">取消</Button>
<Button variant="gold" shape="pill" size="xl" iconEnd="arrow_forward">预约参观园区</Button>
<Button variant="danger" icon="delete">删除订单 #1024</Button>
```

- `shape="pill"` 只用于品牌营销面的主 CTA；产品界面统一 6px 圆角。
- `variant="gold"` 是「品牌溢价时刻」——每屏最多一个。
- 文案写行为，不写「确定」：见 readme.md ▸ CONTENT FUNDAMENTALS。
- Hover 加深底色 + 阴影升一级，Active `scale(.98)`，Disabled `opacity .4`。
