import { defineArrayMember, defineField, defineType } from 'sanity'

import { Images } from '@phosphor-icons/react'

export default defineType({
  name: 'image_showcase_section',
  title: 'Image Showcase Section',
  icon: Images as any,
  description: 'A section with a showcase of images',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'locale_string',
    }),
    defineField({
      name: 'images_data',
      title: 'Images data',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image_data',
          title: 'Image data',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'photo',
            }),
            defineField({
              name: 'image_size',
              title: 'Image Size',
              description: 'The size of the image',
              type: 'object',
              fields: [
                defineField({
                  name: 'width',
                  title: 'Width',
                  type: 'number',
                }),
                defineField({
                  name: 'height',
                  title: 'Height',
                  type: 'number',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
