import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog_section',
  title: 'Blog Section',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Tagline for the blog section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the blog section',
      type: 'locale_string',
    }),
  ],
})
