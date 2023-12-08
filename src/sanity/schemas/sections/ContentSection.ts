import { defineField, defineType } from 'sanity'

import { joinStrings } from '@/utils/utils'
import { Article } from '@phosphor-icons/react'

export default defineType({
  name: 'content_section',
  title: 'Content Section',
  description: 'A section with content',
  icon: Article as any,
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'locale_string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'locale_rich_text',
    }),
  ],
  preview: {
    select: {
      tagline: 'Content Section',
      title: 'title.en',
    },
    prepare: ({ tagline, title }) => {
      return {
        title: 'Content Section',
        subtitle: joinStrings('|', title, tagline),
      }
    },
  },
})
