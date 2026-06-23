'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, MousePointer2, Search, Star, Video } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, CompactIndexCard, EditorialFeatureCard, getEditableExcerpt, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const meetingMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function safePost(posts: SitePost[], index: number) {
  return posts[index] || posts[0] || null
}

function sectionPosts(timeSections: HomeTimeSection[], posts: SitePost[]) {
  const collected = timeSections.flatMap((section) => section.posts)
  return collected.length ? collected : posts
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = safePost(posts, 0)
  const support = safePost(posts, 1)

  return (
    <section className="editorial-wave overflow-hidden bg-[#dfe6fb]">
      <div className={`${dc.shell.section} relative py-10 sm:py-14 lg:py-20`}>
        <div className="grid gap-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div className="max-w-[36rem]">
            <p className="text-sm font-semibold text-[var(--slot4-accent-fill)]">{globalLabel()}</p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.07em] text-[var(--slot4-accent-fill)] sm:text-6xl lg:text-[5.6rem]">
              {pagesContent.home.hero.title.join(' ')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--slot4-page-text)]/88">
              {pagesContent.home.hero.description}
            </p>
            <div className="mt-8 flex items-center gap-4 text-[var(--slot4-accent-soft)]">
              {[0, 1, 2, 3, 4].map((item) => <Star key={item} className="h-8 w-8 fill-current stroke-0" />)}
              <span className="text-2xl font-black text-[#ad86ef]">4.8 distribution partner rating</span>
            </div>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-[var(--slot4-page-text)]/80">
              Use the archive to surface stories, category pages, and campaign-ready content in a presentation style built for media distributors.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={pagesContent.home.hero.primaryCta.href} className={dc.button.primary}>{pagesContent.home.hero.primaryCta.label}</Link>
              <Link href={pagesContent.home.hero.secondaryCta.href} className={dc.button.secondary}>{pagesContent.home.hero.secondaryCta.label}</Link>
            </div>
          </div>

          <div className="relative">
            {lead ? <EditorialFeatureCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} label="Guaranteed media publishing" /> : null}
            <div className="mt-8 flex items-center justify-between gap-4 text-[#ad86ef]">
              <p className="text-2xl font-black">Targeted media solutions for every brand</p>
              <MousePointer2 className="h-12 w-12 fill-current stroke-0" />
            </div>
            {support ? <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--slot4-page-text)]/70">{getEditableExcerpt(support, 150)}</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 10)
  const totalPages = Math.ceil(railPosts.length / 3)
  const [page, setPage] = useState(0)
  const visiblePosts = useMemo(() => {
    const start = page * 3
    return railPosts.slice(start, start + 3)
  }, [page, railPosts])

  if (!railPosts.length) return null

  const goPrev = () => setPage((current) => (current - 1 + totalPages) % totalPages)
  const goNext = () => setPage((current) => (current + 1) % totalPages)

  return (
    <section className="bg-[#fffaf4]">
      <div className={`${dc.shell.section} py-16`}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-[-0.06em] text-[var(--slot4-accent-fill)] sm:text-5xl">Tailored digital distribution pathways for every campaign</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--slot4-muted-text)]">
            Choose a content lane, keep discovery smooth, and guide readers through polished coverage, category pages, and search-driven visibility.
          </p>
        </div>
        <div className="mt-12 grid items-center gap-6 lg:grid-cols-[56px_1fr_56px]">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Show previous posts"
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] text-white shadow-[0_12px_30px_rgba(90,31,207,0.2)] transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-7 w-7" />
          </button>
          <div className="grid gap-6 md:grid-cols-3">
            {visiblePosts.map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={page * 3 + index} />)}
          </div>
          <button
            type="button"
            onClick={goNext}
            aria-label="Show next posts"
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] text-white shadow-[0_12px_30px_rgba(90,31,207,0.2)] transition hover:-translate-y-0.5"
          >
            <ArrowRight className="h-7 w-7" />
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Show post group ${index + 1}`}
              className={`h-2.5 rounded-full transition ${index === page ? 'w-10 bg-[var(--slot4-accent-fill)]' : 'w-2.5 bg-[var(--slot4-accent-fill)]/25'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = safePost(posts, 4)
  const videoLead = safePost(posts, 5)
  if (!feature) return null

  const bullets = [
    'Dedicated campaign presentation',
    'Flexible category-led discovery',
    'Strong visibility for feature stories',
    'Elegant layouts for public updates',
    'Premium reading experience across devices',
  ]

  return (
    <section className="bg-[#f7f9ff]">
      <div className={`${dc.shell.section} py-16`}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.06em] text-[var(--slot4-accent-fill)] sm:text-5xl">Why teams trust a premium editorial surface for media distribution</h2>
            <div className="mt-6 max-w-2xl space-y-6 text-lg leading-9 text-[var(--slot4-muted-text)]">
              <p>When content is important, presentation matters. The layout should make campaigns feel confident, current, and easy to navigate from first glance to final detail page.</p>
              <p>This redesign keeps the publishing system intact while giving the front end a more deliberate visual identity with stronger hierarchy, broader cards, and more useful discovery flows.</p>
            </div>
            <div className="mt-8 grid gap-3">
              {bullets.map((bullet) => (
                <p key={bullet} className="inline-flex items-center gap-3 text-xl font-semibold text-[var(--slot4-page-text)]">
                  <CheckCircle2 className="h-6 w-6 text-[var(--slot4-accent-fill)]" /> {bullet}
                </p>
              ))}
            </div>
           
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-[var(--slot4-accent-fill)] p-6 text-white shadow-[0_22px_60px_rgba(58,39,118,0.2)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/92 text-[var(--slot4-accent-fill)] shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
                <Video className="h-8 w-8 fill-current stroke-0" />
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-black">{feature.title}</h3>
                <p className="mt-3 text-base leading-8 text-white/78">{getEditableExcerpt(feature, 120)}</p>
              </div>
            </div>
            {videoLead ? (
              <p className="text-xl font-black leading-10 text-[var(--slot4-accent-fill)]">
                Whether the archive is highlighting fresh releases or evergreen resources, the interface should recommend the clearest next step for the reader.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const router = useRouter()
  const source = sectionPosts(timeSections, posts)
  const duo = source.slice(6, 8).length ? source.slice(6, 8) : source.slice(0, 2)
  const schedulerLead = safePost(source, 8)
  const latest = source.slice(9, 12).length ? source.slice(9, 12) : source.slice(2, 5)
  const today = useMemo(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])
  const [selectedYear, setSelectedYear] = useState(today.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
  const selectableYears = useMemo(() => Array.from({ length: 6 }, (_, index) => today.getFullYear() + index), [today])
  const meetingDays = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
    return Array.from({ length: daysInMonth }, (_, index) => index + 1)
  }, [selectedMonth, selectedYear])
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const meetingTimes = ['4:30 pm', '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm']
  const [selectedTime, setSelectedTime] = useState(meetingTimes[0])
  const faq = [
    'How quickly can new content appear in the archive?',
    'Can category-led pages still surface different task types?',
    'Will missing images or summaries break the design?',
    'Can search still discover content across active sections?',
    'Does the detail page preserve related content and comments?',
  ]

  useEffect(() => {
    if (selectedYear === today.getFullYear() && selectedMonth < today.getMonth()) {
      setSelectedMonth(today.getMonth())
      return
    }
    const maxDay = new Date(selectedYear, selectedMonth + 1, 0).getDate()
    const candidate = new Date(selectedYear, selectedMonth, Math.min(selectedDay, maxDay))
    if (candidate < today) {
      setSelectedDay(selectedYear === today.getFullYear() && selectedMonth === today.getMonth() ? today.getDate() : 1)
      return
    }
    if (selectedDay > maxDay) {
      setSelectedDay(maxDay)
    }
  }, [selectedDay, selectedMonth, selectedYear, today])

  const isPastDay = (day: number) => new Date(selectedYear, selectedMonth, day) < today

  const submitMeetingRequest = () => {
    const params = new URLSearchParams({
      subject: 'Editorial Desk Meeting Request',
      message: `I'd like to book the editorial desk meeting slot on ${meetingMonthNames[selectedMonth]} ${selectedDay}, ${selectedYear} at ${selectedTime}.`,
    })
    router.push(`/contact?${params.toString()}`)
  }

  return (
    <>
      

      <section className="bg-[#f7f9ff]">
        <div className={`${dc.shell.section} py-16`}>
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
            <div className="self-center">
              <CalendarDays className="h-12 w-12 text-[var(--slot4-accent-fill)]" />
              <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] text-[var(--slot4-accent-fill)] sm:text-5xl">Talk to our experts today</h2>
              <p className="mt-5 max-w-xl text-lg leading-9 text-[#9d88d4]">
                Need guidance on which section, category, or content lane to use next? This layout gives the page a premium consultation moment without changing any backend behavior.
              </p>
              </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(90,31,207,0.1)] bg-white shadow-[0_22px_60px_rgba(58,39,118,0.12)] lg:grid lg:grid-cols-[.5fr_.5fr]">
              <div className="bg-[var(--slot4-accent-fill)] p-6 text-white sm:p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/45 bg-white/10 text-sm font-black">
                  {schedulerLead?.title?.slice(0, 2).toUpperCase() || 'ED'}
                </div>
                <h3 className="mt-5 text-center text-4xl font-black tracking-[-0.05em]">Meet the editorial desk</h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <select
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(Number(event.target.value))}
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-center text-sm font-black text-white outline-none"
                  >
                    {meetingMonthNames.map((month, index) => {
                      const disabled = selectedYear === today.getFullYear() && index < today.getMonth()
                      return <option key={month} value={index} disabled={disabled} className="text-[var(--slot4-page-text)]">{month}</option>
                    })}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(Number(event.target.value))}
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-center text-sm font-black text-white outline-none"
                  >
                    {selectableYears.map((year) => <option key={year} value={year} className="text-[var(--slot4-page-text)]">{year}</option>)}
                  </select>
                </div>
                <div className="mt-8 grid grid-cols-7 gap-4 text-center text-sm font-bold text-white/72">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => <span key={day}>{day}</span>)}
                  {meetingDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      disabled={isPastDay(day)}
                      className={`rounded-full py-2 transition ${selectedDay === day ? 'bg-white text-[var(--slot4-accent-fill)]' : isPastDay(day) ? 'cursor-not-allowed text-white/35 line-through' : 'text-white/72 hover:bg-white/14 hover:text-white'}`}
                      aria-pressed={selectedDay === day}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 sm:p-8">
               <h3 className="mt-8 text-2xl font-black">What time works best?</h3>
                <p className="mt-2 text-base text-[var(--slot4-muted-text)]">Showing times for {meetingMonthNames[selectedMonth]} {selectedDay}, {selectedYear}</p>
                <div className="mt-5 grid gap-3">
                  {meetingTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-[1rem] border px-4 py-3 text-center text-lg font-semibold transition ${selectedTime === time ? 'border-[var(--slot4-accent-fill)] bg-[var(--slot4-accent-fill)] text-white shadow-[0_12px_24px_rgba(90,31,207,0.16)]' : 'border-[rgba(90,31,207,0.12)] text-[var(--slot4-accent-fill)] hover:-translate-y-0.5 hover:border-[var(--slot4-accent-fill)]/40 hover:bg-[var(--slot4-page-bg)]'}`}
                      aria-pressed={selectedTime === time}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={submitMeetingRequest}
                  className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-dark-bg)]"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf4]">
        <div className={`${dc.shell.section} py-16`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.06em] text-[var(--slot4-accent-fill)] sm:text-5xl">Latest insights</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--slot4-page-text)]/75">Fresh story cards, search-first discovery, and multiple visual templates keep the archive feeling active and useful.</p>
            </div>
            <Link href={'/search'} className={dc.button.primary}>View more insights</Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {latest.map((post, index) => <ArticleListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#eef2ff]">
        <div className={`${dc.shell.section} py-16`}>
          <h2 className="text-5xl font-black tracking-[-0.07em] text-[var(--slot4-accent-fill)] sm:text-6xl">Frequently asked questions</h2>
          <div className="mt-8 rounded-[2rem] bg-[#eef2ff]">
            {faq.map((question, index) => (
              <details key={question} className="border-b border-[rgba(90,31,207,0.12)] py-5 text-lg font-black text-[var(--slot4-accent-fill)]">
                <summary className="cursor-pointer list-none">{question}</summary>
                <p className="mt-3 max-w-4xl text-base font-semibold leading-8 text-[var(--slot4-muted-text)]">
                  The interface continues to use the current props, routes, and task feeds, while the editable front end improves hierarchy, fallbacks, and page-level presentation.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-16`}>
        <form action="/search" className="rounded-[2rem] bg-[var(--slot4-page-bg)] px-6 py-8 shadow-[0_18px_40px_rgba(58,39,118,0.08)] sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.06em] text-[#ad86ef] sm:text-5xl">Search the full archive</h2>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-[var(--slot4-muted-text)]">Explore stories, listings, visuals, and resources from every active section through one connected search surface.</p>
            </div>
            <label className="flex rounded-full border border-[rgba(90,31,207,0.12)] bg-white px-4 py-2 shadow-[0_12px_30px_rgba(58,39,118,0.06)] sm:min-w-[420px]">
              <Search className="mt-2 h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
              <input name="q" placeholder="Search stories" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-base font-semibold outline-none" />
              <button className="rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-black text-white">Search</button>
            </label>
          </div>
        </form>
      </div>
    </section>
  )
}

function globalLabel() {
  return ''
}
