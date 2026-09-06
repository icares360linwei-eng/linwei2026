/* ═══════════════════════════════════════════════════════════════════════════
   lattice.js · 生成式品牌标记与扉画
   ─────────────────────────────────────────────────────────────────────────
   缺件问题从「画 150 个」变成「定一条规则」。
   生成规则：48 × 48 网格，点径 2.0 / 2.2 / 2.4 / 2.6 / 3.0 / 3.4 六档，
   点数 6–8 枚，只改排布与点径，不改笔形、不加线、不加填充。
   深底用宣纸白，浅底用玄墨；禁止用实体色填充点阵。
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var GRID = 48;
  var RS = [2.0, 2.2, 2.4, 2.6, 3.0, 3.4]; // 点径六档，不得自造中间值

  /* ── 五实体排布 · 每个实体在任何尺寸下点数与排布不变，仅整体缩放 ── */
  function ring(cx, cy, rad, n, start) {
    var out = [], i, a;
    for (i = 0; i < n; i++) {
      a = (start || -Math.PI / 2) + (i / n) * Math.PI * 2;
      out.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, RS[3]]);
    }
    return out;
  }

  var LATTICE = {
    // 环 · 八点等分。中枢环抱五实体
    stg: { pts: ring(24, 24, 15, 8), note: '环 · 八点等分' },
    // 方阵中空 · 炉膛。中心留空即燃烧室
    ste: {
      pts: (function () {
        var o = [], g = [10, 24, 38], x, y;
        for (y = 0; y < 3; y++) for (x = 0; x < 3; x++) {
          if (x === 1 && y === 1) continue;      // 中心留空 = 燃烧室
          o.push([g[x], g[y], RS[2]]);
        }
        return o;
      })(),
      note: '方阵中空 · 炉膛'
    },
    // 双向折线 · 航路。进与出同时成立
    sti: {
      pts: [
        [10, 16, RS[1]], [24, 10, RS[1]], [38, 16, RS[1]],
        [24, 24, RS[1]],
        [10, 32, RS[1]], [24, 38, RS[1]], [38, 32, RS[1]]
      ],
      note: '双向折线 · 航路'
    },
    // 核与六配位 · 分子。中心点独大
    sth: {
      pts: [[24, 24, RS[5]]].concat(ring(24, 24, 14, 6).map(function (p) {
        return [p[0], p[1], RS[0]];
      })),
      note: '核与六配位 · 分子'
    },
    // 递进三阶 · 一生二、二生三
    edu: {
      pts: [
        [24, 12, RS[3]],
        [17, 24, RS[3]], [31, 24, RS[3]],
        [10, 36, RS[3]], [24, 36, RS[3]], [38, 36, RS[3]]
      ],
      note: '递进三阶'
    }
  };

  /* ── SVG 标记 ────────────────────────────────────────────────────── */
  function markSVG(key, size, color) {
    var L = LATTICE[key];
    if (!L) return '';
    var s = ['<svg viewBox="0 0 ' + GRID + ' ' + GRID + '" width="' + size +
      '" height="' + size + '" role="img" aria-label="' + key.toUpperCase() +
      ' 点阵标记 · ' + L.note + '" focusable="false">'];
    L.pts.forEach(function (p) {
      s.push('<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] +
        '" fill="' + (color || 'currentColor') + '"/>');
    });
    s.push('</svg>');
    return s.join('');
  }

  /* ── LatticeSpin · 加载态 ────────────────────────────────────────
     点按序列依次由 ink-400 提亮至 ink-50，每点相位差 1/N 周期，
     2400ms linear 循环。点不移动、不缩放、不旋转整体。            ── */
  function spin(el, size) {
    var pts = LATTICE.stg.pts, n = pts.length;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var s = ['<svg viewBox="0 0 48 48" width="' + (size || 40) + '" height="' +
      (size || 40) + '" role="status" aria-label="载入中" focusable="false">'];
    pts.forEach(function (p, i) {
      s.push('<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] +
        '" fill="currentColor" opacity="' + (reduce ? 0.55 : 0.28) + '">');
      if (!reduce) {
        s.push('<animate attributeName="opacity" values="0.28;1;0.28" dur="2400ms"' +
          ' begin="' + Math.round((i / n) * 2400) + 'ms" repeatCount="indefinite"/>');
      }
      s.push('</circle>');
    });
    s.push('</svg>');
    el.innerHTML = s.join('');
  }

  /* ═══ 扉画 · 每册一幅，画的都是该册自己的内容 ═══════════════════════
     不是装饰噪点：规则由内容决定，读者能从图上读回数据。
     ═══════════════════════════════════════════════════════════════════ */

  function ctxOf(cv) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = cv.getBoundingClientRect();
    var w = Math.max(r.width, 1), h = Math.max(r.height, 1);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    var c = cv.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);
    return { c: c, w: w, h: h };
  }

  function dot(c, x, y, r, fill, alpha) {
    c.globalAlpha = alpha === undefined ? 1 : alpha;
    c.fillStyle = fill;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    c.globalAlpha = 1;
  }

  // 确定性伪随机 —— 同一种子永远画出同一幅，规则可复现
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }

  var PAPER = '#FBF9F5', GOLD = '#B9A177', DIM = '#635D53';

  /* 首屏 / 第一册 · 三源合流 —— 守正 · 开物 · 共生
     三股点流由三个方向旋进，收束成一枚 STG 环。
     构图刻意偏右：左栏留给标题，留白是构图元素，不是剩余空间。 */
  function artConfluence(cv, t) {
    var g = ctxOf(cv), c = g.c, w = g.w, h = g.h;
    var narrow = w < 760;
    var cx = narrow ? w * 0.74 : w * 0.76;
    var cy = narrow ? h * 0.24 : h * 0.5;
    // 环要小到能被读成一个环：8 枚 5.4px 的点落在 ~84px 半径上才成立
    var R = Math.min(Math.max(Math.min(w, h) * 0.085, 54), 92);
    var i, k, a, p, e, d, x, y;

    // 三股源流各 46 点：由 4.6R 旋进到 1.4R —— 收在环外，留一圈呼吸
    var starts = [-Math.PI * 5 / 6, -Math.PI / 6, Math.PI / 2];
    var drift = Math.sin(t * 0.00013) * 0.07;
    for (k = 0; k < 3; k++) {
      for (i = 0; i < 46; i++) {
        p = i / 45;
        e = Math.pow(p, 0.55);                    // 收束缓动
        d = R * (4.6 - 3.2 * e);
        a = starts[k] + (1 - e) * 0.72 + drift * (1 - e);
        x = cx + Math.cos(a) * d;
        y = cy + Math.sin(a) * d * 0.94;
        dot(c, x, y, 1.0 + e * 1.6, PAPER, 0.10 + e * 0.62);
      }
    }

    // 汇合处：STG 环 · 八点等分，按 1/8 周期相位差依次提亮
    for (i = 0; i < 8; i++) {
      a = -Math.PI / 2 + (i / 8) * Math.PI * 2;
      x = cx + Math.cos(a) * R;
      y = cy + Math.sin(a) * R * 0.94;
      var ph = ((t / 2400) + i / 8) % 1;
      dot(c, x, y, 5.4, PAPER, 0.42 + 0.58 * (0.5 + 0.5 * Math.cos(ph * Math.PI * 2)));
    }
    // 中枢一点金 —— 全幅唯一的一处金
    dot(c, cx, cy, 3.0, GOLD, 0.94);
  }

  /* 第二册 · 基础 —— 色阶场
     十一列 = Ink 十一阶，点径随明度递减；右侧五列 = 五实体明度档。 */
  function artRamp(cv, t) {
    var g = ctxOf(cv), c = g.c, w = g.w, h = g.h;
    var cols = 16, rows = 11;
    var padX = w * 0.1, padY = h * 0.16;
    var gx = (w - padX * 2) / (cols - 1), gy = (h - padY * 2) / (rows - 1);
    var i, j, x, y, v, r;
    for (j = 0; j < rows; j++) {
      for (i = 0; i < cols; i++) {
        x = padX + i * gx; y = padY + j * gy;
        // 明度落差：越往下越浅（点越小），墨的十一阶
        v = 1 - j / (rows - 1);
        // 右侧五列走实体明度档，起伏由列相位决定
        var band = i >= cols - 5 ? 0.55 + 0.45 * Math.sin(t * 0.00035 + i * 0.9 + j * 0.34) : 1;
        r = (0.9 + v * 3.1) * band;
        if (r < 0.35) continue;
        dot(c, x, y, r, PAPER, 0.16 + v * 0.52);
      }
    }
    // 一条基线 —— 唯一保留的一条轴线
    c.strokeStyle = 'rgba(251,249,245,.16)'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(padX, padY + gy * (rows - 1) + 18);
    c.lineTo(w - padX, padY + gy * (rows - 1) + 18); c.stroke();
  }

  /* 第三册 · 表达 —— 48×48 构造网格
     把生成规则本身画出来：网格 + 五实体标记落在同一张网格上。 */
  function artGrid(cv, t) {
    var g = ctxOf(cv), c = g.c, w = g.w, h = g.h;
    var keys = ['stg', 'ste', 'sti', 'sth', 'edu'];
    var n = keys.length;
    var cell = Math.min(w / (n + 0.9), h * 0.72);
    var total = cell * n;
    var x0 = (w - total) / 2, y0 = (h - cell) / 2;
    var k, i, j, u;

    for (k = 0; k < n; k++) {
      var ox = x0 + k * cell, oy = y0;
      var u1 = cell / GRID;
      // 构造网格：每 8 格一条，1px，极淡
      c.strokeStyle = 'rgba(251,249,245,.07)'; c.lineWidth = 1;
      for (i = 0; i <= GRID; i += 8) {
        c.beginPath(); c.moveTo(ox + i * u1, oy); c.lineTo(ox + i * u1, oy + cell); c.stroke();
        c.beginPath(); c.moveTo(ox, oy + i * u1); c.lineTo(ox + cell, oy + i * u1); c.stroke();
      }
      // 标记本体：按序整册提亮
      var ph = ((t / 2400) + k / n) % 1;
      var al = 0.42 + 0.58 * (0.5 + 0.5 * Math.cos(ph * Math.PI * 2));
      LATTICE[keys[k]].pts.forEach(function (p) {
        dot(c, ox + p[0] * u1, oy + p[1] * u1, p[2] * u1, PAPER, al);
      });
    }
  }

  /* 第四册 · 数据与行为 —— 闭环
     赤湖园区五段闭环。每段弧上的点数正比于该段量级，读者能数出来。 */
  function artLoop(cv, t) {
    var g = ctxOf(cv), c = g.c, w = g.w, h = g.h;
    var cx = w / 2, cy = h / 2;
    var R = Math.min(w, h) * 0.34;
    // 五段量级（相对值）：种植 · 收储 · 发电 · 碳资产 · 灰渣
    var segs = [34, 30, 26, 22, 12];
    var sum = segs.reduce(function (a, b) { return a + b; }, 0);
    var a0 = -Math.PI / 2, k, i, a, x, y;

    for (k = 0; k < segs.length; k++) {
      var span = (segs[k] / sum) * Math.PI * 2;
      var pts = segs[k];
      // 高亮段：一图仅一段，随时间在五段之间轮转
      var hot = Math.floor((t / 4200) % segs.length) === k;
      for (i = 0; i < pts; i++) {
        a = a0 + (i / pts) * span;
        x = cx + Math.cos(a) * R;
        y = cy + Math.sin(a) * R;
        dot(c, x, y, hot ? 3.1 : 2.1, hot ? GOLD : PAPER, hot ? 0.95 : 0.4);
      }
      // 段间断口 —— 环上不写字
      a0 += span;
    }
    // 内环：一条 1px 线承担「闭合」
    c.strokeStyle = 'rgba(251,249,245,.14)'; c.lineWidth = 1;
    c.beginPath(); c.arc(cx, cy, R * 0.64, 0, Math.PI * 2); c.stroke();
  }

  /* 第五册 · 治理 —— 令牌星图
     421 枚令牌按族分列。列高 = 该族令牌数，点即令牌。 */
  function artTokens(cv, t) {
    var g = ctxOf(cv), c = g.c, w = g.w, h = g.h;
    // 十三个令牌文件的相对规模
    var fams = [26, 62, 40, 22, 15, 12, 8, 10, 18, 96, 8, 34, 20, 30, 20];
    var n = fams.length;
    var padX = w * 0.08, padY = h * 0.14;
    var colw = (w - padX * 2) / n;
    var maxv = Math.max.apply(null, fams);
    var perCol = 12, k, i, x, y, r;

    for (k = 0; k < n; k++) {
      var count = fams[k];
      var rows = Math.ceil(count / 3);
      var maxRows = Math.ceil(maxv / 3);
      for (i = 0; i < count; i++) {
        var cc = i % 3, rr2 = Math.floor(i / 3);
        x = padX + k * colw + colw * 0.5 + (cc - 1) * Math.min(colw * 0.26, 9);
        y = h - padY - rr2 * Math.min((h - padY * 2) / maxRows, 11);
        var ph = ((t / 3600) + k / n) % 1;
        var al = 0.2 + 0.5 * (0.5 + 0.5 * Math.cos(ph * Math.PI * 2)) + (rr2 / rows) * 0.22;
        dot(c, x, y, 1.6, PAPER, Math.min(al, 0.9));
      }
    }
    c.strokeStyle = 'rgba(251,249,245,.14)'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(padX, h - padY + 12); c.lineTo(w - padX, h - padY + 12); c.stroke();
  }

  /* 图谱页 · 点阵密度场 —— 一枚点恒等于约 350 吨 */
  function artField(cv, t) {
    var g = ctxOf(cv), c = g.c, w = g.w, h = g.h;
    var R = rng(20260906);
    var cols = Math.max(Math.floor(w / 15), 12);
    var rows = Math.max(Math.floor(h / 15), 8);
    var i, j, x, y, d, a;
    var cx = w * 0.5, cy = h * 0.5;
    var maxd = Math.hypot(cx, cy);
    for (j = 0; j < rows; j++) {
      for (i = 0; i < cols; i++) {
        x = (i + 0.5) * (w / cols); y = (j + 0.5) * (h / rows);
        d = Math.hypot(x - cx, y - cy) / maxd;
        // 密度按距中心衰减 + 一层确定性抖动，不加渐变不加发光
        a = (1 - d) * 0.72 * (0.55 + R() * 0.65);
        if (a < 0.05) continue;
        dot(c, x, y, 1.5, PAPER, Math.min(a, 0.8));
      }
    }
  }

  var ART = {
    confluence: artConfluence, ramp: artRamp, grid: artGrid,
    loop: artLoop, tokens: artTokens, field: artField
  };

  /* ── 驱动 ────────────────────────────────────────────────────────── */
  function mount(cv) {
    var fn = ART[cv.dataset.art];
    if (!fn) return;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var raf = 0, t0 = performance.now(), running = false;

    function frame(now) {
      fn(cv, now - t0);
      if (running) raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || reduce) return;
      running = true; raf = requestAnimationFrame(frame);
    }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

    // reduced-motion 下一次性渲染，版面必须完整可读
    fn(cv, 0);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { rootMargin: '80px' }).observe(cv);
    } else { start(); }

    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });

    var rt;
    addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { fn(cv, performance.now() - t0); }, 140);
    }, { passive: true });
  }

  function init(root) {
    (root || document).querySelectorAll('[data-art]').forEach(mount);
    (root || document).querySelectorAll('[data-lattice]').forEach(function (el) {
      el.innerHTML = markSVG(el.dataset.lattice, el.dataset.size || 48, el.dataset.color);
    });
    (root || document).querySelectorAll('[data-spin]').forEach(function (el) {
      spin(el, el.dataset.size || 40);
    });
  }

  window.Lattice = {
    GRID: GRID, RS: RS, data: LATTICE,
    markSVG: markSVG, spin: spin, init: init
  };

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', function () { init(); })
    : init();
})();
