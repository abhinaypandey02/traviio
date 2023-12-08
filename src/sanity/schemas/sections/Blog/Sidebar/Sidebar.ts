import { defineType } from 'sanity'

import { Sidebar } from '@phosphor-icons/react'

import sidebar_form from './SidebarForm'
import sidebar_latest_articles from './SidebarLatestArticles'
import sidebar_related_tours from './SidebarRelatedTours'

export const SidebarSections = [
  'sidebar_form',
  'sidebar_latest_articles',
  'sidebar_related_tours',
] as const

const blog_sidebar = defineType({
  name: 'blog_sidebar',
  title: 'Blog Sidebar',
  icon: Sidebar as any,
  description: 'Sidebar Section for the blog',
  type: 'array',
  of: SidebarSections.map((section) => ({ type: section })),
})

export const SidebarSectionExports = [
  blog_sidebar,
  sidebar_form,
  sidebar_latest_articles,
  sidebar_related_tours,
]

export default blog_sidebar
