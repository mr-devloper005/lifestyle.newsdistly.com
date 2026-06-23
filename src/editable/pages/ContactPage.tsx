'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial planning', body: 'Share story ideas, release timing, and content structure questions.' },
  { icon: Megaphone, title: 'Distribution support', body: 'Discuss campaign visibility, category strategy, and archive presentation.' },
  { icon: Mail, title: 'General requests', body: 'Reach out for account, publishing, or workflow-related help.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fffaf4] text-[var(--slot4-page-text)]">
        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.07em] text-[var(--slot4-accent-fill)] sm:text-6xl lg:text-[5rem]">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="grid gap-5">
              {desks.map((desk, index) => (
                <div key={desk.title} className="rounded-[2rem] bg-[var(--slot4-accent-fill)] p-7 text-white shadow-[0_18px_40px_rgba(58,39,118,0.18)]">
                  <div className="flex items-center justify-between"><desk.icon className="h-5 w-5" /><span className="text-xs font-black text-white/55">0{index + 1}</span></div>
                  <h2 className="mt-6 text-3xl font-black">{desk.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/78">{desk.body}</p>
                </div>
              ))}
            </aside>
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(58,39,118,0.08)] sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">Send a message</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
