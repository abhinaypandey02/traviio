import { defineField, defineType } from 'sanity'

import { Airplay } from '@phosphor-icons/react'

export default defineType({
  name: 'contact_agent_section',
  title: 'Contact Agent Section',
  icon: Airplay as any,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title for the contact agent section',
      type: 'locale_string',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      description: 'The CTA for the contact agent section',
      type: 'link_button',
    }),
    defineField({
      name: 'hero_image',
      title: 'Hero Image',
      description: 'The hero image for the contact agent section',
      type: 'photo',
    }),
  ],
})
