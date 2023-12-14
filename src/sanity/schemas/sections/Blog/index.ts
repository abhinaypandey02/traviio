import { SidebarSectionExports } from './Sidebar/Sidebar'
import all_blogs_section from './AllBlogSection'
import featured_blogs_section from './FeaturedBlogSection'
import featured_images_section from './FeaturedImagesSection'
import featured_place_blogs_section from './FeaturedPlaceBlogsSection'
import interests_section from './InterestsSection'
import latest_posts_section from './LatestPostsSection'

export const BlogSectionExports = [
  featured_blogs_section,
  interests_section,
  featured_place_blogs_section,
  all_blogs_section,
  latest_posts_section,
  featured_images_section,
  // sidebar
  ...SidebarSectionExports,
]

export const BlogSections = [
  'featured_blogs_section',
  'image_header_section',
  'content_section',
  'newsletter_section',
  'interests_section',
  'featured_place_blogs_section',
  'latest_posts_section',
  'all_blogs_section',
  'featured_images_section',
] as const
