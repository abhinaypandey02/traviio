import { defineField, defineType } from 'sanity'

import { CreditCard } from '@phosphor-icons/react'

export default defineType({
  name: 'deals_section',
  title: 'Deals Section',
  type: 'object',
  icon: CreditCard,
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Tagline for the deals section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the deals section',
      type: 'locale_string',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare({ title }) {
      return {
        title: `Deals Section`,
        subtitle: title ?? '',
      }
    },
  },
})
