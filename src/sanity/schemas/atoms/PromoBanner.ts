import { defineField, defineType } from 'sanity'

import { Megaphone } from '@phosphor-icons/react'

export default defineType({
  name: 'promo_banner',
  title: 'Promo Banner',
  icon: Megaphone as any,
  description: 'Promo banner for the hero section',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      description: 'Text for the promo banner',
      type: 'locale_string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      description: 'Link for the promo banner',
      type: 'link',
    }),
  ],
})
