import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Star } from '@phosphor-icons/react'

export default defineType({
  name: 'reviews_section',
  title: 'Reviews Section',
  icon: Star as any,
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'The tagline for the reviews section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The heading for the reviews section',
      type: 'locale_string',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      description: 'The reviews for the reviews section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'review',
          title: 'Review',
          icon: Star as any,
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              description: 'Name of the author',
              type: 'locale_string',
            }),
            defineField({
              name: 'time',
              title: 'Time',
              description: 'Time of the review',
              type: 'locale_string',
            }),
            defineField({
              name: 'country',
              title: 'Country',
              description: 'Country of the review',
              type: 'locale_string',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              description: 'Rating (out of 5)',
              type: 'number',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              description: 'Title for the review',
              type: 'locale_string',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              description: 'Text for the review',
              type: 'locale_string',
            }),
          ],
          preview: {
            select: {
              name: 'name.en',
              rating: 'rating',
            },
            prepare: ({ name, rating }) => {
              return {
                title: 'Review',
                subtitle: joinStrings('|', name, displayNumber(rating, 'Star')),
              }
            },
          },
        }),
      ],
    }),
  ],
})
