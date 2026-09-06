---
name: sinotao-design
description: Use this skill to generate well-branded interfaces and assets for 源裕兴 SINOTAO (Sinotao Innovation Future) and its five entities — STG 集团, STE 九派国有能源, STI 进出口贸易, STH 健康科技, EDU 崇仁教育 — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- `readme.md` — the design guide: brand context, content fundamentals, visual foundations, iconography, full index.
- `styles.css` — link this one file; it `@import`s every token file.
- `tokens/` — CSS custom properties. Never hardcode a colour or spacing value.
- `components/` — 29 React primitives, grouped `core / forms / data / feedback / navigation`. Each has a `.d.ts` props contract and a `.prompt.md` telling you when to use it.
- `ui_kits/` — three full product recreations (STE console, brand site, STG cockpit). Read these to match real layout density.
- `guidelines/` — 27 specimen cards you can open in a browser.
- `assets/` — the SINOTAO wordmark (three colourways) and one park photograph. **There is no logomark and no brand icon set — do not draw one.**

## Non-negotiables

1. Theme with `<html data-theme="stg|ste|sti|sth|edu">`; dark mode with `data-color-scheme="dark"`.
2. Page ground is 宣纸白 `--ink-50`, ink is 玄墨 `--ink-900`. No pure black or pure white text/background.
3. Gold `--gold-400` appears at most once per screen.
4. Icons come from Material Symbols Rounded through the `Icon` component. No emoji, ever.
5. Chinese display type is Noto Serif SC at light weights with negative tracking; all numerals use Space Grotesk with `tabular-nums`.
6. Product buttons are 6px radius; only marketing CTAs use `shape="pill"`.
7. Copy writes the action ("保存并提交"), never "确定".
