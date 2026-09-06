const { NavRail, TopAppBar, IconButton, Badge, EntitySwitcher, Icon, Tooltip } = window.SINOTAODesignSystem_b6947e;

const NAV = [
  { key: "dash", label: "经营看板", icon: "dashboard" },
  { key: "boiler", label: "锅炉工况", icon: "local_fire_department" },
  { key: "carbon", label: "碳资产", icon: "eco", badge: 2 },
  { key: "fuel", label: "燃料供应", icon: "grass" },
];

function App() {
  const [key, setKey] = React.useState("dash");
  const [expanded, setExpanded] = React.useState(true);
  const [ent, setEnt] = React.useState("ste");
  React.useEffect(() => { document.documentElement.dataset.theme = ent; }, [ent]);

  const Screen = { dash: DashboardScreen, boiler: BoilerScreen, carbon: CarbonScreen, fuel: FuelScreen }[key];

  return (
    <div style={{ display: "flex", alignItems: "stretch", minHeight: "100vh", background: "var(--surface-sunken)" }}>
      <NavRail
        items={NAV} activeKey={key} onSelect={setKey} expanded={expanded}
        header={
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: expanded ? "space-between" : "center", gap: 8 }}>
              {expanded ? <img src="../../assets/logo-sinotao-ink.svg" alt="SINOTAO" style={{ height: 17 }} /> : null}
              <IconButton icon={expanded ? "menu_open" : "menu"} label={expanded ? "收起导航" : "展开导航"} size="s" onClick={() => setExpanded((v) => !v)} />
            </div>
            {expanded ? <EntitySwitcher value={ent} onChange={setEnt} /> : null}
          </div>
        }
        footer={
          <div style={{ display: "flex", flexDirection: "column", gap: 6, borderTop: "1px solid var(--border-subtle)", paddingTop: 12 }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 12, height: 40, padding: expanded ? "0 12px" : 0,
              justifyContent: expanded ? "flex-start" : "center", border: 0, background: "transparent",
              borderRadius: "var(--radius-lg)", cursor: "pointer", color: "var(--text-muted)", fontSize: 14, fontFamily: "var(--font-sans)",
            }}>
              <Icon name="settings" size={22} />{expanded ? "系统设置" : null}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: expanded ? "8px 12px" : "8px 0", justifyContent: expanded ? "flex-start" : "center" }}>
              <span style={{
                width: 28, height: 28, borderRadius: "var(--radius-full)", background: "var(--brand-600)", color: "#fff",
                display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "var(--font-display)", flex: "0 0 auto",
              }}>王</span>
              {expanded ? (
                <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.3, minWidth: 0 }}>
                  <span style={{ fontSize: 13, color: "var(--text-heading)" }}>王工</span>
                  <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>赤湖工业园 · 值长</span>
                </span>
              ) : null}
            </div>
          </div>
        }
      />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <TopAppBar
          brand="九派国有能源 · 赤湖工业园"
          items={[]} activeKey="" onSelect={() => {}}
          actions={<>
            <Tooltip content="全局搜索 ⌘K"><IconButton icon="search" label="全局搜索" /></Tooltip>
            <span style={{ position: "relative", display: "inline-flex" }}>
              <IconButton icon="notifications" label="通知" />
              <span style={{ position: "absolute", top: 2, right: 2 }}><Badge count={3} /></span>
            </span>
            <IconButton icon="help" label="帮助" />
          </>}
        />
        <main style={{ flex: 1, padding: "40px clamp(24px,3vw,48px) 72px", maxWidth: 1560, width: "100%" }}>
          <Screen onOpenBoiler={() => setKey("boiler")} />
        </main>
      </div>
    </div>
  );
}
const __rootEl = document.getElementById("root");
if (__rootEl) ReactDOM.createRoot(__rootEl).render(<App />);
