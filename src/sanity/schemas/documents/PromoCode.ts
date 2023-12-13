import { defineField, defineType } from 'sanity'

import { Tag } from '@phosphor-icons/react'

export default defineType({
  name: 'promo',
  title: 'Promo codes',
  icon: Tag as any,
  description: 'Promo codes to be applies',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
    }),
    defineField({
      name: 'percent',
      title: 'Discount percent',
      type: 'number',
    }),
    defineField({
      name: 'max_discount',
      title: 'Maximum discount',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'code',
    },
    prepare: ({ title }) => ({
      title: 'Promo Code',
      subtitle: title,
    }),
  },
})
