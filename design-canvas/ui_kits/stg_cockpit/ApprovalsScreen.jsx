const { Card, Table, Tag, Badge, Button, IconButton, Icon, Tabs, Pagination, EmptyState,
  Modal, Drawer, Field, Textarea, Select, Toast, Popconfirm, Checkbox } = window.SINOTAODesignSystem_b6947e;

const ITEMS = [
  { id: 1, no: "AP-2026-0906-11", ent: "STE", title: "追加申购碳配额 20,000 吨", amount: "1,368,000.00", level: "集团审批", days: "1 天", tone: "warning", status: "待我审批" },
  { id: 2, no: "AP-2026-0906-08", ent: "STI", title: "九江港多式联运年度框架协议", amount: "8,600,000.00", level: "集团审批", days: "2 天", tone: "warning", status: "待我审批" },
  { id: 3, no: "AP-2026-0905-21", ent: "STH", title: "PHA 中试线设备采购", amount: "4,280,000.00", level: "实体审批", days: "3 天", tone: "info", status: "他人处理中" },
  { id: 4, no: "AP-2026-0905-16", ent: "EDU", title: "秋季教材集中采购", amount: "620,000.00", level: "实体审批", days: "3 天", tone: "success", status: "已通过" },
  { id: 5, no: "AP-2026-0904-04", ent: "STE", title: "三号炉检修备件预算", amount: "1,940,000.00", level: "实体审批", days: "4 天", tone: "success", status: "已通过" },
];

function ApprovalsScreen() {
  const [tab, setTab] = React.useState("mine");
  const [sel, setSel] = React.useState([]);
  const [sort, setSort] = React.useState({ key: "amount", dir: "desc" });
  const [page, setPage] = React.useState(1);
  const [row, setRow] = React.useState(null);
  const [reject, setReject] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [pc, setPc] = React.useState(false);

  const rows = tab === "mine" ? ITEMS.filter((r) => r.status === "待我审批")
    : tab === "all" ? ITEMS
    : ITEMS.filter((r) => r.status === "已通过");

  return (
    <>
      <header style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 28 }}>
        <div>
          <div className="u-eyebrow">Approvals · Group level</div>
          <h1 style={{ marginTop: 12, fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 300, letterSpacing: "-.018em", color: "var(--text-heading)" }}>审批队列</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, fontSize: 13, color: "var(--text-muted)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <Badge tone="warning" label="2 项待我审批" /><span>超过 500 万元需集团审批</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm open={pc} title={`批量通过 ${sel.length} 项？`} description="通过后进入付款流程，可在流水中撤回 24 小时。"
            confirmText="通过" onConfirm={() => { setPc(false); setSel([]); setToast({ tone: "success", title: "已批量通过", desc: "已通知发起人与财务。" }); }}
            onCancel={() => setPc(false)}>
            <Button variant="secondary" icon="done_all" disabled={!sel.length} onClick={() => setPc(true)}>批量通过{sel.length ? ` (${sel.length})` : ""}</Button>
          </Popconfirm>
          <Button variant="primary" icon="rule">设置审批规则</Button>
        </div>
      </header>

      {toast ? (
        <div style={{ position: "fixed", top: 88, left: "50%", transform: "translateX(-50%)", zIndex: 90 }}>
          <Toast tone={toast.tone} title={toast.title} description={toast.desc} onClose={() => setToast(null)} />
        </div>
      ) : null}

      <Card padding={0}>
        <div style={{ padding: "0 24px" }}>
          <Tabs activeKey={tab} onSelect={setTab} items={[
            { key: "mine", label: "待我审批", count: 2 },
            { key: "all", label: "全部", count: 86 },
            { key: "done", label: "已通过", count: 62 },
          ]} />
        </div>
        <div style={{ padding: "20px 24px" }}>
          <Table selectable selected={sel} onSelectedChange={setSel} sort={sort} onSortChange={setSort} onRowClick={setRow}
            columns={[
              { key: "no", title: "单号" },
              { key: "ent", title: "实体", render: (v) => <Tag tone="brand" size="s">{v}</Tag> },
              { key: "title", title: "事项" },
              { key: "amount", title: "金额 (¥)", align: "right", sortable: true },
              { key: "level", title: "层级" },
              { key: "days", title: "已停留", align: "right", sortable: true },
              { key: "status", title: "状态", render: (v, r) => <Tag tone={r.tone}>{v}</Tag> },
            ]}
            rows={rows}
            empty={<EmptyState compact icon="task_alt" title="没有待你处理的审批" hint="新的审批到达时会出现在这里，并同时推送到你的通知中心。" />} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <Pagination page={page} pageSize={20} total={86} onChange={setPage} />
          </div>
        </div>
      </Card>

      <Drawer open={!!row} onClose={() => setRow(null)} title={row ? row.no : ""} width={460}
        footer={<>
          <Button variant="secondary" onClick={() => { setRow(null); setReject(true); }}>退回</Button>
          <Button variant="primary" icon="check" onClick={() => { setRow(null); setToast({ tone: "success", title: "已通过审批", desc: "已通知发起人与财务。" }); }}>通过</Button>
        </>}>
        {row ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 21, color: "var(--text-heading)", lineHeight: 1.5 }}>{row.title}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}><Tag tone="brand" size="s">{row.ent}</Tag><Tag tone={row.tone} size="s">{row.status}</Tag></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["金额", "¥ " + row.amount], ["审批层级", row.level], ["已停留", row.days], ["发起人", "王工 · 赤湖工业园"]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>{k}</div>
                  <div style={{ fontSize: 15, color: "var(--text-heading)", marginTop: 3, fontFamily: k === "金额" ? "var(--font-western)" : undefined }}>{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 10 }}>审批流</div>
              <Timeline items={[
                { time: "09-06", title: "发起 · 王工", desc: "附化验单与市场行情摘要。", color: "var(--ste-600)" },
                { time: "09-06", title: "实体复核 · 通过", desc: "九派能源财务负责人已确认预算额度。", color: "var(--state-success)" },
                { time: "待处理", title: "集团审批 · 李总", desc: "超过 500 万元阈值，需集团 CFO 审批。", color: "var(--state-warning)" },
              ]} />
            </div>
            <Field label="审批意见" htmlFor="op" hint="将写入审批流水，对发起人可见">
              <Textarea id="op" rows={3} value="同意，按授权额度执行，交割后补充凭证号。" onChange={() => {}} />
            </Field>
          </div>
        ) : null}
      </Drawer>

      <Modal open={reject} onClose={() => setReject(false)} size="s" title="退回审批"
        footer={<>
          <Button variant="secondary" onClick={() => setReject(false)}>取消</Button>
          <Button variant="danger" onClick={() => { setReject(false); setToast({ tone: "warning", title: "已退回发起人", desc: "退回原因已同步至审批流水。" }); }}>退回</Button>
        </>}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Field label="退回原因" htmlFor="rr" required>
            <Select id="rr" value="doc" onChange={() => {}} options={[
              { value: "doc", label: "材料不完整" }, { value: "budget", label: "超出预算额度" }, { value: "other", label: "其他（请说明）" }]} />
          </Field>
          <Field label="补充说明" htmlFor="rn">
            <Textarea id="rn" rows={3} value="请补充近三个月配额价格走势与两家以上报价对比。" onChange={() => {}} />
          </Field>
          <Checkbox id="notify" checked label="同时通知实体财务负责人" onChange={() => {}} />
        </div>
      </Modal>
    </>
  );
}
Object.assign(window, { ApprovalsScreen });
