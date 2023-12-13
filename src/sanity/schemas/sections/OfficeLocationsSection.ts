import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { MapPin } from '@phosphor-icons/react'

export default defineType({
  name: 'office_locations_section',
  title: 'Office Locations Section',
  icon: MapPin as any,
  description: 'Office Locations Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title for the section',
      type: 'locale_string',
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      description: 'Locations to display',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'office_location',
          title: 'Office Location',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              description: 'Title for the location',
              type: 'locale_string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'photo',
            }),
            defineField({
              name: 'address',
              title: 'Address',
              type: 'locale_string',
            }),
            defineField({
              name: 'phone',
              title: 'Phone',
              type: 'locale_string',
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'locale_string',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              image: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      locations: 'locations',
    },
    prepare({ title, locations }) {
      return {
        title: 'Office Locations Section',
        subtitle: joinStrings('|', title, displayNumber(locations?.length, 'location')),
      }
    },
  },
})
