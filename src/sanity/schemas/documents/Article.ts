import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { PenNib, Receipt } from '@phosphor-icons/react'

export default defineType({
  name: 'article',
  title: 'Article',
  icon: PenNib as any,
  description: 'An article',
  type: 'document',
  fields: [
    defineField({
      name: 'destination',
      title: 'Destination',
      description: 'Destination this article is meant for',
      type: 'reference',
      to: [{ type: 'destination_page' }],
    }),
    defineField({
      name: 'cover_image',
      title: 'Cover Image',
      description: 'The cover image for the blog',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title for the blog',
      type: 'locale_string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The slug for the blog',
      type: 'slug',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'The tags for the blog',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tag',
          title: 'Tag',
          type: 'reference',
          to: [{ type: 'tag' }],
        }),
      ],
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      description: 'Introduction for the blog',
      type: 'locale_string',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      description: 'Author of of the blog',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          description: 'Name of the author',
          type: 'locale_string',
        }),
        defineField({
          name: 'avatar',
          title: 'Avatar',
          description: 'Avatar of the author',
          type: 'image',
        }),
        defineField({
          name: 'bio',
          title: 'Bio',
          description: 'Bio of the author',
          type: 'locale_string',
        }),
        defineField({
          name: 'socials',
          title: 'Socials',
          description: 'Socials of the author',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'social',
              title: 'Social',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  description: 'Name of the social',
                  type: 'string',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  description: 'Icon of the social',
                  type: 'image',
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  description: 'Link of the social',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'time',
      title: 'Timestamp',
      description: 'Timestamp of the blog',
      type: 'locale_string',
    }),
    defineField({
      name: 'subsections',
      title: 'Subsections',
      description: 'Subsections of the blog',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'subsection',
          title: 'Subsection',
          icon: Receipt as any,
          type: 'object',
          fields: [
            defineField({
              name: 'tagline',
              title: 'Tagline',
              type: 'locale_string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'locale_rich_text',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'locale_rich_text',
            }),
          ],
          preview: {
            select: {
              tagline: 'Content Section',
              title: 'title.en',
            },
            prepare: ({ tagline, title }) => {
              return {
                title: 'Content Section',
                subtitle: joinStrings('|', title, tagline),
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      author: 'author.en',
      timestamp: 'time',
      subsections: 'subsections',
      media: 'cover_image',
    },
    prepare: ({ title, author, media, timestamp, subsections }) => {
      return {
        title,
        subtitle: joinStrings(
          '|',
          author,
          timestamp,
          displayNumber(subsections?.length, 'subsection')
        ),
        media,
      }
    },
  },
})
