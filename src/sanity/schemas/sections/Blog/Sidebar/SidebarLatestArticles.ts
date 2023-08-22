import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { EnvelopeOpen } from '@phosphor-icons/react'

export default defineType({
  name: 'sidebar_latest_articles',
  title: 'Sidebar Latest Articles',
  icon: EnvelopeOpen,
  description: 'Sidebar Latest Articles Section for the blog',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'The tagline for the sidebar latest articles section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The heading for the sidebar latest articles section',
      type: 'locale_string',
    }),
    defineField({
      name: 'articles_count',
      title: 'Articles count',
      description: 'The number of articles to show',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      articles_count: 'articles_count',
    },
    prepare: ({ title, articles_count }) => ({
      title: 'Sidebar Latest Articles',
      subtitle: joinStrings('|', title.en, displayNumber(articles_count?.length, 'article')),
    }),
  },
})
