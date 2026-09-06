const { Card, Icon, Tag, Badge } = window.SINOTAODesignSystem_b6947e;

const ENTITY_META = {
  stg: { code: "STG", name: "源裕兴创新未来", color: "var(--stg-600)" },
  ste: { code: "STE", name: "九派国有能源", color: "var(--ste-600)" },
  sti: { code: "STI", name: "源裕兴进出口贸易", color: "var(--sti-600)" },
  sth: { code: "STH", name: "源裕兴健康科技", color: "var(--sth-600)" },
  edu: { code: "EDU", name: "崇仁教育", color: "var(--edu-600)" },
};

/** 实体一行：2px 细线刻度 + 代号 + 名称 + 营收条 + 同比。实体色只作刻度，不填色块。 */
function EntityRow({ ek, revenue, pct, delta, onClick, active, first }) {
  const m = ENTITY_META[ek];
  return (
    <button onClick={onClick} style={{
      display: "grid", gridTemplateColumns: "62px minmax(0,1fr) minmax(0,1fr) 96px 66px",
      alignItems: "center", gap: "clamp(12px,2vw,28px)",
      width: "100%", padding: "22px 32px", border: 0,
      borderTop: first ? "0" : "var(--hairline)",
      background: active ? "var(--surface-selected)" : "transparent", cursor: "pointer", textAlign: "left",
      transition: "background var(--dur-micro) var(--ease-out)",
    }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-sunken)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 2, height: 20, background: m.color, flex: "0 0 auto" }} />
        <span style={{ fontFamily: "var(--font-western)", fontSize: 11, letterSpacing: ".14em", color: "var(--text-subtle)" }}>{m.code}</span>
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--text-heading)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</span>
      <span style={{ height: 2, background: "var(--ink-200)", display: "block", overflow: "hidden" }}>
        <span style={{ display: "block", width: `${pct}%`, height: "100%", background: m.color }} />
      </span>
      <span style={{ textAlign: "right", fontFamily: "var(--font-western)", fontSize: 17, fontWeight: 300, letterSpacing: "-.02em", fontVariantNumeric: "tabular-nums", color: "var(--text-heading)" }}>{revenue}</span>
      <span style={{ textAlign: "right", fontFamily: "var(--font-western)", fontSize: 13, fontVariantNumeric: "tabular-nums", color: delta >= 0 ? "var(--state-success)" : "var(--state-error)" }}>
        {delta >= 0 ? "+" : ""}{delta}%
      </span>
    </button>
  );
}

/** 环形占比（单一比值，纯 SVG 无装饰） */
function Donut({ value, label, sub, color = "var(--brand-600)" }) {
  const r = 46, c = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <svg width="112" height="112" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="var(--ink-200)" strokeWidth="5" />
        <circle cx="56" cy="56" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={`${(value / 100) * c} ${c}`} transform="rotate(-90 56 56)" />
        <text x="56" y="64" textAnchor="middle" style={{ fontFamily: "var(--font-western)", fontSize: 26, fontWeight: 300, letterSpacing: "-.03em", fill: "var(--text-heading)" }}>{value}%</text>
      </svg>
      <div>
        <div style={{ fontSize: 14, color: "var(--text-heading)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.7, maxWidth: "18em" }}>{sub}</div>
      </div>
    </div>
  );
}

/** 时间轴 */
function Timeline({ items = [] }) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: "grid", gridTemplateColumns: "76px 20px 1fr", gap: 12, paddingBottom: i === items.length - 1 ? 0 : 20 }}>
          <span style={{ fontFamily: "var(--font-western)", fontSize: 12, color: "var(--text-subtle)", paddingTop: 2, fontVariantNumeric: "tabular-nums" }}>{it.time}</span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: it.color || "var(--brand-600)", marginTop: 5 }} />
            {i === items.length - 1 ? null : <span style={{ flex: 1, width: 1, background: "var(--border-default)", marginTop: 4 }} />}
          </span>
          <span>
            <span style={{ display: "block", fontSize: 14, color: "var(--text-heading)" }}>{it.title}</span>
            <span style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginTop: 3, lineHeight: 1.7 }}>{it.desc}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

Object.assign(window, { EntityRow, Donut, Timeline, ENTITY_META });
