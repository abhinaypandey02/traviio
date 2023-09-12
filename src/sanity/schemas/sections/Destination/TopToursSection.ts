import { defineField, defineSearchFilter, defineType } from 'sanity'

import { AirplaneTakeoff } from '@phosphor-icons/react'

export default defineType({
  name: 'top_tours_section',
  title: 'Top Tours Section',
  icon: AirplaneTakeoff,
  type: 'object',
  description: 'Top Tours available in the destination',
  fields: [
    defineField({
      name: 'destination',
      title: 'Destination',
      description: 'The destination to show top tours for',
      type: 'reference',
      to: [{ type: 'destination_page' }],
    }),
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
      name: 'tours',
      title: 'Tours',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tour_page' }],
        },
      ],
    }),
  ],
})
