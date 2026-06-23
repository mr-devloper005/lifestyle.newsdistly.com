'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navLinks = globalContent.nav.primaryLinks

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(90,31,207,0.08)] bg-[rgba(247,249,255,0.92)] text-[var(--slot4-page-text)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[88px] max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(90,31,207,0.14)] bg-white/70"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <Link href="/" className="editorial-brand inline-flex min-w-0 items-center gap-3 whitespace-nowrap text-[2rem] font-black tracking-[-0.07em] text-[var(--slot4-accent-fill)] sm:text-[2.35rem]">
          <img src="/favicon.png" width="96" height="96" alt={`${SITE_CONFIG.name} logo`} className="h-16 w-18 shrink-0 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
          <span className="truncate">{SITE_CONFIG.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item, index) => (
            <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]/88 transition hover:text-[var(--slot4-accent-fill)]">
              {item.label}
              
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <form action="/search" className="flex items-center gap-2 rounded-full border border-[rgba(90,31,207,0.12)] bg-white/70 px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
            <input name="q" type="search" placeholder="Search" className="w-28 bg-transparent text-sm font-semibold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
          </form>
          {session ? (
            <>
              <Link href="/create" className="text-sm font-black text-[var(--slot4-accent-fill)]">Publish</Link>
              <button type="button" onClick={logout} className="text-sm font-black text-[var(--slot4-page-text)]">Logout</button>
            </>
          ) : (
            <>
              <Link href="/signup" className="text-sm font-black text-[var(--slot4-accent-fill)]">{globalContent.nav.actions.primary.label}</Link>
              <Link href="/login" className="text-sm font-black text-[var(--slot4-page-text)]">{globalContent.nav.actions.secondary.label}</Link>
            </>
          )}
        </div>
      </div>

      {open ? (
        <div className="border-t border-[rgba(90,31,207,0.08)] bg-[var(--slot4-surface-bg)] px-4 py-5 lg:hidden">
          <div className="mx-auto max-w-[1180px]">
            <form action="/search" className="mb-4 flex items-center gap-2 rounded-[1.25rem] border border-[rgba(90,31,207,0.12)] bg-white px-4 py-3">
              <Search className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
              <input name="q" type="search" placeholder="Search the archive" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            </form>
            <div className="grid gap-2">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-[1.25rem] bg-white px-4 py-3 text-sm font-black text-[var(--slot4-page-text)] shadow-[0_14px_30px_rgba(58,39,118,0.08)]">
                  {item.label}
                </Link>
              ))}
              {session ? (
                <>
                  <Link href="/create" onClick={() => setOpen(false)} className="rounded-[1.25rem] bg-[var(--slot4-accent-fill)] px-4 py-3 text-sm font-black text-white">Publish</Link>
                  <button type="button" onClick={logout} className="rounded-[1.25rem] bg-white px-4 py-3 text-left text-sm font-black text-[var(--slot4-page-text)]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/signup" onClick={() => setOpen(false)} className="rounded-[1.25rem] bg-[var(--slot4-accent-fill)] px-4 py-3 text-sm font-black text-white">{globalContent.nav.actions.primary.label}</Link>
                  <Link href="/login" onClick={() => setOpen(false)} className="rounded-[1.25rem] bg-white px-4 py-3 text-sm font-black text-[var(--slot4-page-text)]">{globalContent.nav.actions.secondary.label}</Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
