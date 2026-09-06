品牌展示面的入场动效。**产品界面不要用**——看板每次滚动都淡入会拖慢操作。

```jsx
<Reveal rise={40}><h2>五家公司，一个共生体</h2></Reveal>
{rows.map((r, i) => <Reveal key={r.code} index={i}><RuleRow {...r} /></Reveal>)}
<RuleReveal />
```

- 一屏内错峰不超过 6 级（约 420ms），再多用户会觉得慢。
- 只有位移与透明度。缩放入场、弹跳、视差都不在本系统的动效词汇里。
