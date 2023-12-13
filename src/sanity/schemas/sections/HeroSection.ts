import { defineArrayMember, defineField, defineField as defineType } from 'sanity'

import { Image, LinkSimple, TextH, TextT } from '@phosphor-icons/react'

export default defineType({
  name: 'hero_section',
  title: 'Hero Section',
  type: 'object',
  icon: Image as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      icon: TextH as any,
      description: 'Title for the hero section',
      type: 'locale_string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheading',
      icon: TextT as any,
      description: 'Subtitle for the hero section',
      type: 'locale_string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      icon: Image as any,
      description: 'Image for the hero background',
      type: 'photo',
    }),
    defineField({
      name: 'cta_buttons',
      title: 'CTA Buttons',
      icon: LinkSimple as any,
      description: 'CTA buttons for the hero section',
      type: 'array',
      of: [defineArrayMember({ type: 'link_button' })],
    }),
    defineField({
      name: 'cta_helper_text',
      title: 'CTA Helper Text',
      description: 'Helper text for the CTA buttons',
      type: 'locale_string',
    }),
    defineField({
      name: 'has_search',
      title: 'Has Search',
      description: 'Does the hero section have a search input field?',
      type: 'boolean',
    }),
    defineField({
      name: 'form_input_field',
      title: 'Form Input Field',
      description: 'Search input field for the hero section',
      type: 'form_input_field',
    }),
    defineField({
      name: 'scores',
      title: 'Scores',
      description: 'Ratings for the hero section to display instead of the search input field',
      type: 'array',
      of: [defineArrayMember({ type: 'photo' })],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'subtitle.en',
    },
    prepare: ({ title, subtitle }) => ({
      title: `Hero Section: ${title ?? 'Untitled'}`,
      subtitle,
    }),
  },
})
