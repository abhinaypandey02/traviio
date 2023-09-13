import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { BookBookmark } from '@phosphor-icons/react'

export default defineType({
  name: 'index_section',
  title: 'Index Section',
  type: 'object',
  icon: BookBookmark as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the section',
      type: 'locale_string',
    }),
    // defineField({
    //   name: 'links',
    //   title: 'Links',
    //   description: 'Links for the section',
    //   type: 'array',
    //   of: [defineArrayMember({ type: 'link' })],
    // }),
  ],
  preview: {
    select: {
      title: 'title.en',
      // links: 'links',
    },
    prepare: ({ title }) => {
      return {
        title: `Index Section`,
        // subtitle: joinStrings('|', title, displayNumber(links?.length, 'Link')),
        subtitle: joinStrings('|', title),
      }
    },
  },
})
