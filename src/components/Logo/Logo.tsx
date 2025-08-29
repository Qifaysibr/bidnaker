import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="PKS Logo"
      width={100}
      height={100}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[100px] w-10 md:w-16 lg:w-20 h-auto', className)}
      src="/media/logo-pks.png"
    />
  )
}
