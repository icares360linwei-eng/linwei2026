const { Card, Tag, Badge, Button, IconButton, Icon, Tabs, Tooltip, Toast, Select, Field } = window.SINOTAODesignSystem_b6947e;

function BoilerScreen() {
  const [unit, setUnit] = React.useState("b1");
  const [toast, setToast] = React.useState(false);
  return (
    <>
      <PageHeader
        crumbs={[{ key: "dash", label: "经营看板" }, { key: "boiler", label: "锅炉工况" }, { label: "CFB 一号炉" }]}
        title="CFB 一号炉工况"
        meta={<><Badge tone="success" label="运行中 · 已连续运行 42 天" pulse /><span>采样间隔 5s</span></>}
        actions={<>
          <div style={{ width: 200 }}>
            <Select value={unit} onChange={setUnit} options={[
              { value: "b1", label: "CFB 一号炉" }, { value: "b2", label: "CFB 二号炉" },
              { value: "b3", label: "CFB 三号炉（检修）" }, { value: "hr", label: "余热回收机组" }]} />
          </div>
          <Button variant="secondary" icon="tune" onClick={() => setToast(true)}>调整燃烧参数</Button>
        </>}
      />
      {toast ? (
        <div style={{ position: "fixed", top: 88, left: "50%", transform: "translateX(-50%)", zIndex: 90 }}>
          <Toast tone="info" title="参数调整已进入审批流" description="需值长复核后生效，预计 10 分钟内。" onClose={() => setToast(false)} />
        </div>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr))", gap: 24 }}>
        <Card style={{ gridColumn: "span 6" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 28 }}>
            <Gauge label="床温" value="892" unit="℃" pct={88} />
            <Gauge label="主蒸汽压力" value="9.62" unit="MPa" pct={82} />
            <Gauge label="主蒸汽温度" value="540" unit="℃" pct={90} />
            <Gauge label="给水流量" value="386" unit="t/h" pct={74} />
            <Gauge label="一次风量" value="128" unit="km³/h" pct={66} />
            <Gauge label="氧含量" value="4.8" unit="%" pct={38} tone="warning" />
          </div>
        </Card>

        <Card style={{ gridColumn: "span 4" }} eyebrow="Trend · 12h" title="床温与主蒸汽压力">
          <LineChart height={230}
            series={[[880, 884, 890, 896, 892, 888, 894, 899, 892, 886, 890, 892], [9.4, 9.5, 9.55, 9.7, 9.62, 9.5, 9.58, 9.72, 9.62, 9.48, 9.55, 9.62]]}
            labels={["02:00", "05:00", "08:00", "11:00", "14:00"]} />
        </Card>

        <Card style={{ gridColumn: "span 2" }} eyebrow="Emissions" title="排放实时值"
          footer={<><span>数据同步至省级监测平台</span><Icon name="verified" size={18} color="var(--state-success)" /></>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { k: "烟尘", v: "4.2", u: "mg/m³", limit: "≤10", ok: true },
              { k: "二氧化硫", v: "18.6", u: "mg/m³", limit: "≤35", ok: true },
              { k: "氮氧化物", v: "42.8", u: "mg/m³", limit: "≤50", ok: true },
              { k: "汞及化合物", v: "0.006", u: "mg/m³", limit: "≤0.03", ok: true },
            ].map((e) => (
              <div key={e.k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <span style={{ fontSize: 13, color: "var(--text-body)" }}>{e.k}</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-western)", fontSize: 15, fontVariantNumeric: "tabular-nums", color: "var(--text-heading)" }}>{e.v}</span>
                  <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>{e.u}</span>
                  <Tooltip content={`限值 ${e.limit} ${e.u}`}><Tag tone="success" size="s">达标</Tag></Tooltip>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
Object.assign(window, { BoilerScreen });
