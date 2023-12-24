import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featured_images_section',
  title: 'Featured Images Section',
  type: 'object',
  fields: Array.from({ length: 5 }, (_, idx) =>
    defineField({
      name: 'image_' + idx,
      title: 'Image ' + idx,
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
    })
  ),
})
