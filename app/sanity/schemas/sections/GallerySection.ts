import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery_section',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the gallery section',
      type: 'locale_string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheading',
      description: 'Subtitle for the gallery section',
      type: 'locale_string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      description: 'Images for the gallery section',
      type: 'array',
      of: [defineArrayMember({ type: 'image' })],
    }),
  ],
})
