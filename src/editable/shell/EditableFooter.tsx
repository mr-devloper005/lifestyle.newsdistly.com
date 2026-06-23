'use client'

import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[#cfd8f2] text-[var(--slot4-page-text)]">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_.8fr_.8fr] lg:px-8 lg:py-20">
        <div>
          <Link href="/" className="editorial-brand text-[3.2rem] font-black tracking-[-0.07em] text-[var(--slot4-accent-fill)]">
            {SITE_CONFIG.name}
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer.description}</p>
          <div className="mt-7 grid gap-3 text-sm font-semibold">
            </div>
        </div>

        {globalContent.footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-lg font-black text-[var(--slot4-accent-fill)]">{column.title}</h3>
            <div className="mt-5 grid gap-3">
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent-fill)]">
                  {link.label}
                </Link>
              ))}
              {column.title === 'Explore' && session ? (
                <>
                  <Link href="/create" className="text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent-fill)]">Publish</Link>
                  <button onClick={logout} className="text-left text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent-fill)]">Logout</button>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/45 px-4 py-5 text-center text-xs font-semibold text-[var(--slot4-muted-text)]">
        © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
