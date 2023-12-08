import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  description: 'Link Component',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      description: 'Text for the link',
      type: 'locale_string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      description: 'URL for the link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
        }),
    }),
  ],
  preview: {
    select: {
      title: 'text.en',
      subtitle: 'url',
    },
  },
})
