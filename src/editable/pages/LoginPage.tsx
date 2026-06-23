import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fffaf4] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1180px] gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center rounded-[2rem] bg-[var(--slot4-page-bg)] p-8 sm:p-12">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-xl text-5xl font-black leading-[0.94] tracking-[-0.07em] text-[var(--slot4-accent-fill)] sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>
          </div>
          <div className="flex flex-col justify-center rounded-[2rem] bg-white p-7 shadow-[0_18px_40px_rgba(58,39,118,0.08)] sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">Member access</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-black text-[var(--slot4-accent-fill)]">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
