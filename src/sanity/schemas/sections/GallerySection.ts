import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Image } from '@phosphor-icons/react'

export default defineType({
  name: 'gallery_section',
  title: 'Gallery Section',
  type: 'object',
  icon: Image as any,
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
  preview: {
    select: {
      title: 'title.en',
      images: 'images',
    },
    prepare: ({ title, images }) => {
      return {
        title: `Gallery Section`,
        subtitle: joinStrings('|', title, displayNumber(images?.length, 'Image')),
      }
    },
  },
})
