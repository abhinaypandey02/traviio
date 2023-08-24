import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'meta_data',
  title: 'Meta Data',
  description: 'Meta Data for SEO',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      description: 'Meta title for SEO',
      type: 'locale_string',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      description: 'Meta description for SEO',
      type: 'locale_string',
    }),
    defineField({
      name: 'meta_image',
      title: 'Meta Image',
      description: 'Meta image for SEO',
      type: 'image',
    }),
  ],
})
