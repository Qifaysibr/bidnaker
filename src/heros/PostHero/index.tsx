import React from 'react'

import type { Post } from '@/payload-types'
import { jsAgo } from 'js-ago'

import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from '@/utilities/formatDateTime'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  // Hitung selisih hari
  const publishedDate = publishedAt ? new Date(publishedAt) : null
  const now = new Date()
  const diffDays = publishedDate
    ? Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24))
    : null

  // Tentukan tampilan waktu
  const displayTime =
    publishedDate && diffDays !== null
      ? diffDays < 7
        ? jsAgo(publishedDate, { locale: 'id-ID', style: 'long' }) // < 7 hari → relative
        : formatDateTime(publishedDate.toISOString()) // ≥ 7 hari → tanggal normal
      : null

  return (
    <div className="container">
      <div className="mx-auto max-w-[48rem]">
        <div className="mb-6 text-sm uppercase text-gray-400">
          {categories?.map((category, index) => {
            if (typeof category === 'object' && category !== null) {
              const { title: categoryTitle } = category

              const titleToUse = categoryTitle || 'Untitled category'
              const isLast = index === categories.length - 1

              return (
                <React.Fragment key={index}>
                  {titleToUse}
                  {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                </React.Fragment>
              )
            }
            return null
          })}
        </div>

        <div className="">
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-16">
          {hasAuthors && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-gray-500">
                <p className="text-sm">Author</p>
                <p>{formatAuthors(populatedAuthors)}</p>
              </div>
            </div>
          )}
          {publishedAt && (
            <div className="flex flex-col gap-1 ">
              <time className="flex items-center gap-1 text-gray-500" dateTime={publishedAt}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#fe5000]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {displayTime}
              </time>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
