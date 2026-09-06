const { Card, StatCard, Tag, Badge, Button, IconButton, Icon, PhiAnchor } = window.SINOTAODesignSystem_b6947e;
const StatBand = window.KitStatBand;

function DashboardScreen({ onOpenBoiler }) {
  const [range, setRange] = React.useState("d");
  return (
    <>
      <PageHeader
        title="经营看板"
        meta={<><Badge tone="success" label="全部机组运行中" pulse /><span>2026-09-06 14:30</span><span>合并口径</span></>}
        actions={<>
          <Button variant="secondary" size="l" icon="download">导出日报</Button>
          <Button variant="primary" size="l" icon="add">新建调度单</Button>
        </>}
      />

      <StatBand items={[
        { label: "今日发电量", value: "128.4", unit: "万 kWh", delta: 4.2, deltaLabel: "较昨日", icon: "bolt" },
        { label: "供汽量", value: "3,860", unit: "吨", delta: 1.8, deltaLabel: "较昨日", icon: "water_drop" },
        { label: "燃料库存", value: "18,240", unit: "吨", delta: -6.4, deltaLabel: "较上周", icon: "grass" },
        { label: "碳配额剩余", value: "12,800", unit: "吨", delta: -3.1, deltaLabel: "较上月", icon: "eco" },
      ]} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24, marginTop: 24 }}>
        <Card style={{ gridColumn: "span 2", minWidth: 0 }}
          eyebrow="Generation · 24h" title="发电负荷与供汽负荷"
          actions={<ChipGroup active={range} onSelect={setRange} items={[{ key: "d", label: "24 时" }, { key: "w", label: "7 日" }, { key: "m", label: "30 日" }]} />}>
          <div style={{ marginBottom: 24 }}>
            <Legend items={[{ label: "发电负荷 MW", color: "var(--brand-600)" }, { label: "供汽负荷 t/h", color: "var(--gold-500)" }]} />
          </div>
          <AreaChart height={280}
            series={[[42, 46, 44, 52, 61, 68, 72, 70, 66, 64, 69, 74, 71], [28, 30, 29, 34, 38, 41, 44, 43, 40, 38, 42, 45, 44]]}
            labels={["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"]} />
        </Card>

        <Card eyebrow="Boilers" title="机组状态" padding={0}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { name: "CFB 一号炉", load: "92.4", tone: "success", state: "运行中" },
              { name: "CFB 二号炉", load: "88.1", tone: "success", state: "运行中" },
              { name: "CFB 三号炉", load: "0.0", tone: "warning", state: "计划检修" },
              { name: "余热回收机组", load: "76.5", tone: "success", state: "运行中" },
            ].map((b, i) => (
              <button key={b.name} onClick={onOpenBoiler} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                padding: "20px 32px", border: 0, borderTop: i ? "var(--hairline)" : "0",
                background: "transparent", cursor: "pointer", textAlign: "left",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-sunken)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <span style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--text-heading)" }}>{b.name}</span>
                  <Badge tone={b.tone} label={b.state} pulse={b.tone === "success"} />
                </span>
                <span style={{ display: "flex", alignItems: "baseline", gap: 3, flex: "0 0 auto" }}>
                  <span style={{ fontFamily: "var(--font-western)", fontSize: 22, fontWeight: 300, letterSpacing: "-.02em", fontVariantNumeric: "tabular-nums", color: "var(--text-heading)" }}>{b.load}</span>
                  <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>%</span>
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24, marginTop: 24 }}>
        <Card eyebrow="Fuel mix" title="燃料结构">
          <BarRows rows={[
            { label: "农林废弃物", value: 42, display: "42.0%", color: "var(--ste-600)" },
            { label: "甜高粱秸秆", value: 27, display: "27.0%", color: "var(--ste-400)" },
            { label: "木质颗粒", value: 19, display: "19.0%", color: "var(--gold-500)" },
            { label: "其他生物质", value: 12, display: "12.0%", color: "var(--ink-400)" },
          ]} />
        </Card>
        <Card eyebrow="Alerts" title="待处理事项" actions={<Tag tone="warning">3 项</Tag>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { icon: "eco", tone: "var(--state-warning)", t: "碳配额剩余低于 15%", d: "建议优化 CFB 燃烧参数或申购配额" },
              { icon: "local_shipping", tone: "var(--state-info)", t: "3 车燃料到场待验收", d: "赤湖工业园 2 号卸料口" },
              { icon: "build", tone: "var(--text-subtle)", t: "三号炉检修进入第 4 天", d: "计划 09-09 复役" },
            ].map((a) => (
              <div key={a.t} style={{ display: "flex", gap: 14 }}>
                <Icon name={a.icon} size={20} color={a.tone} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: "var(--text-heading)" }}>{a.t}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 5, lineHeight: 1.8 }}>{a.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <PhiAnchor dimensions={["共生", "开物"]} source="§14 数据可视化 · 数据墨水比">
          删除所有非数据的墨迹，让信息本身成为视觉的主角。看板不是给领导看的 PPT，是园区的体检报告。
        </PhiAnchor>
      </div>
    </>
  );
}
Object.assign(window, { DashboardScreen });
