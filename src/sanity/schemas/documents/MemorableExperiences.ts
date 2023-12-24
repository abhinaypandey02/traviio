import { defineType } from 'sanity'

export default defineType({
  name: 'memorable_experiences',
  title: 'Memorable Experiences',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'The title for the card',
      type: 'locale_string',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'The description for the card',
      type: 'locale_text',
    },
    {
      name: 'image',
      title: 'Image',
      description: 'The image for the card',
      type: 'image',
    },
    {
      name: 'link',
      title: 'Link',
      description: 'The link for the card',
      type: 'locale_string',
    },
  ],
})
