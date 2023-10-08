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
          type: 'reference',
          to: [{ type: 'destination_page' }],
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
