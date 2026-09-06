const { Button, Icon, Card, PhiAnchor, Tag } = window.SINOTAODesignSystem_b6947e;
const NS_ = window.SINOTAODesignSystem_b6947e || {};
const Reveal = NS_.Reveal || (({ children, as = "div", style, ...r }) => React.createElement(as, { style, ...r }, children));
const RuleReveal = NS_.RuleReveal || (({ style }) => <span style={{ display: "block", height: 1, background: "var(--border-subtle)", ...style }} />);

function GovernanceScreen() {
  return (
    <>
      <Section index="01 / 02" eyebrow="Governance & ESG" title="守正，是可以被查账的"
        lede="品牌宪法、设计治理、版本管控——不漂移的前提是可追溯。以下是我们对外公开的治理承诺与其核查方式。">
        <div style={{ borderBottom: "var(--hairline)" }}>
          {[
            { n: "01", t: "品牌宪法 V37", d: "375 个设计令牌构成单一可信源，颜色与间距不允许硬编码。", tag: "守正" },
            { n: "02", t: "WCAG 2.2 AA", d: "正文对比度 ≥ 4.5:1，全键盘可操作，三平台屏幕阅读器每次发布回归。", tag: "共生" },
            { n: "03", t: "反漂绿守则", d: "减排量必须可追溯到凭证号，宣传口径与监测平台数据一致。", tag: "守正" },
            { n: "04", t: "DEI 出厂设置", d: "插画与摄影覆盖多元年龄、性别、职业；最小字号不低于 14px。", tag: "共生" },
            { n: "05", t: "供应商准则", d: "286 家供应商的质量档案长期累积，不合格即退运。", tag: "守正" },
            { n: "06", t: "健康度量", d: "视觉一致性 ≥95%、Token 引用率 100%，季度体检并公开。", tag: "开物" },
          ].map((c, i) => (
            <Reveal key={c.t} rise={20} index={i} style={{
              display: "grid", gridTemplateColumns: "48px minmax(0,1fr) minmax(0,1.3fr) 64px",
              alignItems: "baseline", gap: "clamp(16px,3vw,40px)", padding: "30px 0", borderTop: "var(--hairline)",
            }}>
              <span style={{ fontFamily: "var(--font-western)", fontSize: 12, letterSpacing: ".18em", color: "var(--zhu-600)" }}>{c.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,2vw,24px)", fontWeight: 300, letterSpacing: "-.016em", color: "var(--text-heading)" }}>{c.t}</span>
              <span style={{ fontSize: 14, lineHeight: 1.9, color: "var(--text-muted)" }}>{c.d}</span>
              <span style={{ textAlign: "right" }}><Tag tone="neutral" size="s">{c.tag}</Tag></span>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="sunken" pad="clamp(64px,8vw,120px)">
        <PhiAnchor dimensions={["共生"]} source="§20 无障碍 · 出厂设置">
          无障碍不是附加项，是出厂设置。WCAG 2.2 AA 的每一条准则都在回答同一个问题：所有人都能平等地使用源裕兴的产品吗？
        </PhiAnchor>
      </Section>
    </>
  );
}

function CareersScreen() {
  const roles = [
    { t: "热控工程师（DCS / CFB）", loc: "赤湖工业园", type: "全职" },
    { t: "碳资产开发经理", loc: "九江 · 上海", type: "全职" },
    { t: "报关与合规专员", loc: "九江港", type: "全职" },
    { t: "前端工程师（设计系统）", loc: "远程可议", type: "全职" },
    { t: "PHA 材料研究员", loc: "健康科技中试基地", type: "全职" },
  ];
  return (
    <Section index="02 / 02" eyebrow="Careers" title="我们招的是能把事情做完的人"
      lede="五大实体共用一套人才标准：把复杂问题拆开、把承诺闭环、把同事当长期同行者。">
      <RuleReveal />
      <div style={{ borderBottom: "var(--hairline)" }}>
        {roles.map((r, i) => (
          <Reveal key={r.t} rise={18} index={i}>
            <button style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
              padding: "34px 0", border: 0, borderTop: i ? "var(--hairline)" : 0,
              background: "transparent", cursor: "pointer", textAlign: "left", flexWrap: "wrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.querySelector("[data-arrow]").style.transform = "translateX(6px)"; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector("[data-arrow]").style.transform = "none"; }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(19px,2.2vw,26px)", fontWeight: 300, letterSpacing: "-.016em", color: "var(--text-heading)" }}>{r.t}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: "var(--font-western)", fontSize: 13, color: "var(--text-muted)" }}>
                <span>{r.loc}</span><span>{r.type}</span>
                <Icon name="arrow_outward" size={20} color="var(--brand-500)" data-arrow=""
                  style={{ transition: "transform var(--dur-transition) var(--ease-emphasized)" }} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Site() {
  const [page, setPage] = React.useState("home");
  React.useEffect(() => { window.scrollTo(0, 0); }, [page]);
  const Screen = { home: HomeScreen, entities: EntityScreen, governance: GovernanceScreen, careers: CareersScreen }[page];
  return (
    <>
      <SiteHeader active={page} onSelect={setPage} inverse={page === "home"} />
      <main style={{ marginTop: page === "home" ? -72 : 0 }}>
        <Screen onSelect={setPage} />
      </main>
      <SiteFooter onSelect={setPage} />
    </>
  );
}
const __rootEl = document.getElementById("root");
if (__rootEl) ReactDOM.createRoot(__rootEl).render(<Site />);
