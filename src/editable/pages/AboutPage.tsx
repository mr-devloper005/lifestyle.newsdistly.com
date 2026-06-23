import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fffaf4] text-[var(--slot4-page-text)]">
        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.07em] text-[var(--slot4-accent-fill)] sm:text-6xl lg:text-[5rem]">
              A premium editorial layer built for better visibility.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <article className="rounded-[2rem] bg-white p-7 shadow-[0_18px_40px_rgba(58,39,118,0.08)] sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">About {SITE_CONFIG.name}</p>
              <div className="article-content mt-8 space-y-6">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <aside className="grid gap-5">
              {pagesContent.about.values.map((value, index) => (
                <div key={value.title} className="rounded-[2rem] bg-[var(--slot4-page-bg)] p-7 shadow-[0_14px_30px_rgba(58,39,118,0.06)]">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">0{index + 1}</p>
                  <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.05em]">{value.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="bg-[var(--slot4-accent-fill)] text-white">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl">Explore the stories shaping media visibility right now.</h2>
            <Link href="/search" className="inline-flex w-fit rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">Explore the archive</Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
