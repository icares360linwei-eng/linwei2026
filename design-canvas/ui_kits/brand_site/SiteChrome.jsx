const { Button, Icon } = window.SINOTAODesignSystem_b6947e;
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
    <h2 style={{ margin: "24px 0 0", fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.4vw,64px)", fontWeight: 200, letterSpacing: "-.032em", lineHeight: 1.12, maxWidth: "15em", textWrap: "balance", wordBreak: "keep-all", color: tone === "ink" ? "var(--ink-50)" : "var(--text-heading)" }}>{title}</h2>
    {lede ? <p style={{ margin: "32px 0 0", maxWidth: "26em", fontSize: 16, lineHeight: 1.9, color: tone === "ink" ? "var(--ink-300)" : "var(--text-muted)" }}>{lede}</p> : null}
  </header>
));


const NAV = [
  { key: "home", label: "集团概览" },
  { key: "entities", label: "五大实体" },
  { key: "governance", label: "治理与 ESG" },
  { key: "careers", label: "加入我们" },
];

function SiteHeader({ active, onSelect, inverse }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, height: 80,
      display: "flex", alignItems: "center", gap: 48, padding: "0 clamp(24px, 5vw, 80px)",
      background: inverse ? "rgba(13,11,8,.52)" : "color-mix(in oklch, var(--surface-page) 90%, transparent)",
      backdropFilter: "saturate(150%) blur(16px)",
      borderBottom: inverse ? "1px solid rgba(255,251,245,.10)" : "var(--hairline)",
    }}>
      <button onClick={() => onSelect("home")} style={{ border: 0, background: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", flex: "0 0 auto" }}>
        <img src={`../../assets/logo-sinotao-${inverse ? "paper" : "ink"}.svg`} alt="SINOTAO 源裕兴" style={{ height: 18, display: "block" }} />
      </button>
      <nav style={{ display: "flex", alignItems: "center", gap: 32, flex: 1, minWidth: 0 }}>
        {NAV.map((n) => {
          const on = n.key === active;
          return (
            <button key={n.key} onClick={() => onSelect(n.key)} style={{
              position: "relative", padding: "4px 0", border: 0, background: "none", cursor: "pointer",
              color: inverse ? (on ? "var(--ink-50)" : "rgba(255,251,245,.62)") : (on ? "var(--text-heading)" : "var(--text-muted)"),
              fontFamily: "var(--font-display)", fontSize: 15, whiteSpace: "nowrap",
              borderBottom: `1px solid ${on ? (inverse ? "var(--gold-400)" : "var(--seal)") : "transparent"}`,
            }}>{n.label}</button>
          );
        })}
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 24, flex: "0 0 auto" }}>
        <button style={{
          border: 0, background: "none", cursor: "pointer", fontFamily: "var(--font-western)",
          fontSize: 12, letterSpacing: ".16em", color: inverse ? "rgba(255,251,245,.62)" : "var(--text-muted)",
        }}>EN</button>
        <button onClick={() => onSelect("careers")} style={{
          display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 22px",
          border: `1px solid ${inverse ? "rgba(255,251,245,.34)" : "var(--ink-900)"}`,
          background: inverse ? "transparent" : "var(--ink-900)",
          color: inverse ? "var(--ink-50)" : "var(--ink-50)",
          borderRadius: "var(--radius-full)", cursor: "pointer",
          fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap",
        }}>预约参观园区<Icon name="arrow_outward" size={18} /></button>
      </div>
    </header>
  );
}

/** 版面容器：内容 1200px 上限，章节间距 160px，非对称留白 */
function Section({ index, eyebrow, title, lede, children, tone = "paper", pad }) {
  const inverse = tone === "ink";
  return (
    <section style={{
      background: inverse ? "var(--ink-900)" : tone === "sunken" ? "var(--ink-100)" : "var(--surface-page)",
      padding: `${pad || "clamp(80px, 10vw, 160px)"} clamp(24px, 5vw, 80px)`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {title ? <SectionHead index={index} eyebrow={eyebrow} title={title} lede={lede} tone={tone} /> : null}
        {children}
      </div>
    </section>
  );
}

/** 细线行：品牌站的主要列表形态，取代卡片网格 */
function RuleRow({ tick, code, title, desc, meta, onClick, inverse }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "grid", gridTemplateColumns: "56px minmax(0,1fr) minmax(0,1.1fr) auto",
        alignItems: "center", gap: "clamp(16px, 3vw, 48px)", width: "100%",
        padding: "32px 0", border: 0, borderTop: inverse ? "1px solid rgba(255,251,245,.12)" : "var(--hairline)",
        background: "transparent", cursor: "pointer", textAlign: "left",
      }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 2, height: 22, background: tick, flex: "0 0 auto" }} />
        <span style={{ fontFamily: "var(--font-western)", fontSize: 11, letterSpacing: ".14em", color: inverse ? "rgba(255,251,245,.5)" : "var(--text-subtle)" }}>{code}</span>
      </span>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.1vw, 28px)", fontWeight: 300,
        letterSpacing: "-.016em", color: inverse ? "var(--ink-50)" : "var(--text-heading)",
        transform: hover ? "translateX(6px)" : "none", transition: "transform var(--dur-transition) var(--ease-emphasized)",
      }}>{title}</span>
      <span style={{ fontSize: 14, lineHeight: 1.8, color: inverse ? "var(--ink-400)" : "var(--text-muted)" }}>{desc}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 16, flex: "0 0 auto" }}>
        {meta ? <span style={{ fontFamily: "var(--font-western)", fontSize: 13, color: inverse ? "var(--ink-400)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{meta}</span> : null}
        <span className="material-symbols-rounded" style={{
          fontSize: 20, color: tick,
          transform: hover ? "translateX(4px)" : "none", transition: "transform var(--dur-transition) var(--ease-emphasized)",
        }}>arrow_outward</span>
      </span>
    </button>
  );
}

function SiteFooter({ onSelect }) {
  return (
    <footer style={{ background: "var(--ink-950)", color: "var(--ink-400)", padding: "clamp(64px,8vw,112px) clamp(24px,5vw,80px) 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px,1.5fr) repeat(3, minmax(110px,1fr))",
          gap: "clamp(24px,3.5vw,56px)", paddingBottom: 56, borderBottom: "1px solid rgba(255,251,245,.10)",
        }}>
          <div style={{ minWidth: 0 }}>
            <img src="../../assets/logo-sinotao-paper.svg" alt="SINOTAO" style={{ height: 22 }} />
            <p style={{ marginTop: 28, maxWidth: "26em", fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 2, color: "var(--ink-500)" }}>
              守正为骨，开物为翼，共生为脉。
            </p>
          </div>
          {[
            { t: "五大实体", items: ["九派国有能源", "源裕兴进出口贸易", "源裕兴健康科技", "崇仁教育"] },
            { t: "治理", items: ["品牌宪法 V37", "ESG 报告", "合规与审计", "供应商准则"] },
            { t: "联系", items: ["赤湖工业园", "招标与采购", "媒体咨询", "加入我们"] },
          ].map((col) => (
            <div key={col.t} style={{ minWidth: 0 }}>
              <div className="u-label" style={{ color: "var(--ink-500)" }}>{col.t}</div>
              <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.items.map((i) => (
                  <li key={i}><button onClick={() => onSelect("entities")} style={{ border: 0, background: "none", padding: 0, cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 14, color: "var(--ink-300)" }}>{i}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, paddingTop: 32, flexWrap: "wrap", fontSize: 12, color: "var(--ink-600)" }}>
          <span>© 2026 源裕兴创新未来 · Sinotao Innovation Future</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>守正 · 开物 · 共生</span>
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { SiteHeader, Section, RuleRow, SiteFooter, SITE_NAV: NAV });
