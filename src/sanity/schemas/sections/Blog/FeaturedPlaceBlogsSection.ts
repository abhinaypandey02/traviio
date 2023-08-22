import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'

export default defineType({
  name: 'featured_place_blogs_section',
  title: 'Featured Place Blogs Section',
  description: 'A section with featured place blogs',
  type: 'object',
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      description: 'The cards for the featured place blogs section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'card',
          title: 'Card',
          description: 'A card',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              description: 'The title for the card',
              type: 'locale_string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              description: 'The link for the card',
              type: 'link',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              description: 'The background image for the card',
              type: 'image',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare: ({ cards }) => {
      return {
        title: `Featured Place Blogs`,
        subtitle: joinStrings('|', displayNumber(cards?.length, 'card')),
      }
    },
  },
})
