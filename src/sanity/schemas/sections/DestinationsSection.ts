import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { SuitcaseRolling } from '@phosphor-icons/react'

export default defineType({
  name: 'destinations_section',
  title: 'Destinations Section',
  description: 'A section with destinations',
  icon: SuitcaseRolling as any,
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'locale_string',
    }),
    defineField({
      name: 'destinations',
      title: 'Destinations',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'destination',
          title: 'Destination',
          type: 'object',
          fields: [
            defineField({
              name: 'destination',
              title: 'Destination',
              type: 'reference',
              to: [{ type: 'destination_page' }],
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
          ],
          preview: {
            select: {
              image: 'image',
              title: 'destination.name.en',
            },
            prepare({ image, title }) {
              return {
                title: 'Destination',
                subtitle: joinStrings('|', title),
                media: image,
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
      destinations: 'destinations',
    },
    prepare({ title, destinations }) {
      return {
        title: title,
        subtitle: `${displayNumber(destinations?.length, 'destination')}`,
      }
    },
  },
})
