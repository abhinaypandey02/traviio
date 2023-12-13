import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Image',
  description: 'Image with alt',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      description: 'Alternative text of the image',
      type: 'locale_string',
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile Image',
      description: 'Alternative image for mobile',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'alt.en',
    },
  },
})
