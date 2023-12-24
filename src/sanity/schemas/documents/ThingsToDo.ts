import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'things_to_do',
  title: 'Things To Do',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title for the card',
      type: 'locale_string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'The description for the card',
      type: 'locale_text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'The image for the card',
      type: 'image',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      description: 'The link for the card',
      type: 'locale_string',
    }),
  ],
})
