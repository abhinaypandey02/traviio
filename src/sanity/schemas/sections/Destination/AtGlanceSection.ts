import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Airplay, Link } from '@phosphor-icons/react'

export default defineType({
  name: 'at_glance_section',
  title: 'At Glance Section',
  icon: Airplay as any,
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'The tagline for the at glance section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The heading for the at glance section',
      type: 'locale_string',
    }),
    defineField({
      name: 'facts',
      title: 'Facts',
      description: 'The facts for the at glance section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'fact',
          title: 'Fact',
          icon: Airplay as any,
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              description: 'The title for the fact',
              type: 'locale_string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              description: 'The subtitle for the fact',
              type: 'locale_string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              description: 'The icon for the fact',
              type: 'image',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              subtitle: 'subtitle.en',
              media: 'icon',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'useful_links_section',
      title: 'Useful Links Section',
      description: 'The useful links section for the at glance section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          description: 'The title for the useful links section',
          type: 'locale_string',
        }),
        defineField({
          name: 'useful_links',
          title: 'Useful Links',
          description: 'The useful links for the at glance section',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'useful_link',
              title: 'Useful Link',
              icon: Link as any,
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  description: 'The title for the useful link',
                  type: 'locale_string',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  description: 'The URL for the useful link',
                  type: 'url',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  description: 'The icon for the link',
                  type: 'image',
                }),
              ],
              preview: {
                select: {
                  title: 'title.en',
                  subtitle: 'url',
                  media: 'icon',
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      facts: 'facts',
      links: 'useful_links_section.useful_links',
    },
    prepare: ({ title, facts, links }) => ({
      title: 'At Glance Section',
      subtitle: joinStrings(
        '|',
        title,
        displayNumber(facts?.length, 'fact'),
        displayNumber(links?.length, 'link')
      ),
    }),
  },
})
