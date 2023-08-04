import { defineArrayMember, defineField, defineType } from 'sanity'

export const feature_section = defineType({
  name: 'feature_section',
  title: 'Feature Section',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      description: 'Type of the feature section',
      type: 'string',
      options: {
        list: [
          { title: 'small', value: 'small' },
          { title: 'large', value: 'large' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the feature section',
      type: 'locale_string',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      description: 'Features for the feature section',
      type: 'array',
      of: [defineArrayMember({ type: 'feature' })],
    }),
  ],
})

export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title for the feature',
      type: 'locale_string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Description for the feature',
      type: 'locale_string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'Icon for the feature',
      type: 'icon',
    }),
  ],
})
