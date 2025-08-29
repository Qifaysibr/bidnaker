'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="relative container z-20 border-b border-pks "
      {...(theme ? { 'data-theme': "light" } : {})}
    >
      <div className="py-4 flex justify-between">
        <Link href="/" className="group flex items-center gap-2 md:gap-4 lg:gap-8">
          <Logo loading="eager" priority="high" className="dark:invert-0" />
          <h1 className="flex flex-col w-full group-hover:text-pks md:gap-2">
            <span className="text-md md:text-xl whitespace-nowrap inline-block">Bidang Ketenagakerjaan</span>
            <strong className="text-lg md:text-2xl whitespace-nowrap inline-block">Partai Keadilan Sejahtera</strong>
          </h1>
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
