import { defineField, defineField as defineType } from 'sanity'

import { LinkSimple } from '@phosphor-icons/react'

export default defineType({
  name: 'link_button',
  title: 'Link Button',
  icon: LinkSimple as any,
  description: 'Link Button Component',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
        ],
      },
    }),
    defineField({
      name: 'label',
      title: 'Label',
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
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
    }),
  ],
  preview: {
    select: {
      title: 'label.en',
      subtitle: 'url',
    },
  },
})
