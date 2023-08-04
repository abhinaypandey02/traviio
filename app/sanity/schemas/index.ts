import { form_button, form_input_field } from './atoms/Form'
import icon from './atoms/Icon'
import link from './atoms/Link'
import link_button from './atoms/LinkButton'
import locale_string from './atoms/LocaleString'
import photo from './atoms/Photo'
import { page } from './documents/page'
import blog_section from './sections/BlogSection'
import deals_section from './sections/DealsSection'
import { faq, faq_section } from './sections/FAQSection'
import { feature, feature_section } from './sections/FeatureSection'
import gallery_section from './sections/GallerySection'
import hero_section from './sections/HeroSection'
import index_section from './sections/IndexSection'
import newsletter_section from './sections/NewsletterSection'
import { testimonial, testimonial_section } from './sections/TestimonialSection'

export const schemaTypes = [
  // atoms
  form_button,
  form_input_field,
  icon,
  link,
  link_button,
  locale_string,
  photo,
  // sections
  blog_section,
  deals_section,
  faq_section,
  faq,
  feature_section,
  feature,
  gallery_section,
  hero_section,
  index_section,
  newsletter_section,
  testimonial_section,
  testimonial,
  // documents
  page,
]
