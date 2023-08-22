import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'image_header_section',
  title: 'Image Header Section',
  description: 'A section with a header and an image',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'locale_string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'header',
      media: 'image',
    },
    prepare: ({ title, media }) => ({
      title: 'Image Header Section',
      subtitle: title.en,
      media: media,
    }),
  },
})
