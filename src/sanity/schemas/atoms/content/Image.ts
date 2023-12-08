import { defineType } from 'sanity'

import { Image } from '@phosphor-icons/react'

export default defineType({
  name: 'content_image',
  title: 'Image Content',
  icon: Image as any,
  description: 'Image content',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'alt',
      title: 'Alternative text',
      description: 'Alternative text of the image',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'alt',
      image: 'image.asset',
    },
    prepare: ({ title, image }) => ({
      title: 'Image Content',
      subtitle: title,
      media: image,
    }),
  },
})
