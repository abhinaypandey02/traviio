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
              name: 'discount',
              title: 'Discount',
              description: 'Discount for the deal',
              type: 'locale_string',
            }),
            defineField({
              name: 'old_price',
              title: 'Old Price',
              description: 'Old Price of the tour',
              type: 'locale_string',
            }),
            defineField({
              name: 'new_price',
              title: 'New Price',
              description: 'New Price of the tour',
              type: 'locale_string',
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
              discount: 'discount.en',
              old_price: 'old_price.en',
              new_price: 'new_price.en',
            },
            prepare({ title, discount, old_price, new_price }) {
              return {
                title: title,
                subtitle: joinStrings(
                  '|',
                  discount && `Discount: ${discount}`,
                  old_price && `Old Price: ${old_price}`,
                  new_price && `New Price: ${new_price}`
                ),
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
