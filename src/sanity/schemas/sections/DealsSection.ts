import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { CreditCard } from '@phosphor-icons/react'

export default defineType({
  name: 'deals_section',
  title: 'Deals Section',
  type: 'object',
  icon: CreditCard as any,
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
    defineField({
      name: 'deals',
      title: 'Deals',
      description: 'Deals for the deals section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'deal',
          title: 'Deal',
          type: 'object',
          fields: [
            defineField({
              name: 'tour',
              title: 'Tour',
              description: 'Tour for the deal',
              type: 'reference',
              to: [{ type: 'tour_page' }],
            }),
            defineField({
              name: 'label',
              title: 'Label',
              description: 'Label for the deal',
              type: 'locale_string',
            }),
          ],
          preview: {
            select: {
              title: 'tour.title.en',
              discount: 'tour.overview_card.price',
            },
            prepare({ title, discount }) {
              return {
                title: title,
                subtitle: joinStrings('|', discount && `Discount: ${discount}`),
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      deals: 'deals',
    },
    prepare({ title, deals }) {
      return {
        title: `Deals Section`,
        subtitle: joinStrings('|', title, displayNumber(deals?.length, 'deal')),
      }
    },
  },
})
