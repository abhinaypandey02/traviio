import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricing_section',
  title: 'Pricing Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'locale_string',
    }),
  ],
})
