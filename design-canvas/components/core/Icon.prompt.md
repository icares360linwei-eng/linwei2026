图标唯一入口：把 Material Symbols Rounded 的字形名渲染成 20px 描边图标，尺寸只取 18 / 20 / 24 / 48。

```jsx
<Icon name="bolt" size={20} />
<Icon name="check_circle" size={24} fill={1} color="var(--state-success)" />
```

- `weight` 300–500；正文行内图标用 400（≈2px 笔画），48px 大图标可降到 300。
- 装饰性图标已带 `aria-hidden`；表意图标请在父级元素上写 `aria-label`。
- 品牌自定义图标（太极流纹 / 五实体专属 30 枚）尚未提供 SVG sprite，暂由 Material Symbols 近似替代，见 readme.md ▸ ICONOGRAPHY。
