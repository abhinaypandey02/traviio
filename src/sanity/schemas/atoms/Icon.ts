import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'icon',
  title: 'Icon',
  description: 'Icon with alt',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      description: 'Alternative text of the icon',
      type: 'string',
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      description: 'Variants of the icon',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'variant',
          title: 'Variant',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              description: 'Name of the variant',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              description: 'Icon of the variant',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset',
    },
  },
})
