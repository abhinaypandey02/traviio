import { defineField, defineType } from 'sanity'

import { Tag } from '@phosphor-icons/react'

export default defineType({
  name: 'tag',
  title: 'Tags',
  icon: Tag as any,
  description: 'A tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'locale_string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }) => ({
      title: 'Tag',
      subtitle: title.en,
    }),
  },
})
