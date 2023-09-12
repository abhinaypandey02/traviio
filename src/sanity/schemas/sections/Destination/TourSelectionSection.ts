import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { CursorClick, Funnel } from '@phosphor-icons/react'

export default defineType({
  name: 'tour_selection_section',
  title: 'Tour Selection Section',
  icon: CursorClick as any,
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'The tagline for the tour selection section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The heading for the tour selection section',
      type: 'locale_string',
    }),
    defineField({
      name: 'filters',
      title: 'Filters',
      description: 'The filters for the tour selection section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'filter',
          title: 'Filter',
          icon: Funnel as any,
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              description: 'The title for the filter',
              type: 'locale_string',
            }),
            defineField({
              name: 'filter_type',
              title: 'Filter Type',
              description: 'The filter type for the filter',
              type: 'string',
              options: {
                list: [
                  { value: 'destinations', title: 'Destinations' },
                  { value: 'special_offers', title: 'Special Offers' },
                  { value: 'city_count', title: 'Number of cities' },
                  { value: 'trip_type', title: 'Trip Type' },
                  { value: 'price_range', title: 'Price Range' },
                  { value: 'duration', title: 'Duration' },
                ],
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      filters: 'filters',
    },
    prepare: ({ title, filters }) => ({
      title: 'Tour Selection Section',
      subtitle: joinStrings('|', title, displayNumber(filters?.length, 'filter')),
    }),
  },
})
