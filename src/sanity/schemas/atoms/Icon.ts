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
      type: 'object',
      fields: ['mobile'].map((variant) =>
        defineField({
          name: 'variant',
          title: variant + ' variant',
          description: variant + ' variant of the icon',
          type: 'image',
        })
      ),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset',
    },
  },
})
