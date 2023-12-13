import { defineField, defineType } from 'sanity'

import { Image } from '@phosphor-icons/react'

export default defineType({
  name: 'image_header_section',
  title: 'Image Header Section',
  description: 'A section with a header and an image',
  type: 'object',
  icon: Image as any,
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'locale_string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'photo',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'locale_text',
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
