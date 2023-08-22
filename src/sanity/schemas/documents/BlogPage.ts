import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Files } from '@phosphor-icons/react'

import { BlogSections } from '../sections/Blog'

export default defineType({
  name: 'blog_page',
  title: 'Blog Pages',
  icon: Files,
  description: 'A blog page',
  type: 'document',
  fields: [
    defineField({
      name: 'meta_data',
      title: 'Meta Data',
      description: 'Meta Data for SEO',
      type: 'meta_data',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (relative to /blog)',
      description: 'Slug for the page',
      type: 'slug',
    }),
    defineField({
      name: 'promo_banner',
      title: 'Promo Banner',
      description: 'Promo banner for the hero section',
      type: 'promo_banner',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Sections for the page',
      type: 'array',
      of: BlogSections.map((blog_section) => ({ type: blog_section })),
    }),
    defineField({
      name: 'sidebar',
      title: 'Sidebar',
      description: 'Sidebar for the page',
      type: 'blog_sidebar',
    }),
  ],
  preview: {
    select: {
      title: 'meta_data.meta_title.en',
      subtitle: 'slug.current',
      media: 'meta_data.meta_image',
      sections: 'sections',
    },
    prepare: ({ title, subtitle, media, sections }) => {
      return {
        title: title || 'No title',
        subtitle: joinStrings(
          '|',
          subtitle || 'No slug',
          displayNumber(sections?.length, 'section')
        ),
        media,
      }
    },
  },
})
