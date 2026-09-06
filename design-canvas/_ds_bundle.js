/* @ds-bundle: {"format":4,"namespace":"SINOTAODesignSystem_b6947e","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Marquee","sourcePath":"components/core/Marquee.jsx"},{"name":"PhiAnchor","sourcePath":"components/core/PhiAnchor.jsx"},{"name":"Reveal","sourcePath":"components/core/Reveal.jsx"},{"name":"RuleReveal","sourcePath":"components/core/Reveal.jsx"},{"name":"SectionHead","sourcePath":"components/core/SectionHead.jsx"},{"name":"StatCard","sourcePath":"components/core/StatCard.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"TaijiSpinner","sourcePath":"components/core/TaijiSpinner.jsx"},{"name":"EmptyState","sourcePath":"components/data/EmptyState.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"StatBand","sourcePath":"components/data/StatBand.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Drawer","sourcePath":"components/feedback/Drawer.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Popconfirm","sourcePath":"components/feedback/Popconfirm.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"DatePicker","sourcePath":"components/forms/DatePicker.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"EntitySwitcher","sourcePath":"components/navigation/EntitySwitcher.jsx"},{"name":"NavRail","sourcePath":"components/navigation/NavRail.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TopAppBar","sourcePath":"components/navigation/TopAppBar.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"2a681755a919","components/core/Button.jsx":"c9dda4a9c1a5","components/core/Card.jsx":"4c61eb793bd2","components/core/Icon.jsx":"8860b94538f5","components/core/IconButton.jsx":"e756388c0565","components/core/Marquee.jsx":"7a3b8386c459","components/core/PhiAnchor.jsx":"89626b907ee8","components/core/Reveal.jsx":"2e585f9f667e","components/core/SectionHead.jsx":"f0dddd564af4","components/core/StatCard.jsx":"f59590f0b121","components/core/Tag.jsx":"e5306087f547","components/core/TaijiSpinner.jsx":"a1152a3f83ec","components/data/EmptyState.jsx":"02855c588cb9","components/data/Pagination.jsx":"27a2c92d25d0","components/data/StatBand.jsx":"ce6f855edfba","components/data/Table.jsx":"6918b734e774","components/feedback/Drawer.jsx":"1ce5a411a7d0","components/feedback/Modal.jsx":"73f94bd123dd","components/feedback/Popconfirm.jsx":"91c8b15c44d6","components/feedback/Toast.jsx":"093f372aaec2","components/feedback/Tooltip.jsx":"82ca9bc5d420","components/forms/Checkbox.jsx":"116664f585ee","components/forms/DatePicker.jsx":"84dcecfd4a01","components/forms/Field.jsx":"d57ad8605670","components/forms/Input.jsx":"acd9bf9fdfb5","components/forms/Radio.jsx":"1695a7d64df7","components/forms/Select.jsx":"fbd2a2f1a5e5","components/forms/Textarea.jsx":"9e1a9f5cb462","components/navigation/Breadcrumbs.jsx":"7b4c9f511368","components/navigation/EntitySwitcher.jsx":"303288c92bf9","components/navigation/NavRail.jsx":"d0f627233d0b","components/navigation/Tabs.jsx":"d650452f5f99","components/navigation/TopAppBar.jsx":"805005b476bd","ui_kits/brand_site/EntityScreen.jsx":"7253889c265e","ui_kits/brand_site/HomeScreen.jsx":"ac8557679b37","ui_kits/brand_site/Site.jsx":"af4452bb7900","ui_kits/brand_site/SiteChrome.jsx":"e604de141238","ui_kits/ste_console/App.jsx":"e8471cc36e4c","ui_kits/ste_console/BoilerScreen.jsx":"6c1bc344311d","ui_kits/ste_console/CarbonScreen.jsx":"a146e5d5cc53","ui_kits/ste_console/DashboardScreen.jsx":"3d53d9ec2c38","ui_kits/ste_console/FuelScreen.jsx":"bd1a825115b5","ui_kits/ste_console/Parts.jsx":"bc83159ab127","ui_kits/stg_cockpit/ApprovalsScreen.jsx":"601bbe754975","ui_kits/stg_cockpit/Cockpit.jsx":"bdf1149871a7","ui_kits/stg_cockpit/CockpitParts.jsx":"8580418f2010","ui_kits/stg_cockpit/OverviewScreen.jsx":"1ffc3ebed28e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SINOTAODesignSystem_b6947e = window.SINOTAODesignSystem_b6947e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const DOT = {
  neutral: "var(--ink-400)",
  brand: "var(--brand-600)",
  success: "var(--state-success)",
  warning: "var(--state-warning)",
  error: "var(--state-error)",
  info: "var(--state-info)"
};

/** 状态点 / 计数徽标。dot=运行状态；count=未读数（>max 显示 max+）。 */
function Badge({
  tone = "neutral",
  count,
  max = 99,
  label,
  dot = false,
  pulse = false,
  style
}) {
  if (dot || count == null) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        width: 8,
        height: 8,
        flex: "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: 0,
        borderRadius: "var(--radius-full)",
        background: DOT[tone]
      }
    }), pulse ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: -4,
        borderRadius: "var(--radius-full)",
        border: `1px solid ${DOT[tone]}`,
        opacity: .35
      }
    }) : null), label ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-caption)",
        color: "var(--text-muted)",
        fontFamily: "var(--font-sans)"
      }
    }, label) : null);
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 18,
      height: 18,
      padding: "0 5px",
      borderRadius: "var(--radius-full)",
      background: DOT[tone === "neutral" ? "error" : tone],
      color: "#fff",
      fontFamily: "var(--font-western)",
      fontSize: 11,
      fontWeight: "var(--fw-medium)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1,
      ...style
    }
  }, count > max ? `${max}+` : count);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHROME = {
  flat: {
    border: "1px solid transparent",
    boxShadow: "none"
  },
  outlined: {
    border: "1px solid var(--card-border)",
    boxShadow: "none"
  },
  elevated: {
    border: "1px solid transparent",
    boxShadow: "var(--shadow-md)"
  }
};

/**
 * 面板容器。默认 flat —— 无描边、无阴影，靠表面色与留白划界。
 * 描边只在需要与同色背景区分时用（outlined），阴影只给真正的悬浮层（elevated）。
 */
function Card({
  children,
  title,
  eyebrow,
  actions,
  footer,
  padding,
  tone = "default",
  variant = "flat",
  accent = false,
  interactive = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    default: {
      background: "var(--surface-card)"
    },
    sunken: {
      background: "var(--surface-sunken)"
    },
    brand: {
      background: "var(--surface-brand-subtle)"
    },
    inverse: {
      background: "var(--surface-inverse)",
      color: "var(--text-on-inverse)"
    },
    bare: {
      background: "transparent"
    }
  }[tone];
  const pad = padding != null ? padding : "var(--card-pad-lg)";
  return /*#__PURE__*/React.createElement("section", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      borderRadius: "var(--card-radius)",
      transition: "box-shadow var(--dur-micro) var(--ease-out), background var(--dur-micro) var(--ease-out)",
      cursor: interactive ? "pointer" : undefined,
      overflow: "hidden",
      minWidth: 0,
      ...CHROME[variant],
      ...tones,
      ...(interactive && hover ? {
        boxShadow: "var(--shadow-md)"
      } : null),
      ...style
    }
  }, rest), accent ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "var(--border-indicator)",
      background: "var(--brand-600)"
    }
  }) : null, title || eyebrow || actions ? /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      padding: pad,
      paddingBottom: "var(--space-5)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-western)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-subtle)",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: "var(--seal)",
      flex: "0 0 auto"
    }
  }), eyebrow) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-h3)",
      fontWeight: "var(--fw-regular)",
      lineHeight: "var(--lh-h3)",
      letterSpacing: "var(--ls-h3)",
      color: "inherit"
    }
  }, title) : null), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      flex: "0 0 auto"
    }
  }, actions) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad,
      paddingTop: title || eyebrow || actions ? 0 : pad
    }
  }, children), footer ? /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "var(--hairline)",
      padding: `var(--space-4) ${typeof pad === "number" ? pad + "px" : "var(--card-pad-lg)"}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-3)",
      fontSize: "var(--fs-body-s)",
      color: "var(--text-muted)"
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Material Symbols Rounded 包装器 — 全系统唯一图标入口。 */
function Icon({
  name,
  size = 20,
  weight = 400,
  fill = 0,
  color,
  style,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `material-symbols-rounded ${className}`,
    "aria-hidden": "true",
    style: {
      fontSize: size,
      color: color || "inherit",
      fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" 0, "opsz" ${size}`,
      flex: "0 0 auto",
      ...style
    }
  }, rest), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  l: 40,
  m: 36,
  s: 28
};

/** 纯图标按钮 — 工具条、表格行操作、关闭。必须提供 label。 */
function IconButton({
  icon,
  label,
  size = "m",
  variant = "ghost",
  disabled = false,
  active = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const d = SIZES[size] || SIZES.m;
  const base = {
    ghost: {
      background: "transparent",
      border: "1px solid transparent",
      color: "var(--text-muted)"
    },
    outline: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      color: "var(--text-body)"
    },
    solid: {
      background: "var(--brand-600)",
      border: "1px solid transparent",
      color: "#fff"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: d,
      height: d,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? "var(--state-disabled-opacity)" : 1,
      transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)",
      ...base,
      ...(active ? {
        background: "var(--surface-brand-subtle)",
        color: "var(--text-brand)"
      } : null),
      ...(hover && !disabled ? {
        background: variant === "solid" ? "var(--brand-700)" : "var(--surface-hover)",
        color: variant === "solid" ? "#fff" : "var(--text-heading)"
      } : null),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "s" ? 18 : 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Marquee.jsx
try { (() => {
/**
 * 走马灯 —— 品牌词条 / 实体名的连续横向滚动带，用作章节之间的呼吸段。
 * prefers-reduced-motion 下停止滚动并居中静态显示。
 */
function Marquee({
  items = [],
  speed = 42,
  tone = "ink",
  separator = "·",
  size = "clamp(28px, 4vw, 56px)",
  style
}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const inverse = tone === "ink";
  const run = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: inverse ? "var(--ink-900)" : "var(--surface-page)",
      borderTop: inverse ? "1px solid rgba(255,251,245,.12)" : "var(--hairline)",
      borderBottom: inverse ? "1px solid rgba(255,251,245,.12)" : "var(--hairline)",
      padding: "clamp(28px,3.4vw,52px) 0",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes mq${uid}{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
      @media (prefers-reduced-motion:reduce){.mq${uid}{animation:none!important;justify-content:center}}`), /*#__PURE__*/React.createElement("div", {
    className: `mq${uid}`,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(28px,3vw,56px)",
      width: "max-content",
      animation: `mq${uid} ${speed}s linear infinite`
    }
  }, run.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: size,
      fontWeight: 200,
      letterSpacing: "-.03em",
      whiteSpace: "nowrap",
      color: inverse ? "var(--ink-50)" : "var(--text-heading)"
    }
  }, it), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 14,
      color: inverse ? "var(--gold-400)" : "var(--seal)",
      flex: "0 0 auto"
    }
  }, separator)))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: inverse ? "linear-gradient(90deg, var(--ink-900) 0%, transparent 12%, transparent 88%, var(--ink-900) 100%)" : "linear-gradient(90deg, var(--surface-page) 0%, transparent 12%, transparent 88%, var(--surface-page) 100%)"
    }
  }));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/core/PhiAnchor.jsx
try { (() => {
const DIMS = {
  "守正": {
    color: "var(--ink-900)",
    surface: "var(--zhu-50)",
    en: "Preserving Integrity"
  },
  "开物": {
    color: "var(--sti-600)",
    surface: "var(--sti-50)",
    en: "Pioneering Innovation"
  },
  "共生": {
    color: "var(--ste-600)",
    surface: "var(--ste-50)",
    en: "Symbiotic Coexistence"
  }
};

/** 哲学锚点 — 把「守正 / 开物 / 共生」的设计依据显式挂在章节或组件说明上。 */
function PhiAnchor({
  dimensions = ["守正"],
  children,
  source,
  style
}) {
  const primary = DIMS[dimensions[0]] || DIMS["守正"];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-5)",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-sunken)",
      borderLeft: `var(--border-indicator) solid ${primary.color}`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap"
    }
  }, dimensions.map(d => {
    const dim = DIMS[d] || DIMS["守正"];
    return /*#__PURE__*/React.createElement("span", {
      key: d,
      style: {
        display: "inline-flex",
        alignItems: "baseline",
        gap: 6,
        padding: "3px 10px",
        borderRadius: "var(--radius-sm)",
        background: dim.surface,
        color: dim.color,
        border: `1px solid ${dim.color}`,
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-body-s)",
        fontWeight: "var(--fw-medium)"
      }
    }, d, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-western)",
        fontSize: 10,
        letterSpacing: "var(--ls-eyebrow)",
        textTransform: "uppercase",
        opacity: .7
      }
    }, dim.en));
  })), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontSize: "var(--fs-body-l)",
      lineHeight: 1.8,
      color: "var(--text-heading)",
      maxWidth: "var(--measure-cn)"
    }
  }, children), source ? /*#__PURE__*/React.createElement("cite", {
    style: {
      fontStyle: "normal",
      fontSize: "var(--fs-caption)",
      color: "var(--text-subtle)",
      letterSpacing: "var(--ls-caption)"
    }
  }, "\u2014 ", source) : null);
}
Object.assign(__ds_scope, { PhiAnchor });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PhiAnchor.jsx", error: String((e && e.message) || e) }); }

// components/core/Reveal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const reduced = () => typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

/**
 * 揭示判定的共用钩子。
 *
 * 为什么不只用 IntersectionObserver：按规范，只有 isIntersecting / thresholdIndex
 * 发生「变化」时才会入队条目。瞬时跳过某元素（scrollTo、End 键、页内锚点、刷新恢复
 * 滚动位置）时，它始终是 false → false，回调永不执行，内容会永久停在 opacity:0。
 * 因此这里三层保障：挂载时同步测一次 → IO 负责常规滚动 → 被动滚动监听兜底跳跃场景，
 * 三者任一命中即置显并自行摘除。
 */
function useReveal({
  threshold = 0.15,
  once = true
} = {}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(() => reduced());
  React.useEffect(() => {
    if (reduced()) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }
    let done = false;
    const inRange = () => {
      // top 小于视口高度即成立：既覆盖「从下方进入」，也覆盖「已被掠过」（top < 0）
      return el.getBoundingClientRect().top < window.innerHeight;
    };
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (io) io.disconnect();
    };
    const onScroll = () => {
      if (inRange()) {
        if (once) reveal();else setShown(true);
      }
    };

    // 第一层：挂载时同步判定，覆盖刷新恢复滚动位置。
    // once: false 时仍需继续挂 IO —— 否则元素离开视口后无法重新隐藏。
    if (inRange()) {
      setShown(true);
      if (once) return;
    }

    // 第二层：IO 负责常规滚动
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            if (once) reveal();else setShown(true);
          } else if (!once) setShown(false);
        });
      }, {
        threshold,
        rootMargin: "0px 0px -8% 0px"
      });
      io.observe(el);
    }

    // 第三层：被动滚动 / 缩放监听兜底跳跃场景，命中后自行摘除
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (io) io.disconnect();
    };
  }, [threshold, once]);
  return [ref, shown];
}

/**
 * 滚动揭示 —— 进入视口后上浮淡入，可按 index 错峰。
 * 只做「位移 + 透明度」，不做缩放、不做弹跳；尊重 prefers-reduced-motion。
 */
function Reveal({
  children,
  as = "div",
  rise = 24,
  delay = 0,
  index = 0,
  stagger = 70,
  duration = 700,
  threshold = 0.15,
  once = true,
  style,
  ...rest
}) {
  const [ref, shown] = useReveal({
    threshold,
    once
  });
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translate3d(0, ${rise}px, 0)`,
      transition: `opacity ${duration}ms var(--ease-emphasized) ${delay + index * stagger}ms, transform ${duration}ms var(--ease-emphasized) ${delay + index * stagger}ms`,
      willChange: shown ? "auto" : "opacity, transform",
      ...style
    }
  }, rest), children);
}

/**
 * 细线绘入 —— 1px 墨线从左向右展开，用作章节分隔的入场动作。
 */
function RuleReveal({
  delay = 0,
  duration = 900,
  color = "var(--border-subtle)",
  style
}) {
  const [ref, shown] = useReveal({
    threshold: 0.9,
    once: true
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "block",
      height: 1,
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 1,
      background: color,
      transform: shown ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left center",
      transition: `transform ${duration}ms var(--ease-emphasized) ${delay}ms`
    }
  }));
}
Object.assign(__ds_scope, { Reveal, RuleReveal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Reveal.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHead.jsx
try { (() => {
/**
 * 章节起头 —— 竖排序号 + 印章方块 + 大号宋体标题 + 引言，靠左 8 列、右侧留白 4 列。
 * 非对称留白本身就是版面的一部分，不要把右侧填满。
 */
function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  tone = "paper",
  align = "left",
  style
}) {
  const inverse = tone === "ink";
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "grid",
      gridTemplateColumns: index ? "auto minmax(0,1fr)" : "minmax(0,1fr)",
      gap: index ? "var(--space-6)" : 0,
      marginBottom: "var(--space-11)",
      justifyItems: align === "center" ? "center" : "start",
      ...style
    }
  }, index ? /*#__PURE__*/React.createElement("span", {
    style: {
      writingMode: "vertical-rl",
      fontFamily: "var(--font-western)",
      fontSize: 12,
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: inverse ? "var(--gold-400)" : "var(--text-subtle)",
      paddingTop: 6,
      whiteSpace: "nowrap"
    }
  }, index) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-western)",
      fontSize: 12,
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: inverse ? "var(--gold-300)" : "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: "var(--seal)",
      flex: "0 0 auto"
    }
  }), eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "var(--space-5) 0 0",
      fontFamily: "var(--font-display)",
      maxWidth: "15em",
      textWrap: "balance",
      wordBreak: "keep-all",
      fontSize: "clamp(34px, 4.4vw, 64px)",
      fontWeight: "var(--fw-extralight)",
      letterSpacing: "-.032em",
      lineHeight: 1.12,
      color: inverse ? "var(--ink-50)" : "var(--text-heading)"
    }
  }, title), lede ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-6) 0 0",
      maxWidth: "26em",
      fontSize: "var(--fs-body-l)",
      lineHeight: 1.9,
      color: inverse ? "var(--ink-300)" : "var(--text-muted)"
    }
  }, lede) : null));
}
Object.assign(__ds_scope, { SectionHead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHead.jsx", error: String((e && e.message) || e) }); }

// components/core/StatCard.jsx
try { (() => {
/** KPI 卡 — 指标名 + 主数值 + 单位 + 同比变化 + 可选迷你趋势条。 */
function StatCard({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  trend,
  icon,
  tone = "default",
  style
}) {
  const up = typeof delta === "number" ? delta >= 0 : null;
  const deltaColor = up == null ? "var(--text-muted)" : up ? "var(--state-success)" : "var(--state-error)";
  const tMax = trend && trend.length ? Math.max(...trend) : 1;
  const tMin = trend && trend.length ? Math.min(...trend) : 0;
  const span = tMax - tMin || 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-5)",
      borderRadius: "var(--card-radius)",
      background: tone === "brand" ? "var(--surface-brand-subtle)" : "var(--surface-card)",
      border: `1px solid ${tone === "brand" ? "var(--brand-100)" : "var(--card-border)"}`,
      boxShadow: "var(--card-shadow)",
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-s)",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      minWidth: 0
    }
  }, label), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    color: "var(--text-subtle)"
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: "clamp(24px, 2.2vw, 34px)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
      color: "var(--text-heading)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-s)",
      color: "var(--text-subtle)"
    }
  }, unit) : null), delta != null || deltaLabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      flexWrap: "wrap",
      fontSize: "var(--fs-caption)",
      color: deltaColor
    }
  }, up != null ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: up ? "trending_up" : "trending_down",
    size: 16
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontVariantNumeric: "tabular-nums"
    }
  }, delta != null ? `${up ? "+" : ""}${delta}%` : null), deltaLabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-subtle)"
    }
  }, deltaLabel) : null) : null, trend && trend.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 3,
      height: 32
    }
  }, trend.map((v, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: `${18 + (v - tMin) / span * 82}%`,
      borderRadius: "var(--radius-xs)",
      background: i === trend.length - 1 ? "var(--brand-600)" : "var(--brand-200)"
    }
  }))) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    background: "var(--ink-100)",
    color: "var(--text-body)",
    border: "var(--border-subtle)"
  },
  brand: {
    background: "var(--surface-brand-subtle)",
    color: "var(--text-brand)",
    border: "var(--brand-100)"
  },
  success: {
    background: "var(--state-success-surface)",
    color: "var(--state-success)",
    border: "transparent"
  },
  warning: {
    background: "var(--state-warning-surface)",
    color: "var(--state-warning)",
    border: "transparent"
  },
  error: {
    background: "var(--state-error-surface)",
    color: "var(--state-error)",
    border: "transparent"
  },
  info: {
    background: "var(--state-info-surface)",
    color: "var(--state-info)",
    border: "transparent"
  },
  gold: {
    background: "var(--gold-200)",
    color: "var(--gold-600)",
    border: "transparent"
  }
};

/** 标签 / Chip — 分类、状态、多选回填。 */
function Tag({
  children,
  tone = "neutral",
  size = "m",
  icon,
  onRemove,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  const s = size === "s" ? {
    h: 20,
    fs: 11,
    pad: "0 6px"
  } : {
    h: 24,
    fs: 12,
    pad: "0 8px"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: s.h,
      padding: s.pad,
      fontSize: s.fs,
      lineHeight: 1,
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-caption)",
      borderRadius: "var(--radius-sm)",
      background: t.background,
      color: t.color,
      border: `1px solid ${t.border}`,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "s" ? 14 : 16
  }) : null, children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "\u79FB\u9664",
    onClick: onRemove,
    style: {
      display: "inline-flex",
      border: 0,
      background: "none",
      padding: 0,
      marginLeft: 2,
      cursor: "pointer",
      color: "inherit",
      opacity: .65
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 14
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/TaijiSpinner.jsx
try { (() => {
/**
 * 载入指示器 — 阴阳双弧旋转（太极流纹的临时数字化替代，2.4s 一圈）。
 * 正式的「太极流纹 12 变体」SVG sprite 尚未提供，见 readme.md ▸ ICONOGRAPHY。
 */
function TaijiSpinner({
  size = 20,
  color = "currentColor",
  style
}) {
  const id = React.useId();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "0 0 auto",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes taiji-spin-${id.replace(/[^a-zA-Z0-9]/g, "")}{to{transform:rotate(360deg)}}`), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    role: "status",
    "aria-label": "\u8F7D\u5165\u4E2D",
    style: {
      animation: `taiji-spin-${id.replace(/[^a-zA-Z0-9]/g, "")} var(--dur-loop) linear infinite`,
      transformOrigin: "center"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeOpacity: ".18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3a9 9 0 0 1 9 9",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 21a9 9 0 0 1-9-9",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeOpacity: ".55"
  })));
}
Object.assign(__ds_scope, { TaijiSpinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TaijiSpinner.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  xl: {
    h: "var(--btn-height-xl)",
    pad: "0 32px",
    fs: 16,
    gap: 10,
    icon: 20
  },
  l: {
    h: "var(--btn-height-l)",
    pad: "0 24px",
    fs: 15,
    gap: 8,
    icon: 20
  },
  m: {
    h: "var(--btn-height-m)",
    pad: "0 20px",
    fs: 14,
    gap: 8,
    icon: 18
  },
  s: {
    h: "var(--btn-height-s)",
    pad: "0 14px",
    fs: 12,
    gap: 6,
    icon: 18
  }
};
const VARIANTS = {
  primary: {
    background: "var(--btn-primary-bg)",
    color: "var(--btn-primary-fg)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-xs)"
  },
  secondary: {
    background: "var(--surface-card)",
    color: "var(--btn-secondary-fg)",
    border: "1px solid var(--btn-secondary-border)"
  },
  gold: {
    background: "var(--btn-gold-bg)",
    color: "var(--btn-gold-fg)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-xs)"
  },
  text: {
    background: "transparent",
    color: "var(--text-heading)",
    border: "1px solid transparent"
  },
  link: {
    background: "transparent",
    color: "var(--text-link)",
    border: "1px solid transparent",
    textDecoration: "underline",
    textUnderlineOffset: "0.2em",
    padding: 0,
    height: "auto"
  },
  danger: {
    background: "var(--state-error)",
    color: "#fff",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-xs)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-body)",
    border: "1px solid var(--border-default)"
  }
};
const HOVER = {
  primary: {
    background: "var(--btn-primary-bg-hover)",
    boxShadow: "var(--shadow-sm)"
  },
  secondary: {
    background: "var(--surface-hover)",
    borderColor: "var(--border-strong)"
  },
  gold: {
    background: "var(--gold-500)",
    boxShadow: "var(--shadow-sm)"
  },
  text: {
    background: "var(--surface-hover)"
  },
  link: {
    color: "var(--text-link-hover)"
  },
  danger: {
    background: "var(--edu-700)"
  },
  ghost: {
    background: "var(--surface-hover)"
  }
};

/** 主操作按钮。6 型 × 4 档 × 8 状态。 */
function Button({
  children,
  variant = "primary",
  size = "m",
  shape = "default",
  icon,
  iconEnd,
  loading = false,
  disabled = false,
  block = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.m;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const off = disabled || loading;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: off,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    "aria-busy": loading || undefined,
    style: {
      display: block ? "flex" : "inline-flex",
      width: block ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.h,
      padding: s.pad,
      fontSize: s.fs,
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1,
      whiteSpace: "nowrap",
      borderRadius: shape === "pill" ? "var(--btn-radius-cta)" : "var(--btn-radius)",
      cursor: off ? "not-allowed" : "pointer",
      opacity: off ? "var(--state-disabled-opacity)" : 1,
      transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out), transform var(--dur-instant) var(--ease-out), border-color var(--dur-micro) var(--ease-out)",
      transform: active && !off ? "scale(.98)" : "none",
      ...v,
      ...(hover && !off ? HOVER[variant] : null),
      ...style
    }
  }, rest), loading ? /*#__PURE__*/React.createElement(__ds_scope.TaijiSpinner, {
    size: s.icon
  }) : icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }) : null, children, iconEnd && !loading ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconEnd,
    size: s.icon
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/data/EmptyState.jsx
try { (() => {
/** 空状态 — 说明发生了什么 + 一个明确的下一步。 */
function EmptyState({
  icon = "inbox",
  title = "暂无数据",
  hint,
  action,
  compact = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-3)",
      padding: compact ? "var(--space-7) var(--space-5)" : "var(--space-11) var(--space-5)",
      textAlign: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "var(--radius-full)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--surface-sunken)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24,
    color: "var(--text-subtle)"
  })), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-regular)",
      fontSize: "var(--fs-h4)",
      color: "var(--text-heading)"
    }
  }, title), hint ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "36ch",
      fontSize: "var(--fs-body-s)",
      color: "var(--text-muted)"
    }
  }, hint) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, action) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/data/Pagination.jsx
try { (() => {
const win = (page, total) => {
  if (total <= 7) return Array.from({
    length: total
  }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (page >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", page - 1, page, page + 1, "…", total];
};

/** 分页 — 36×36 方块按钮，当前页品牌色实底，可显示总数。 */
function Pagination({
  page = 1,
  pageSize = 20,
  total = 0,
  onChange,
  compact = false,
  style
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const go = p => {
    if (p >= 1 && p <= pages && p !== page && onChange) onChange(p);
  };
  const cell = extra => ({
    minWidth: 36,
    height: 36,
    padding: "0 8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: "var(--radius-md)",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "var(--font-western)",
    fontSize: "var(--fs-body-s)",
    fontVariantNumeric: "tabular-nums",
    color: "var(--text-body)",
    transition: "background var(--dur-micro) var(--ease-out)",
    ...extra
  });
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "\u5206\u9875",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      ...style
    }
  }, !compact ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-s)",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)"
    }
  }, "\u5171 ", /*#__PURE__*/React.createElement("span", {
    className: "u-num"
  }, total.toLocaleString("zh-CN")), " \u6761") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "\u4E0A\u4E00\u9875",
    disabled: page <= 1,
    onClick: () => go(page - 1),
    style: cell({
      color: page <= 1 ? "var(--text-subtle)" : "var(--text-body)",
      cursor: page <= 1 ? "not-allowed" : "pointer"
    })
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron_left",
    size: 20
  })), win(page, pages).map((p, i) => p === "…" ? /*#__PURE__*/React.createElement("span", {
    key: `d${i}`,
    style: cell({
      cursor: "default",
      color: "var(--text-subtle)"
    })
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    type: "button",
    "aria-current": p === page ? "page" : undefined,
    onClick: () => go(p),
    style: cell(p === page ? {
      background: "var(--brand-600)",
      color: "#fff",
      fontWeight: "var(--fw-medium)"
    } : null),
    onMouseEnter: e => {
      if (p !== page) e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      if (p !== page) e.currentTarget.style.background = "transparent";
    }
  }, p)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "\u4E0B\u4E00\u9875",
    disabled: page >= pages,
    onClick: () => go(page + 1),
    style: cell({
      color: page >= pages ? "var(--text-subtle)" : "var(--text-body)",
      cursor: page >= pages ? "not-allowed" : "pointer"
    })
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron_right",
    size: 20
  }))));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/data/StatBand.jsx
try { (() => {
/**
 * 指标带 —— 一行细线分隔的关键指标，替代「四张并排卡片」。
 * 数值 clamp(30–44px) 西文 300 字重，标签 12px 中文小标签（零字距）；除细线外没有任何边框与阴影。
 */
function StatBand({
  items = [],
  size = "l",
  style
}) {
  const fs = size === "l" ? "clamp(30px, 3.1vw, 44px)" : "clamp(24px, 2.4vw, 32px)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(190px, 1fr))`,
      background: "var(--surface-card)",
      borderRadius: "var(--card-radius)",
      overflow: "hidden",
      ...style
    }
  }, items.map((it, i) => {
    const up = typeof it.delta === "number" ? it.delta >= 0 : null;
    return /*#__PURE__*/React.createElement("div", {
      key: it.label,
      style: {
        padding: "var(--space-6) var(--space-6)",
        borderLeft: i ? "var(--hairline)" : "0",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-caption)",
        fontWeight: "var(--fw-medium)",
        letterSpacing: 0,
        color: "var(--text-subtle)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, it.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 16
    }) : null, it.label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 6,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-western)",
        fontSize: fs,
        fontWeight: "var(--fw-light)",
        letterSpacing: "-.03em",
        lineHeight: 1,
        color: "var(--text-heading)",
        fontVariantNumeric: "tabular-nums"
      }
    }, it.value), it.unit ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-body-s)",
        color: "var(--text-subtle)"
      }
    }, it.unit) : null), it.delta != null || it.deltaLabel ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: "var(--fs-caption)",
        color: up == null ? "var(--text-muted)" : up ? "var(--state-success)" : "var(--state-error)"
      }
    }, up != null ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: up ? "arrow_upward" : "arrow_downward",
      size: 14
    }) : null, it.delta != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-western)",
        fontVariantNumeric: "tabular-nums"
      }
    }, Math.abs(it.delta), "%") : null, it.deltaLabel ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-subtle)"
      }
    }, it.deltaLabel) : null) : null);
  }));
}
Object.assign(__ds_scope, { StatBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatBand.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Drawer.jsx
try { (() => {
/** 抽屉 — 右侧滑出，默认 380px；标题栏带 3px 品牌色强调线。 */
function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  width,
  side = "right",
  style
}) {
  React.useEffect(() => {
    if (!open) return;
    const esc = e => {
      if (e.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onMouseDown: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "var(--scrim)",
      display: "flex",
      justifyContent: side === "right" ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: width || "var(--panel-width)",
      maxWidth: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-page)",
      boxShadow: "var(--shadow-xl)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-5)",
      borderTop: "var(--border-indicator) solid var(--brand-600)",
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h5)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-heading)"
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "close",
    label: "\u5173\u95ED",
    size: "s",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "var(--space-5)",
      fontSize: "var(--fs-body-m)",
      color: "var(--text-body)"
    }
  }, children), footer ? /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "var(--space-3)",
      padding: "var(--space-4) var(--space-5)",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-card)"
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
const W = {
  s: 400,
  m: 600,
  l: 900
};

/** 模态弹窗 — 16px 圆角、45% 暖墨遮罩、300ms 品牌缓动入场。Escape 可关。 */
function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "m",
  closable = true,
  style
}) {
  React.useEffect(() => {
    if (!open) return;
    const esc = e => {
      if (e.key === "Escape" && closable && onClose) onClose();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, closable, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === "string" ? title : undefined,
    onMouseDown: e => {
      if (e.target === e.currentTarget && closable && onClose) onClose();
    },
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "var(--scrim)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-5)",
      animation: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: W[size] || W.m,
      maxHeight: "86vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      borderRadius: "var(--overlay-radius)",
      boxShadow: "var(--overlay-shadow)",
      overflow: "hidden",
      ...style
    }
  }, title || closable ? /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-5) var(--space-5) var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h5)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-heading)"
    }
  }, title), closable ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "close",
    label: "\u5173\u95ED",
    size: "s",
    onClick: onClose
  }) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--space-5) var(--space-5)",
      overflowY: "auto",
      fontSize: "var(--fs-body-m)",
      color: "var(--text-body)",
      lineHeight: "var(--lh-body-m)"
    }
  }, children), footer ? /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "var(--space-3)",
      padding: "var(--space-4) var(--space-5)",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-sunken)"
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Popconfirm.jsx
try { (() => {
/** 气泡确认 — 中等风险操作的轻量二次确认，锚定在触发元素上方。 */
function Popconfirm({
  open,
  title,
  description,
  confirmText = "确认",
  cancelText = "取消",
  danger = false,
  onConfirm,
  onCancel,
  children,
  placement = "top",
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    }
  }, children, open ? /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    style: {
      position: "absolute",
      zIndex: 60,
      width: 264,
      ...(placement === "top" ? {
        bottom: "calc(100% + 8px)"
      } : {
        top: "calc(100% + 8px)"
      }),
      left: 0,
      padding: "var(--space-4)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      textAlign: "left",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-m)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-heading)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: "var(--fs-body-s)",
      color: "var(--text-muted)",
      lineHeight: 1.5
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-2)",
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "s",
    variant: "secondary",
    onClick: onCancel
  }, cancelText), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "s",
    variant: danger ? "danger" : "primary",
    onClick: onConfirm
  }, confirmText))) : null);
}
Object.assign(__ds_scope, { Popconfirm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Popconfirm.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  success: {
    color: "var(--state-success)",
    icon: "check_circle"
  },
  warning: {
    color: "var(--state-warning)",
    icon: "warning"
  },
  error: {
    color: "var(--state-error)",
    icon: "error"
  },
  info: {
    color: "var(--state-info)",
    icon: "info"
  }
};

/** 轻量反馈 — 顶部居中，3s 自动消失，左侧 3px 语义色条。 */
function Toast({
  tone = "info",
  title,
  description,
  onClose,
  duration = 3000,
  style
}) {
  React.useEffect(() => {
    if (!duration || !onClose) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    "aria-live": "polite",
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-3)",
      minWidth: 320,
      maxWidth: 440,
      padding: "var(--space-3) var(--space-4)",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      borderLeft: `var(--border-indicator) solid ${t.color}`,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 20,
    color: t.color,
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-m)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-heading)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontSize: "var(--fs-body-s)",
      color: "var(--text-muted)",
      lineHeight: 1.5
    }
  }, description) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "close",
    label: "\u5173\u95ED\u63D0\u793A",
    size: "s",
    onClick: onClose
  }) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** 提示气泡 — 玄墨底 + 宣纸字，只承载补充信息，不承载唯一信息。 */
function Tooltip({
  content,
  children,
  placement = "top",
  style
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 6px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 6px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show ? /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      zIndex: 80,
      ...pos,
      padding: "5px 9px",
      borderRadius: "var(--radius-sm)",
      background: "var(--tooltip-bg)",
      color: "var(--tooltip-fg)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      lineHeight: 1.5,
      whiteSpace: "nowrap",
      boxShadow: "var(--shadow-md)",
      pointerEvents: "none",
      ...style
    }
  }, content) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** 复选框 — 18×18px，选中品牌色填充 + 白对勾，支持半选。 */
function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled,
  id,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const on = checked || indeterminate;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? "var(--state-disabled-opacity)" : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-m)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: "0 0 auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-sm)",
      background: on ? "var(--brand-600)" : "var(--surface-card)",
      border: `1px solid ${on ? "var(--brand-600)" : hover && !disabled ? "var(--brand-400)" : "var(--border-default)"}`,
      boxShadow: hover && !disabled && !on ? "0 0 0 4px var(--brand-50)" : "none",
      transition: "background var(--dur-micro) var(--ease-out), border-color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out)"
    }
  }, indeterminate ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 2,
      borderRadius: 1,
      background: "#fff"
    }
  }) : checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    color: "#fff",
    weight: 500
  }) : null), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
/**
 * 数据表格 — 表头轻霜底 + 品牌色 2px 下划线；选中行 4% 品牌底 + 左侧 3px 指示条。
 * columns: [{ key, title, width, align, render, sortable }]
 */
function Table({
  columns = [],
  rows = [],
  rowKey = "id",
  selectable = false,
  selected = [],
  onSelectedChange,
  sort,
  onSortChange,
  onRowClick,
  empty,
  dense = false,
  style
}) {
  const h = dense ? 40 : "var(--table-row-height)";
  const keyOf = (r, i) => typeof rowKey === "function" ? rowKey(r) : r[rowKey] != null ? r[rowKey] : i;
  const allOn = rows.length > 0 && selected.length === rows.length;
  const someOn = selected.length > 0 && !allOn;
  const toggleAll = on => onSelectedChange && onSelectedChange(on ? rows.map(keyOf) : []);
  const toggleOne = (k, on) => onSelectedChange && onSelectedChange(on ? [...selected, k] : selected.filter(x => x !== k));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "var(--surface-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      minWidth: 120 * columns.length + (selectable ? 44 : 0),
      borderCollapse: "collapse",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--table-header-bg)",
      borderBottom: "var(--border-emphasis) solid var(--brand-600)"
    }
  }, selectable ? /*#__PURE__*/React.createElement("th", {
    style: {
      width: 44,
      padding: "0 0 0 var(--space-4)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: allOn,
    indeterminate: someOn,
    onChange: toggleAll
  })) : null, columns.map(c => {
    const active = sort && sort.key === c.key;
    return /*#__PURE__*/React.createElement("th", {
      key: c.key,
      style: {
        padding: "10px var(--space-4)",
        textAlign: c.align || "left",
        width: c.width,
        whiteSpace: "nowrap",
        fontSize: "var(--fs-caption)",
        fontWeight: "var(--fw-medium)",
        letterSpacing: "var(--ls-caption)",
        color: "var(--text-muted)"
      }
    }, c.sortable ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onSortChange && onSortChange({
        key: c.key,
        dir: active && sort.dir === "asc" ? "desc" : "asc"
      }),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        border: 0,
        background: "none",
        padding: 0,
        cursor: "pointer",
        font: "inherit",
        color: active ? "var(--text-brand)" : "inherit"
      }
    }, c.title, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: active ? sort.dir === "asc" ? "arrow_upward" : "arrow_downward" : "unfold_more",
      size: 14
    })) : c.title);
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length + (selectable ? 1 : 0),
    style: {
      padding: 0
    }
  }, empty)) : rows.map((r, i) => {
    const k = keyOf(r, i);
    const on = selected.includes(k);
    return /*#__PURE__*/React.createElement("tr", {
      key: k,
      onClick: () => onRowClick && onRowClick(r),
      style: {
        height: h,
        borderBottom: "1px solid var(--table-divider)",
        background: on ? "var(--surface-selected)" : "transparent",
        cursor: onRowClick ? "pointer" : undefined,
        boxShadow: on ? "inset var(--border-indicator) 0 0 0 var(--brand-600)" : "none",
        transition: "background var(--dur-micro) var(--ease-out)"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--table-row-hover)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, selectable ? /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "0 0 0 var(--space-4)"
      },
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
      checked: on,
      onChange: v => toggleOne(k, v)
    })) : null, columns.map(c => /*#__PURE__*/React.createElement("td", {
      key: c.key,
      style: {
        padding: dense ? "6px var(--space-4)" : "10px var(--space-4)",
        textAlign: c.align || "left",
        fontSize: "var(--fs-body-s)",
        color: "var(--text-body)",
        whiteSpace: c.wrap ? "normal" : "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: c.width || 320,
        fontVariantNumeric: c.align === "right" ? "tabular-nums" : undefined,
        fontFamily: c.align === "right" ? "var(--font-western)" : undefined
      }
    }, c.render ? c.render(r[c.key], r) : r[c.key])));
  })))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/forms/DatePicker.jsx
try { (() => {
const WEEK = ["一", "二", "三", "四", "五", "六", "日"];
const pad = n => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

/** 日期选择器 — ISO 8601 值（2026-07-20），周一为首日。 */
function DatePicker({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  disabled,
  id,
  status = "default",
  style
}) {
  const [open, setOpen] = React.useState(false);
  const parsed = value ? new Date(value + "T00:00:00") : null;
  const [view, setView] = React.useState(() => parsed || new Date(2026, 6, 1));
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [open]);
  const y = view.getFullYear(),
    m = view.getMonth();
  const first = new Date(y, m, 1).getDay();
  const lead = (first + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({
    length: days
  }, (_, i) => i + 1)];
  const border = status === "error" ? "var(--state-error)" : open ? "var(--field-border-focus)" : "var(--field-border)";
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: id,
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    style: {
      width: "100%",
      height: "var(--field-height)",
      padding: "0 10px 0 var(--field-pad-x)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      background: disabled ? "var(--surface-sunken)" : "var(--field-bg)",
      border: `1px solid ${border}`,
      borderRadius: "var(--field-radius)",
      boxShadow: open ? "var(--ring-focus)" : "none",
      fontFamily: "var(--font-western)",
      fontSize: "var(--fs-body-m)",
      color: value ? "var(--text-heading)" : "var(--field-placeholder)",
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", null, value || placeholder), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendar_today",
    size: 18,
    color: "var(--text-subtle)"
  })), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      zIndex: 40,
      top: "calc(100% + 4px)",
      left: 0,
      width: 288,
      padding: "var(--space-3)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "\u4E0A\u4E00\u6708",
    onClick: () => setView(new Date(y, m - 1, 1)),
    style: {
      border: 0,
      background: "none",
      cursor: "pointer",
      display: "flex",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron_left",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-m)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-heading)"
    }
  }, y, " \u5E74 ", m + 1, " \u6708"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "\u4E0B\u4E00\u6708",
    onClick: () => setView(new Date(y, m + 1, 1)),
    style: {
      border: 0,
      background: "none",
      cursor: "pointer",
      display: "flex",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron_right",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 2
    }
  }, WEEK.map(w => /*#__PURE__*/React.createElement("span", {
    key: w,
    style: {
      textAlign: "center",
      fontSize: "var(--fs-caption)",
      color: "var(--text-subtle)",
      padding: "4px 0"
    }
  }, w)), cells.map((d, i) => {
    if (d == null) return /*#__PURE__*/React.createElement("span", {
      key: `e${i}`
    });
    const val = iso(y, m, d);
    const sel = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      type: "button",
      onClick: () => {
        onChange && onChange(val);
        setOpen(false);
      },
      style: {
        height: 32,
        border: 0,
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        background: sel ? "var(--brand-600)" : "transparent",
        color: sel ? "#fff" : "var(--text-body)",
        fontFamily: "var(--font-western)",
        fontSize: "var(--fs-body-s)",
        fontVariantNumeric: "tabular-nums"
      },
      onMouseEnter: e => {
        if (!sel) e.currentTarget.style.background = "var(--surface-hover)";
      },
      onMouseLeave: e => {
        if (!sel) e.currentTarget.style.background = "transparent";
      }
    }, d);
  }))) : null);
}
Object.assign(__ds_scope, { DatePicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DatePicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
/** 表单字段外壳 — 标签、必填星号、帮助文字、错误文字。所有输入型组件共用。 */
function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  success,
  children,
  style
}) {
  const msg = error || success || hint;
  const msgColor = error ? "var(--state-error)" : success ? "var(--state-success)" : "var(--text-subtle)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      minWidth: 0,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontSize: "var(--fs-body-s)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-heading)",
      fontFamily: "var(--font-sans)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--state-error)",
      marginLeft: 4
    },
    "aria-hidden": "true"
  }, "*") : null) : null, children, msg ? /*#__PURE__*/React.createElement("span", {
    role: error ? "alert" : undefined,
    style: {
      fontSize: "var(--fs-caption)",
      color: msgColor,
      lineHeight: 1.5
    }
  }, msg) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATUS = {
  default: "var(--field-border)",
  error: "var(--state-error)",
  success: "var(--state-success)"
};

/** 单行输入框 — 40px 高、6px 圆角、聚焦品牌色描边 + 3px 光环。 */
function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  status = "default",
  icon,
  suffix,
  disabled,
  readOnly,
  id,
  size = "m",
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const h = size === "l" ? 48 : size === "s" ? 32 : "var(--field-height)";
  const border = focus && status === "default" ? "var(--field-border-focus)" : hover && status === "default" && !disabled ? "var(--field-border-hover)" : STATUS[status];
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: h,
      padding: `0 var(--field-pad-x)`,
      background: disabled ? "var(--surface-sunken)" : "var(--field-bg)",
      border: `1px solid ${border}`,
      borderRadius: "var(--field-radius)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      transition: "border-color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out)",
      opacity: disabled ? "var(--state-disabled-opacity)" : 1,
      minWidth: 0,
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--text-subtle)"
  }) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    readOnly: readOnly,
    onChange: e => onChange && onChange(e.target.value, e),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    "aria-invalid": status === "error" || undefined,
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: "none",
      background: "transparent",
      font: "inherit",
      fontFamily: "var(--font-sans)",
      fontSize: size === "s" ? "var(--fs-body-s)" : "var(--fs-body-m)",
      color: "var(--text-heading)"
    }
  }, rest)), status === "error" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "error",
    size: 18,
    color: "var(--state-error)"
  }) : null, status === "success" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check_circle",
    size: 18,
    color: "var(--state-success)"
  }) : null, suffix && status === "default" ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-subtle)",
      flex: "0 0 auto"
    }
  }, suffix) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** 单选组 — 2–5 个互斥短选项；更多请用 Select。 */
function Radio({
  value,
  onChange,
  options = [],
  name,
  direction = "vertical",
  disabled,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: direction === "row" ? "row" : "column",
      gap: direction === "row" ? "var(--space-5)" : "var(--space-3)",
      flexWrap: "wrap",
      ...style
    }
  }, options.map(o => {
    const on = o.value === value;
    const off = disabled || o.disabled;
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      style: {
        display: "inline-flex",
        alignItems: "flex-start",
        gap: "var(--space-2)",
        cursor: off ? "not-allowed" : "pointer",
        opacity: off ? "var(--state-disabled-opacity)" : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-m)",
        color: "var(--text-body)"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      checked: on,
      disabled: off,
      onChange: () => onChange && onChange(o.value),
      style: {
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        marginTop: 3,
        flex: "0 0 auto",
        borderRadius: "var(--radius-full)",
        border: `1px solid ${on ? "var(--brand-600)" : "var(--border-default)"}`,
        background: "var(--surface-card)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color var(--dur-micro) var(--ease-out)"
      }
    }, on ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "var(--radius-full)",
        background: "var(--brand-600)"
      }
    }) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", null, o.label), o.hint ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-caption)",
        color: "var(--text-subtle)"
      }
    }, o.hint) : null));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/** 选择器 — 触发区同 Input；下拉面板 10px 圆角，选中项品牌色 + 对勾。 */
function Select({
  value,
  onChange,
  options = [],
  placeholder = "请选择",
  disabled,
  id,
  status = "default",
  style
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const esc = e => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  const current = options.find(o => o.value === value);
  const border = status === "error" ? "var(--state-error)" : open ? "var(--field-border-focus)" : "var(--field-border)";
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: id,
    disabled: disabled,
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    onClick: () => setOpen(o => !o),
    style: {
      width: "100%",
      height: "var(--field-height)",
      padding: "0 10px 0 var(--field-pad-x)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-2)",
      background: disabled ? "var(--surface-sunken)" : "var(--field-bg)",
      border: `1px solid ${border}`,
      borderRadius: "var(--field-radius)",
      boxShadow: open ? "var(--ring-focus)" : "none",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-m)",
      color: current ? "var(--text-heading)" : "var(--field-placeholder)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? "var(--state-disabled-opacity)" : 1,
      transition: "border-color var(--dur-micro) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, current ? current.label : placeholder), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "expand_more",
    size: 20,
    color: "var(--text-subtle)",
    style: {
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--dur-micro) var(--ease-out)"
    }
  })), open ? /*#__PURE__*/React.createElement("ul", {
    role: "listbox",
    style: {
      position: "absolute",
      zIndex: 40,
      top: "calc(100% + 4px)",
      left: 0,
      right: 0,
      margin: 0,
      padding: "var(--space-1)",
      listStyle: "none",
      maxHeight: 256,
      overflowY: "auto",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)"
    }
  }, options.map(o => {
    const sel = o.value === value;
    return /*#__PURE__*/React.createElement("li", {
      key: o.value,
      role: "option",
      "aria-selected": sel
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => {
        onChange && onChange(o.value);
        setOpen(false);
      },
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: "8px 10px",
        border: 0,
        borderRadius: "var(--radius-sm)",
        background: sel ? "var(--surface-brand-subtle)" : "transparent",
        color: sel ? "var(--text-brand)" : "var(--text-body)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-m)",
        textAlign: "left",
        cursor: "pointer"
      },
      onMouseEnter: e => {
        if (!sel) e.currentTarget.style.background = "var(--surface-hover)";
      },
      onMouseLeave: e => {
        if (!sel) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", null, o.label), sel ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 18
    }) : null));
  })) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 多行输入 — 与 Input 同描边逻辑，最小 3 行，可选字数计数。 */
function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  maxLength,
  status = "default",
  disabled,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const border = status === "error" ? "var(--state-error)" : status === "success" ? "var(--state-success)" : focus ? "var(--field-border-focus)" : "var(--field-border)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: disabled ? "var(--surface-sunken)" : "var(--field-bg)",
      border: `1px solid ${border}`,
      borderRadius: "var(--field-radius)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      transition: "border-color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out)",
      opacity: disabled ? "var(--state-disabled-opacity)" : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    id: id,
    value: value,
    rows: rows,
    placeholder: placeholder,
    maxLength: maxLength,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value, e),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    "aria-invalid": status === "error" || undefined,
    style: {
      border: 0,
      outline: "none",
      background: "transparent",
      resize: "vertical",
      padding: "10px var(--field-pad-x)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-m)",
      lineHeight: "var(--lh-body-m)",
      color: "var(--text-heading)"
    }
  }, rest)), maxLength ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--field-pad-x) 8px",
      textAlign: "right",
      fontFamily: "var(--font-western)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-subtle)"
    }
  }, (value || "").length, " / ", maxLength) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
/** 面包屑 — md 断点以上使用；最后一项为当前位置，不可点击。 */
function Breadcrumbs({
  items = [],
  onSelect,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "\u9762\u5305\u5C51",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      flexWrap: "wrap",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-s)",
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: it.key || i
    }, last ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        color: "var(--text-heading)",
        fontWeight: "var(--fw-medium)"
      }
    }, it.label) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onSelect && onSelect(it.key),
      style: {
        border: 0,
        background: "none",
        padding: 0,
        cursor: "pointer",
        font: "inherit",
        color: "var(--text-muted)"
      },
      onMouseEnter: e => {
        e.currentTarget.style.color = "var(--text-brand)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.color = "var(--text-muted)";
      }
    }, it.label), !last ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron_right",
      size: 16,
      color: "var(--text-subtle)"
    }) : null);
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/EntitySwitcher.jsx
try { (() => {
const ENTITIES = [{
  key: "stg",
  code: "STG",
  name: "源裕兴创新未来",
  color: "var(--stg-600)"
}, {
  key: "ste",
  code: "STE",
  name: "九派国有能源",
  color: "var(--ste-600)"
}, {
  key: "sti",
  code: "STI",
  name: "源裕兴进出口贸易",
  color: "var(--sti-600)"
}, {
  key: "sth",
  code: "STH",
  name: "源裕兴健康科技",
  color: "var(--sth-600)"
}, {
  key: "edu",
  code: "EDU",
  name: "崇仁教育",
  color: "var(--edu-600)"
}];

/** 五实体切换器 — 切换 data-theme，全站主色随之重映射。 */
function EntitySwitcher({
  value = "stg",
  onChange,
  compact = false,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const cur = ENTITIES.find(e => e.key === value) || ENTITIES[0];
  const pick = k => {
    if (onChange) onChange(k);
    setOpen(false);
  };
  if (compact) {
    return /*#__PURE__*/React.createElement("div", {
      role: "group",
      "aria-label": "\u5B9E\u4F53\u5207\u6362",
      style: {
        display: "flex",
        gap: 6,
        ...style
      }
    }, ENTITIES.map(e => /*#__PURE__*/React.createElement("button", {
      key: e.key,
      type: "button",
      onClick: () => pick(e.key),
      title: `${e.code} ${e.name}`,
      "aria-pressed": e.key === value,
      style: {
        width: 20,
        height: 3,
        borderRadius: 0,
        cursor: "pointer",
        background: e.color,
        border: 0,
        outline: e.key === value ? "1px solid var(--text-subtle)" : "none",
        outlineOffset: 3,
        opacity: e.key === value ? 1 : .5
      }
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    "aria-expanded": open,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      width: "100%",
      height: 44,
      padding: "0 10px",
      background: "var(--surface-sunken)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      height: 20,
      background: cur.color,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 11,
      letterSpacing: ".14em",
      color: "var(--text-subtle)",
      flex: "0 0 auto"
    }
  }, cur.code), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "left",
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-body-s)",
      color: "var(--text-heading)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, cur.name), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "unfold_more",
    size: 18,
    color: "var(--text-subtle)"
  })), open ? /*#__PURE__*/React.createElement("ul", {
    style: {
      position: "absolute",
      zIndex: 60,
      top: "calc(100% + 4px)",
      left: 0,
      right: 0,
      margin: 0,
      padding: "var(--space-1)",
      listStyle: "none",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)"
    }
  }, ENTITIES.map(e => /*#__PURE__*/React.createElement("li", {
    key: e.key
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => pick(e.key),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      width: "100%",
      padding: "8px 8px",
      border: 0,
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      background: e.key === value ? "var(--surface-hover)" : "transparent",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      height: 16,
      background: e.color,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 11,
      color: "var(--text-subtle)",
      letterSpacing: ".04em"
    }
  }, e.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-body-s)",
      color: "var(--text-heading)"
    }
  }, e.name))))) : null);
}
Object.assign(__ds_scope, { EntitySwitcher });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/EntitySwitcher.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavRail.jsx
try { (() => {
/** 侧轨导航 — 76px 收起 / 264px 展开；4–7 个一级节点，桌面端首选。 */
function NavRail({
  items = [],
  activeKey,
  onSelect,
  expanded = false,
  header,
  footer,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: expanded ? "var(--drawer-width)" : "var(--rail-width)",
      flex: "0 0 auto",
      alignSelf: "stretch",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      padding: "var(--space-4) var(--space-3)",
      background: "var(--surface-card)",
      borderRight: "1px solid var(--border-subtle)",
      transition: "width var(--dur-transition) var(--ease-emphasized)",
      ...style
    }
  }, header ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--space-1) var(--space-3)"
    }
  }, header) : null, items.map(it => {
    const on = it.key === activeKey;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onSelect && onSelect(it.key),
      "aria-current": on ? "page" : undefined,
      title: expanded ? undefined : it.label,
      style: {
        display: "flex",
        alignItems: "center",
        gap: expanded ? "var(--space-3)" : 0,
        justifyContent: expanded ? "flex-start" : "center",
        height: 44,
        padding: expanded ? "0 var(--space-3)" : 0,
        border: 0,
        borderRadius: "var(--radius-lg)",
        background: on ? "var(--surface-brand-subtle)" : "transparent",
        color: on ? "var(--text-brand)" : "var(--text-muted)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-s)",
        fontWeight: on ? "var(--fw-medium)" : "var(--fw-regular)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--surface-hover)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 22,
      fill: on ? 1 : 0
    }), expanded ? /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: "nowrap"
      }
    }, it.label) : null, it.badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        minWidth: 18,
        height: 18,
        padding: "0 5px",
        display: expanded ? "inline-flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-full)",
        background: "var(--state-error)",
        color: "#fff",
        fontFamily: "var(--font-western)",
        fontSize: 11
      }
    }, it.badge) : null);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), footer);
}
Object.assign(__ds_scope, { NavRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavRail.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** 标签页 — 同级内容切换，2–6 项；选中项 2px 品牌色下划线。 */
function Tabs({
  items = [],
  activeKey,
  onSelect,
  size = "m",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: "var(--space-5)",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, items.map(it => {
    const on = it.key === activeKey;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      role: "tab",
      "aria-selected": on,
      onClick: () => onSelect && onSelect(it.key),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: size === "s" ? "8px 0" : "12px 0",
        border: 0,
        background: "none",
        borderBottom: `var(--border-emphasis) solid ${on ? "var(--brand-600)" : "transparent"}`,
        marginBottom: -1,
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: size === "s" ? "var(--fs-body-s)" : "var(--fs-body-m)",
        fontWeight: on ? "var(--fw-medium)" : "var(--fw-regular)",
        color: on ? "var(--text-heading)" : "var(--text-muted)",
        transition: "color var(--dur-micro) var(--ease-out), border-color var(--dur-micro) var(--ease-out)"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.color = "var(--text-heading)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.color = "var(--text-muted)";
      }
    }, it.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 18
    }) : null, it.label, it.count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-western)",
        fontSize: "var(--fs-caption)",
        color: "var(--text-subtle)",
        fontVariantNumeric: "tabular-nums"
      }
    }, it.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopAppBar.jsx
try { (() => {
/** 顶部应用栏 — 64px 高、宣纸底 + 1px 下描边；左侧 SINOTAO 字标，中部导航，右侧操作。 */
function TopAppBar({
  logoSrc,
  brand,
  items = [],
  activeKey,
  onSelect,
  actions,
  sticky = true,
  tone = "paper",
  style
}) {
  const inverse = tone === "inverse";
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: sticky ? "sticky" : "relative",
      top: 0,
      zIndex: 50,
      height: "var(--appbar-height)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-6)",
      padding: "0 var(--space-6)",
      background: inverse ? "var(--surface-inverse)" : "color-mix(in oklch, var(--surface-page) 88%, transparent)",
      backdropFilter: "saturate(160%) blur(12px)",
      borderBottom: `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-subtle)"}`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      textDecoration: "none",
      flex: "0 0 auto"
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "SINOTAO \u6E90\u88D5\u5174",
    style: {
      height: 20,
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-wordmark)",
      fontWeight: 800,
      fontSize: 17,
      letterSpacing: "-0.01em",
      color: inverse ? "var(--ink-50)" : "var(--ink-900)"
    }
  }, "SINOTAO"), brand ? /*#__PURE__*/React.createElement("span", {
    style: {
      paddingLeft: "var(--space-3)",
      borderLeft: `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-default)"}`,
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-body-m)",
      color: inverse ? "var(--ink-200)" : "var(--text-body)"
    }
  }, brand) : null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1)",
      flex: 1,
      minWidth: 0
    }
  }, items.map(it => {
    const on = it.key === activeKey;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onSelect && onSelect(it.key),
      "aria-current": on ? "page" : undefined,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 34,
        padding: "0 12px",
        border: 0,
        borderRadius: "var(--radius-md)",
        background: on ? inverse ? "rgba(255,251,245,.10)" : "var(--surface-brand-subtle)" : "transparent",
        color: on ? inverse ? "var(--ink-50)" : "var(--text-brand)" : inverse ? "var(--ink-300)" : "var(--text-body)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-s)",
        fontWeight: on ? "var(--fw-medium)" : "var(--fw-regular)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)"
      }
    }, it.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 18
    }) : null, it.label);
  })), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      flex: "0 0 auto"
    }
  }, actions) : null);
}
Object.assign(__ds_scope, { TopAppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopAppBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand_site/EntityScreen.jsx
try { (() => {
const {
  Button,
  Icon,
  Tag,
  Card,
  Tabs
} = window.SINOTAODesignSystem_b6947e;
const NS_ = window.SINOTAODesignSystem_b6947e || {};
const Reveal = NS_.Reveal || (({
  children,
  as = "div",
  style,
  ...r
}) => React.createElement(as, {
  style,
  ...r
}, children));
const DATA = {
  stg: {
    theme: "stg",
    code: "STG",
    name: "源裕兴创新未来",
    en: "Sinotao Innovation Future",
    claim: "把五家公司的判断力，收在同一套标准里",
    lede: "战略中枢承担资本配置、合规治理与品牌宪法，让五个实体各自专业而不各自为战。",
    facts: [["下属实体", "5 家"], ["合并营收", "18.64 亿"], ["设计令牌", "375 个"], ["制度执行率", "96%"]],
    lines: ["资本配置与投后管理", "合规治理与审计", "品牌宪法与设计系统", "五实体协同与共享服务"]
  },
  ste: {
    theme: "ste",
    code: "STE",
    name: "九派国有能源",
    en: "Jiupai State Energy",
    claim: "生物质热电联产，让农业余料成为工业动力",
    lede: "赤湖工业园两台 30MW 生物质机组，年供汽 126 万吨，替代园区 14 台分散燃煤小锅炉。",
    facts: [["装机容量", "2 × 30 MW"], ["年供汽", "126 万吨"], ["燃料半径", "≤ 80 km"], ["年减排", "41.2 万吨"]],
    lines: ["生物质发电与供汽", "燃料收储与化验", "碳资产与 CCER 开发", "灰渣资源化利用"]
  },
  sti: {
    theme: "sti",
    code: "STI",
    name: "源裕兴进出口贸易",
    en: "Sinotao Trade",
    claim: "把长江水运的效率，接到全球航线上",
    lede: "以九江港为枢纽的多式联运方案，覆盖报关、结汇、税务合规与目的港交付。",
    facts: [["年报关单量", "12,800 票"], ["合作口岸", "26 个"], ["平均通关", "1.8 天"], ["CBAM 覆盖", "已适配"]],
    lines: ["报关与合规", "多式联运", "汇率与结算", "跨境电商供应链"]
  },
  sth: {
    theme: "sth",
    code: "STH",
    name: "源裕兴健康科技",
    en: "Sinotao Health",
    claim: "把材料科学的进展，做成能进病房的产品",
    lede: "PHA 医用粒料与药物递送载体的中试与注册，遵循 GMP 全流程文档管理。",
    facts: [["在研产品", "9 项"], ["中试线", "2 条"], ["GMP 审计", "全部通过"], ["合作医院", "18 家"]],
    lines: ["PHA 医用材料", "药物递送载体", "检测与临床数据", "GMP 合规文档"]
  },
  edu: {
    theme: "edu",
    code: "EDU",
    name: "崇仁教育",
    en: "Chongren Education",
    claim: "让每个孩子的成长有一份看得见的档案",
    lede: "K12 学生成长档案与家校协同平台，覆盖教务、评估与家长端。",
    facts: [["在校学生", "6,200 人"], ["家校活跃", "92%"], ["教师", "418 人"], ["校区", "5 个"]],
    lines: ["学生成长档案", "家校协同", "教务与评估", "素质课程体系"]
  }
};
function EntityScreen() {
  const [key, setKey] = React.useState("ste");
  const d = DATA[key];
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": d.theme
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-page)",
      padding: "64px clamp(24px,5vw,80px) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    activeKey: key,
    onSelect: setKey,
    items: Object.values(DATA).map(e => ({
      key: e.theme,
      label: e.name
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-page)",
      padding: "clamp(56px,7vw,104px) clamp(24px,5vw,80px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    rise: 16,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      height: 18,
      background: "var(--brand-600)",
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 11,
      letterSpacing: ".16em",
      color: "var(--brand-500)"
    }
  }, d.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 11,
      letterSpacing: ".16em",
      textTransform: "uppercase",
      color: "var(--text-subtle)"
    }
  }, d.en)), /*#__PURE__*/React.createElement(Reveal, {
    as: "h1",
    rise: 32,
    index: 1,
    style: {
      marginTop: 32,
      fontFamily: "var(--font-display)",
      fontSize: "clamp(32px, 4.6vw, 68px)",
      fontWeight: 200,
      letterSpacing: "-.036em",
      lineHeight: 1.12,
      color: "var(--text-heading)",
      maxWidth: "17em",
      textWrap: "balance",
      wordBreak: "keep-all"
    }
  }, d.claim)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "clamp(40px,5vw,64px) auto 0",
      display: "grid",
      gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)",
      gap: "clamp(32px,5vw,72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    rise: 20,
    index: 2,
    style: {
      margin: 0,
      maxWidth: "30em",
      fontFamily: "var(--font-serif)",
      fontSize: 16,
      lineHeight: 2.1,
      color: "var(--text-muted)"
    }
  }, d.lede), /*#__PURE__*/React.createElement(Reveal, {
    rise: 16,
    index: 3,
    style: {
      display: "flex",
      gap: 12,
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    shape: "pill",
    size: "l",
    iconEnd: "arrow_outward"
  }, "\u4E1A\u52A1\u54A8\u8BE2"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    shape: "pill",
    size: "l",
    icon: "description"
  }, "\u4E0B\u8F7D\u8D44\u6599")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
      gap: 24,
      marginTop: 72,
      paddingTop: 36,
      borderTop: "var(--hairline)"
    }
  }, d.facts.map(([k, v], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: k,
    rise: 16,
    index: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: 500,
      color: "var(--text-subtle)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: "var(--font-western)",
      fontSize: "clamp(20px,2.2vw,28px)",
      fontWeight: 300,
      letterSpacing: "-.03em",
      color: "var(--text-heading)"
    }
  }, v))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-xl)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/biomass-plant-aerial.jpg",
    alt: "\u56ED\u533A\u5B9E\u666F",
    style: {
      width: "100%",
      height: 300,
      objectFit: "cover",
      display: "block",
      filter: "saturate(.74) contrast(1.02)"
    }
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Business lines",
    title: "\u4E1A\u52A1\u7EBF"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, d.lines.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: l,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 0",
      borderTop: i ? "var(--hairline)" : "0",
      fontFamily: "var(--font-display)",
      fontSize: 16,
      color: "var(--text-heading)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      height: 14,
      background: "var(--brand-600)",
      flex: "0 0 auto"
    }
  }), l))))))));
}
Object.assign(window, {
  EntityScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand_site/EntityScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand_site/HomeScreen.jsx
try { (() => {
const {
  Icon,
  PhiAnchor
} = window.SINOTAODesignSystem_b6947e;
const NS = window.SINOTAODesignSystem_b6947e || {};
// 新增导出的本地降级：bundle 滞后时降级为无动效/无版式的等价元素，绝不白屏
const Reveal = NS.Reveal || (({
  children,
  as = "div",
  style,
  ...r
}) => React.createElement(as, {
  style,
  ...r
}, children));
const RuleReveal = NS.RuleReveal || (({
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: "block",
    height: 1,
    background: "var(--border-subtle)",
    ...style
  }
}));
const Marquee = NS.Marquee || (({
  items = [],
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    padding: "40px 0",
    borderTop: "var(--hairline)",
    borderBottom: "var(--hairline)",
    ...style
  }
}, items.map(i => /*#__PURE__*/React.createElement("span", {
  key: i,
  style: {
    fontFamily: "var(--font-display)",
    fontSize: 32,
    fontWeight: 200,
    color: "var(--text-heading)"
  }
}, i))));
const StatBand = NS.StatBand || (({
  items = [],
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    background: "var(--surface-card)",
    borderRadius: "var(--card-radius)",
    ...style
  }
}, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
  key: it.label,
  style: {
    padding: 32,
    borderLeft: i ? "var(--hairline)" : 0
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "u-label"
}, it.label), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 16,
    fontFamily: "var(--font-western)",
    fontSize: 34,
    fontWeight: 300,
    letterSpacing: "-.03em",
    color: "var(--text-heading)"
  }
}, it.value, " ", /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 13,
    color: "var(--text-subtle)"
  }
}, it.unit))))));
const SectionHead = NS.SectionHead || (({
  eyebrow,
  title,
  lede,
  tone,
  style
}) => /*#__PURE__*/React.createElement("header", {
  style: {
    marginBottom: 80,
    ...style
  }
}, eyebrow ? /*#__PURE__*/React.createElement("div", {
  className: "u-eyebrow",
  style: {
    color: tone === "ink" ? "var(--gold-300)" : "var(--text-subtle)"
  }
}, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: "24px 0 0",
    fontFamily: "var(--font-display)",
    fontSize: "clamp(34px,4.4vw,64px)",
    fontWeight: 200,
    letterSpacing: "-.032em",
    lineHeight: 1.12,
    maxWidth: "15em",
    textWrap: "balance",
    wordBreak: "keep-all",
    color: tone === "ink" ? "var(--ink-50)" : "var(--text-heading)"
  }
}, title), lede ? /*#__PURE__*/React.createElement("p", {
  style: {
    margin: "32px 0 0",
    maxWidth: "26em",
    fontSize: 16,
    lineHeight: 1.9,
    color: tone === "ink" ? "var(--ink-300)" : "var(--text-muted)"
  }
}, lede) : null));
const ENTITIES = [{
  code: "STG",
  name: "源裕兴创新未来",
  role: "战略中枢 · 合规治理与资本配置",
  color: "var(--stg-600)",
  meta: "集团母体"
}, {
  code: "STE",
  name: "九派国有能源",
  role: "生物质热电联产、燃料收储与碳资产开发",
  color: "var(--ste-600)",
  meta: "2 × 30 MW"
}, {
  code: "STI",
  name: "源裕兴进出口贸易",
  role: "以九江港为枢纽的多式联运与报关合规",
  color: "var(--sti-600)",
  meta: "26 个口岸"
}, {
  code: "STH",
  name: "源裕兴健康科技",
  role: "PHA 医用材料与药物递送载体的中试与注册",
  color: "var(--sth-600)",
  meta: "9 项在研"
}, {
  code: "EDU",
  name: "崇仁教育",
  role: "K12 学生成长档案与家校协同",
  color: "var(--edu-600)",
  meta: "6,200 名学生"
}];
function Hero({
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: "min(92vh, 900px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/biomass-plant-aerial.jpg",
    alt: "\u8D64\u6E56\u5DE5\u4E1A\u56ED\u751F\u7269\u8D28\u70ED\u7535\u8054\u4EA7\u56ED\u533A\u822A\u62CD",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "saturate(.74) contrast(1.02)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(13,11,8,.92) 4%, rgba(13,11,8,.70) 32%, rgba(13,11,8,.40) 66%, rgba(13,11,8,.44) 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      padding: "160px clamp(24px,5vw,80px) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,8fr) minmax(0,4fr)",
      gap: "clamp(24px,4vw,64px)",
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, {
    rise: 16,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: "var(--gold-400)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 12,
      letterSpacing: ".2em",
      textTransform: "uppercase",
      color: "var(--gold-300)"
    }
  }, "Sinotao Innovation Future")), /*#__PURE__*/React.createElement(Reveal, {
    as: "h1",
    rise: 40,
    index: 1,
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "clamp(44px, 7.4vw, 104px)",
      fontWeight: 200,
      letterSpacing: "-.042em",
      lineHeight: 1.06,
      color: "var(--ink-50)",
      wordBreak: "keep-all"
    }
  }, "\u628A\u571F\u5730\u7684\u4F59\u6599\uFF0C", /*#__PURE__*/React.createElement("br", null), "\u8FD8\u7ED9\u571F\u5730\u4EE5\u7535\u4E0E\u70ED")), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    rise: 24,
    index: 2,
    style: {
      margin: "0 0 12px",
      fontFamily: "var(--font-serif)",
      fontSize: 16,
      lineHeight: 2.1,
      color: "rgba(251,249,245,.92)",
      borderLeft: "1px solid rgba(251,249,245,.34)",
      padding: "20px 24px",
      background: "rgba(13,11,8,.46)",
      backdropFilter: "blur(8px)"
    }
  }, "\u8D64\u6E56\u5DE5\u4E1A\u56ED\u4EE5\u751F\u7269\u8D28\u70ED\u7535\u8054\u4EA7\u4E3A\u6838\u5FC3\uFF0C\u4E32\u8D77\u751C\u9AD8\u7CB1\u79CD\u690D\u3001\u71C3\u6599\u6536\u50A8\u3001\u53D1\u7535\u4F9B\u6C7D\u4E0E\u78B3\u8D44\u4EA7\u5F00\u53D1\u7684\u5B8C\u6574\u94FE\u6761\u3002\u4E00\u5EA7\u7535\u5382\uFF0C\u540C\u65F6\u662F\u4E00\u7247\u519C\u7530\u7684\u4E0B\u6E38\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "clamp(32px,5vw,88px)",
      marginTop: "clamp(56px,8vw,112px)",
      paddingTop: 36,
      paddingBottom: 72,
      borderTop: "1px solid rgba(255,251,245,.18)",
      flexWrap: "wrap"
    }
  }, [["装机容量", "2 × 30", "MW"], ["年供汽能力", "126", "万吨"], ["年减排量", "41.2", "万吨 CO₂e"], ["带动农户", "3,400", "户"]].map(([k, v, u], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: k,
    rise: 18,
    index: i + 3,
    style: {
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: 500,
      color: "rgba(251,249,245,.62)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: "clamp(28px,3.4vw,44px)",
      fontWeight: 300,
      letterSpacing: "-.03em",
      lineHeight: 1,
      color: "var(--ink-50)"
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "rgba(255,251,245,.52)"
    }
  }, u)))))));
}
function HomeScreen({
  onSelect
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    onSelect: onSelect
  }), /*#__PURE__*/React.createElement(Section, {
    index: "01 / 04",
    eyebrow: "Five entities",
    title: "\u4E94\u5BB6\u516C\u53F8\uFF0C\u4E00\u4E2A\u5171\u751F\u4F53",
    lede: "\u5171\u7528\u4E00\u5957\u8BBE\u8BA1\u8BED\u6CD5\u4E0E\u6CBB\u7406\u6807\u51C6\uFF0C\u5404\u81EA\u751F\u957F\u51FA\u72EC\u7ACB\u7684\u8272\u5F69\u8EAB\u4EFD\u3002\u5BA2\u6237\u4ECE\u80FD\u6E90\u5207\u6362\u5230\u8D38\u6613\u65F6\uFF0C\u611F\u53D7\u5230\u7684\u4E0D\u662F\u300C\u6362\u4E86\u4E00\u5BB6\u516C\u53F8\u300D\uFF0C\u800C\u662F\u300C\u540C\u4E00\u4E2A\u54C1\u724C\uFF0C\u4E0D\u540C\u7684\u4E13\u5BB6\u300D\u3002"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "var(--hairline)"
    }
  }, ENTITIES.map((e, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: e.code,
    rise: 20,
    index: i
  }, /*#__PURE__*/React.createElement(RuleRow, {
    tick: e.color,
    code: e.code,
    title: e.name,
    desc: e.role,
    meta: e.meta,
    onClick: () => onSelect("entities")
  }))))), /*#__PURE__*/React.createElement(Marquee, {
    tone: "paper",
    items: ["守正", "开物", "共生", "生生不息", "海纳百川", "薪火相传"]
  }), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken",
    index: "02 / 04",
    eyebrow: "The loop",
    title: "\u4E00\u6761\u95ED\u73AF\uFF0C\u56DB\u6BB5\u4EF7\u503C",
    lede: "\u4ECE\u7530\u95F4\u5230\u7535\u7F51\uFF0C\u6BCF\u4E00\u6BB5\u90FD\u7559\u4E0B\u53EF\u6838\u9A8C\u7684\u51ED\u8BC1\uFF1A\u79CD\u690D\u5408\u540C\u3001\u6536\u50A8\u78C5\u5355\u3001\u71C3\u70E7\u53C2\u6570\u3001\u51CF\u6392\u7B7E\u53D1\u3002"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: 0
    }
  }, [{
    n: "01",
    t: "甜高粱与农林废弃物",
    d: "与 3,400 户农户签订种植与收储合同，秸秆不再露天焚烧。"
  }, {
    n: "02",
    t: "燃料收储与化验",
    d: "含水率、热值逐车化验，不合格即退运，质量档案随供应商长期累积。"
  }, {
    n: "03",
    t: "热电联产与供汽",
    d: "CFB 锅炉替代园区分散小锅炉，同时输出电力与工业蒸汽。"
  }, {
    n: "04",
    t: "碳资产与灰渣资源化",
    d: "减排量进入 CCER 开发，灰渣回田或制建材，闭环收口。"
  }].map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.n,
    rise: 28,
    index: i,
    style: {
      padding: "40px 36px 40px 0",
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 12,
      letterSpacing: ".2em",
      color: "var(--zhu-600)"
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontFamily: "var(--font-display)",
      fontSize: 22,
      fontWeight: 300,
      color: "var(--text-heading)",
      lineHeight: 1.5
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      marginBottom: 0,
      fontSize: 14,
      lineHeight: 2,
      color: "var(--text-muted)",
      maxWidth: "20em"
    }
  }, s.d))))), /*#__PURE__*/React.createElement(Section, {
    index: "03 / 04",
    eyebrow: "Governance",
    title: "\u80FD\u88AB\u5BA1\u8BA1\u7684\u627F\u8BFA\uFF0C\u624D\u7B97\u627F\u8BFA",
    lede: "\u53CD\u6F02\u7EFF\u662F\u786C\u7EA6\u675F\uFF1A\u4E0D\u5938\u5927\u73AF\u4FDD\u6210\u679C\uFF0C\u4E0D\u7528\u7EFF\u8272\u6EE4\u955C\u7C89\u9970\u7070\u8272\u64CD\u4F5C\u3002\u4EE5\u4E0B\u6570\u636E\u5747\u53EF\u8FFD\u6EAF\u5230\u51ED\u8BC1\u53F7\u3002"
  }, /*#__PURE__*/React.createElement(Reveal, {
    rise: 24
  }, /*#__PURE__*/React.createElement(StatBand, {
    items: [{
      label: "年度减排量",
      value: "41.2",
      unit: "万吨 CO₂e",
      delta: 6.8,
      deltaLabel: "较 2025"
    }, {
      label: "排放达标率",
      value: "100",
      unit: "%"
    }, {
      label: "供应商质量档案",
      value: "286",
      unit: "家",
      delta: 12.4,
      deltaLabel: "较去年"
    }, {
      label: "Token 引用率",
      value: "88",
      unit: "%",
      delta: 9.2,
      deltaLabel: "较上季"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
      gap: 64,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(PhiAnchor, {
    dimensions: ["守正", "共生"],
    source: "\xA733 ESG \xB7 \u53CD\u6F02\u7EFF\u5B88\u5219"
  }, "\u54C1\u724C\u4E0D\u5938\u5927\u73AF\u4FDD\u627F\u8BFA\uFF0C\u4E0D\u7528\u7EFF\u8272\u6EE4\u955C\u7C89\u9970\u7070\u8272\u64CD\u4F5C\u3002ESG \u4F20\u8FBE\u8981\u8BA9\u5229\u76CA\u76F8\u5173\u8005\u770B\u5230\u771F\u5B9E\u7684\u3001\u53EF\u9A8C\u8BC1\u7684\u884C\u52A8\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "30em"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 16,
      lineHeight: 2.1,
      color: "var(--text-body)"
    }
  }, "\u6211\u4EEC\u628A\u6CBB\u7406\u5199\u6210\u53EF\u6267\u884C\u7684\u89C4\u5219\uFF0C\u800C\u4E0D\u662F\u627F\u8BFA\u4E66\uFF1A\u989C\u8272\u4E0D\u5141\u8BB8\u786C\u7F16\u7801\u3001\u51CF\u6392\u91CF\u5FC5\u987B\u8FFD\u6EAF\u5230\u51ED\u8BC1\u53F7\u3001\u4F9B\u5E94\u5546\u4E0D\u5408\u683C\u5373\u9000\u8FD0\u3002\u89C4\u5219\u80FD\u88AB\u67E5\u8D26\uFF0C\u627F\u8BFA\u624D\u6709\u610F\u4E49\u3002")))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand_site/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand_site/Site.jsx
try { (() => {
const {
  Button,
  Icon,
  Card,
  PhiAnchor,
  Tag
} = window.SINOTAODesignSystem_b6947e;
const NS_ = window.SINOTAODesignSystem_b6947e || {};
const Reveal = NS_.Reveal || (({
  children,
  as = "div",
  style,
  ...r
}) => React.createElement(as, {
  style,
  ...r
}, children));
const RuleReveal = NS_.RuleReveal || (({
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: "block",
    height: 1,
    background: "var(--border-subtle)",
    ...style
  }
}));
function GovernanceScreen() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    index: "01 / 02",
    eyebrow: "Governance & ESG",
    title: "\u5B88\u6B63\uFF0C\u662F\u53EF\u4EE5\u88AB\u67E5\u8D26\u7684",
    lede: "\u54C1\u724C\u5BAA\u6CD5\u3001\u8BBE\u8BA1\u6CBB\u7406\u3001\u7248\u672C\u7BA1\u63A7\u2014\u2014\u4E0D\u6F02\u79FB\u7684\u524D\u63D0\u662F\u53EF\u8FFD\u6EAF\u3002\u4EE5\u4E0B\u662F\u6211\u4EEC\u5BF9\u5916\u516C\u5F00\u7684\u6CBB\u7406\u627F\u8BFA\u4E0E\u5176\u6838\u67E5\u65B9\u5F0F\u3002"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "var(--hairline)"
    }
  }, [{
    n: "01",
    t: "品牌宪法 V37",
    d: "375 个设计令牌构成单一可信源，颜色与间距不允许硬编码。",
    tag: "守正"
  }, {
    n: "02",
    t: "WCAG 2.2 AA",
    d: "正文对比度 ≥ 4.5:1，全键盘可操作，三平台屏幕阅读器每次发布回归。",
    tag: "共生"
  }, {
    n: "03",
    t: "反漂绿守则",
    d: "减排量必须可追溯到凭证号，宣传口径与监测平台数据一致。",
    tag: "守正"
  }, {
    n: "04",
    t: "DEI 出厂设置",
    d: "插画与摄影覆盖多元年龄、性别、职业；最小字号不低于 14px。",
    tag: "共生"
  }, {
    n: "05",
    t: "供应商准则",
    d: "286 家供应商的质量档案长期累积，不合格即退运。",
    tag: "守正"
  }, {
    n: "06",
    t: "健康度量",
    d: "视觉一致性 ≥95%、Token 引用率 100%，季度体检并公开。",
    tag: "开物"
  }].map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: c.t,
    rise: 20,
    index: i,
    style: {
      display: "grid",
      gridTemplateColumns: "48px minmax(0,1fr) minmax(0,1.3fr) 64px",
      alignItems: "baseline",
      gap: "clamp(16px,3vw,40px)",
      padding: "30px 0",
      borderTop: "var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 12,
      letterSpacing: ".18em",
      color: "var(--zhu-600)"
    }
  }, c.n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(18px,2vw,24px)",
      fontWeight: 300,
      letterSpacing: "-.016em",
      color: "var(--text-heading)"
    }
  }, c.t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1.9,
      color: "var(--text-muted)"
    }
  }, c.d), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "neutral",
    size: "s"
  }, c.tag)))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken",
    pad: "clamp(64px,8vw,120px)"
  }, /*#__PURE__*/React.createElement(PhiAnchor, {
    dimensions: ["共生"],
    source: "\xA720 \u65E0\u969C\u788D \xB7 \u51FA\u5382\u8BBE\u7F6E"
  }, "\u65E0\u969C\u788D\u4E0D\u662F\u9644\u52A0\u9879\uFF0C\u662F\u51FA\u5382\u8BBE\u7F6E\u3002WCAG 2.2 AA \u7684\u6BCF\u4E00\u6761\u51C6\u5219\u90FD\u5728\u56DE\u7B54\u540C\u4E00\u4E2A\u95EE\u9898\uFF1A\u6240\u6709\u4EBA\u90FD\u80FD\u5E73\u7B49\u5730\u4F7F\u7528\u6E90\u88D5\u5174\u7684\u4EA7\u54C1\u5417\uFF1F")));
}
function CareersScreen() {
  const roles = [{
    t: "热控工程师（DCS / CFB）",
    loc: "赤湖工业园",
    type: "全职"
  }, {
    t: "碳资产开发经理",
    loc: "九江 · 上海",
    type: "全职"
  }, {
    t: "报关与合规专员",
    loc: "九江港",
    type: "全职"
  }, {
    t: "前端工程师（设计系统）",
    loc: "远程可议",
    type: "全职"
  }, {
    t: "PHA 材料研究员",
    loc: "健康科技中试基地",
    type: "全职"
  }];
  return /*#__PURE__*/React.createElement(Section, {
    index: "02 / 02",
    eyebrow: "Careers",
    title: "\u6211\u4EEC\u62DB\u7684\u662F\u80FD\u628A\u4E8B\u60C5\u505A\u5B8C\u7684\u4EBA",
    lede: "\u4E94\u5927\u5B9E\u4F53\u5171\u7528\u4E00\u5957\u4EBA\u624D\u6807\u51C6\uFF1A\u628A\u590D\u6742\u95EE\u9898\u62C6\u5F00\u3001\u628A\u627F\u8BFA\u95ED\u73AF\u3001\u628A\u540C\u4E8B\u5F53\u957F\u671F\u540C\u884C\u8005\u3002"
  }, /*#__PURE__*/React.createElement(RuleReveal, null), /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "var(--hairline)"
    }
  }, roles.map((r, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: r.t,
    rise: 18,
    index: i
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32,
      padding: "34px 0",
      border: 0,
      borderTop: i ? "var(--hairline)" : 0,
      background: "transparent",
      cursor: "pointer",
      textAlign: "left",
      flexWrap: "wrap"
    },
    onMouseEnter: e => {
      e.currentTarget.querySelector("[data-arrow]").style.transform = "translateX(6px)";
    },
    onMouseLeave: e => {
      e.currentTarget.querySelector("[data-arrow]").style.transform = "none";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(19px,2.2vw,26px)",
      fontWeight: 300,
      letterSpacing: "-.016em",
      color: "var(--text-heading)"
    }
  }, r.t), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      fontFamily: "var(--font-western)",
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, r.loc), /*#__PURE__*/React.createElement("span", null, r.type), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow_outward",
    size: 20,
    color: "var(--brand-500)",
    "data-arrow": "",
    style: {
      transition: "transform var(--dur-transition) var(--ease-emphasized)"
    }
  })))))));
}
function Site() {
  const [page, setPage] = React.useState("home");
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const Screen = {
    home: HomeScreen,
    entities: EntityScreen,
    governance: GovernanceScreen,
    careers: CareersScreen
  }[page];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SiteHeader, {
    active: page,
    onSelect: setPage,
    inverse: page === "home"
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      marginTop: page === "home" ? -72 : 0
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    onSelect: setPage
  })), /*#__PURE__*/React.createElement(SiteFooter, {
    onSelect: setPage
  }));
}
const __rootEl = document.getElementById("root");
if (__rootEl) ReactDOM.createRoot(__rootEl).render(/*#__PURE__*/React.createElement(Site, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand_site/Site.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand_site/SiteChrome.jsx
try { (() => {
const {
  Button,
  Icon
} = window.SINOTAODesignSystem_b6947e;
const NS = window.SINOTAODesignSystem_b6947e || {};
// 新增导出的本地降级：bundle 滞后时降级为无动效/无版式的等价元素，绝不白屏
const Reveal = NS.Reveal || (({
  children,
  as = "div",
  style,
  ...r
}) => React.createElement(as, {
  style,
  ...r
}, children));
const RuleReveal = NS.RuleReveal || (({
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: "block",
    height: 1,
    background: "var(--border-subtle)",
    ...style
  }
}));
const Marquee = NS.Marquee || (({
  items = [],
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    padding: "40px 0",
    borderTop: "var(--hairline)",
    borderBottom: "var(--hairline)",
    ...style
  }
}, items.map(i => /*#__PURE__*/React.createElement("span", {
  key: i,
  style: {
    fontFamily: "var(--font-display)",
    fontSize: 32,
    fontWeight: 200,
    color: "var(--text-heading)"
  }
}, i))));
const StatBand = NS.StatBand || (({
  items = [],
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    background: "var(--surface-card)",
    borderRadius: "var(--card-radius)",
    ...style
  }
}, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
  key: it.label,
  style: {
    padding: 32,
    borderLeft: i ? "var(--hairline)" : 0
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "u-label"
}, it.label), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 16,
    fontFamily: "var(--font-western)",
    fontSize: 34,
    fontWeight: 300,
    letterSpacing: "-.03em",
    color: "var(--text-heading)"
  }
}, it.value, " ", /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 13,
    color: "var(--text-subtle)"
  }
}, it.unit))))));
const SectionHead = NS.SectionHead || (({
  eyebrow,
  title,
  lede,
  tone,
  style
}) => /*#__PURE__*/React.createElement("header", {
  style: {
    marginBottom: 80,
    ...style
  }
}, eyebrow ? /*#__PURE__*/React.createElement("div", {
  className: "u-eyebrow",
  style: {
    color: tone === "ink" ? "var(--gold-300)" : "var(--text-subtle)"
  }
}, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: "24px 0 0",
    fontFamily: "var(--font-display)",
    fontSize: "clamp(34px,4.4vw,64px)",
    fontWeight: 200,
    letterSpacing: "-.032em",
    lineHeight: 1.12,
    maxWidth: "15em",
    textWrap: "balance",
    wordBreak: "keep-all",
    color: tone === "ink" ? "var(--ink-50)" : "var(--text-heading)"
  }
}, title), lede ? /*#__PURE__*/React.createElement("p", {
  style: {
    margin: "32px 0 0",
    maxWidth: "26em",
    fontSize: 16,
    lineHeight: 1.9,
    color: tone === "ink" ? "var(--ink-300)" : "var(--text-muted)"
  }
}, lede) : null));
const NAV = [{
  key: "home",
  label: "集团概览"
}, {
  key: "entities",
  label: "五大实体"
}, {
  key: "governance",
  label: "治理与 ESG"
}, {
  key: "careers",
  label: "加入我们"
}];
function SiteHeader({
  active,
  onSelect,
  inverse
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      height: 80,
      display: "flex",
      alignItems: "center",
      gap: 48,
      padding: "0 clamp(24px, 5vw, 80px)",
      background: inverse ? "rgba(13,11,8,.52)" : "color-mix(in oklch, var(--surface-page) 90%, transparent)",
      backdropFilter: "saturate(150%) blur(16px)",
      borderBottom: inverse ? "1px solid rgba(255,251,245,.10)" : "var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onSelect("home"),
    style: {
      border: 0,
      background: "none",
      padding: 0,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `../../assets/logo-sinotao-${inverse ? "paper" : "ink"}.svg`,
    alt: "SINOTAO \u6E90\u88D5\u5174",
    style: {
      height: 18,
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32,
      flex: 1,
      minWidth: 0
    }
  }, NAV.map(n => {
    const on = n.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: n.key,
      onClick: () => onSelect(n.key),
      style: {
        position: "relative",
        padding: "4px 0",
        border: 0,
        background: "none",
        cursor: "pointer",
        color: inverse ? on ? "var(--ink-50)" : "rgba(255,251,245,.62)" : on ? "var(--text-heading)" : "var(--text-muted)",
        fontFamily: "var(--font-display)",
        fontSize: 15,
        whiteSpace: "nowrap",
        borderBottom: `1px solid ${on ? inverse ? "var(--gold-400)" : "var(--seal)" : "transparent"}`
      }
    }, n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      border: 0,
      background: "none",
      cursor: "pointer",
      fontFamily: "var(--font-western)",
      fontSize: 12,
      letterSpacing: ".16em",
      color: inverse ? "rgba(255,251,245,.62)" : "var(--text-muted)"
    }
  }, "EN"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onSelect("careers"),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 40,
      padding: "0 22px",
      border: `1px solid ${inverse ? "rgba(255,251,245,.34)" : "var(--ink-900)"}`,
      background: inverse ? "transparent" : "var(--ink-900)",
      color: inverse ? "var(--ink-50)" : "var(--ink-50)",
      borderRadius: "var(--radius-full)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: "nowrap"
    }
  }, "\u9884\u7EA6\u53C2\u89C2\u56ED\u533A", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow_outward",
    size: 18
  }))));
}

/** 版面容器：内容 1200px 上限，章节间距 160px，非对称留白 */
function Section({
  index,
  eyebrow,
  title,
  lede,
  children,
  tone = "paper",
  pad
}) {
  const inverse = tone === "ink";
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: inverse ? "var(--ink-900)" : tone === "sunken" ? "var(--ink-100)" : "var(--surface-page)",
      padding: `${pad || "clamp(80px, 10vw, 160px)"} clamp(24px, 5vw, 80px)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, title ? /*#__PURE__*/React.createElement(SectionHead, {
    index: index,
    eyebrow: eyebrow,
    title: title,
    lede: lede,
    tone: tone
  }) : null, children));
}

/** 细线行：品牌站的主要列表形态，取代卡片网格 */
function RuleRow({
  tick,
  code,
  title,
  desc,
  meta,
  onClick,
  inverse
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "grid",
      gridTemplateColumns: "56px minmax(0,1fr) minmax(0,1.1fr) auto",
      alignItems: "center",
      gap: "clamp(16px, 3vw, 48px)",
      width: "100%",
      padding: "32px 0",
      border: 0,
      borderTop: inverse ? "1px solid rgba(255,251,245,.12)" : "var(--hairline)",
      background: "transparent",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      height: 22,
      background: tick,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 11,
      letterSpacing: ".14em",
      color: inverse ? "rgba(255,251,245,.5)" : "var(--text-subtle)"
    }
  }, code)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(20px, 2.1vw, 28px)",
      fontWeight: 300,
      letterSpacing: "-.016em",
      color: inverse ? "var(--ink-50)" : "var(--text-heading)",
      transform: hover ? "translateX(6px)" : "none",
      transition: "transform var(--dur-transition) var(--ease-emphasized)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1.8,
      color: inverse ? "var(--ink-400)" : "var(--text-muted)"
    }
  }, desc), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      flex: "0 0 auto"
    }
  }, meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 13,
      color: inverse ? "var(--ink-400)" : "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, meta) : null, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 20,
      color: tick,
      transform: hover ? "translateX(4px)" : "none",
      transition: "transform var(--dur-transition) var(--ease-emphasized)"
    }
  }, "arrow_outward")));
}
function SiteFooter({
  onSelect
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--ink-950)",
      color: "var(--ink-400)",
      padding: "clamp(64px,8vw,112px) clamp(24px,5vw,80px) 48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(220px,1.5fr) repeat(3, minmax(110px,1fr))",
      gap: "clamp(24px,3.5vw,56px)",
      paddingBottom: 56,
      borderBottom: "1px solid rgba(255,251,245,.10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-sinotao-paper.svg",
    alt: "SINOTAO",
    style: {
      height: 22
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 28,
      maxWidth: "26em",
      fontFamily: "var(--font-serif)",
      fontSize: 15,
      lineHeight: 2,
      color: "var(--ink-500)"
    }
  }, "\u5B88\u6B63\u4E3A\u9AA8\uFF0C\u5F00\u7269\u4E3A\u7FFC\uFF0C\u5171\u751F\u4E3A\u8109\u3002")), [{
    t: "五大实体",
    items: ["九派国有能源", "源裕兴进出口贸易", "源裕兴健康科技", "崇仁教育"]
  }, {
    t: "治理",
    items: ["品牌宪法 V37", "ESG 报告", "合规与审计", "供应商准则"]
  }, {
    t: "联系",
    items: ["赤湖工业园", "招标与采购", "媒体咨询", "加入我们"]
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.t,
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "var(--ink-500)"
    }
  }, col.t), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "20px 0 0",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, col.items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onSelect("entities"),
    style: {
      border: 0,
      background: "none",
      padding: 0,
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontSize: 14,
      color: "var(--ink-300)"
    }
  }, i))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      paddingTop: 32,
      flexWrap: "wrap",
      fontSize: 12,
      color: "var(--ink-600)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 \u6E90\u88D5\u5174\u521B\u65B0\u672A\u6765 \xB7 Sinotao Innovation Future"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "\u5B88\u6B63 \xB7 \u5F00\u7269 \xB7 \u5171\u751F"))));
}
Object.assign(window, {
  SiteHeader,
  Section,
  RuleRow,
  SiteFooter,
  SITE_NAV: NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand_site/SiteChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ste_console/App.jsx
try { (() => {
const {
  NavRail,
  TopAppBar,
  IconButton,
  Badge,
  EntitySwitcher,
  Icon,
  Tooltip
} = window.SINOTAODesignSystem_b6947e;
const NAV = [{
  key: "dash",
  label: "经营看板",
  icon: "dashboard"
}, {
  key: "boiler",
  label: "锅炉工况",
  icon: "local_fire_department"
}, {
  key: "carbon",
  label: "碳资产",
  icon: "eco",
  badge: 2
}, {
  key: "fuel",
  label: "燃料供应",
  icon: "grass"
}];
function App() {
  const [key, setKey] = React.useState("dash");
  const [expanded, setExpanded] = React.useState(true);
  const [ent, setEnt] = React.useState("ste");
  React.useEffect(() => {
    document.documentElement.dataset.theme = ent;
  }, [ent]);
  const Screen = {
    dash: DashboardScreen,
    boiler: BoilerScreen,
    carbon: CarbonScreen,
    fuel: FuelScreen
  }[key];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      minHeight: "100vh",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement(NavRail, {
    items: NAV,
    activeKey: key,
    onSelect: setKey,
    expanded: expanded,
    header: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: expanded ? "space-between" : "center",
        gap: 8
      }
    }, expanded ? /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-sinotao-ink.svg",
      alt: "SINOTAO",
      style: {
        height: 17
      }
    }) : null, /*#__PURE__*/React.createElement(IconButton, {
      icon: expanded ? "menu_open" : "menu",
      label: expanded ? "收起导航" : "展开导航",
      size: "s",
      onClick: () => setExpanded(v => !v)
    })), expanded ? /*#__PURE__*/React.createElement(EntitySwitcher, {
      value: ent,
      onChange: setEnt
    }) : null),
    footer: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        borderTop: "1px solid var(--border-subtle)",
        paddingTop: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 40,
        padding: expanded ? "0 12px" : 0,
        justifyContent: expanded ? "flex-start" : "center",
        border: 0,
        background: "transparent",
        borderRadius: "var(--radius-lg)",
        cursor: "pointer",
        color: "var(--text-muted)",
        fontSize: 14,
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 22
    }), expanded ? "系统设置" : null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: expanded ? "8px 12px" : "8px 0",
        justifyContent: expanded ? "flex-start" : "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: "var(--radius-full)",
        background: "var(--brand-600)",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontFamily: "var(--font-display)",
        flex: "0 0 auto"
      }
    }, "\u738B"), expanded ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        flexDirection: "column",
        lineHeight: 1.3,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--text-heading)"
      }
    }, "\u738B\u5DE5"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-subtle)"
      }
    }, "\u8D64\u6E56\u5DE5\u4E1A\u56ED \xB7 \u503C\u957F")) : null))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(TopAppBar, {
    brand: "\u4E5D\u6D3E\u56FD\u6709\u80FD\u6E90 \xB7 \u8D64\u6E56\u5DE5\u4E1A\u56ED",
    items: [],
    activeKey: "",
    onSelect: () => {},
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tooltip, {
      content: "\u5168\u5C40\u641C\u7D22 \u2318K"
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "search",
      label: "\u5168\u5C40\u641C\u7D22"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "notifications",
      label: "\u901A\u77E5"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 2,
        right: 2
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      count: 3
    }))), /*#__PURE__*/React.createElement(IconButton, {
      icon: "help",
      label: "\u5E2E\u52A9"
    }))
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: "40px clamp(24px,3vw,48px) 72px",
      maxWidth: 1560,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    onOpenBoiler: () => setKey("boiler")
  }))));
}
const __rootEl = document.getElementById("root");
if (__rootEl) ReactDOM.createRoot(__rootEl).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ste_console/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ste_console/BoilerScreen.jsx
try { (() => {
const {
  Card,
  Tag,
  Badge,
  Button,
  IconButton,
  Icon,
  Tabs,
  Tooltip,
  Toast,
  Select,
  Field
} = window.SINOTAODesignSystem_b6947e;
function BoilerScreen() {
  const [unit, setUnit] = React.useState("b1");
  const [toast, setToast] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    crumbs: [{
      key: "dash",
      label: "经营看板"
    }, {
      key: "boiler",
      label: "锅炉工况"
    }, {
      label: "CFB 一号炉"
    }],
    title: "CFB \u4E00\u53F7\u7089\u5DE5\u51B5",
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      label: "\u8FD0\u884C\u4E2D \xB7 \u5DF2\u8FDE\u7EED\u8FD0\u884C 42 \u5929",
      pulse: true
    }), /*#__PURE__*/React.createElement("span", null, "\u91C7\u6837\u95F4\u9694 5s")),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 200
      }
    }, /*#__PURE__*/React.createElement(Select, {
      value: unit,
      onChange: setUnit,
      options: [{
        value: "b1",
        label: "CFB 一号炉"
      }, {
        value: "b2",
        label: "CFB 二号炉"
      }, {
        value: "b3",
        label: "CFB 三号炉（检修）"
      }, {
        value: "hr",
        label: "余热回收机组"
      }]
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "tune",
      onClick: () => setToast(true)
    }, "\u8C03\u6574\u71C3\u70E7\u53C2\u6570"))
  }), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 88,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 90
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "info",
    title: "\u53C2\u6570\u8C03\u6574\u5DF2\u8FDB\u5165\u5BA1\u6279\u6D41",
    description: "\u9700\u503C\u957F\u590D\u6838\u540E\u751F\u6548\uFF0C\u9884\u8BA1 10 \u5206\u949F\u5185\u3002",
    onClose: () => setToast(false)
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6,minmax(0,1fr))",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      gridColumn: "span 6"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Gauge, {
    label: "\u5E8A\u6E29",
    value: "892",
    unit: "\u2103",
    pct: 88
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "\u4E3B\u84B8\u6C7D\u538B\u529B",
    value: "9.62",
    unit: "MPa",
    pct: 82
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "\u4E3B\u84B8\u6C7D\u6E29\u5EA6",
    value: "540",
    unit: "\u2103",
    pct: 90
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "\u7ED9\u6C34\u6D41\u91CF",
    value: "386",
    unit: "t/h",
    pct: 74
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "\u4E00\u6B21\u98CE\u91CF",
    value: "128",
    unit: "km\xB3/h",
    pct: 66
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "\u6C27\u542B\u91CF",
    value: "4.8",
    unit: "%",
    pct: 38,
    tone: "warning"
  }))), /*#__PURE__*/React.createElement(Card, {
    style: {
      gridColumn: "span 4"
    },
    eyebrow: "Trend \xB7 12h",
    title: "\u5E8A\u6E29\u4E0E\u4E3B\u84B8\u6C7D\u538B\u529B"
  }, /*#__PURE__*/React.createElement(LineChart, {
    height: 230,
    series: [[880, 884, 890, 896, 892, 888, 894, 899, 892, 886, 890, 892], [9.4, 9.5, 9.55, 9.7, 9.62, 9.5, 9.58, 9.72, 9.62, 9.48, 9.55, 9.62]],
    labels: ["02:00", "05:00", "08:00", "11:00", "14:00"]
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      gridColumn: "span 2"
    },
    eyebrow: "Emissions",
    title: "\u6392\u653E\u5B9E\u65F6\u503C",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u6570\u636E\u540C\u6B65\u81F3\u7701\u7EA7\u76D1\u6D4B\u5E73\u53F0"), /*#__PURE__*/React.createElement(Icon, {
      name: "verified",
      size: 18,
      color: "var(--state-success)"
    }))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, [{
    k: "烟尘",
    v: "4.2",
    u: "mg/m³",
    limit: "≤10",
    ok: true
  }, {
    k: "二氧化硫",
    v: "18.6",
    u: "mg/m³",
    limit: "≤35",
    ok: true
  }, {
    k: "氮氧化物",
    v: "42.8",
    u: "mg/m³",
    limit: "≤50",
    ok: true
  }, {
    k: "汞及化合物",
    v: "0.006",
    u: "mg/m³",
    limit: "≤0.03",
    ok: true
  }].map(e => /*#__PURE__*/React.createElement("div", {
    key: e.k,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-body)"
    }
  }, e.k), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 15,
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-heading)"
    }
  }, e.v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-subtle)"
    }
  }, e.u), /*#__PURE__*/React.createElement(Tooltip, {
    content: `限值 ${e.limit} ${e.u}`
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "success",
    size: "s"
  }, "\u8FBE\u6807")))))))));
}
Object.assign(window, {
  BoilerScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ste_console/BoilerScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ste_console/CarbonScreen.jsx
try { (() => {
const {
  Card,
  Tag,
  Button,
  StatCard,
  Table,
  Icon,
  Modal,
  Field,
  Input,
  DatePicker,
  Select,
  Checkbox,
  PhiAnchor
} = window.SINOTAODesignSystem_b6947e;
const NS_ = window.SINOTAODesignSystem_b6947e || {};
const StatBand = NS_.StatBand || (() => null);
function CarbonScreen() {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("2,000");
  const [date, setDate] = React.useState("2026-09-15");
  const [ack, setAck] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    crumbs: [{
      key: "dash",
      label: "经营看板"
    }, {
      label: "碳资产"
    }],
    title: "\u78B3\u8D44\u4EA7\u4E0E\u914D\u989D",
    meta: /*#__PURE__*/React.createElement("span", null, "\u5C65\u7EA6\u5E74\u5EA6 2026 \xB7 \u5168\u56FD\u78B3\u5E02\u573A\uFF08\u53D1\u7535\u884C\u4E1A\uFF09"),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "description"
    }, "\u751F\u6210 CCER \u5907\u6848\u6750\u6599"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "add_shopping_cart",
      onClick: () => setOpen(true)
    }, "\u7533\u8D2D\u914D\u989D"))
  }), /*#__PURE__*/React.createElement(StatBand, {
    items: [{
      label: "年度配额总量",
      value: "428,000",
      unit: "吨",
      icon: "account_balance"
    }, {
      label: "已履约",
      value: "415,200",
      unit: "吨",
      delta: 2.4,
      deltaLabel: "较去年同期",
      icon: "task_alt"
    }, {
      label: "剩余配额",
      value: "12,800",
      unit: "吨",
      delta: -3.1,
      deltaLabel: "较上月",
      icon: "eco"
    }, {
      label: "CCER 可开发量",
      value: "86,400",
      unit: "吨",
      icon: "park"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
      gap: 24,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Ledger",
    title: "\u914D\u989D\u6D41\u6C34",
    padding: 0
  }, /*#__PURE__*/React.createElement(Table, {
    dense: true,
    columns: [{
      key: "date",
      title: "日期"
    }, {
      key: "type",
      title: "类型",
      render: v => /*#__PURE__*/React.createElement(Tag, {
        tone: v === "履约核销" ? "info" : v === "配额申购" ? "brand" : "success",
        size: "s"
      }, v)
    }, {
      key: "amount",
      title: "数量（吨）",
      align: "right",
      sortable: true
    }, {
      key: "price",
      title: "均价（元/吨）",
      align: "right"
    }, {
      key: "ref",
      title: "凭证号"
    }],
    rows: [{
      id: 1,
      date: "2026-08-31",
      type: "履约核销",
      amount: "-38,200",
      price: "—",
      ref: "CN-2026-08-0031"
    }, {
      id: 2,
      date: "2026-08-18",
      type: "配额申购",
      amount: "+20,000",
      price: "68.40",
      ref: "CN-2026-08-0018"
    }, {
      id: 3,
      date: "2026-07-31",
      type: "履约核销",
      amount: "-36,800",
      price: "—",
      ref: "CN-2026-07-0031"
    }, {
      id: 4,
      date: "2026-07-12",
      type: "CCER 签发",
      amount: "+14,600",
      price: "52.10",
      ref: "CCER-2026-0712"
    }, {
      id: 5,
      date: "2026-06-30",
      type: "履约核销",
      amount: "-35,400",
      price: "—",
      ref: "CN-2026-06-0030"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Reduction",
    title: "\u51CF\u6392\u8D21\u732E\u7ED3\u6784"
  }, /*#__PURE__*/React.createElement(BarRows, {
    rows: [{
      label: "生物质替代燃煤",
      value: 268,
      display: "26.8 万吨",
      color: "var(--ste-600)"
    }, {
      label: "供汽替代小锅炉",
      value: 94,
      display: "9.4 万吨",
      color: "var(--ste-400)"
    }, {
      label: "余热回收",
      value: 38,
      display: "3.8 万吨",
      color: "var(--gold-400)"
    }, {
      label: "灰渣资源化",
      value: 12,
      display: "1.2 万吨",
      color: "var(--ink-400)"
    }]
  })), /*#__PURE__*/React.createElement(PhiAnchor, {
    dimensions: ["共生", "守正"],
    source: "\xA733 ESG \xB7 \u53CD\u6F02\u7EFF\u5B88\u5219"
  }, "\u54C1\u724C\u4E0D\u5938\u5927\u73AF\u4FDD\u627F\u8BFA\uFF0C\u4E0D\u7528\u7EFF\u8272\u6EE4\u955C\u7C89\u9970\u7070\u8272\u64CD\u4F5C\u3002\u6BCF\u4E00\u5428\u51CF\u6392\u91CF\u90FD\u5FC5\u987B\u53EF\u6838\u9A8C\u3001\u53EF\u8FFD\u6EAF\u5230\u51ED\u8BC1\u53F7\u3002"))), /*#__PURE__*/React.createElement(Modal, {
    open: open,
    onClose: () => setOpen(false),
    title: "\u7533\u8D2D\u914D\u989D",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setOpen(false)
    }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      disabled: !ack,
      onClick: () => setOpen(false)
    }, "\u63D0\u4EA4\u7533\u8D2D"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u7533\u8D2D\u6570\u91CF",
    htmlFor: "q",
    required: true,
    hint: "\u4EE5\u5428\u4E3A\u5355\u4F4D\uFF0C1,000 \u5428\u8D77"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q",
    value: amount,
    onChange: setAmount,
    suffix: "\u5428"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u9884\u8BA1\u4EA4\u5272\u65E5",
    htmlFor: "dd",
    required: true
  }, /*#__PURE__*/React.createElement(DatePicker, {
    id: "dd",
    value: date,
    onChange: setDate
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u4EA4\u6613\u5E02\u573A",
    htmlFor: "mk",
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    id: "mk",
    value: "cn",
    onChange: () => {},
    options: [{
      value: "cn",
      label: "全国碳排放权交易市场（上海）"
    }, {
      value: "local",
      label: "地方试点市场"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "ack",
    checked: ack,
    onChange: setAck,
    label: "\u5DF2\u786E\u8BA4\u672C\u6B21\u7533\u8D2D\u5728\u5E74\u5EA6\u9884\u7B97\u4E0E\u6388\u6743\u989D\u5EA6\u5185"
  })))));
}
Object.assign(window, {
  CarbonScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ste_console/CarbonScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ste_console/DashboardScreen.jsx
try { (() => {
const {
  Card,
  StatCard,
  Tag,
  Badge,
  Button,
  IconButton,
  Icon,
  PhiAnchor
} = window.SINOTAODesignSystem_b6947e;
const StatBand = window.KitStatBand;
function DashboardScreen({
  onOpenBoiler
}) {
  const [range, setRange] = React.useState("d");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    title: "\u7ECF\u8425\u770B\u677F",
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      label: "\u5168\u90E8\u673A\u7EC4\u8FD0\u884C\u4E2D",
      pulse: true
    }), /*#__PURE__*/React.createElement("span", null, "2026-09-06 14:30"), /*#__PURE__*/React.createElement("span", null, "\u5408\u5E76\u53E3\u5F84")),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "l",
      icon: "download"
    }, "\u5BFC\u51FA\u65E5\u62A5"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "l",
      icon: "add"
    }, "\u65B0\u5EFA\u8C03\u5EA6\u5355"))
  }), /*#__PURE__*/React.createElement(StatBand, {
    items: [{
      label: "今日发电量",
      value: "128.4",
      unit: "万 kWh",
      delta: 4.2,
      deltaLabel: "较昨日",
      icon: "bolt"
    }, {
      label: "供汽量",
      value: "3,860",
      unit: "吨",
      delta: 1.8,
      deltaLabel: "较昨日",
      icon: "water_drop"
    }, {
      label: "燃料库存",
      value: "18,240",
      unit: "吨",
      delta: -6.4,
      deltaLabel: "较上周",
      icon: "grass"
    }, {
      label: "碳配额剩余",
      value: "12,800",
      unit: "吨",
      delta: -3.1,
      deltaLabel: "较上月",
      icon: "eco"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
      gap: 24,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      gridColumn: "span 2",
      minWidth: 0
    },
    eyebrow: "Generation \xB7 24h",
    title: "\u53D1\u7535\u8D1F\u8377\u4E0E\u4F9B\u6C7D\u8D1F\u8377",
    actions: /*#__PURE__*/React.createElement(ChipGroup, {
      active: range,
      onSelect: setRange,
      items: [{
        key: "d",
        label: "24 时"
      }, {
        key: "w",
        label: "7 日"
      }, {
        key: "m",
        label: "30 日"
      }]
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    items: [{
      label: "发电负荷 MW",
      color: "var(--brand-600)"
    }, {
      label: "供汽负荷 t/h",
      color: "var(--gold-500)"
    }]
  })), /*#__PURE__*/React.createElement(AreaChart, {
    height: 280,
    series: [[42, 46, 44, 52, 61, 68, 72, 70, 66, 64, 69, 74, 71], [28, 30, 29, 34, 38, 41, 44, 43, 40, 38, 42, 45, 44]],
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"]
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Boilers",
    title: "\u673A\u7EC4\u72B6\u6001",
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, [{
    name: "CFB 一号炉",
    load: "92.4",
    tone: "success",
    state: "运行中"
  }, {
    name: "CFB 二号炉",
    load: "88.1",
    tone: "success",
    state: "运行中"
  }, {
    name: "CFB 三号炉",
    load: "0.0",
    tone: "warning",
    state: "计划检修"
  }, {
    name: "余热回收机组",
    load: "76.5",
    tone: "success",
    state: "运行中"
  }].map((b, i) => /*#__PURE__*/React.createElement("button", {
    key: b.name,
    onClick: onOpenBoiler,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "20px 32px",
      border: 0,
      borderTop: i ? "var(--hairline)" : "0",
      background: "transparent",
      cursor: "pointer",
      textAlign: "left"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-sunken)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      color: "var(--text-heading)"
    }
  }, b.name), /*#__PURE__*/React.createElement(Badge, {
    tone: b.tone,
    label: b.state,
    pulse: b.tone === "success"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 3,
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 22,
      fontWeight: 300,
      letterSpacing: "-.02em",
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-heading)"
    }
  }, b.load), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)"
    }
  }, "%"))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
      gap: 24,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Fuel mix",
    title: "\u71C3\u6599\u7ED3\u6784"
  }, /*#__PURE__*/React.createElement(BarRows, {
    rows: [{
      label: "农林废弃物",
      value: 42,
      display: "42.0%",
      color: "var(--ste-600)"
    }, {
      label: "甜高粱秸秆",
      value: 27,
      display: "27.0%",
      color: "var(--ste-400)"
    }, {
      label: "木质颗粒",
      value: 19,
      display: "19.0%",
      color: "var(--gold-500)"
    }, {
      label: "其他生物质",
      value: 12,
      display: "12.0%",
      color: "var(--ink-400)"
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Alerts",
    title: "\u5F85\u5904\u7406\u4E8B\u9879",
    actions: /*#__PURE__*/React.createElement(Tag, {
      tone: "warning"
    }, "3 \u9879")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, [{
    icon: "eco",
    tone: "var(--state-warning)",
    t: "碳配额剩余低于 15%",
    d: "建议优化 CFB 燃烧参数或申购配额"
  }, {
    icon: "local_shipping",
    tone: "var(--state-info)",
    t: "3 车燃料到场待验收",
    d: "赤湖工业园 2 号卸料口"
  }, {
    icon: "build",
    tone: "var(--text-subtle)",
    t: "三号炉检修进入第 4 天",
    d: "计划 09-09 复役"
  }].map(a => /*#__PURE__*/React.createElement("div", {
    key: a.t,
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: 20,
    color: a.tone
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-heading)"
    }
  }, a.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 5,
      lineHeight: 1.8
    }
  }, a.d)))))), /*#__PURE__*/React.createElement(PhiAnchor, {
    dimensions: ["共生", "开物"],
    source: "\xA714 \u6570\u636E\u53EF\u89C6\u5316 \xB7 \u6570\u636E\u58A8\u6C34\u6BD4"
  }, "\u5220\u9664\u6240\u6709\u975E\u6570\u636E\u7684\u58A8\u8FF9\uFF0C\u8BA9\u4FE1\u606F\u672C\u8EAB\u6210\u4E3A\u89C6\u89C9\u7684\u4E3B\u89D2\u3002\u770B\u677F\u4E0D\u662F\u7ED9\u9886\u5BFC\u770B\u7684 PPT\uFF0C\u662F\u56ED\u533A\u7684\u4F53\u68C0\u62A5\u544A\u3002")));
}
Object.assign(window, {
  DashboardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ste_console/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ste_console/FuelScreen.jsx
try { (() => {
const {
  Card,
  Tag,
  Badge,
  Button,
  IconButton,
  Icon,
  Table,
  Pagination,
  EmptyState,
  Tabs,
  Drawer,
  Field,
  Input,
  Select,
  Textarea,
  Popconfirm,
  Toast,
  Checkbox
} = window.SINOTAODesignSystem_b6947e;
const FUEL = [{
  id: 1,
  no: "FS-2026-0906-01",
  supplier: "赤湖农林合作社",
  kind: "农林废弃物",
  tons: "320.4",
  moisture: "18.2%",
  heat: "3,180",
  status: "待验收",
  tone: "warning"
}, {
  id: 2,
  no: "FS-2026-0906-02",
  supplier: "江西甜高粱种植基地",
  kind: "甜高粱秸秆",
  tons: "268.0",
  moisture: "21.5%",
  heat: "3,040",
  status: "待验收",
  tone: "warning"
}, {
  id: 3,
  no: "FS-2026-0905-04",
  supplier: "九江木业",
  kind: "木质颗粒",
  tons: "180.6",
  moisture: "9.8%",
  heat: "4,260",
  status: "已入库",
  tone: "success"
}, {
  id: 4,
  no: "FS-2026-0905-03",
  supplier: "赤湖农林合作社",
  kind: "农林废弃物",
  tons: "412.2",
  moisture: "17.4%",
  heat: "3,220",
  status: "已入库",
  tone: "success"
}, {
  id: 5,
  no: "FS-2026-0905-01",
  supplier: "湖口秸秆收储中心",
  kind: "混合生物质",
  tons: "96.8",
  moisture: "26.9%",
  heat: "2,640",
  status: "已退运",
  tone: "error"
}];
function FuelScreen() {
  const [tab, setTab] = React.useState("all");
  const [sel, setSel] = React.useState([]);
  const [sort, setSort] = React.useState({
    key: "tons",
    dir: "desc"
  });
  const [page, setPage] = React.useState(1);
  const [row, setRow] = React.useState(null);
  const [pc, setPc] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const rows = tab === "all" ? FUEL : tab === "pending" ? FUEL.filter(r => r.status === "待验收") : [];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    crumbs: [{
      key: "dash",
      label: "经营看板"
    }, {
      label: "燃料供应"
    }],
    title: "\u71C3\u6599\u5230\u573A\u4E0E\u9A8C\u6536",
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "warning",
      label: "2 \u8F66\u5F85\u9A8C\u6536"
    }), /*#__PURE__*/React.createElement("span", null, "\u4ECA\u65E5\u7D2F\u8BA1\u5230\u573A 1,278 \u5428")),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popconfirm, {
      open: pc,
      title: `批量核销 ${sel.length} 条？`,
      description: "\u6838\u9500\u540E\u8FDB\u5165\u7ED3\u7B97\u6D41\u7A0B\uFF0C\u53EF\u5728\u7ED3\u7B97\u5355\u4E2D\u64A4\u56DE\u3002",
      confirmText: "\u6838\u9500",
      onConfirm: () => {
        setPc(false);
        setSel([]);
        setToast({
          tone: "success",
          title: "已提交核销",
          desc: "结算单将于次日生成。"
        });
      },
      onCancel: () => setPc(false)
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "done_all",
      disabled: !sel.length,
      onClick: () => setPc(true)
    }, "\u6279\u91CF\u6838\u9500", sel.length ? ` (${sel.length})` : "")), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "add"
    }, "\u767B\u8BB0\u5230\u573A"))
  }), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 88,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 90
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    title: toast.title,
    description: toast.desc,
    onClose: () => setToast(null)
  })) : null, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    activeKey: tab,
    onSelect: setTab,
    items: [{
      key: "all",
      label: "全部",
      count: 128
    }, {
      key: "pending",
      label: "待验收",
      count: 2
    }, {
      key: "rejected",
      label: "已退运",
      count: 0
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "\u641C\u7D22\u5355\u53F7\u6216\u4F9B\u5E94\u5546",
    value: "",
    onChange: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 180
    }
  }, /*#__PURE__*/React.createElement(Select, {
    value: "all",
    onChange: () => {},
    options: [{
      value: "all",
      label: "全部燃料类型"
    }, {
      value: "agri",
      label: "农林废弃物"
    }, {
      value: "sorghum",
      label: "甜高粱秸秆"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "filter_list",
    label: "\u66F4\u591A\u7B5B\u9009",
    variant: "outline"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "download",
    label: "\u5BFC\u51FA",
    variant: "outline"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 20px"
    }
  }, /*#__PURE__*/React.createElement(Table, {
    selectable: true,
    selected: sel,
    onSelectedChange: setSel,
    sort: sort,
    onSortChange: setSort,
    onRowClick: setRow,
    columns: [{
      key: "no",
      title: "到场单号"
    }, {
      key: "supplier",
      title: "供应商"
    }, {
      key: "kind",
      title: "燃料类型",
      render: v => /*#__PURE__*/React.createElement(Tag, {
        tone: "neutral",
        size: "s"
      }, v)
    }, {
      key: "tons",
      title: "净重（吨）",
      align: "right",
      sortable: true
    }, {
      key: "moisture",
      title: "含水率",
      align: "right"
    }, {
      key: "heat",
      title: "热值 kcal/kg",
      align: "right",
      sortable: true
    }, {
      key: "status",
      title: "状态",
      render: (v, r) => /*#__PURE__*/React.createElement(Tag, {
        tone: r.tone
      }, v)
    }],
    rows: rows,
    empty: /*#__PURE__*/React.createElement(EmptyState, {
      compact: true,
      icon: "inventory_2",
      title: "\u672C\u9875\u6682\u65E0\u9000\u8FD0\u8BB0\u5F55",
      hint: "\u9000\u8FD0\u4F1A\u5728\u9A8C\u6536\u4E0D\u5408\u683C\u65F6\u81EA\u52A8\u51FA\u73B0\u5728\u8FD9\u91CC\u3002"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    pageSize: 20,
    total: 128,
    onChange: setPage
  })))), /*#__PURE__*/React.createElement(Drawer, {
    open: !!row,
    onClose: () => setRow(null),
    title: row ? row.no : "",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setRow(null)
    }, "\u5173\u95ED"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "task_alt",
      onClick: () => {
        setRow(null);
        setToast({
          tone: "success",
          title: "已验收入库",
          desc: "库存已同步至 Odoo 库存模块。"
        });
      }
    }, "\u786E\u8BA4\u9A8C\u6536\u5165\u5E93"))
  }, row ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, [["供应商", row.supplier], ["燃料类型", row.kind], ["净重", row.tons + " 吨"], ["含水率", row.moisture], ["热值", row.heat + " kcal/kg"], ["卸料口", "赤湖工业园 2 号"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: "var(--text-heading)",
      marginTop: 2
    }
  }, v)))), /*#__PURE__*/React.createElement(Field, {
    label: "\u5316\u9A8C\u7ED3\u8BBA",
    htmlFor: "lab",
    hint: "\u5C06\u5199\u5165\u4F9B\u5E94\u5546\u8D28\u91CF\u6863\u6848"
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "lab",
    rows: 3,
    value: "\u542B\u6C34\u7387\u3001\u70ED\u503C\u5747\u5728\u5408\u540C\u533A\u95F4\u5185\uFF0C\u5141\u8BB8\u5165\u5E93\u3002",
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(Checkbox, {
    id: "sync",
    checked: true,
    label: "\u540C\u6B65\u751F\u6210\u7ED3\u7B97\u6682\u4F30\u5355",
    onChange: () => {}
  })) : null));
}
Object.assign(window, {
  FuelScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ste_console/FuelScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ste_console/Parts.jsx
try { (() => {
const {
  Card,
  Icon,
  Tag,
  Badge,
  Button,
  IconButton,
  StatCard,
  Table,
  Pagination,
  EmptyState,
  Tabs,
  Breadcrumbs,
  NavRail,
  TopAppBar,
  EntitySwitcher,
  Modal,
  Drawer,
  Toast,
  Tooltip,
  Field,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Textarea,
  Popconfirm,
  PhiAnchor,
  TaijiSpinner
} = window.SINOTAODesignSystem_b6947e;
const NS = window.SINOTAODesignSystem_b6947e || {};
// 新增导出的本地降级：bundle 滞后时降级为无动效/无版式的等价元素，绝不白屏
const Reveal = NS.Reveal || (({
  children,
  as = "div",
  style,
  ...r
}) => React.createElement(as, {
  style,
  ...r
}, children));
const RuleReveal = NS.RuleReveal || (({
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: "block",
    height: 1,
    background: "var(--border-subtle)",
    ...style
  }
}));
const Marquee = NS.Marquee || (({
  items = [],
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    padding: "40px 0",
    borderTop: "var(--hairline)",
    borderBottom: "var(--hairline)",
    ...style
  }
}, items.map(i => /*#__PURE__*/React.createElement("span", {
  key: i,
  style: {
    fontFamily: "var(--font-display)",
    fontSize: 32,
    fontWeight: 200,
    color: "var(--text-heading)"
  }
}, i))));
const StatBand = NS.StatBand || (({
  items = [],
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    background: "var(--surface-card)",
    borderRadius: "var(--card-radius)",
    ...style
  }
}, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
  key: it.label,
  style: {
    padding: 32,
    borderLeft: i ? "var(--hairline)" : 0
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "u-label"
}, it.label), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 16,
    fontFamily: "var(--font-western)",
    fontSize: 34,
    fontWeight: 300,
    letterSpacing: "-.03em",
    color: "var(--text-heading)"
  }
}, it.value, " ", /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 13,
    color: "var(--text-subtle)"
  }
}, it.unit))))));
const SectionHead = NS.SectionHead || (({
  eyebrow,
  title,
  lede,
  tone,
  style
}) => /*#__PURE__*/React.createElement("header", {
  style: {
    marginBottom: 80,
    ...style
  }
}, eyebrow ? /*#__PURE__*/React.createElement("div", {
  className: "u-eyebrow",
  style: {
    color: tone === "ink" ? "var(--gold-300)" : "var(--text-subtle)"
  }
}, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: "24px 0 0",
    fontFamily: "var(--font-display)",
    fontSize: "clamp(34px,4.4vw,64px)",
    fontWeight: 200,
    letterSpacing: "-.032em",
    lineHeight: 1.12,
    maxWidth: "15em",
    textWrap: "balance",
    color: tone === "ink" ? "var(--ink-50)" : "var(--text-heading)"
  }
}, title), lede ? /*#__PURE__*/React.createElement("p", {
  style: {
    margin: "32px 0 0",
    maxWidth: "26em",
    fontSize: 16,
    lineHeight: 1.9,
    color: tone === "ink" ? "var(--ink-300)" : "var(--text-muted)"
  }
}, lede) : null));

/** 页头：细线上方的面包屑 + 大号宋体标题 + 状态行 */
function PageHeader({
  crumbs,
  title,
  meta,
  actions
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 32,
      marginBottom: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      minWidth: 0
    }
  }, crumbs ? /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: crumbs
  }) : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(28px, 3vw, 40px)",
      fontWeight: 200,
      letterSpacing: "-.03em",
      lineHeight: 1.12,
      color: "var(--text-heading)"
    }
  }, title), meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      flexWrap: "wrap",
      whiteSpace: "nowrap",
      fontFamily: "var(--font-western)",
      fontSize: 12,
      letterSpacing: ".08em",
      color: "var(--text-muted)"
    }
  }, meta) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flex: "0 0 auto"
    }
  }, actions));
}

/** 微标签：面板内的小节标题。中文零字距（宽字距会把汉字拉散），西文自动转大写眼标。 */
function MicroLabel({
  children,
  color,
  latin = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: latin ? "var(--font-western)" : "var(--font-sans)",
      fontSize: latin ? 11 : "var(--fs-caption)",
      fontWeight: 500,
      letterSpacing: latin ? ".16em" : 0,
      textTransform: latin ? "uppercase" : "none",
      color: color || "var(--text-subtle)"
    }
  }, children);
}

/** 图例点 */
function Legend({
  items = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      flexWrap: "wrap"
    }
  }, items.map(i => /*#__PURE__*/React.createElement("span", {
    key: i.label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: i.color,
      flex: "0 0 auto"
    }
  }), i.label)));
}

/** 面积折线图 — 柔和填充 + 三条极淡基准线，无坐标轴装饰 */
function AreaChart({
  series = [],
  height = 300,
  labels = [],
  colors = ["var(--brand-600)", "var(--gold-500)"]
}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const all = series.flat();
  const max = Math.max(...all) * 1.1,
    min = Math.min(...all) * 0.86;
  const W = 1000,
    H = 320,
    pad = 6;
  const pt = (d, i) => {
    const x = pad + i / (d.length - 1) * (W - pad * 2);
    const y = H - pad - (d[i] - min) / (max - min) * (H - pad * 2);
    return [x, y];
  };
  const line = d => d.map((_, i) => {
    const [x, y] = pt(d, i);
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  const area = d => `${line(d)} L${(W - pad).toFixed(1)} ${H} L${pad} ${H} Z`;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: "100%",
      height,
      display: "block"
    },
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("defs", null, series.map((_, i) => /*#__PURE__*/React.createElement("linearGradient", {
    key: i,
    id: `ac${uid}${i}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: colors[i % colors.length],
    stopOpacity: i ? ".14" : ".20"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: colors[i % colors.length],
    stopOpacity: "0"
  })))), [0.25, 0.5, 0.75].map(r => /*#__PURE__*/React.createElement("line", {
    key: r,
    x1: "0",
    x2: W,
    y1: H * r,
    y2: H * r,
    stroke: "var(--border-subtle)",
    strokeWidth: "1",
    vectorEffect: "non-scaling-stroke"
  })), series.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: `a${i}`,
    d: area(d),
    fill: `url(#ac${uid}${i})`
  })), series.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: `l${i}`,
    d: line(d),
    fill: "none",
    stroke: colors[i % colors.length],
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    vectorEffect: "non-scaling-stroke"
  }))), labels.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 14,
      fontFamily: "var(--font-western)",
      fontSize: 11,
      letterSpacing: ".06em",
      color: "var(--text-subtle)"
    }
  }, labels.map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l))) : null);
}

/** 横向条形对比 */
function BarRows({
  rows = []
}) {
  const max = Math.max(...rows.map(r => r.value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) 92px",
      gap: 12,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-body)"
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      fontFamily: "var(--font-western)",
      fontSize: 15,
      fontWeight: 300,
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-heading)"
    }
  }, r.display || r.value), /*#__PURE__*/React.createElement("span", {
    style: {
      gridColumn: "1 / -1",
      height: 3,
      background: "var(--ink-200)",
      display: "block",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: `${r.value / max * 100}%`,
      height: "100%",
      background: r.color || "var(--brand-600)"
    }
  })))));
}

/** 仪表读数 */
function Gauge({
  label,
  value,
  unit,
  pct,
  tone = "brand"
}) {
  const color = tone === "warning" ? "var(--state-warning)" : tone === "error" ? "var(--state-error)" : "var(--brand-600)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(MicroLabel, null, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: "clamp(22px,2.2vw,30px)",
      fontWeight: 300,
      letterSpacing: "-.03em",
      color: "var(--text-heading)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)"
    }
  }, unit)), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 3,
      background: "var(--ink-200)",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: `${pct}%`,
      height: "100%",
      background: color
    }
  })));
}

/** 胶囊筛选组 */
function ChipGroup({
  items = [],
  active,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: 4,
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-full)"
    }
  }, items.map(i => {
    const on = i.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: i.key,
      onClick: () => onSelect && onSelect(i.key),
      style: {
        padding: "6px 16px",
        border: 0,
        borderRadius: "var(--radius-full)",
        cursor: "pointer",
        background: on ? "var(--surface-card)" : "transparent",
        boxShadow: on ? "var(--shadow-xs)" : "none",
        color: on ? "var(--text-heading)" : "var(--text-muted)",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: on ? 500 : 400,
        whiteSpace: "nowrap"
      }
    }, i.label);
  }));
}
Object.assign(window, {
  PageHeader,
  MicroLabel,
  Legend,
  AreaChart,
  LineChart: AreaChart,
  BarRows,
  Gauge,
  ChipGroup,
  KitReveal: Reveal,
  KitStatBand: StatBand,
  KitSectionHead: SectionHead,
  DS: window.SINOTAODesignSystem_b6947e
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ste_console/Parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/stg_cockpit/ApprovalsScreen.jsx
try { (() => {
const {
  Card,
  Table,
  Tag,
  Badge,
  Button,
  IconButton,
  Icon,
  Tabs,
  Pagination,
  EmptyState,
  Modal,
  Drawer,
  Field,
  Textarea,
  Select,
  Toast,
  Popconfirm,
  Checkbox
} = window.SINOTAODesignSystem_b6947e;
const ITEMS = [{
  id: 1,
  no: "AP-2026-0906-11",
  ent: "STE",
  title: "追加申购碳配额 20,000 吨",
  amount: "1,368,000.00",
  level: "集团审批",
  days: "1 天",
  tone: "warning",
  status: "待我审批"
}, {
  id: 2,
  no: "AP-2026-0906-08",
  ent: "STI",
  title: "九江港多式联运年度框架协议",
  amount: "8,600,000.00",
  level: "集团审批",
  days: "2 天",
  tone: "warning",
  status: "待我审批"
}, {
  id: 3,
  no: "AP-2026-0905-21",
  ent: "STH",
  title: "PHA 中试线设备采购",
  amount: "4,280,000.00",
  level: "实体审批",
  days: "3 天",
  tone: "info",
  status: "他人处理中"
}, {
  id: 4,
  no: "AP-2026-0905-16",
  ent: "EDU",
  title: "秋季教材集中采购",
  amount: "620,000.00",
  level: "实体审批",
  days: "3 天",
  tone: "success",
  status: "已通过"
}, {
  id: 5,
  no: "AP-2026-0904-04",
  ent: "STE",
  title: "三号炉检修备件预算",
  amount: "1,940,000.00",
  level: "实体审批",
  days: "4 天",
  tone: "success",
  status: "已通过"
}];
function ApprovalsScreen() {
  const [tab, setTab] = React.useState("mine");
  const [sel, setSel] = React.useState([]);
  const [sort, setSort] = React.useState({
    key: "amount",
    dir: "desc"
  });
  const [page, setPage] = React.useState(1);
  const [row, setRow] = React.useState(null);
  const [reject, setReject] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [pc, setPc] = React.useState(false);
  const rows = tab === "mine" ? ITEMS.filter(r => r.status === "待我审批") : tab === "all" ? ITEMS : ITEMS.filter(r => r.status === "已通过");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "u-eyebrow"
  }, "Approvals \xB7 Group level"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 12,
      fontFamily: "var(--font-display)",
      fontSize: 36,
      fontWeight: 300,
      letterSpacing: "-.018em",
      color: "var(--text-heading)"
    }
  }, "\u5BA1\u6279\u961F\u5217"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 10,
      fontSize: 13,
      color: "var(--text-muted)",
      flexWrap: "wrap",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    label: "2 \u9879\u5F85\u6211\u5BA1\u6279"
  }), /*#__PURE__*/React.createElement("span", null, "\u8D85\u8FC7 500 \u4E07\u5143\u9700\u96C6\u56E2\u5BA1\u6279"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Popconfirm, {
    open: pc,
    title: `批量通过 ${sel.length} 项？`,
    description: "\u901A\u8FC7\u540E\u8FDB\u5165\u4ED8\u6B3E\u6D41\u7A0B\uFF0C\u53EF\u5728\u6D41\u6C34\u4E2D\u64A4\u56DE 24 \u5C0F\u65F6\u3002",
    confirmText: "\u901A\u8FC7",
    onConfirm: () => {
      setPc(false);
      setSel([]);
      setToast({
        tone: "success",
        title: "已批量通过",
        desc: "已通知发起人与财务。"
      });
    },
    onCancel: () => setPc(false)
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "done_all",
    disabled: !sel.length,
    onClick: () => setPc(true)
  }, "\u6279\u91CF\u901A\u8FC7", sel.length ? ` (${sel.length})` : "")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "rule"
  }, "\u8BBE\u7F6E\u5BA1\u6279\u89C4\u5219"))), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 88,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 90
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    title: toast.title,
    description: toast.desc,
    onClose: () => setToast(null)
  })) : null, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    activeKey: tab,
    onSelect: setTab,
    items: [{
      key: "mine",
      label: "待我审批",
      count: 2
    }, {
      key: "all",
      label: "全部",
      count: 86
    }, {
      key: "done",
      label: "已通过",
      count: 62
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px"
    }
  }, /*#__PURE__*/React.createElement(Table, {
    selectable: true,
    selected: sel,
    onSelectedChange: setSel,
    sort: sort,
    onSortChange: setSort,
    onRowClick: setRow,
    columns: [{
      key: "no",
      title: "单号"
    }, {
      key: "ent",
      title: "实体",
      render: v => /*#__PURE__*/React.createElement(Tag, {
        tone: "brand",
        size: "s"
      }, v)
    }, {
      key: "title",
      title: "事项"
    }, {
      key: "amount",
      title: "金额 (¥)",
      align: "right",
      sortable: true
    }, {
      key: "level",
      title: "层级"
    }, {
      key: "days",
      title: "已停留",
      align: "right",
      sortable: true
    }, {
      key: "status",
      title: "状态",
      render: (v, r) => /*#__PURE__*/React.createElement(Tag, {
        tone: r.tone
      }, v)
    }],
    rows: rows,
    empty: /*#__PURE__*/React.createElement(EmptyState, {
      compact: true,
      icon: "task_alt",
      title: "\u6CA1\u6709\u5F85\u4F60\u5904\u7406\u7684\u5BA1\u6279",
      hint: "\u65B0\u7684\u5BA1\u6279\u5230\u8FBE\u65F6\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\uFF0C\u5E76\u540C\u65F6\u63A8\u9001\u5230\u4F60\u7684\u901A\u77E5\u4E2D\u5FC3\u3002"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    pageSize: 20,
    total: 86,
    onChange: setPage
  })))), /*#__PURE__*/React.createElement(Drawer, {
    open: !!row,
    onClose: () => setRow(null),
    title: row ? row.no : "",
    width: 460,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => {
        setRow(null);
        setReject(true);
      }
    }, "\u9000\u56DE"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "check",
      onClick: () => {
        setRow(null);
        setToast({
          tone: "success",
          title: "已通过审批",
          desc: "已通知发起人与财务。"
        });
      }
    }, "\u901A\u8FC7"))
  }, row ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 21,
      color: "var(--text-heading)",
      lineHeight: 1.5
    }
  }, row.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "brand",
    size: "s"
  }, row.ent), /*#__PURE__*/React.createElement(Tag, {
    tone: row.tone,
    size: "s"
  }, row.status))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, [["金额", "¥ " + row.amount], ["审批层级", row.level], ["已停留", row.days], ["发起人", "王工 · 赤湖工业园"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: "var(--text-heading)",
      marginTop: 3,
      fontFamily: k === "金额" ? "var(--font-western)" : undefined
    }
  }, v)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)",
      marginBottom: 10
    }
  }, "\u5BA1\u6279\u6D41"), /*#__PURE__*/React.createElement(Timeline, {
    items: [{
      time: "09-06",
      title: "发起 · 王工",
      desc: "附化验单与市场行情摘要。",
      color: "var(--ste-600)"
    }, {
      time: "09-06",
      title: "实体复核 · 通过",
      desc: "九派能源财务负责人已确认预算额度。",
      color: "var(--state-success)"
    }, {
      time: "待处理",
      title: "集团审批 · 李总",
      desc: "超过 500 万元阈值，需集团 CFO 审批。",
      color: "var(--state-warning)"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u5BA1\u6279\u610F\u89C1",
    htmlFor: "op",
    hint: "\u5C06\u5199\u5165\u5BA1\u6279\u6D41\u6C34\uFF0C\u5BF9\u53D1\u8D77\u4EBA\u53EF\u89C1"
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "op",
    rows: 3,
    value: "\u540C\u610F\uFF0C\u6309\u6388\u6743\u989D\u5EA6\u6267\u884C\uFF0C\u4EA4\u5272\u540E\u8865\u5145\u51ED\u8BC1\u53F7\u3002",
    onChange: () => {}
  }))) : null), /*#__PURE__*/React.createElement(Modal, {
    open: reject,
    onClose: () => setReject(false),
    size: "s",
    title: "\u9000\u56DE\u5BA1\u6279",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setReject(false)
    }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      onClick: () => {
        setReject(false);
        setToast({
          tone: "warning",
          title: "已退回发起人",
          desc: "退回原因已同步至审批流水。"
        });
      }
    }, "\u9000\u56DE"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u9000\u56DE\u539F\u56E0",
    htmlFor: "rr",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    id: "rr",
    value: "doc",
    onChange: () => {},
    options: [{
      value: "doc",
      label: "材料不完整"
    }, {
      value: "budget",
      label: "超出预算额度"
    }, {
      value: "other",
      label: "其他（请说明）"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u8865\u5145\u8BF4\u660E",
    htmlFor: "rn"
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "rn",
    rows: 3,
    value: "\u8BF7\u8865\u5145\u8FD1\u4E09\u4E2A\u6708\u914D\u989D\u4EF7\u683C\u8D70\u52BF\u4E0E\u4E24\u5BB6\u4EE5\u4E0A\u62A5\u4EF7\u5BF9\u6BD4\u3002",
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(Checkbox, {
    id: "notify",
    checked: true,
    label: "\u540C\u65F6\u901A\u77E5\u5B9E\u4F53\u8D22\u52A1\u8D1F\u8D23\u4EBA",
    onChange: () => {}
  }))));
}
Object.assign(window, {
  ApprovalsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/stg_cockpit/ApprovalsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/stg_cockpit/Cockpit.jsx
try { (() => {
const {
  NavRail,
  TopAppBar,
  IconButton,
  Badge,
  EntitySwitcher,
  Icon,
  Tooltip
} = window.SINOTAODesignSystem_b6947e;
const NAV = [{
  key: "overview",
  label: "经营驾驶舱",
  icon: "space_dashboard"
}, {
  key: "approvals",
  label: "审批队列",
  icon: "approval",
  badge: 2
}, {
  key: "compliance",
  label: "合规台账",
  icon: "gavel"
}, {
  key: "assets",
  label: "品牌资产",
  icon: "palette"
}];
function PlaceholderScreen({
  title,
  note
}) {
  const {
    EmptyState,
    Button
  } = window.SINOTAODesignSystem_b6947e;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "u-eyebrow"
  }, "Group cockpit"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 12,
      marginBottom: 28,
      fontFamily: "var(--font-display)",
      fontSize: 36,
      fontWeight: 300,
      letterSpacing: "-.018em",
      color: "var(--text-heading)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "draft",
    title: "\u672C\u5C4F\u5728\u63D0\u4F9B\u7684\u8D44\u6599\u4E2D\u6CA1\u6709\u5BF9\u5E94\u8BBE\u8BA1",
    hint: note,
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "upload_file"
    }, "\u63D0\u4F9B\u8BE5\u6A21\u5757\u7684\u8BBE\u8BA1\u7A3F\u6216\u6E90\u7801")
  })));
}
function Cockpit() {
  const [key, setKey] = React.useState("overview");
  const [ent, setEnt] = React.useState("stg");
  React.useEffect(() => {
    document.documentElement.dataset.theme = ent;
  }, [ent]);
  let Screen;
  if (key === "overview") Screen = /*#__PURE__*/React.createElement(OverviewScreen, {
    ent: ent,
    setEnt: setEnt
  });else if (key === "approvals") Screen = /*#__PURE__*/React.createElement(ApprovalsScreen, null);else if (key === "compliance") Screen = /*#__PURE__*/React.createElement(PlaceholderScreen, {
    title: "\u5408\u89C4\u53F0\u8D26",
    note: "\u5168\u5178 \xA733 \u53EA\u7ED9\u51FA\u4E86\u53CD\u6F02\u7EFF\u4E0E ESG \u7684\u539F\u5219\uFF0C\u6CA1\u6709\u53F0\u8D26\u754C\u9762\u3002\u6309 UI Kit \u89C4\u5219\u4E0D\u4F5C\u53D1\u660E\uFF0C\u7559\u7A7A\u5E76\u6807\u6CE8\u3002"
  });else Screen = /*#__PURE__*/React.createElement(PlaceholderScreen, {
    title: "\u54C1\u724C\u8D44\u4EA7",
    note: "\u54C1\u724C\u8D44\u4EA7\u5E93\uFF08\u56FE\u6807 sprite\u3001\u63D2\u753B\u3001\u5B57\u4F53\u5305\uFF09\u5C1A\u672A\u63D0\u4F9B\u6587\u4EF6\uFF0C\u754C\u9762\u6682\u7F3A\u3002"
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      minHeight: "100vh",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement(NavRail, {
    items: NAV,
    activeKey: key,
    onSelect: setKey,
    expanded: true,
    header: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-sinotao-ink.svg",
      alt: "SINOTAO",
      style: {
        height: 17
      }
    }), /*#__PURE__*/React.createElement(EntitySwitcher, {
      value: ent,
      onChange: setEnt
    })),
    footer: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderTop: "1px solid var(--border-subtle)",
        paddingTop: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: "var(--radius-full)",
        background: "var(--brand-600)",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontFamily: "var(--font-display)"
      }
    }, "\u674E"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        flexDirection: "column",
        lineHeight: 1.3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--text-heading)"
      }
    }, "\u674E\u603B"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-subtle)"
      }
    }, "\u96C6\u56E2 CFO")))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(TopAppBar, {
    brand: "\u6E90\u88D5\u5174\u521B\u65B0\u672A\u6765 \xB7 \u96C6\u56E2\u4E2D\u67A2",
    items: [],
    activeKey: "",
    onSelect: () => {},
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tooltip, {
      content: "\u5168\u5C40\u641C\u7D22 \u2318K"
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "search",
      label: "\u5168\u5C40\u641C\u7D22"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "notifications",
      label: "\u901A\u77E5"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 2,
        right: 2
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      count: 5
    }))), /*#__PURE__*/React.createElement(IconButton, {
      icon: "dark_mode",
      label: "\u5207\u6362\u6697\u8272\u6A21\u5F0F",
      onClick: () => {
        const el = document.documentElement;
        el.dataset.colorScheme = el.dataset.colorScheme === "dark" ? "" : "dark";
      }
    }))
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: "40px clamp(24px,3vw,48px) 72px",
      maxWidth: 1560,
      width: "100%"
    }
  }, Screen)));
}
const __rootEl = document.getElementById("root");
if (__rootEl) ReactDOM.createRoot(__rootEl).render(/*#__PURE__*/React.createElement(Cockpit, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/stg_cockpit/Cockpit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/stg_cockpit/CockpitParts.jsx
try { (() => {
const {
  Card,
  Icon,
  Tag,
  Badge
} = window.SINOTAODesignSystem_b6947e;
const ENTITY_META = {
  stg: {
    code: "STG",
    name: "源裕兴创新未来",
    color: "var(--stg-600)"
  },
  ste: {
    code: "STE",
    name: "九派国有能源",
    color: "var(--ste-600)"
  },
  sti: {
    code: "STI",
    name: "源裕兴进出口贸易",
    color: "var(--sti-600)"
  },
  sth: {
    code: "STH",
    name: "源裕兴健康科技",
    color: "var(--sth-600)"
  },
  edu: {
    code: "EDU",
    name: "崇仁教育",
    color: "var(--edu-600)"
  }
};

/** 实体一行：2px 细线刻度 + 代号 + 名称 + 营收条 + 同比。实体色只作刻度，不填色块。 */
function EntityRow({
  ek,
  revenue,
  pct,
  delta,
  onClick,
  active,
  first
}) {
  const m = ENTITY_META[ek];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: "grid",
      gridTemplateColumns: "62px minmax(0,1fr) minmax(0,1fr) 96px 66px",
      alignItems: "center",
      gap: "clamp(12px,2vw,28px)",
      width: "100%",
      padding: "22px 32px",
      border: 0,
      borderTop: first ? "0" : "var(--hairline)",
      background: active ? "var(--surface-selected)" : "transparent",
      cursor: "pointer",
      textAlign: "left",
      transition: "background var(--dur-micro) var(--ease-out)"
    },
    onMouseEnter: e => {
      if (!active) e.currentTarget.style.background = "var(--surface-sunken)";
    },
    onMouseLeave: e => {
      if (!active) e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      height: 20,
      background: m.color,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 11,
      letterSpacing: ".14em",
      color: "var(--text-subtle)"
    }
  }, m.code)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      color: "var(--text-heading)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, m.name), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 2,
      background: "var(--ink-200)",
      display: "block",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: `${pct}%`,
      height: "100%",
      background: m.color
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      fontFamily: "var(--font-western)",
      fontSize: 17,
      fontWeight: 300,
      letterSpacing: "-.02em",
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-heading)"
    }
  }, revenue), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      fontFamily: "var(--font-western)",
      fontSize: 13,
      fontVariantNumeric: "tabular-nums",
      color: delta >= 0 ? "var(--state-success)" : "var(--state-error)"
    }
  }, delta >= 0 ? "+" : "", delta, "%"));
}

/** 环形占比（单一比值，纯 SVG 无装饰） */
function Donut({
  value,
  label,
  sub,
  color = "var(--brand-600)"
}) {
  const r = 46,
    c = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "112",
    height: "112",
    viewBox: "0 0 112 112"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "56",
    cy: "56",
    r: r,
    fill: "none",
    stroke: "var(--ink-200)",
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "56",
    cy: "56",
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: "5",
    strokeLinecap: "round",
    strokeDasharray: `${value / 100 * c} ${c}`,
    transform: "rotate(-90 56 56)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "56",
    y: "64",
    textAnchor: "middle",
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 26,
      fontWeight: 300,
      letterSpacing: "-.03em",
      fill: "var(--text-heading)"
    }
  }, value, "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-heading)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 4,
      lineHeight: 1.7,
      maxWidth: "18em"
    }
  }, sub)));
}

/** 时间轴 */
function Timeline({
  items = []
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "76px 20px 1fr",
      gap: 12,
      paddingBottom: i === items.length - 1 ? 0 : 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-western)",
      fontSize: 12,
      color: "var(--text-subtle)",
      paddingTop: 2,
      fontVariantNumeric: "tabular-nums"
    }
  }, it.time), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: it.color || "var(--brand-600)",
      marginTop: 5
    }
  }), i === items.length - 1 ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      width: 1,
      background: "var(--border-default)",
      marginTop: 4
    }
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 14,
      color: "var(--text-heading)"
    }
  }, it.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 3,
      lineHeight: 1.7
    }
  }, it.desc)))));
}
Object.assign(window, {
  EntityRow,
  Donut,
  Timeline,
  ENTITY_META
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/stg_cockpit/CockpitParts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/stg_cockpit/OverviewScreen.jsx
try { (() => {
const {
  Card,
  StatCard,
  Tag,
  Badge,
  Button,
  IconButton,
  Icon,
  Tabs,
  PhiAnchor
} = window.SINOTAODesignSystem_b6947e;
const NS_ = window.SINOTAODesignSystem_b6947e || {};
const StatBand = NS_.StatBand || (() => null);
function OverviewScreen({
  ent,
  setEnt
}) {
  const [q, setQ] = React.useState("q3");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "u-eyebrow"
  }, "Group cockpit \xB7 2026 Q3"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 14,
      fontFamily: "var(--font-display)",
      fontSize: "clamp(28px,3vw,40px)",
      fontWeight: 200,
      letterSpacing: "-.03em",
      lineHeight: 1.12,
      color: "var(--text-heading)"
    }
  }, "\u96C6\u56E2\u7ECF\u8425\u9A7E\u9A76\u8231"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 10,
      fontSize: 13,
      color: "var(--text-muted)",
      flexWrap: "wrap",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    label: "\u4E94\u5B9E\u4F53\u6570\u636E\u5DF2\u5BF9\u9F50"
  }), /*#__PURE__*/React.createElement("span", null, "\u5408\u5E76\u53E3\u5F84 \xB7 \u672A\u7ECF\u5BA1\u8BA1"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    size: "s",
    activeKey: q,
    onSelect: setQ,
    items: [{
      key: "q1",
      label: "Q1"
    }, {
      key: "q2",
      label: "Q2"
    }, {
      key: "q3",
      label: "Q3"
    }, {
      key: "ytd",
      label: "YTD"
    }]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "download"
  }, "\u5BFC\u51FA\u8463\u4E8B\u4F1A\u6750\u6599"))), /*#__PURE__*/React.createElement(StatBand, {
    items: [{
      label: "合并营业收入",
      value: "18.64",
      unit: "亿元",
      delta: 9.4,
      deltaLabel: "同比",
      icon: "payments"
    }, {
      label: "经营性现金流",
      value: "3.28",
      unit: "亿元",
      delta: 4.1,
      deltaLabel: "同比",
      icon: "account_balance_wallet"
    }, {
      label: "资产负债率",
      value: "52.6",
      unit: "%",
      delta: -1.8,
      deltaLabel: "较年初",
      icon: "balance"
    }, {
      label: "集团减排量",
      value: "41.2",
      unit: "万吨 CO₂e",
      delta: 6.8,
      deltaLabel: "同比",
      icon: "eco"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
      gap: 24,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "By entity",
    title: "\u4E94\u5B9E\u4F53\u8425\u6536\u8D21\u732E",
    padding: 0,
    actions: /*#__PURE__*/React.createElement(Tag, {
      tone: "neutral",
      size: "s"
    }, "\u70B9\u51FB\u884C\u5207\u6362\u4E3B\u9898"),
    style: {
      paddingTop: "var(--card-pad-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      borderTop: "var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement(EntityRow, {
    first: true,
    ek: "ste",
    revenue: "9.82 \u4EBF",
    pct: 100,
    delta: 11.2,
    active: ent === "ste",
    onClick: () => setEnt("ste")
  }), /*#__PURE__*/React.createElement(EntityRow, {
    ek: "sti",
    revenue: "5.14 \u4EBF",
    pct: 52,
    delta: 7.6,
    active: ent === "sti",
    onClick: () => setEnt("sti")
  }), /*#__PURE__*/React.createElement(EntityRow, {
    ek: "sth",
    revenue: "2.06 \u4EBF",
    pct: 21,
    delta: 18.4,
    active: ent === "sth",
    onClick: () => setEnt("sth")
  }), /*#__PURE__*/React.createElement(EntityRow, {
    ek: "edu",
    revenue: "1.24 \u4EBF",
    pct: 13,
    delta: -2.4,
    active: ent === "edu",
    onClick: () => setEnt("edu")
  }), /*#__PURE__*/React.createElement(EntityRow, {
    ek: "stg",
    revenue: "0.38 \u4EBF",
    pct: 4,
    delta: 1.1,
    active: ent === "stg",
    onClick: () => setEnt("stg")
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Compliance",
    title: "\u5408\u89C4\u5065\u5EB7\u5EA6"
  }, /*#__PURE__*/React.createElement(Donut, {
    value: 96,
    label: "\u5236\u5EA6\u6267\u884C\u7387",
    sub: "12 \u9879\u96C6\u56E2\u5236\u5EA6\u4E2D 11.5 \u9879\u5B8C\u6210\u672C\u5B63\u81EA\u67E5\uFF0C\u6559\u80B2\u677F\u5757\u5EF6\u671F 1 \u9879\u3002"
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Design system",
    title: "\u8BBE\u8BA1\u7CFB\u7EDF\u91C7\u7528\u7387"
  }, /*#__PURE__*/React.createElement(Donut, {
    value: 88,
    label: "Token \u5F15\u7528\u7387",
    sub: "\u4E94\u5B9E\u4F53\u4EA7\u54C1\u754C\u9762\u4E2D 88% \u7684\u989C\u8272\u4E0E\u95F4\u8DDD\u6765\u81EA\u4EE4\u724C\uFF0C\u786C\u7F16\u7801\u96C6\u4E2D\u5728\u65E7\u7248\u6559\u52A1\u7CFB\u7EDF\u3002",
    color: "var(--gold-500)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: 24,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Timeline",
    title: "\u672C\u5B63\u91CD\u8981\u8282\u70B9"
  }, /*#__PURE__*/React.createElement(Timeline, {
    items: [{
      time: "09-02",
      title: "CFB 三号炉进入计划检修",
      desc: "预计 09-09 复役，期间由一、二号炉承担基本负荷。",
      color: "var(--ste-600)"
    }, {
      time: "08-24",
      title: "PHA 医用粒料完成中试",
      desc: "进入注册资料准备阶段。",
      color: "var(--sth-600)"
    }, {
      time: "08-18",
      title: "申购碳配额 20,000 吨",
      desc: "均价 68.40 元/吨，凭证 CN-2026-08-0018。",
      color: "var(--stg-600)"
    }, {
      time: "07-30",
      title: "九江港多式联运方案落地",
      desc: "平均通关时长降至 1.8 天。",
      color: "var(--sti-600)"
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Risk",
    title: "\u98CE\u9669\u9884\u8B66",
    actions: /*#__PURE__*/React.createElement(Tag, {
      tone: "warning"
    }, "2 \u9879\u9700\u51B3\u7B56")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, [{
    tone: "var(--state-warning)",
    icon: "eco",
    t: "碳配额剩余低于 15%",
    d: "STE · 建议本月内追加申购或加速 CCER 签发。"
  }, {
    tone: "var(--state-error)",
    icon: "trending_down",
    t: "教育板块招生同比 -2.4%",
    d: "EDU · 需在 Q4 预算会前给出招生策略。"
  }, {
    tone: "var(--text-subtle)",
    icon: "currency_exchange",
    t: "汇率波动敞口 3,200 万",
    d: "STI · 已对冲 62%，余下敞口在授权范围内。"
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.t,
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 20,
    color: r.tone
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-heading)"
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 3,
      lineHeight: 1.7
    }
  }, r.d)))))), /*#__PURE__*/React.createElement(PhiAnchor, {
    dimensions: ["守正", "开物"],
    source: "\xA735 \u54C1\u724C\u5065\u5EB7\u5EA6 \xB7 \u4EE5\u6570\u636E\u5B88\u6B63"
  }, "\u4E0D\u80FD\u7528\u6570\u636E\u6D4B\u91CF\u7684\u54C1\u724C\uFF0C\u662F\u5728\u9ED1\u6697\u4E2D\u822A\u884C\u3002\u54C1\u724C\u5065\u5EB7\u5EA6\u4EEA\u8868\u76D8\u4E0D\u662F\u7ED9\u9886\u5BFC\u770B\u7684 PPT\uFF0C\u662F\u54C1\u724C\u7684\u4F53\u68C0\u62A5\u544A\u3002")));
}
Object.assign(window, {
  OverviewScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/stg_cockpit/OverviewScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.PhiAnchor = __ds_scope.PhiAnchor;

__ds_ns.Reveal = __ds_scope.Reveal;

__ds_ns.RuleReveal = __ds_scope.RuleReveal;

__ds_ns.SectionHead = __ds_scope.SectionHead;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TaijiSpinner = __ds_scope.TaijiSpinner;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.StatBand = __ds_scope.StatBand;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Popconfirm = __ds_scope.Popconfirm;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DatePicker = __ds_scope.DatePicker;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.EntitySwitcher = __ds_scope.EntitySwitcher;

__ds_ns.NavRail = __ds_scope.NavRail;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TopAppBar = __ds_scope.TopAppBar;

})();
