const { NavRail, TopAppBar, IconButton, Badge, EntitySwitcher, Icon, Tooltip } = window.SINOTAODesignSystem_b6947e;

const NAV = [
  { key: "overview", label: "经营驾驶舱", icon: "space_dashboard" },
  { key: "approvals", label: "审批队列", icon: "approval", badge: 2 },
  { key: "compliance", label: "合规台账", icon: "gavel" },
  { key: "assets", label: "品牌资产", icon: "palette" },
];

function PlaceholderScreen({ title, note }) {
  const { EmptyState, Button } = window.SINOTAODesignSystem_b6947e;
  return (
    <>
      <div className="u-eyebrow">Group cockpit</div>
      <h1 style={{ marginTop: 12, marginBottom: 28, fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 300, letterSpacing: "-.018em", color: "var(--text-heading)" }}>{title}</h1>
      <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--surface-card)" }}>
        <EmptyState icon="draft" title="本屏在提供的资料中没有对应设计" hint={note}
          action={<Button variant="secondary" icon="upload_file">提供该模块的设计稿或源码</Button>} />
      </div>
    </>
  );
}

function Cockpit() {
  const [key, setKey] = React.useState("overview");
  const [ent, setEnt] = React.useState("stg");
  React.useEffect(() => { document.documentElement.dataset.theme = ent; }, [ent]);

  let Screen;
  if (key === "overview") Screen = <OverviewScreen ent={ent} setEnt={setEnt} />;
  else if (key === "approvals") Screen = <ApprovalsScreen />;
  else if (key === "compliance") Screen = <PlaceholderScreen title="合规台账" note="全典 §33 只给出了反漂绿与 ESG 的原则，没有台账界面。按 UI Kit 规则不作发明，留空并标注。" />;
  else Screen = <PlaceholderScreen title="品牌资产" note="品牌资产库（图标 sprite、插画、字体包）尚未提供文件，界面暂缺。" />;

  return (
    <div style={{ display: "flex", alignItems: "stretch", minHeight: "100vh", background: "var(--surface-sunken)" }}>
      <NavRail items={NAV} activeKey={key} onSelect={setKey} expanded
        header={
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <img src="../../assets/logo-sinotao-ink.svg" alt="SINOTAO" style={{ height: 17 }} />
            <EntitySwitcher value={ent} onChange={setEnt} />
          </div>
        }
        footer={
          <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid var(--border-subtle)", paddingTop: 14 }}>
            <span style={{
              width: 28, height: 28, borderRadius: "var(--radius-full)", background: "var(--brand-600)", color: "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "var(--font-display)",
            }}>李</span>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
              <span style={{ fontSize: 13, color: "var(--text-heading)" }}>李总</span>
              <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>集团 CFO</span>
            </span>
          </div>
        }
      />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <TopAppBar brand="源裕兴创新未来 · 集团中枢" items={[]} activeKey="" onSelect={() => {}}
          actions={<>
            <Tooltip content="全局搜索 ⌘K"><IconButton icon="search" label="全局搜索" /></Tooltip>
            <span style={{ position: "relative", display: "inline-flex" }}>
              <IconButton icon="notifications" label="通知" />
              <span style={{ position: "absolute", top: 2, right: 2 }}><Badge count={5} /></span>
            </span>
            <IconButton icon="dark_mode" label="切换暗色模式"
              onClick={() => {
                const el = document.documentElement;
                el.dataset.colorScheme = el.dataset.colorScheme === "dark" ? "" : "dark";
              }} />
          </>} />
        <main style={{ flex: 1, padding: "40px clamp(24px,3vw,48px) 72px", maxWidth: 1560, width: "100%" }}>{Screen}</main>
      </div>
    </div>
  );
}
const __rootEl = document.getElementById("root");
if (__rootEl) ReactDOM.createRoot(__rootEl).render(<Cockpit />);
