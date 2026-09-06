import React from "react";

const CHROME = {
  flat: { border: "1px solid transparent", boxShadow: "none" },
  outlined: { border: "1px solid var(--card-border)", boxShadow: "none" },
  elevated: { border: "1px solid transparent", boxShadow: "var(--shadow-md)" },
};

/**
 * 面板容器。默认 flat —— 无描边、无阴影，靠表面色与留白划界。
 * 描边只在需要与同色背景区分时用（outlined），阴影只给真正的悬浮层（elevated）。
 */
export function Card({
  children, title, eyebrow, actions, footer, padding, tone = "default",
  variant = "flat", accent = false, interactive = false, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    default: { background: "var(--surface-card)" },
    sunken: { background: "var(--surface-sunken)" },
    brand: { background: "var(--surface-brand-subtle)" },
    inverse: { background: "var(--surface-inverse)", color: "var(--text-on-inverse)" },
    bare: { background: "transparent" },
  }[tone];
  const pad = padding != null ? padding : "var(--card-pad-lg)";
  return (
    <section
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", borderRadius: "var(--card-radius)",
        transition: "box-shadow var(--dur-micro) var(--ease-out), background var(--dur-micro) var(--ease-out)",
        cursor: interactive ? "pointer" : undefined,
        overflow: "hidden", minWidth: 0,
        ...CHROME[variant], ...tones,
        ...(interactive && hover ? { boxShadow: "var(--shadow-md)" } : null),
        ...style,
      }}
      {...rest}
    >
      {accent ? (
        <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "var(--border-indicator)", background: "var(--brand-600)" }} />
      ) : null}
      {(title || eyebrow || actions) ? (
        <header style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-5)",
          padding: pad, paddingBottom: "var(--space-5)", flexWrap: "wrap",
        }}>
          <div style={{ minWidth: 0 }}>
            {eyebrow ? (
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-western)", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-medium)",
                letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 10,
              }}>
                <span style={{ width: 6, height: 6, background: "var(--seal)", flex: "0 0 auto" }} />
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h3 style={{
                margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)",
                fontWeight: "var(--fw-regular)", lineHeight: "var(--lh-h3)",
                letterSpacing: "var(--ls-h3)", color: "inherit",
              }}>{title}</h3>
            ) : null}
          </div>
          {actions ? <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flex: "0 0 auto" }}>{actions}</div> : null}
        </header>
      ) : null}
      <div style={{ padding: pad, paddingTop: (title || eyebrow || actions) ? 0 : pad }}>{children}</div>
      {footer ? (
        <footer style={{
          borderTop: "var(--hairline)", padding: `var(--space-4) ${typeof pad === "number" ? pad + "px" : "var(--card-pad-lg)"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)",
          fontSize: "var(--fs-body-s)", color: "var(--text-muted)",
        }}>{footer}</footer>
      ) : null}
    </section>
  );
}
