import layout_group from './atoms/content/Group'
import content_image from './atoms/content/Image'
import rich_text from './atoms/content/Richtext'
import layout_stack from './atoms/content/Stack'
import content_text from './atoms/content/Text'
import { form_button, form_input_field } from './atoms/Form'
import icon from './atoms/Icon'
import link from './atoms/Link'
import link_button from './atoms/LinkButton'
import { locale_rich_text } from './atoms/locale/LocaleRichtext'
import locale_string from './atoms/locale/LocaleString'
import locale_text from './atoms/locale/LocaleText'
import meta_data from './atoms/MetaData'
import photo from './atoms/Photo'
import Page from './documents/Page'
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
  locale_string,
  locale_text,
  locale_rich_text,
  form_button,
  form_input_field,
  icon,
  link,
  link_button,
  locale_string,
  photo,
  meta_data,
  // content
  content_text,
  content_image,
  layout_group,
  layout_stack,
  rich_text,
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
  Page,
]
