const { Button, Icon, Tag, Card, Tabs } = window.SINOTAODesignSystem_b6947e;
const NS_ = window.SINOTAODesignSystem_b6947e || {};
const Reveal = NS_.Reveal || (({ children, as = "div", style, ...r }) => React.createElement(as, { style, ...r }, children));

const DATA = {
  stg: {
    theme: "stg", code: "STG", name: "源裕兴创新未来", en: "Sinotao Innovation Future",
    claim: "把五家公司的判断力，收在同一套标准里",
    lede: "战略中枢承担资本配置、合规治理与品牌宪法，让五个实体各自专业而不各自为战。",
    facts: [["下属实体", "5 家"], ["合并营收", "18.64 亿"], ["设计令牌", "375 个"], ["制度执行率", "96%"]],
    lines: ["资本配置与投后管理", "合规治理与审计", "品牌宪法与设计系统", "五实体协同与共享服务"],
  },
  ste: {
    theme: "ste", code: "STE", name: "九派国有能源", en: "Jiupai State Energy",
    claim: "生物质热电联产，让农业余料成为工业动力",
    lede: "赤湖工业园两台 30MW 生物质机组，年供汽 126 万吨，替代园区 14 台分散燃煤小锅炉。",
    facts: [["装机容量", "2 × 30 MW"], ["年供汽", "126 万吨"], ["燃料半径", "≤ 80 km"], ["年减排", "41.2 万吨"]],
    lines: ["生物质发电与供汽", "燃料收储与化验", "碳资产与 CCER 开发", "灰渣资源化利用"],
  },
  sti: {
    theme: "sti", code: "STI", name: "源裕兴进出口贸易", en: "Sinotao Trade",
    claim: "把长江水运的效率，接到全球航线上",
    lede: "以九江港为枢纽的多式联运方案，覆盖报关、结汇、税务合规与目的港交付。",
    facts: [["年报关单量", "12,800 票"], ["合作口岸", "26 个"], ["平均通关", "1.8 天"], ["CBAM 覆盖", "已适配"]],
    lines: ["报关与合规", "多式联运", "汇率与结算", "跨境电商供应链"],
  },
  sth: {
    theme: "sth", code: "STH", name: "源裕兴健康科技", en: "Sinotao Health",
    claim: "把材料科学的进展，做成能进病房的产品",
    lede: "PHA 医用粒料与药物递送载体的中试与注册，遵循 GMP 全流程文档管理。",
    facts: [["在研产品", "9 项"], ["中试线", "2 条"], ["GMP 审计", "全部通过"], ["合作医院", "18 家"]],
    lines: ["PHA 医用材料", "药物递送载体", "检测与临床数据", "GMP 合规文档"],
  },
  edu: {
    theme: "edu", code: "EDU", name: "崇仁教育", en: "Chongren Education",
    claim: "让每个孩子的成长有一份看得见的档案",
    lede: "K12 学生成长档案与家校协同平台，覆盖教务、评估与家长端。",
    facts: [["在校学生", "6,200 人"], ["家校活跃", "92%"], ["教师", "418 人"], ["校区", "5 个"]],
    lines: ["学生成长档案", "家校协同", "教务与评估", "素质课程体系"],
  },
};

function EntityScreen() {
  const [key, setKey] = React.useState("ste");
  const d = DATA[key];
  return (
    <div data-theme={d.theme}>
      <div style={{ background: "var(--surface-page)", padding: "64px clamp(24px,5vw,80px) 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Tabs activeKey={key} onSelect={setKey} items={Object.values(DATA).map((e) => ({ key: e.theme, label: e.name }))} />
        </div>
      </div>
      <div style={{ background: "var(--surface-page)", padding: "clamp(56px,7vw,104px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal rise={16} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 2, height: 18, background: "var(--brand-600)", flex: "0 0 auto" }} />
            <span style={{ fontFamily: "var(--font-western)", fontSize: 11, letterSpacing: ".16em", color: "var(--brand-500)" }}>{d.code}</span>
            <span style={{ fontFamily: "var(--font-western)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-subtle)" }}>{d.en}</span>
          </Reveal>
          <Reveal as="h1" rise={32} index={1} style={{
            marginTop: 32, fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.6vw, 68px)", fontWeight: 200,
            letterSpacing: "-.036em", lineHeight: 1.12, color: "var(--text-heading)", maxWidth: "17em",
            textWrap: "balance", wordBreak: "keep-all",
          }}>{d.claim}</Reveal>
        </div>
        <div style={{ maxWidth: 1200, margin: "clamp(40px,5vw,64px) auto 0", display: "grid", gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)", gap: "clamp(32px,5vw,72px)", alignItems: "start" }}>
          <div>
            <Reveal as="p" rise={20} index={2} style={{ margin: 0, maxWidth: "30em", fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 2.1, color: "var(--text-muted)" }}>{d.lede}</Reveal>
            <Reveal rise={16} index={3} style={{ display: "flex", gap: 12, marginTop: 44 }}>
              <Button variant="primary" shape="pill" size="l" iconEnd="arrow_outward">业务咨询</Button>
              <Button variant="secondary" shape="pill" size="l" icon="description">下载资料</Button>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 24, marginTop: 72, paddingTop: 36, borderTop: "var(--hairline)" }}>
              {d.facts.map(([k, v], i) => (
                <Reveal key={k} rise={16} index={i}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", fontWeight: 500, color: "var(--text-subtle)" }}>{k}</div>
                  <div style={{ marginTop: 14, fontFamily: "var(--font-western)", fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 300, letterSpacing: "-.03em", color: "var(--text-heading)" }}>{v}</div>
                </Reveal>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              <img src="../../assets/imagery/biomass-plant-aerial.jpg" alt="园区实景" style={{ width: "100%", height: 300, objectFit: "cover", display: "block", filter: "saturate(.74) contrast(1.02)" }} />
            </div>
            <Card eyebrow="Business lines" title="业务线">
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
                {d.lines.map((l, i) => (
                  <li key={l} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 0", borderTop: i ? "var(--hairline)" : "0", fontFamily: "var(--font-display)", fontSize: 16, color: "var(--text-heading)" }}>
                    <span style={{ width: 2, height: 14, background: "var(--brand-600)", flex: "0 0 auto" }} />{l}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { EntityScreen });
