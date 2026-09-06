const { Icon, PhiAnchor } = window.SINOTAODesignSystem_b6947e;
const NS = window.SINOTAODesignSystem_b6947e || {};
// 新增导出的本地降级：bundle 滞后时降级为无动效/无版式的等价元素，绝不白屏
const Reveal = NS.Reveal || (({ children, as = "div", style, ...r }) => React.createElement(as, { style, ...r }, children));
const RuleReveal = NS.RuleReveal || (({ style }) => <span style={{ display: "block", height: 1, background: "var(--border-subtle)", ...style }} />);
const Marquee = NS.Marquee || (({ items = [], style }) => (
  <div style={{ display: "flex", gap: 40, justifyContent: "center", padding: "40px 0", borderTop: "var(--hairline)", borderBottom: "var(--hairline)", ...style }}>
    {items.map((i) => <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 200, color: "var(--text-heading)" }}>{i}</span>)}
  </div>
));
const StatBand = NS.StatBand || (({ items = [], style }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", background: "var(--surface-card)", borderRadius: "var(--card-radius)", ...style }}>
    {items.map((it, i) => (
      <div key={it.label} style={{ padding: 32, borderLeft: i ? "var(--hairline)" : 0 }}>
        <div className="u-label">{it.label}</div>
        <div style={{ marginTop: 16, fontFamily: "var(--font-western)", fontSize: 34, fontWeight: 300, letterSpacing: "-.03em", color: "var(--text-heading)" }}>{it.value} <span style={{ fontSize: 13, color: "var(--text-subtle)" }}>{it.unit}</span></div>
      </div>
    ))}
  </div>
));
const SectionHead = NS.SectionHead || (({ eyebrow, title, lede, tone, style }) => (
  <header style={{ marginBottom: 80, ...style }}>
    {eyebrow ? <div className="u-eyebrow" style={{ color: tone === "ink" ? "var(--gold-300)" : "var(--text-subtle)" }}>{eyebrow}</div> : null}
    <h2 style={{ margin: "24px 0 0", fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.4vw,64px)", fontWeight: 200, letterSpacing: "-.032em", lineHeight: 1.12, maxWidth: "15em", textWrap: "balance", wordBreak: "keep-all", color: tone === "ink" ? "var(--ink-50)" : "var(--text-heading)" }}>{title}</h2>
    {lede ? <p style={{ margin: "32px 0 0", maxWidth: "26em", fontSize: 16, lineHeight: 1.9, color: tone === "ink" ? "var(--ink-300)" : "var(--text-muted)" }}>{lede}</p> : null}
  </header>
));


const ENTITIES = [
  { code: "STG", name: "源裕兴创新未来", role: "战略中枢 · 合规治理与资本配置", color: "var(--stg-600)", meta: "集团母体" },
  { code: "STE", name: "九派国有能源", role: "生物质热电联产、燃料收储与碳资产开发", color: "var(--ste-600)", meta: "2 × 30 MW" },
  { code: "STI", name: "源裕兴进出口贸易", role: "以九江港为枢纽的多式联运与报关合规", color: "var(--sti-600)", meta: "26 个口岸" },
  { code: "STH", name: "源裕兴健康科技", role: "PHA 医用材料与药物递送载体的中试与注册", color: "var(--sth-600)", meta: "9 项在研" },
  { code: "EDU", name: "崇仁教育", role: "K12 学生成长档案与家校协同", color: "var(--edu-600)", meta: "6,200 名学生" },
];

function Hero({ onSelect }) {
  return (
    <div style={{ position: "relative", minHeight: "min(92vh, 900px)", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
      <img src="../../assets/imagery/biomass-plant-aerial.jpg" alt="赤湖工业园生物质热电联产园区航拍"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.74) contrast(1.02)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,11,8,.92) 4%, rgba(13,11,8,.70) 32%, rgba(13,11,8,.40) 66%, rgba(13,11,8,.44) 100%)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 1200, margin: "0 auto", padding: "160px clamp(24px,5vw,80px) 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,8fr) minmax(0,4fr)", gap: "clamp(24px,4vw,64px)", alignItems: "end" }}>
          <div>
            <Reveal rise={16} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
              <span style={{ width: 8, height: 8, background: "var(--gold-400)" }} />
              <span style={{ fontFamily: "var(--font-western)", fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold-300)" }}>Sinotao Innovation Future</span>
            </Reveal>
            <Reveal as="h1" rise={40} index={1} style={{
              margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(44px, 7.4vw, 104px)",
              fontWeight: 200, letterSpacing: "-.042em", lineHeight: 1.06, color: "var(--ink-50)", wordBreak: "keep-all",
            }}>把土地的余料，<br />还给土地以电与热</Reveal>
          </div>
          <Reveal as="p" rise={24} index={2} style={{
            margin: "0 0 12px", fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 2.1,
            color: "rgba(251,249,245,.92)", borderLeft: "1px solid rgba(251,249,245,.34)",
            padding: "20px 24px", background: "rgba(13,11,8,.46)", backdropFilter: "blur(8px)",
          }}>
            赤湖工业园以生物质热电联产为核心，串起甜高粱种植、燃料收储、发电供汽与碳资产开发的完整链条。一座电厂，同时是一片农田的下游。
          </Reveal>
        </div>
        <div style={{ display: "flex", gap: "clamp(32px,5vw,88px)", marginTop: "clamp(56px,8vw,112px)", paddingTop: 36, paddingBottom: 72, borderTop: "1px solid rgba(255,251,245,.18)", flexWrap: "wrap" }}>
          {[["装机容量", "2 × 30", "MW"], ["年供汽能力", "126", "万吨"], ["年减排量", "41.2", "万吨 CO₂e"], ["带动农户", "3,400", "户"]].map(([k, v, u], i) => (
            <Reveal key={k} rise={18} index={i + 3} style={{ minWidth: 120 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", fontWeight: 500, color: "rgba(251,249,245,.62)" }}>{k}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 14 }}>
                <span style={{ fontFamily: "var(--font-western)", fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 300, letterSpacing: "-.03em", lineHeight: 1, color: "var(--ink-50)" }}>{v}</span>
                <span style={{ fontSize: 13, color: "rgba(255,251,245,.52)" }}>{u}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ onSelect }) {
  return (
    <>
      <Hero onSelect={onSelect} />

      <Section index="01 / 04" eyebrow="Five entities" title="五家公司，一个共生体"
        lede="共用一套设计语法与治理标准，各自生长出独立的色彩身份。客户从能源切换到贸易时，感受到的不是「换了一家公司」，而是「同一个品牌，不同的专家」。">
        <div style={{ borderBottom: "var(--hairline)" }}>
          {ENTITIES.map((e, i) => (
            <Reveal key={e.code} rise={20} index={i}>
              <RuleRow tick={e.color} code={e.code} title={e.name} desc={e.role} meta={e.meta} onClick={() => onSelect("entities")} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Marquee tone="paper" items={["守正", "开物", "共生", "生生不息", "海纳百川", "薪火相传"]} />

      <Section tone="sunken" index="02 / 04" eyebrow="The loop" title="一条闭环，四段价值"
        lede="从田间到电网，每一段都留下可核验的凭证：种植合同、收储磅单、燃烧参数、减排签发。">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 0 }}>
          {[
            { n: "01", t: "甜高粱与农林废弃物", d: "与 3,400 户农户签订种植与收储合同，秸秆不再露天焚烧。" },
            { n: "02", t: "燃料收储与化验", d: "含水率、热值逐车化验，不合格即退运，质量档案随供应商长期累积。" },
            { n: "03", t: "热电联产与供汽", d: "CFB 锅炉替代园区分散小锅炉，同时输出电力与工业蒸汽。" },
            { n: "04", t: "碳资产与灰渣资源化", d: "减排量进入 CCER 开发，灰渣回田或制建材，闭环收口。" },
          ].map((s, i) => (
            <Reveal key={s.n} rise={28} index={i} style={{ padding: "40px 36px 40px 0", borderTop: "1px solid var(--border-default)" }}>
              <div style={{ fontFamily: "var(--font-western)", fontSize: 12, letterSpacing: ".2em", color: "var(--zhu-600)" }}>{s.n}</div>
              <div style={{ marginTop: 24, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 300, color: "var(--text-heading)", lineHeight: 1.5 }}>{s.t}</div>
              <p style={{ marginTop: 18, marginBottom: 0, fontSize: 14, lineHeight: 2, color: "var(--text-muted)", maxWidth: "20em" }}>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section index="03 / 04" eyebrow="Governance" title="能被审计的承诺，才算承诺"
        lede="反漂绿是硬约束：不夸大环保成果，不用绿色滤镜粉饰灰色操作。以下数据均可追溯到凭证号。">
        <Reveal rise={24}><StatBand items={[
          { label: "年度减排量", value: "41.2", unit: "万吨 CO₂e", delta: 6.8, deltaLabel: "较 2025" },
          { label: "排放达标率", value: "100", unit: "%" },
          { label: "供应商质量档案", value: "286", unit: "家", delta: 12.4, deltaLabel: "较去年" },
          { label: "Token 引用率", value: "88", unit: "%", delta: 9.2, deltaLabel: "较上季" },
        ]} /></Reveal>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 64, alignItems: "start" }}>
          <PhiAnchor dimensions={["守正", "共生"]} source="§33 ESG · 反漂绿守则">
            品牌不夸大环保承诺，不用绿色滤镜粉饰灰色操作。ESG 传达要让利益相关者看到真实的、可验证的行动。
          </PhiAnchor>
          <div style={{ maxWidth: "30em" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 2.1, color: "var(--text-body)" }}>
              我们把治理写成可执行的规则，而不是承诺书：颜色不允许硬编码、减排量必须追溯到凭证号、供应商不合格即退运。规则能被查账，承诺才有意义。
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
Object.assign(window, { HomeScreen });
