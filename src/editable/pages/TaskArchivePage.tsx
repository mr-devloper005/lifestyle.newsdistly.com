import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Newspaper, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; badge: string }> = {
  mediaDistribution: { icon: Newspaper, badge: 'Distribution' },
  article: { icon: FileText, badge: 'Editorial' },
  listing: { icon: Building2, badge: 'Directory' },
  classified: { icon: Megaphone, badge: 'Classified' },
  image: { icon: Camera, badge: 'Visual' },
  sbm: { icon: Bookmark, badge: 'Bookmark' },
  pdf: { icon: Download, badge: 'PDF' },
  profile: { icon: UserRound, badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = {
    '--archive-bg': '#fffaf4',
    '--archive-text': '#302663',
    '--archive-surface': '#f7f9ff',
    '--archive-accent': '#5a1fcf',
  } as CSSProperties

  const dynamicCategories = Array.from(new Map([
    ...CATEGORY_OPTIONS,
    ...posts.map((post) => {
      const raw = getEditableCategory(post)
      return raw ? { name: raw, slug: normalizeCategory(raw) } : null
    }).filter((item): item is { name: string; slug: string } => Boolean(item)),
  ].map((item) => [item.slug, item])).values())
  const categoryLabel = category === 'all' ? 'All categories' : dynamicCategories.find((item) => item.slug === category)?.name || category
  const featured = posts[0]
  const secondary = posts.slice(1, 4)
  const stream = posts.slice(4)

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.02fr_.98fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--archive-accent)] shadow-[0_12px_30px_rgba(58,39,118,0.08)]">
                  <Icon className="h-4 w-4" /> {deck.badge}
                </div>
                <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] text-[var(--archive-accent)] sm:text-6xl lg:text-[5rem]">
                  {voice?.headline || `Browse ${label}`}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-9 text-[var(--slot4-muted-text)]">
                  {voice?.description || SITE_CONFIG.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href={basePath} className="rounded-full bg-[var(--archive-accent)] px-6 py-3 text-sm font-black text-white">Browse all</Link>
                  <Link href="/search" className="rounded-full border-2 border-[var(--archive-accent)] px-6 py-3 text-sm font-black text-[var(--archive-accent)]">Search archive</Link>
                </div>
              </div>

              <form action={basePath} className="self-center rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(58,39,118,0.08)]">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--archive-accent)]"><Filter className="h-4 w-4" /> Filter category</div>
                <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-[1rem] border border-[rgba(90,31,207,0.12)] bg-[var(--archive-bg)] px-4 text-sm font-bold outline-none">
                  <option value="all">All categories</option>
                  {dynamicCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                <button className="mt-4 h-12 w-full rounded-full bg-[var(--archive-accent)] text-sm font-black text-white">Apply filter</button>
                <p className="mt-3 text-sm font-semibold text-[var(--slot4-muted-text)]">Showing: {categoryLabel}</p>
              </form>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
              <Link href={`${basePath}/${featured.slug}`} className="group relative overflow-hidden rounded-[2.2rem] bg-[var(--slot4-dark-bg)] text-white shadow-[0_26px_70px_rgba(58,39,118,0.22)]">
                <img src={getEditablePostImage(featured)} alt="" className="h-[26rem] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[34rem]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(44,18,110,.88))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="rounded-full bg-white/14 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{getEditableCategory(featured)}</span>
                  <h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">{featured.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">{getEditableExcerpt(featured, 180)}</p>
                </div>
              </Link>
              <div className="grid gap-5">
                {secondary.map((post, index) => (
                  <Link key={post.id || post.slug} href={`${basePath}/${post.slug}`} className="group grid gap-4 rounded-[2rem] bg-white p-4 shadow-[0_16px_36px_rgba(58,39,118,0.08)] sm:grid-cols-[180px_minmax(0,1fr)]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[var(--slot4-media-bg)]">
                      <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="self-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--archive-accent)]">0{index + 1} / {getEditableCategory(post)}</p>
                      <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-6 lg:px-8">
          {stream.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {stream.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : !featured ? (
            <div className="rounded-[2rem] border border-dashed border-[rgba(90,31,207,0.18)] bg-white p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[var(--archive-accent)]/55" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try another category or refresh this page after publishing new content.</p>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[rgba(90,31,207,0.12)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-full bg-[var(--archive-accent)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[rgba(90,31,207,0.12)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}`
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/11] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">Story {String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
        <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1 sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.6rem] bg-[var(--slot4-page-bg)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full bg-[var(--slot4-page-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-page-text)]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="grid min-h-64 sm:grid-cols-[0.78fr_1fr]">
        <div className="bg-[var(--slot4-accent-fill)] p-5 text-white">
          <span className="rounded-full bg-white/14 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">Classified</span>
          <h2 className="mt-8 text-3xl font-black tracking-[-0.05em]">{price || 'Open offer'}</h2>
          <p className="mt-3 text-sm font-semibold text-white/75">{location || 'Details inside'}</p>
        </div>
        <div className="p-5">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 145)}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--slot4-accent-fill)] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[var(--slot4-page-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-page-text)]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 opacity-75">{getEditableExcerpt(post, 150)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--slot4-accent-fill)] p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[var(--slot4-page-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">PDF</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150)}</p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="rounded-[2rem] bg-white p-6 text-center shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-page-bg)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
    </Link>
  )
}
