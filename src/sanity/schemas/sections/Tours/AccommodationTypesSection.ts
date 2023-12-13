import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'accommodation_types_section',
  title: 'Accommodation Types Section',
  type: 'object',
  fields: [
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
    defineField({
      name: 'accommodation_types',
      title: 'Accommodation Types',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'accommodation_type',
          title: 'Accommodation Type',
          type: 'object',
          fields: [
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
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
            }),
            defineField({
              name: 'resorts',
              title: 'Resorts',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'resort',
                  title: 'Resort',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'locale_string',
                    }),
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'photo',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
