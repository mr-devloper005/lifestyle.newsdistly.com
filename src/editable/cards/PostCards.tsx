import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Latest'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured story' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 rounded-[2rem] bg-[var(--slot4-dark-bg)] text-white ${dc.motion.lift}`}>
      <div className="p-6 sm:p-8">
        <span className="inline-flex rounded-full bg-white/14 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{label}</span>
        <h3 className="mt-5 text-3xl font-black leading-[1.02] tracking-[-0.045em] sm:text-[2.4rem]">{post.title}</h3>
        <p className="mt-5 line-clamp-4 text-sm leading-8 text-white/78">{getEditableExcerpt(post, 220)}</p>
        <span className="mt-6 inline-flex rounded-full bg-[#dfe6fb] px-5 py-2.5 text-sm font-black text-[var(--slot4-accent-fill)]">Find out more</span>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block rounded-[2rem] bg-[var(--slot4-accent-fill)] text-white ${dc.motion.lift}`}>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[.18em] text-white/72">
          <span>{getEditableCategory(post)}</span><span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-5 line-clamp-2 text-[1.8rem] font-black leading-[1.02] tracking-[-.05em]">{post.title}</h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/78">{getEditableExcerpt(post, 120)}</p>
        <span className="mt-4 inline-flex rounded-full bg-[#dfe6fb] px-5 py-2.5 text-sm font-black text-[var(--slot4-accent-fill)]">Find out more</span>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[42px_1fr] gap-4 rounded-[1.4rem] border border-[rgba(90,31,207,0.08)] bg-white/65 px-4 py-4 shadow-[0_10px_26px_rgba(58,39,118,0.05)] transition duration-300 hover:-translate-y-1">
      <span className="text-2xl font-black leading-none text-[var(--slot4-accent-fill)]">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-[var(--slot4-soft-muted-text)]"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight tracking-[-.03em] group-hover:text-[var(--slot4-accent-fill)]">{post.title}</h3>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group min-w-0 rounded-[2rem] border border-[rgba(90,31,207,0.08)] bg-white/82 p-5 shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="min-w-0">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
        <h2 className="mt-3 line-clamp-3 text-3xl font-black leading-[1.02] tracking-[-.05em] group-hover:text-[var(--slot4-accent-fill)]">{post.title}</h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-[var(--slot4-accent-fill)]">Read story <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}
