import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero_card_section',
  title: 'Hero Card Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'The heading for the hero card section',
      type: 'locale_string',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      description: 'The CTA for the hero card section',
      type: 'link_button',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'The image for the hero card section',
      type: 'photo',
    }),
  ],
  preview: {
    select: {
      title: 'heading.en',
      subtitle: 'cta.title.en',
      media: 'image',
    },
  },
})
