/*
Todo's to create a new section:
1. Create a new file in src\sanity\schemas\sections\ with the name of the section
2. Put the (sanity) name of the section in this file 
3. Import it in src\sanity\schemas\index.ts
*/

export const sections = [
  'content_section',
  'deals_section',
  'faq_section',
  'destinations_section',
  'feature_section',
  'gallery_section',
  'hero_section',
  'image_header_section',
  'index_section',
  'newsletter_section',
  'reviews_section',
  'office_locations_section',
  'testimonial_section',
  'featured_blogs_section',
  'hero_card_section',
] as const
