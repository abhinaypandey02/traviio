import { defineField, defineType } from 'sanity'

import { TextT } from '@phosphor-icons/react'

export default defineType({
  name: 'content_text',
  title: 'Text Content',
  icon: TextT,
  description: 'Text content',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Content Text',
    }),
  },
})
