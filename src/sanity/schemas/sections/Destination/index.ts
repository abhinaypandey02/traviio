import at_glance_section from './AtGlanceSection'
import top_things_section from './TopThingsSection'
import tour_selection_section from './TourSelectionSection'
import best_tours_section from './BestToursSection'

export const DestinationSectionExports = [
  tour_selection_section,
  top_things_section,
  at_glance_section,
  best_tours_section,
]

export const DestinationSections = [
  // global
  'image_header_section',
  'all_blogs_section',
  'reviews_section',
  'faq_section',
  'hero_card_section',
  'featured_tours_section',
  // destination sections
  'tour_selection_section',
  'top_things_section',
  'at_glance_section',
  'best_tours_section',
] as const
