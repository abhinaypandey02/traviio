import { ComponentClass, FunctionComponent } from 'react'
import dynamic from 'next/dynamic'

import {
  SanityBlogPageSectionNames,
  SanityDestinationSectionNames,
  SanitySectionNames,
  SanityTourSectionNames,
} from '@/sanity/types'

import AllBlogsSection from '@/components/organisms/AllBlogsSection'

import DestinationsSection from '../organisms/DestinationsSection'
import TravelInformation from '../TravelInformation'

import AccommdationTypesSection from './Tours/AccommdationTypesSection'
import ItinerarySection from './Tours/ItinerarySection'
import MemorableExperiencesSection from './Tours/MemorableExperiencesSection'
import BestToursSection from './BestToursSection'
import BlogHeroSection from './BlogHeroSection'
import BlogSection from './BlogSection'
import ContentSection from './ContentSection'
import DealsSection from './DealsSection'
import FeatureSection from './FeatureSection'
import FeatureTopBlogSection from './FeatureTopBlogSection'
import HeroSection from './HeroSection'
import ImageHeaderSection from './ImageHeaderSection'
const IndexSection = dynamic(() => import('./IndexSection'))
const WhatsIncludedSection = dynamic(() => import('./Tours/WhatsIncludedSection'))
const AtAGlanceSection = dynamic(() => import('./AtAGlanceSection'))
const FAQSection = dynamic(() => import('./FAQSection'))
const NewsletterSection = dynamic(() => import('./NewsletterSection'))
const InterestSection = dynamic(() => import('./InterestSection'))
const GallerySection = dynamic(() => import('./GallerySection'))
const TourGallerySection = dynamic(() => import('./TourGallerySection'))
const TourFeature = dynamic(() => import('./TourFeature'))
const Testimonial = dynamic(() => import('./Testimonial'))
const ReviewSection = dynamic(() => import('./ReviewSection'))
const PriceList = dynamic(() => import('./PriceList'))
const OfficeLocationSection = dynamic(() => import('./OfficeLocationSection'))

export const SectionMap: {
  [name in SanitySectionNames]?: FunctionComponent<any> | ComponentClass<any, any>
} = {
  hero_section: HeroSection,
  feature_section: FeatureSection,
  newsletter_section: NewsletterSection,
  destinations_section: DestinationsSection,
  faq_section: FAQSection,
  deals_section: DealsSection,
  testimonial_section: Testimonial,
  featured_blogs_section: BlogSection,
  gallery_section: GallerySection,
  content_section: ContentSection,
  reviews_section: ReviewSection,
  office_locations_section: OfficeLocationSection,
  index_section: IndexSection,
}

export const DestinationSectionsMap: {
  [name in SanityDestinationSectionNames]?: FunctionComponent<any> | ComponentClass<any, any>
} = {
  image_header_section: ImageHeaderSection,
  reviews_section: ReviewSection,
  faq_section: FAQSection,
  all_blogs_section: BlogSection,
  featured_tours_section: DealsSection,
  at_glance_section: AtAGlanceSection,
  tour_selection_section: BestToursSection,
}

export const BlogPageSectionsMap: {
  [name in SanityBlogPageSectionNames]?: FunctionComponent<any> | ComponentClass<any, any>
} = {
  image_header_section: BlogHeroSection,
  newsletter_section: NewsletterSection,
  interests_section: InterestSection,
  featured_place_blogs_section: FeatureTopBlogSection,
  featured_blogs_section: BlogSection,
  all_blogs_section: AllBlogsSection,
}

export const TourSectionsMap: {
  [name in SanityTourSectionNames]?: FunctionComponent<any> | ComponentClass<any, any>
} = {
  itinerary_section: ItinerarySection,
  content_section: ContentSection,
  memorable_experiences_section: MemorableExperiencesSection,
  gallery_section: TourGallerySection,
  whats_included_section: WhatsIncludedSection,
  pricing_section: PriceList,
  accommodation_types_section: AccommdationTypesSection,
  reviews_section: ReviewSection,
  feature_section: TourFeature,
  featured_tours_section: DealsSection,
  faq_section: FAQSection,
  travel_info_section: TravelInformation,
}
