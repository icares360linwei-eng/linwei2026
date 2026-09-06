const { Card, Icon, Tag, Badge, Button, IconButton, StatCard, Table, Pagination, EmptyState,
  Tabs, Breadcrumbs, NavRail, TopAppBar, EntitySwitcher, Modal, Drawer, Toast, Tooltip,
  Field, Input, Select, DatePicker, Checkbox, Radio, Textarea, Popconfirm, PhiAnchor, TaijiSpinner } = window.SINOTAODesignSystem_b6947e;
const NS = window.SINOTAODesignSystem_b6947e || {};
// 新增导出的本地降级：bundle 滞后时降级为无动效/无版式的等价元素，绝不白屏
const Reveal = NS.Reveal || (({ children, as = "div", style, ...r }) => React.createElement(as, { style, ...r }, children));
const RuleReveal = NS.RuleReveal || (({ style }) => <span style={{ display: "block", height: 1, background: "var(--border-subtle)", ...style }} />);
const Marquee = NS.Marquee || (({ items = [], style }) => (
  <div style={{ display: "flex", gap: 40, justifyContent: "center", padding: "40px 0", borderTop: "var(--hairline)", borderBottom: "var(--hairline)", ...style }}>
    {items.map((i) => <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 200, color: "var(--text-heading)" }}>{i}</span>)}
  </div>
));
const StatBand = NS.StatBand || (({ items = [], style }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", background: "var(--surface-card)", borderRadius: "var(--card-radius)", ...style }}>
    {items.map((it, i) => (
      <div key={it.label} style={{ padding: 32, borderLeft: i ? "var(--hairline)" : 0 }}>
        <div className="u-label">{it.label}</div>
        <div style={{ marginTop: 16, fontFamily: "var(--font-western)", fontSize: 34, fontWeight: 300, letterSpacing: "-.03em", color: "var(--text-heading)" }}>{it.value} <span style={{ fontSize: 13, color: "var(--text-subtle)" }}>{it.unit}</span></div>
      </div>
    ))}
  </div>
));
const SectionHead = NS.SectionHead || (({ eyebrow, title, lede, tone, style }) => (
  <header style={{ marginBottom: 80, ...style }}>
    {eyebrow ? <div className="u-eyebrow" style={{ color: tone === "ink" ? "var(--gold-300)" : "var(--text-subtle)" }}>{eyebrow}</div> : null}
    <h2 style={{ margin: "24px 0 0", fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.4vw,64px)", fontWeight: 200, letterSpacing: "-.032em", lineHeight: 1.12, maxWidth: "15em", textWrap: "balance", color: tone === "ink" ? "var(--ink-50)" : "var(--text-heading)" }}>{title}</h2>
    {lede ? <p style={{ margin: "32px 0 0", maxWidth: "26em", fontSize: 16, lineHeight: 1.9, color: tone === "ink" ? "var(--ink-300)" : "var(--text-muted)" }}>{lede}</p> : null}
  </header>
));


/** 页头：细线上方的面包屑 + 大号宋体标题 + 状态行 */
function PageHeader({ crumbs, title, meta, actions }) {
  return (
    <header style={{
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      gap: 32, marginBottom: 32, flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 200,
          letterSpacing: "-.03em", lineHeight: 1.12, color: "var(--text-heading)",
        }}>{title}</h1>
        {meta ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", whiteSpace: "nowrap",
            fontFamily: "var(--font-western)", fontSize: 12, letterSpacing: ".08em", color: "var(--text-muted)",
          }}>{meta}</div>
        ) : null}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>{actions}</div>
    </header>
  );
}

/** 微标签：面板内的小节标题。中文零字距（宽字距会把汉字拉散），西文自动转大写眼标。 */
function MicroLabel({ children, color, latin = false }) {
  return (
    <span style={{
      fontFamily: latin ? "var(--font-western)" : "var(--font-sans)",
      fontSize: latin ? 11 : "var(--fs-caption)", fontWeight: 500,
      letterSpacing: latin ? ".16em" : 0,
      textTransform: latin ? "uppercase" : "none",
      color: color || "var(--text-subtle)",
    }}>{children}</span>
  );
}

/** 图例点 */
function Legend({ items = [] }) {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {items.map((i) => (
        <span key={i.label} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-muted)" }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: i.color, flex: "0 0 auto" }} />{i.label}
        </span>
      ))}
    </div>
  );
}

/** 面积折线图 — 柔和填充 + 三条极淡基准线，无坐标轴装饰 */
function AreaChart({ series = [], height = 300, labels = [], colors = ["var(--brand-600)", "var(--gold-500)"] }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const all = series.flat();
  const max = Math.max(...all) * 1.1, min = Math.min(...all) * 0.86;
  const W = 1000, H = 320, pad = 6;
  const pt = (d, i) => {
    const x = pad + (i / (d.length - 1)) * (W - pad * 2);
    const y = H - pad - ((d[i] - min) / (max - min)) * (H - pad * 2);
    return [x, y];
  };
  const line = (d) => d.map((_, i) => { const [x, y] = pt(d, i); return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ");
  const area = (d) => `${line(d)} L${(W - pad).toFixed(1)} ${H} L${pad} ${H} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height, display: "block" }} preserveAspectRatio="none">
        <defs>
          {series.map((_, i) => (
            <linearGradient key={i} id={`ac${uid}${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[i % colors.length]} stopOpacity={i ? ".14" : ".20"} />
              <stop offset="100%" stopColor={colors[i % colors.length]} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {[0.25, 0.5, 0.75].map((r) => (
          <line key={r} x1="0" x2={W} y1={H * r} y2={H * r} stroke="var(--border-subtle)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        {series.map((d, i) => <path key={`a${i}`} d={area(d)} fill={`url(#ac${uid}${i})`} />)}
        {series.map((d, i) => (
          <path key={`l${i}`} d={line(d)} fill="none" stroke={colors[i % colors.length]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {labels.length ? (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontFamily: "var(--font-western)", fontSize: 11, letterSpacing: ".06em", color: "var(--text-subtle)" }}>
          {labels.map((l) => <span key={l}>{l}</span>)}
        </div>
      ) : null}
    </div>
  );
}

/** 横向条形对比 */
function BarRows({ rows = [] }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {rows.map((r) => (
        <div key={r.label} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 92px", gap: 12, alignItems: "baseline" }}>
          <span style={{ fontSize: 13, color: "var(--text-body)" }}>{r.label}</span>
          <span style={{ textAlign: "right", fontFamily: "var(--font-western)", fontSize: 15, fontWeight: 300, fontVariantNumeric: "tabular-nums", color: "var(--text-heading)" }}>{r.display || r.value}</span>
          <span style={{ gridColumn: "1 / -1", height: 3, background: "var(--ink-200)", display: "block", overflow: "hidden" }}>
            <span style={{ display: "block", width: `${(r.value / max) * 100}%`, height: "100%", background: r.color || "var(--brand-600)" }} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** 仪表读数 */
function Gauge({ label, value, unit, pct, tone = "brand" }) {
  const color = tone === "warning" ? "var(--state-warning)" : tone === "error" ? "var(--state-error)" : "var(--brand-600)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
      <MicroLabel>{label}</MicroLabel>
      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
        <span style={{ fontFamily: "var(--font-western)", fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 300, letterSpacing: "-.03em", color: "var(--text-heading)", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>{unit}</span>
      </div>
      <span style={{ height: 3, background: "var(--ink-200)", display: "block" }}>
        <span style={{ display: "block", width: `${pct}%`, height: "100%", background: color }} />
      </span>
    </div>
  );
}

/** 胶囊筛选组 */
function ChipGroup({ items = [], active, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: 4, background: "var(--surface-sunken)", borderRadius: "var(--radius-full)" }}>
      {items.map((i) => {
        const on = i.key === active;
        return (
          <button key={i.key} onClick={() => onSelect && onSelect(i.key)} style={{
            padding: "6px 16px", border: 0, borderRadius: "var(--radius-full)", cursor: "pointer",
            background: on ? "var(--surface-card)" : "transparent",
            boxShadow: on ? "var(--shadow-xs)" : "none",
            color: on ? "var(--text-heading)" : "var(--text-muted)",
            fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: on ? 500 : 400, whiteSpace: "nowrap",
          }}>{i.label}</button>
        );
      })}
    </div>
  );
}

Object.assign(window, { PageHeader, MicroLabel, Legend, AreaChart, LineChart: AreaChart, BarRows, Gauge, ChipGroup, KitReveal: Reveal, KitStatBand: StatBand, KitSectionHead: SectionHead, DS: window.SINOTAODesignSystem_b6947e });
