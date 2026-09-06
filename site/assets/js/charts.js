/* ═══════════════════════════════════════════════════════════════════════════
   charts.js · 图表四种形态 + 两件可视化组件
   ─────────────────────────────────────────────────────────────────────────
   网格线、渐变填充、每点圆点、独立图例 —— 四样都在跟数据争夺注意力，一律不留。
   序列上限三条，超出改明度不改色相。
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  function el(n, a) {
    var e = document.createElementNS(NS, n), k;
    for (k in a) if (a[k] != null) e.setAttribute(k, a[k]);
    return e;
  }
  function tok(name, fb) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fb;
  }
  function fmt(n, d) {
    return Number(n).toLocaleString('en-US', {
      minimumFractionDigits: d || 0, maximumFractionDigits: d === undefined ? 1 : d
    });
  }

  /* ── 折线 ────────────────────────────────────────────────────────
     1.5px · 无网格 · 无渐变 · 末点单标注 · 坐标只标首末
     图例并入副标题，峰值升为数值。                                  ── */
  function line(host, o) {
    var W = 720, H = 220, PL = 8, PR = 64, PT = 16, PB = 26;
    var iw = W - PL - PR, ih = H - PT - PB;
    var all = o.series.reduce(function (a, s) { return a.concat(s.data); }, []);
    var lo = o.min != null ? o.min : Math.min.apply(null, all);
    var hi = o.max != null ? o.max : Math.max.apply(null, all);
    var sx = function (i, n) { return PL + (n < 2 ? 0 : (i / (n - 1)) * iw); };
    var sy = function (v) { return PT + ih - ((v - lo) / (hi - lo)) * ih; };

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H, role: 'img',
      'aria-label': o.label || '折线图', preserveAspectRatio: 'none'
    });
    svg.style.height = '220px';

    // 唯一保留的一条轴线 —— 基线
    svg.appendChild(el('line', {
      x1: PL, y1: PT + ih, x2: PL + iw, y2: PT + ih,
      stroke: tok('--chart-baseline', '#E9E4DA'), 'stroke-width': 1
    }));

    // 核准上限：朱线，只标上限
    if (o.limit != null) {
      svg.appendChild(el('line', {
        x1: PL, y1: sy(o.limit), x2: PL + iw, y2: sy(o.limit),
        stroke: tok('--seal', '#8A3323'), 'stroke-width': 1, 'stroke-dasharray': '3 5'
      }));
    }

    o.series.slice(0, 3).forEach(function (s, si) {
      var n = s.data.length;
      var d = s.data.map(function (v, i) {
        return (i ? 'L' : 'M') + sx(i, n).toFixed(2) + ' ' + sy(v).toFixed(2);
      }).join(' ');
      var p = el('path', {
        d: d, fill: 'none',
        stroke: si === 0 ? tok('--chart-s1', '#463154')
          : si === 1 ? tok('--chart-muted', '#D3CCBF') : tok('--chart-s3', '#D3CCBF'),
        'stroke-width': parseFloat(tok('--chart-stroke', '1.5px')) || 1.5,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        'stroke-dasharray': s.dashed ? '4 4' : null,
        'vector-effect': 'non-scaling-stroke'
      });
      // 落笔 —— 起笔重、收笔轻
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        p.style.strokeDasharray = s.dashed ? '4 4' : '1400';
        if (!s.dashed) {
          p.style.strokeDashoffset = '1400';
          p.style.transition = 'stroke-dashoffset 900ms var(--ease-brush)';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { p.style.strokeDashoffset = '0'; });
          });
        }
      }
      svg.appendChild(p);
      // 末点单标注 —— 只有主序列有
      if (si === 0) {
        var lastI = n - 1, lv = s.data[lastI];
        svg.appendChild(el('circle', {
          cx: sx(lastI, n), cy: sy(lv), r: 3,
          fill: tok('--chart-s1', '#463154')
        }));
        var tx = el('text', {
          x: sx(lastI, n) + 10, y: sy(lv) + 4,
          fill: tok('--text-heading', '#17140F'),
          'font-size': 13, 'font-family': 'var(--font-western)',
          'font-weight': 300, 'font-variant-numeric': 'tabular-nums'
        });
        tx.textContent = fmt(lv) + (o.unit ? ' ' + o.unit : '');
        svg.appendChild(tx);
      }
    });

    host.innerHTML = '';
    host.appendChild(svg);

    // 坐标只标首末 —— 文字交回 DOM
    if (o.xLabels) {
      var xr = document.createElement('div');
      xr.style.cssText = 'display:flex;justify-content:space-between;margin-top:var(--space-2);' +
        'font-size:var(--fs-label);color:var(--text-subtle);padding-right:64px';
      xr.innerHTML = '<span>' + o.xLabels[0] + '</span><span>' +
        o.xLabels[o.xLabels.length - 1] + '</span>';
      host.appendChild(xr);
    }
    if (o.limitNote) {
      var ln = document.createElement('div');
      ln.style.cssText = 'margin-top:var(--space-2);font-size:var(--fs-label);color:var(--text-subtle)';
      ln.innerHTML = '<span style="display:inline-block;width:14px;border-top:1px dashed var(--seal);' +
        'vertical-align:middle;margin-right:6px"></span>' + o.limitNote;
      host.appendChild(ln);
    }
  }

  /* ── 环形 ────────────────────────────────────────────────────────
     只用于「占比」这一种含义，中心必填数值，扇区上限两段。       ── */
  function donut(host, o) {
    var S = 168, cx = S / 2, cy = S / 2, R = 66, sw = 14;
    var pct = Math.max(0, Math.min(1, o.value / o.total));
    var svg = el('svg', {
      viewBox: '0 0 ' + S + ' ' + S, width: S, height: S,
      role: 'img', 'aria-label': o.label + '：' + Math.round(pct * 100) + '%'
    });
    // 剩余段
    svg.appendChild(el('circle', {
      cx: cx, cy: cy, r: R, fill: 'none',
      stroke: tok('--chart-muted', '#D3CCBF'), 'stroke-width': sw
    }));
    // 已用段
    var C = 2 * Math.PI * R;
    var arc = el('circle', {
      cx: cx, cy: cy, r: R, fill: 'none',
      stroke: tok('--chart-s1', '#463154'), 'stroke-width': sw,
      'stroke-dasharray': C, 'stroke-dashoffset': C,
      transform: 'rotate(-90 ' + cx + ' ' + cy + ')', 'stroke-linecap': 'butt'
    });
    svg.appendChild(arc);
    host.innerHTML = '';
    host.appendChild(svg);

    // 中心必填数值 —— 文字交回 DOM，绝对定位在环心
    var wrapEl = document.createElement('div');
    wrapEl.style.cssText = 'position:relative;width:' + S + 'px;height:0';
    var mid = document.createElement('div');
    mid.style.cssText = 'position:absolute;left:0;right:0;top:' + (-S / 2 - 22) + 'px;text-align:center';
    mid.innerHTML =
      '<div class="u-num" style="font-size:34px;line-height:1.05;letter-spacing:-.02em">' +
      Math.round(pct * 100) + '%</div>' +
      '<div class="u-eyebrow" style="margin-top:4px">' + (o.center || 'USED') + '</div>';
    wrapEl.appendChild(mid);
    host.appendChild(wrapEl);

    var run = function () {
      arc.style.transition = 'stroke-dashoffset 900ms var(--ease-brush)';
      arc.style.strokeDashoffset = String(C * (1 - pct));
    };
    matchMedia('(prefers-reduced-motion: reduce)').matches
      ? (arc.style.strokeDashoffset = String(C * (1 - pct)))
      : requestAnimationFrame(function () { requestAnimationFrame(run); });
  }

  /* ── 线性量表 ────────────────────────────────────────────────────
     用线性条不用半圆表盘。当前值走玄墨，朱线只标上限。指针废止。 ── */
  function gauge(host, o) {
    var W = 720, H = 44, bh = 10;
    var f = function (v) { return ((v - o.min) / (o.max - o.min)) * W; };
    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H, role: 'img',
      'aria-label': o.label + '：' + o.value, preserveAspectRatio: 'none'
    });
    svg.style.height = H + 'px';
    svg.appendChild(el('rect', {
      x: 0, y: (H - bh) / 2, width: W, height: bh,
      fill: tok('--rail', '#E9E4DA')
    }));
    var bar = el('rect', {
      x: 0, y: (H - bh) / 2, width: 0, height: bh,
      fill: tok('--text-heading', '#17140F')
    });
    svg.appendChild(bar);
    // 朱线只标上限
    if (o.limit != null) {
      svg.appendChild(el('line', {
        x1: f(o.limit), y1: 2, x2: f(o.limit), y2: H - 2,
        stroke: tok('--seal', '#8A3323'), 'stroke-width': 2
      }));
    }
    host.innerHTML = '';
    host.appendChild(svg);

    // 刻度：首末两端 + 上限标注。上限标签必须落在朱线所在的位置，不能居中放。
    var pct = ((o.limit - o.min) / (o.max - o.min)) * 100;
    var sc = document.createElement('div');
    sc.style.cssText = 'position:relative;height:20px;margin-top:var(--space-1);' +
      'font-size:var(--fs-label);color:var(--text-subtle);font-variant-numeric:tabular-nums';
    sc.innerHTML =
      '<span style="position:absolute;left:0">' + o.min + '</span>' +
      '<span style="position:absolute;right:0">' + o.max + '</span>' +
      (o.limit != null
        ? '<span style="position:absolute;left:' + pct.toFixed(2) +
        '%;transform:translateX(-50%);white-space:nowrap;color:var(--seal)">上限 ' + o.limit + '</span>'
        : '');
    host.appendChild(sc);

    var go = function () {
      bar.style.transition = 'width 900ms var(--ease-brush)';
      bar.setAttribute('width', Math.max(f(o.value), 0));
    };
    matchMedia('(prefers-reduced-motion: reduce)').matches
      ? bar.setAttribute('width', Math.max(f(o.value), 0))
      : requestAnimationFrame(function () { requestAnimationFrame(go); });
  }

  /* ── 迷你折线 · Small multiples ──────────────────────────────────
     纵轴必须共用同一量程，否则形状之间不可比。不画轴、不标点。   ── */
  function spark(host, data, lo, hi) {
    var W = 120, H = 34;
    var n = data.length;
    var d = data.map(function (v, i) {
      var x = (i / (n - 1)) * W;
      var y = H - ((v - lo) / (hi - lo || 1)) * H;
      return (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2);
    }).join(' ');
    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none',
      'aria-hidden': 'true', focusable: 'false'
    });
    svg.style.cssText = 'width:100%;height:34px';
    svg.appendChild(el('path', {
      d: d, fill: 'none', stroke: tok('--chart-s1', '#463154'),
      'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      'vector-effect': 'non-scaling-stroke'
    }));
    host.innerHTML = '';
    host.appendChild(svg);
  }

  /* ── DotDensity · 点阵密度 ───────────────────────────────────────
     一枚点恒等于约 350 吨，点数即量级。点径固定 1.4–1.6，
     只改点数与行列，不改颜色、不加渐变、不做发光。               ── */
  function density(host, count, perDot, cols) {
    var n = Math.max(Math.round(count / (perDot || 350)), 0);
    var C = cols || 9, R = Math.ceil(n / C);
    var gap = 7, r = 1.5, pad = r + 1;
    var W = (C - 1) * gap + pad * 2, H = Math.max((R - 1) * gap + pad * 2, pad * 2);
    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H, width: W, height: H,
      role: 'img', 'aria-label': n + ' 枚点 · 每点约 ' + (perDot || 350) + ' 吨'
    });
    for (var i = 0; i < n; i++) {
      svg.appendChild(el('circle', {
        cx: pad + (i % C) * gap, cy: pad + Math.floor(i / C) * gap, r: r,
        fill: tok('--text-heading', '#17140F')
      }));
    }
    host.innerHTML = '';
    host.appendChild(svg);
  }

  /* ── 条形行 · 宽度写回 CSS 变量，DOM 承担文字 ───────────────────── */
  function bars(host) {
    host.querySelectorAll('.bar-row').forEach(function (row) {
      var p = parseFloat(row.dataset.pct) || 0;
      var fill = row.querySelector('.bar-row__fill');
      if (fill) fill.style.width = p + '%';
    });
  }

  window.Charts = {
    line: line, donut: donut, gauge: gauge,
    spark: spark, density: density, bars: bars, fmt: fmt
  };
})();
