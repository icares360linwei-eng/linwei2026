const { Card, Tag, Button, StatCard, Table, Icon, Modal, Field, Input, DatePicker, Select, Checkbox, PhiAnchor } = window.SINOTAODesignSystem_b6947e;
const NS_ = window.SINOTAODesignSystem_b6947e || {};
const StatBand = NS_.StatBand || (() => null);

function CarbonScreen() {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("2,000");
  const [date, setDate] = React.useState("2026-09-15");
  const [ack, setAck] = React.useState(false);
  return (
    <>
      <PageHeader
        crumbs={[{ key: "dash", label: "经营看板" }, { label: "碳资产" }]}
        title="碳资产与配额"
        meta={<span>履约年度 2026 · 全国碳市场（发电行业）</span>}
        actions={<>
          <Button variant="secondary" icon="description">生成 CCER 备案材料</Button>
          <Button variant="primary" icon="add_shopping_cart" onClick={() => setOpen(true)}>申购配额</Button>
        </>}
      />
      <StatBand items={[
        { label: "年度配额总量", value: "428,000", unit: "吨", icon: "account_balance" },
        { label: "已履约", value: "415,200", unit: "吨", delta: 2.4, deltaLabel: "较去年同期", icon: "task_alt" },
        { label: "剩余配额", value: "12,800", unit: "吨", delta: -3.1, deltaLabel: "较上月", icon: "eco" },
        { label: "CCER 可开发量", value: "86,400", unit: "吨", icon: "park" },
      ]} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24, marginTop: 24 }}>
        <Card eyebrow="Ledger" title="配额流水" padding={0}>
          <Table dense
            columns={[
              { key: "date", title: "日期" },
              { key: "type", title: "类型", render: (v) => <Tag tone={v === "履约核销" ? "info" : v === "配额申购" ? "brand" : "success"} size="s">{v}</Tag> },
              { key: "amount", title: "数量（吨）", align: "right", sortable: true },
              { key: "price", title: "均价（元/吨）", align: "right" },
              { key: "ref", title: "凭证号" },
            ]}
            rows={[
              { id: 1, date: "2026-08-31", type: "履约核销", amount: "-38,200", price: "—", ref: "CN-2026-08-0031" },
              { id: 2, date: "2026-08-18", type: "配额申购", amount: "+20,000", price: "68.40", ref: "CN-2026-08-0018" },
              { id: 3, date: "2026-07-31", type: "履约核销", amount: "-36,800", price: "—", ref: "CN-2026-07-0031" },
              { id: 4, date: "2026-07-12", type: "CCER 签发", amount: "+14,600", price: "52.10", ref: "CCER-2026-0712" },
              { id: 5, date: "2026-06-30", type: "履约核销", amount: "-35,400", price: "—", ref: "CN-2026-06-0030" },
            ]} />
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card eyebrow="Reduction" title="减排贡献结构">
            <BarRows rows={[
              { label: "生物质替代燃煤", value: 268, display: "26.8 万吨", color: "var(--ste-600)" },
              { label: "供汽替代小锅炉", value: 94, display: "9.4 万吨", color: "var(--ste-400)" },
              { label: "余热回收", value: 38, display: "3.8 万吨", color: "var(--gold-400)" },
              { label: "灰渣资源化", value: 12, display: "1.2 万吨", color: "var(--ink-400)" },
            ]} />
          </Card>
          <PhiAnchor dimensions={["共生", "守正"]} source="§33 ESG · 反漂绿守则">
            品牌不夸大环保承诺，不用绿色滤镜粉饰灰色操作。每一吨减排量都必须可核验、可追溯到凭证号。
          </PhiAnchor>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="申购配额"
        footer={<>
          <Button variant="secondary" onClick={() => setOpen(false)}>取消</Button>
          <Button variant="primary" disabled={!ack} onClick={() => setOpen(false)}>提交申购</Button>
        </>}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <Field label="申购数量" htmlFor="q" required hint="以吨为单位，1,000 吨起">
            <Input id="q" value={amount} onChange={setAmount} suffix="吨" />
          </Field>
          <Field label="预计交割日" htmlFor="dd" required>
            <DatePicker id="dd" value={date} onChange={setDate} />
          </Field>
          <Field label="交易市场" htmlFor="mk" style={{ gridColumn: "1 / -1" }}>
            <Select id="mk" value="cn" onChange={() => {}} options={[{ value: "cn", label: "全国碳排放权交易市场（上海）" }, { value: "local", label: "地方试点市场" }]} />
          </Field>
          <div style={{ gridColumn: "1 / -1" }}>
            <Checkbox id="ack" checked={ack} onChange={setAck} label="已确认本次申购在年度预算与授权额度内" />
          </div>
        </div>
      </Modal>
    </>
  );
}
Object.assign(window, { CarbonScreen });
