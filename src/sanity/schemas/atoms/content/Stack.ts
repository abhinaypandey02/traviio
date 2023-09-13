import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Rows } from '@phosphor-icons/react'

import { content_layouts } from '.'

export default defineType({
  name: 'layout_stack',
  title: 'Stack Layout',
  icon: Rows as any,
  description: 'A stack of content',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: content_layouts.map((layout) => ({ type: layout })),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare: ({ items }) => {
      return {
        title: 'Stack Layout',
        subtitle: joinStrings('|', displayNumber(items?.length, 'item')),
      }
    },
  },
})
