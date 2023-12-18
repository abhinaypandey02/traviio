import accommodation_types_section from './AccommodationTypesSection'
import featured_tours_section from './FeaturedToursSection'
import image_showcase_section from './ImageShowcaseSection'
import itinerary_section from './ItinerarySection'
import memorable_experiences_section from './MemorableExperiencesSection'
import other_tours_section from './OtherToursSection'
import pricing_section from './PricingSection'
import travel_info_section from './TravelInfoSection'
import whats_included_section from './WhatsIncludedSection'

export const TourSectionExports = [
  accommodation_types_section,
  image_showcase_section,
  itinerary_section,
  pricing_section,
  memorable_experiences_section,
  travel_info_section,
  featured_tours_section,
  whats_included_section,
  other_tours_section,
]

export const TourSections = [
  // global
  'content_section',
  'feature_section',
  'reviews_section',
  'pricing_section',
  'faq_section',
  // tour sections
  'accommodation_types_section',
  'gallery_section',
  'itinerary_section',
  'memorable_experiences_section',
  'travel_info_section',
  'featured_tours_section',
  'whats_included_section',
  'other_tours_section',
] as const
