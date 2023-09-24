import { FunctionComponent } from 'react'

import {
  SanityBlogPageSectionNames,
  SanityDestinationSectionNames,
  SanitySectionNames,
  SanityTourSectionNames,
} from '@/sanity/types'

import AccommdationTypesSection from './Tours/AccommdationTypesSection'
import ImageShowCaseSection from './Tours/ImageShowCaseSection'
import ItinerarySection from './Tours/ItinerarySection'
import MemorableExperiencesSection from './Tours/MemorableExperiencesSection'
import PricingSection from './Tours/PricingSection'
import WhatsIncludedSection from './Tours/WhatsIncludedSection'
import AtAGlanceSection from './AtAGlanceSection'
import BestToursSection from './BestToursSection'
import BlogSection from './BlogSection'
import ContentSection from './ContentSection'
import DealsSection from './DealsSection'
import FAQSection from './FAQSection'
import FeaturedPlaceBlogSection from './FeaturedPlaceBlogSection'
import FeatureSection from './FeatureSection'
import FeatureTopBlogSection from './FeatureTopBlogSection'
import GallerySection from './GallerySection'
import HeroSection from './HeroSection'
import ImageHeaderSection from './ImageHeaderSection'
import InterestSection from './InterestSection'
import NewsletterSection from './NewsletterSection'
import OfficeLocationSection from './OfficeLocationSection'
import ReviewSection from './ReviewSection'
import Testimonial from './Testimonial'

export const SectionMap: { [name in SanitySectionNames]?: FunctionComponent<any> } = {
  hero_section: HeroSection,
  feature_section: FeatureSection,
  newsletter_section: NewsletterSection,
  faq_section: FAQSection,
  deals_section: DealsSection,
  testimonial_section: Testimonial,
  featured_blogs_section: BlogSection,
  gallery_section: GallerySection,
  content_section: ContentSection,
  reviews_section: ReviewSection,
  office_locations_section: OfficeLocationSection,
  // blog_section,
  // content_section,
  // deals_section,
  // gallery_section,
  // index_section,
  // newsletter_section,
  // testimonial_section
}

export const DestinationSectionsMap: {
  [name in SanityDestinationSectionNames]?: FunctionComponent<any>
} = {
  image_header_section: ImageHeaderSection,
  reviews_section: ReviewSection,
  faq_section: FAQSection,
  all_blogs_section: BlogSection,
  featured_tours_section: DealsSection,
  at_glance_section: AtAGlanceSection,
  best_tours_section: BestToursSection,
}

export const BlogPageSectionsMap: {
  [name in SanityBlogPageSectionNames]?: FunctionComponent<any>
} = {
  image_header_section: ImageHeaderSection,
  newsletter_section: NewsletterSection,
  interests_section: InterestSection,
  featured_place_blogs_section: FeatureTopBlogSection,
  featured_blogs_section: BlogSection,
}

export const TourSectionsMap: {
  [name in SanityTourSectionNames]?: FunctionComponent<any>
} = {
  itinerary_section: ItinerarySection,
  content_section: ContentSection,
  memorable_experiences_section: MemorableExperiencesSection,
  image_showcase_section: ImageShowCaseSection,
  whats_included_section: WhatsIncludedSection,
  pricing_section: PricingSection,
  accommodation_types_section: AccommdationTypesSection,
  reviews_section: ReviewSection,
  feature_section: FeatureSection,
  featured_tours_section: DealsSection,
  faq_section: FAQSection,
}
