import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#dfe6fb',
  '--slot4-page-text': '#302663',
  '--slot4-panel-bg': '#edf1ff',
  '--slot4-surface-bg': '#f7f9ff',
  '--slot4-muted-text': '#625d84',
  '--slot4-soft-muted-text': '#8b84af',
  '--slot4-accent': '#5a1fcf',
  '--slot4-accent-fill': '#5a1fcf',
  '--slot4-accent-soft': '#b48af4',
  '--slot4-dark-bg': '#23174c',
  '--slot4-dark-text': '#f9f8ff',
  '--slot4-media-bg': '#d4dcf4',
  '--slot4-cream': '#f3e3d0',
  '--slot4-warm': '#fffaf4',
  '--slot4-lavender': '#aacddc',
  '--slot4-gray': '#d2c4b4',
  '--slot4-body-gradient': 'radial-gradient(circle at top left, rgba(255,255,255,0.8), transparent 32%), linear-gradient(180deg, #dfe6fb 0%, #ecf1ff 42%, #fffaf4 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[rgba(90,31,207,0.12)]',
  darkBorder: 'border-white/20',
  shadow: 'shadow-[0_22px_60px_rgba(58,39,118,0.12)]',
  shadowStrong: 'shadow-[0_30px_90px_rgba(58,39,118,0.2)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(48,38,99,0.04),rgba(35,23,76,0.86))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start',
    rail: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    minRailCard: 'min-w-0',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.22em]',
    heroTitle: 'text-4xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-[5.2rem]',
    sectionTitle: 'text-3xl font-black leading-none tracking-[-0.045em] sm:text-4xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg} rounded-[2rem]`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg} rounded-[1.75rem]`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText} rounded-[2rem]`,
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-dark-bg)]',
    secondary: 'inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--slot4-accent-fill)] bg-transparent px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-[var(--slot4-accent-fill)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/65',
    accent: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-dark-bg)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[2rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(58,39,118,0.18)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'All visible layout decisions belong inside src/editable; keep data, SEO, API, and route logic untouched.',
  'Use the soft blue, beige, and violet palette with rounded modules, premium spacing, and editorial hierarchy.',
  'Keep dynamic post fetching intact and never replace backend posts with mock arrays.',
  'Use postHref() for all post links so route aliases and task-specific detail pages remain functional.',
  'Render all posts defensively with image, summary, category, and metadata fallbacks.',
  'Branding must remain dynamic from SITE_CONFIG; never hardcode a reference brand name or logo.',
] as const
