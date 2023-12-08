import { defineArrayMember, defineField, defineType } from 'sanity'

import { TextT } from '@phosphor-icons/react'

export default defineType({
  name: 'content_text',
  title: 'Text Content',
  icon: TextT as any,
  description: 'Text content',
  type: 'object',
  initialValue: {
    styles: {
      color: '#000000',
    },
  },
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'styles',
      title: 'Styles',
      type: 'object',
      options: {
        collapsed: true,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'color',
          title: 'Color',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Content Text',
    }),
  },
})
