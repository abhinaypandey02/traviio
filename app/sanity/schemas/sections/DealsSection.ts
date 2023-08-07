import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'deals_section',
  title: 'Deals Section',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Tagline for the deals section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the deals section',
      type: 'locale_string',
    }),
  ],
})
