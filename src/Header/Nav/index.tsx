'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; isMobileMenuOpen: boolean }> = ({
  data,
  isMobileMenuOpen,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav
      className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:gap-3 absolute md:relative top-full left-0 w-full md:w-auto bg-white dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent p-4 md:p-0 shadow-xl md:shadow-none border-x border-b border-pks md:border-t-0 border-border md:border-none z-10 rounded-b-xl md:rounded-none`}
    >
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="block py-2 md:py-0" />
      })}
      <Link href="/search" className="hidden md:block">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
