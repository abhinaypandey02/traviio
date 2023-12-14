import { defineArrayMember, defineField, defineType } from 'sanity'

import { AirplaneTakeoff } from '@phosphor-icons/react'

export default defineType({
  name: 'itinerary_section',
  title: 'Itinerary Section',
  icon: AirplaneTakeoff as any,
  description: 'A section with an itinerary',
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
      name: 'enquire_sidebar',
      title: 'Enquire Sidebar',
      description: 'The enquiry sidebar',
      type: 'object',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'icon',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'locale_string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'locale_string',
        }),
      ],
    }),
    defineField({
      name: 'itinerary_day_cards',
      title: 'Schedule Cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'itinerary_day_card',
          title: 'Schedule Card',
          description: 'A card with a schedule for a day',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'locale_string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'locale_text',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'photo',
            }),
            defineField({
              name: 'itinerary_details_lists',
              title: 'Details Lists',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'itinerary_details_list',
                  title: 'Details List',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'icon',
                    }),
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'locale_string',
                    }),
                    defineField({
                      name: 'itinerary_details_list_items',
                      title: 'Details List Items',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          name: 'title',
                          title: 'Title',
                          type: 'locale_string',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'special_information',
              title: 'Special Information',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'locale_string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'locale_text',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'icon',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
