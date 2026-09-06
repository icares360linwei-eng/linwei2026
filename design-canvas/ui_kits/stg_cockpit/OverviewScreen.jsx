const { Card, StatCard, Tag, Badge, Button, IconButton, Icon, Tabs, PhiAnchor } = window.SINOTAODesignSystem_b6947e;
const NS_ = window.SINOTAODesignSystem_b6947e || {};
const StatBand = NS_.StatBand || (() => null);

function OverviewScreen({ ent, setEnt }) {
  const [q, setQ] = React.useState("q3");
  return (
    <>
      <header style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 28 }}>
        <div>
          <div className="u-eyebrow">Group cockpit · 2026 Q3</div>
          <h1 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,40px)", fontWeight: 200, letterSpacing: "-.03em", lineHeight: 1.12, color: "var(--text-heading)" }}>集团经营驾驶舱</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, fontSize: 13, color: "var(--text-muted)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <Badge tone="success" label="五实体数据已对齐" /><span>合并口径 · 未经审计</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Tabs size="s" activeKey={q} onSelect={setQ} items={[{ key: "q1", label: "Q1" }, { key: "q2", label: "Q2" }, { key: "q3", label: "Q3" }, { key: "ytd", label: "YTD" }]} />
          <Button variant="secondary" icon="download">导出董事会材料</Button>
        </div>
      </header>

      <StatBand items={[
        { label: "合并营业收入", value: "18.64", unit: "亿元", delta: 9.4, deltaLabel: "同比", icon: "payments" },
        { label: "经营性现金流", value: "3.28", unit: "亿元", delta: 4.1, deltaLabel: "同比", icon: "account_balance_wallet" },
        { label: "资产负债率", value: "52.6", unit: "%", delta: -1.8, deltaLabel: "较年初", icon: "balance" },
        { label: "集团减排量", value: "41.2", unit: "万吨 CO₂e", delta: 6.8, deltaLabel: "同比", icon: "eco" },
      ]} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24, marginTop: 24 }}>
        <Card eyebrow="By entity" title="五实体营收贡献" padding={0} actions={<Tag tone="neutral" size="s">点击行切换主题</Tag>} style={{ paddingTop: "var(--card-pad-lg)" }}>
          <div style={{ display: "flex", flexDirection: "column", borderTop: "var(--hairline)" }}>
            <EntityRow first ek="ste" revenue="9.82 亿" pct={100} delta={11.2} active={ent === "ste"} onClick={() => setEnt("ste")} />
            <EntityRow ek="sti" revenue="5.14 亿" pct={52} delta={7.6} active={ent === "sti"} onClick={() => setEnt("sti")} />
            <EntityRow ek="sth" revenue="2.06 亿" pct={21} delta={18.4} active={ent === "sth"} onClick={() => setEnt("sth")} />
            <EntityRow ek="edu" revenue="1.24 亿" pct={13} delta={-2.4} active={ent === "edu"} onClick={() => setEnt("edu")} />
            <EntityRow ek="stg" revenue="0.38 亿" pct={4} delta={1.1} active={ent === "stg"} onClick={() => setEnt("stg")} />
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Card eyebrow="Compliance" title="合规健康度">
            <Donut value={96} label="制度执行率" sub="12 项集团制度中 11.5 项完成本季自查，教育板块延期 1 项。" />
          </Card>
          <Card eyebrow="Design system" title="设计系统采用率">
            <Donut value={88} label="Token 引用率" sub="五实体产品界面中 88% 的颜色与间距来自令牌，硬编码集中在旧版教务系统。" color="var(--gold-500)" />
          </Card>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginTop: 24 }}>
        <Card eyebrow="Timeline" title="本季重要节点">
          <Timeline items={[
            { time: "09-02", title: "CFB 三号炉进入计划检修", desc: "预计 09-09 复役，期间由一、二号炉承担基本负荷。", color: "var(--ste-600)" },
            { time: "08-24", title: "PHA 医用粒料完成中试", desc: "进入注册资料准备阶段。", color: "var(--sth-600)" },
            { time: "08-18", title: "申购碳配额 20,000 吨", desc: "均价 68.40 元/吨，凭证 CN-2026-08-0018。", color: "var(--stg-600)" },
            { time: "07-30", title: "九江港多式联运方案落地", desc: "平均通关时长降至 1.8 天。", color: "var(--sti-600)" },
          ]} />
        </Card>
        <Card eyebrow="Risk" title="风险预警" actions={<Tag tone="warning">2 项需决策</Tag>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { tone: "var(--state-warning)", icon: "eco", t: "碳配额剩余低于 15%", d: "STE · 建议本月内追加申购或加速 CCER 签发。" },
              { tone: "var(--state-error)", icon: "trending_down", t: "教育板块招生同比 -2.4%", d: "EDU · 需在 Q4 预算会前给出招生策略。" },
              { tone: "var(--text-subtle)", icon: "currency_exchange", t: "汇率波动敞口 3,200 万", d: "STI · 已对冲 62%，余下敞口在授权范围内。" },
            ].map((r) => (
              <div key={r.t} style={{ display: "flex", gap: 10 }}>
                <Icon name={r.icon} size={20} color={r.tone} />
                <div>
                  <div style={{ fontSize: 14, color: "var(--text-heading)" }}>{r.t}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3, lineHeight: 1.7 }}>{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <PhiAnchor dimensions={["守正", "开物"]} source="§35 品牌健康度 · 以数据守正">
          不能用数据测量的品牌，是在黑暗中航行。品牌健康度仪表盘不是给领导看的 PPT，是品牌的体检报告。
        </PhiAnchor>
      </div>
    </>
  );
}
Object.assign(window, { OverviewScreen });
