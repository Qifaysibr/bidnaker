import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { PostHero } from '@/heros/PostHero'
import type { Post } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import PageClient from './page.client'
import { ShareButton } from '@/components/ShareButton'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//   const posts = await payload.find({
//     collection: 'posts',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = posts.docs.map(({ slug }) => {
//     return { slug }
//   })

//   return params
// }

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const { heroImage } = post

  return (
    <article className="pt-16 pb-16 bg-[url('/media/bg-pks.png')] dark:bg-[url('/media/bg-pks-dark.png')]">
      <PageClient />

      <div className="md:hidden fixed bottom-8 right-8 z-50">
        <ShareButton post={{ title: post.title, slug: post.slug ?? '' }} />
      </div>

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="container">
        <div className="mx-auto max-w-[52rem] bg-white dark:bg-card p-4 rounded-xl shadow-2xl">
          <PostHero post={post} />

          <div className="hidden md:flex justify-center my-4">
            <ShareButton post={{ title: post.title, slug: post.slug ?? '' }} alwaysOpen />
          </div>

          {heroImage && typeof heroImage !== 'string' && (
            <div className="my-8 rounded-xl overflow-hidden -mx-8">
              <div className="mx-auto max-w-[48rem]">
                <Media
                  resource={heroImage}
                  className={cn('border border-border rounded-xl overflow-hidden')}
                />
              </div>
            </div>
          )}
          <RichText className="mx-auto max-w-[48rem]" data={post.content} enableGutter={false} />
        </div>

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            className="col-span-3 col-start-1 mt-12 grid-rows-[2fr] max-w-[52rem] lg:grid lg:grid-cols-subgrid"
            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
          />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }): Promise<Post | null> => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
