import { defineField, defineType } from 'sanity'

import { Rss } from '@phosphor-icons/react'

export default defineType({
  name: 'newsletter_section',
  title: 'Newsletter Section',
  type: 'object',
  icon: Rss as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the newsletter section',
      type: 'locale_string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheading',
      description: 'Subtitle for the newsletter section',
      type: 'locale_string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Background image for the newsletter section',
      type: 'photo',
    }),
    // defineField({
    //   name: 'email_form',
    //   title: 'Email Form',
    //   description: 'Email form for the newsletter section',
    //   type: 'form_input_field',
    // }),
    // defineField({
    //   name: 'query_section_title',
    //   title: 'Query Section Title',
    //   description: 'Title for the query section',
    //   type: 'locale_string',
    // }),
    // defineField({
    //   name: 'query_section_subtitle',
    //   title: 'Query Section Subtitle',
    //   description: 'Subtitle for the query section',
    //   type: 'locale_string',
    // }),
    // defineField({
    //   name: 'query_section_subtitle_icon',
    //   title: 'Query Section Subtitle Icon',
    //   description: 'Icon for the subtitle in the query section',
    //   type: 'photo',
    // }),
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare: ({ title }) => ({
      title: `Newsletter Section`,
      subtitle: title ?? '',
    }),
  },
})
