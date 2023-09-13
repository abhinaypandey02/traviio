import { defineField, defineType } from 'sanity'

import { Article } from '@phosphor-icons/react'

export default defineType({
  name: 'all_blogs_section',
  title: 'All Blogs Section',
  icon: Article as any,
  description: 'A section with all blogs',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'The tagline for the all blog section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The heading for the all blog section',
      type: 'locale_string',
    }),
  ],
})
