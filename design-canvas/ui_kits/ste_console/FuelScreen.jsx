const { Card, Tag, Badge, Button, IconButton, Icon, Table, Pagination, EmptyState, Tabs, Drawer,
  Field, Input, Select, Textarea, Popconfirm, Toast, Checkbox } = window.SINOTAODesignSystem_b6947e;

const FUEL = [
  { id: 1, no: "FS-2026-0906-01", supplier: "赤湖农林合作社", kind: "农林废弃物", tons: "320.4", moisture: "18.2%", heat: "3,180", status: "待验收", tone: "warning" },
  { id: 2, no: "FS-2026-0906-02", supplier: "江西甜高粱种植基地", kind: "甜高粱秸秆", tons: "268.0", moisture: "21.5%", heat: "3,040", status: "待验收", tone: "warning" },
  { id: 3, no: "FS-2026-0905-04", supplier: "九江木业", kind: "木质颗粒", tons: "180.6", moisture: "9.8%", heat: "4,260", status: "已入库", tone: "success" },
  { id: 4, no: "FS-2026-0905-03", supplier: "赤湖农林合作社", kind: "农林废弃物", tons: "412.2", moisture: "17.4%", heat: "3,220", status: "已入库", tone: "success" },
  { id: 5, no: "FS-2026-0905-01", supplier: "湖口秸秆收储中心", kind: "混合生物质", tons: "96.8", moisture: "26.9%", heat: "2,640", status: "已退运", tone: "error" },
];

function FuelScreen() {
  const [tab, setTab] = React.useState("all");
  const [sel, setSel] = React.useState([]);
  const [sort, setSort] = React.useState({ key: "tons", dir: "desc" });
  const [page, setPage] = React.useState(1);
  const [row, setRow] = React.useState(null);
  const [pc, setPc] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const rows = tab === "all" ? FUEL : tab === "pending" ? FUEL.filter((r) => r.status === "待验收") : [];

  return (
    <>
      <PageHeader
        crumbs={[{ key: "dash", label: "经营看板" }, { label: "燃料供应" }]}
        title="燃料到场与验收"
        meta={<><Badge tone="warning" label="2 车待验收" /><span>今日累计到场 1,278 吨</span></>}
        actions={<>
          <Popconfirm open={pc} title={`批量核销 ${sel.length} 条？`} description="核销后进入结算流程，可在结算单中撤回。"
            confirmText="核销" onConfirm={() => { setPc(false); setSel([]); setToast({ tone: "success", title: "已提交核销", desc: "结算单将于次日生成。" }); }}
            onCancel={() => setPc(false)}>
            <Button variant="secondary" icon="done_all" disabled={!sel.length} onClick={() => setPc(true)}>批量核销{sel.length ? ` (${sel.length})` : ""}</Button>
          </Popconfirm>
          <Button variant="primary" icon="add">登记到场</Button>
        </>}
      />
      {toast ? (
        <div style={{ position: "fixed", top: 88, left: "50%", transform: "translateX(-50%)", zIndex: 90 }}>
          <Toast tone={toast.tone} title={toast.title} description={toast.desc} onClose={() => setToast(null)} />
        </div>
      ) : null}

      <Card padding={0}>
        <div style={{ padding: "0 24px" }}>
          <Tabs activeKey={tab} onSelect={setTab} items={[
            { key: "all", label: "全部", count: 128 },
            { key: "pending", label: "待验收", count: 2 },
            { key: "rejected", label: "已退运", count: 0 },
          ]} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 24px" }}>
          <div style={{ width: 260 }}><Input icon="search" placeholder="搜索单号或供应商" value="" onChange={() => {}} /></div>
          <div style={{ width: 180 }}>
            <Select value="all" onChange={() => {}} options={[{ value: "all", label: "全部燃料类型" }, { value: "agri", label: "农林废弃物" }, { value: "sorghum", label: "甜高粱秸秆" }]} />
          </div>
          <div style={{ flex: 1 }} />
          <IconButton icon="filter_list" label="更多筛选" variant="outline" />
          <IconButton icon="download" label="导出" variant="outline" />
        </div>
        <div style={{ padding: "0 24px 20px" }}>
          <Table selectable selected={sel} onSelectedChange={setSel} sort={sort} onSortChange={setSort}
            onRowClick={setRow}
            columns={[
              { key: "no", title: "到场单号" },
              { key: "supplier", title: "供应商" },
              { key: "kind", title: "燃料类型", render: (v) => <Tag tone="neutral" size="s">{v}</Tag> },
              { key: "tons", title: "净重（吨）", align: "right", sortable: true },
              { key: "moisture", title: "含水率", align: "right" },
              { key: "heat", title: "热值 kcal/kg", align: "right", sortable: true },
              { key: "status", title: "状态", render: (v, r) => <Tag tone={r.tone}>{v}</Tag> },
            ]}
            rows={rows}
            empty={<EmptyState compact icon="inventory_2" title="本页暂无退运记录" hint="退运会在验收不合格时自动出现在这里。" />} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <Pagination page={page} pageSize={20} total={128} onChange={setPage} />
          </div>
        </div>
      </Card>

      <Drawer open={!!row} onClose={() => setRow(null)} title={row ? row.no : ""}
        footer={<>
          <Button variant="secondary" onClick={() => setRow(null)}>关闭</Button>
          <Button variant="primary" icon="task_alt" onClick={() => { setRow(null); setToast({ tone: "success", title: "已验收入库", desc: "库存已同步至 Odoo 库存模块。" }); }}>确认验收入库</Button>
        </>}>
        {row ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["供应商", row.supplier], ["燃料类型", row.kind], ["净重", row.tons + " 吨"], ["含水率", row.moisture], ["热值", row.heat + " kcal/kg"], ["卸料口", "赤湖工业园 2 号"]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>{k}</div>
                  <div style={{ fontSize: 15, color: "var(--text-heading)", marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <Field label="化验结论" htmlFor="lab" hint="将写入供应商质量档案">
              <Textarea id="lab" rows={3} value="含水率、热值均在合同区间内，允许入库。" onChange={() => {}} />
            </Field>
            <Checkbox id="sync" checked label="同步生成结算暂估单" onChange={() => {}} />
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
Object.assign(window, { FuelScreen });
