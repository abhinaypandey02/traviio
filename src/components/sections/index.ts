import { FunctionComponent } from 'react'

import { SanitySectionNames } from '@/sanity/types'

import BlogSection from './BlogSection'
import DealsSection from './DealsSection'
import FAQSection from './FAQSection'
import FeatureSection from './FeatureSection'
import HeroSection from './HeroSection'
import NewsletterSection from './NewsletterSection'
import Testimonial from './Testimonial'

export const SectionMap: { [name in SanitySectionNames]?: FunctionComponent<any> } = {
  hero_section: HeroSection,
  feature_section: FeatureSection,
  newsletter_section: NewsletterSection,
  faq_section: FAQSection,
  deals_section: DealsSection,
  testimonial_section: Testimonial,
  featured_blogs_section: BlogSection,
  // blog_section,
  // content_section,
  // deals_section,
  // gallery_section,
  // index_section,
  // newsletter_section,
  // testimonial_section
}
