import { defineField, defineType } from 'sanity'

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
  ],
})
