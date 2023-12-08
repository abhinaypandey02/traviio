import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Columns } from '@phosphor-icons/react'

import { content_layouts } from '.'

export default defineType({
  name: 'layout_group',
  title: 'Group Layout',
  icon: Columns as any,
  description: 'A group of content',
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
        title: 'Group Layout',
        subtitle: joinStrings('|', displayNumber(items?.length, 'item')),
      }
    },
  },
})
