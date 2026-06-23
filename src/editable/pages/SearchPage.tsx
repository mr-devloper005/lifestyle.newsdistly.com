import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(getEditableCategory(post))
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group block rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(58,39,118,0.08)] transition duration-300 hover:-translate-y-1 sm:p-6 ${strong ? 'md:col-span-2' : ''}`}>
      <div>
        <span className="rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">{taskLabel}</span>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
        <h2 className="mt-4 line-clamp-3 text-2xl font-black leading-[1.03] tracking-[-0.035em] text-[var(--slot4-page-text)]">{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-3 text-sm font-semibold leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">Open result <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#fffaf4] text-[var(--slot4-page-text)]">
        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] bg-[var(--slot4-accent-fill)] p-7 text-white sm:p-10">
                <p className="text-xs font-black uppercase tracking-[0.28em]">{pagesContent.search.hero.badge}</p>
                <h1 className="mt-5 text-5xl font-black leading-[0.94] tracking-[-0.07em] sm:text-6xl">{pagesContent.search.hero.title}</h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">{pagesContent.search.hero.description}</p>
              </div>
              <form action="/search" className="self-center rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(58,39,118,0.08)] sm:p-8">
                <input type="hidden" name="master" value="1" />
                <label className="flex items-center gap-3 rounded-[1.2rem] border border-[rgba(90,31,207,0.12)] bg-[var(--slot4-page-bg)] px-4 py-3">
                  <Search className="h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
                  <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-[1.2rem] border border-[rgba(90,31,207,0.12)] bg-[var(--slot4-page-bg)] px-4 py-3">
                    <Filter className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                    <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                  </label>
                  <select name="task" defaultValue={task} className="rounded-[1.2rem] border border-[rgba(90,31,207,0.12)] bg-[var(--slot4-page-bg)] px-4 py-3 text-sm font-black outline-none">
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </div>
                <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] px-6 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-dark-bg)]" type="submit">Search</button>
              </form>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">{results.length} results</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[var(--slot4-accent-fill)]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            </div>

          {results.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] bg-white p-10 text-center shadow-[0_18px_40px_rgba(58,39,118,0.08)]">
              <p className="text-2xl font-black tracking-[-0.04em]">No matching posts found.</p>
              <p className="mt-3 text-sm font-semibold text-[var(--slot4-muted-text)]">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
