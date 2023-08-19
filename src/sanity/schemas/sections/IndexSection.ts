import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'index_section',
  title: 'Index Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the section',
      type: 'locale_string',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      description: 'Links for the section',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
    }),
  ],
})
