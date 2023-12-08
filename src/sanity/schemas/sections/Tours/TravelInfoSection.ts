import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'travel_info_section',
  title: 'Travel Info Section',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'locale_string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'locale_text',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'link_button',
    }),
  ],
})
