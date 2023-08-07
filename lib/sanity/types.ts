import { SupportedLanguage } from '@/app/sanity/schemas/atoms/LocaleString'
import { sections } from '@/app/sanity/schemas/sections'

// Atoms

export type SanityLocale = SupportedLanguage['id']

export type SanityLocaleString = {
  [x in SanityLocale]: string
} & {
  _type: 'localeString'
}

export type SanityImage = {
  _type: 'image'
  _key: string
  asset: {
    _type: 'reference'
    _ref: string
  }
}

export type SanityPhoto = {
  asset: {
    _type: 'reference'
    _ref: string
  }
  _key: string
  _type: 'photo'
  alt?: SanityLocaleString
}

export type SanityIcon = {
  _type: 'icon'
  _key: string
  alt?: SanityLocaleString
  asset: {
    _type: 'reference'
    _ref: string
  }
}

export type SanityFormButton = {
  _type: 'form_button'
  _key: string
  is_icon: boolean
  label: SanityLocaleString
  icon: SanityIcon
}

export type SanityFormInputField = {
  _type: 'form_input_field'
  _key: string
  placeholder: SanityLocaleString
  submit_button: SanityFormButton
}

export type SanityLink = {
  _type: 'link'
  _key: string
  text: SanityLocaleString
  url: string
}

export type SanityLinkButton = {
  _type: 'link_button'
  _key: string
  type: 'primary' | 'secondary'
  label: SanityLocaleString
  url: string
  icon: SanityIcon
}

export type SanityMetaData = {
  _type: 'meta_data'
  _key: string
  meta_title: SanityLocaleString
  meta_description: SanityLocaleString
  meta_image: SanityImage
}

// Sections

export type SanitySectionNames = (typeof sections)[number]

export type SanityBlogSection = {
  _type: 'blog_section'
  _key: string
  tagline: SanityLocaleString
  title: SanityLocaleString
}

export type SanityDealsSection = {
  _type: 'deals_section'
  _key: string
  tagline: SanityLocaleString
  title: SanityLocaleString
}

export type SanityFAQ = {
  _type: 'faq'
  _key: string
  question: SanityLocaleString
  answer: SanityLocaleString
}

export type SanityFAQSection = {
  _type: 'faq_section'
  _key: string
  tagline: SanityLocaleString
  title: SanityLocaleString
  faqs: SanityFAQ[]
}

export type SanityFeature = {
  _type: 'feature'
  _key: string
  title: SanityLocaleString
  description: SanityLocaleString
  icon: SanityIcon
}

export type SanityFeatureSection = {
  _type: 'feature_section'
  _key: string
  type: 'small' | 'large'
  title: SanityLocaleString
  features: SanityFeature[]
}

export type SanityGallerySection = {
  _type: 'gallery_section'
  _key: string
  title: SanityLocaleString
  subtitle: SanityLocaleString
  images: SanityImage[]
}

export type SanityHeroSection = {
  _type: 'hero_section'
  _key: string
  title: SanityLocaleString
  subtitle: SanityLocaleString
  image: SanityImage
  cta_buttons: SanityLinkButton[]
  cta_helper_text: SanityLocaleString
  has_search: boolean
  form_input_field: SanityFormInputField
  scores: SanityImage[]
}

export type SanityIndexSection = {
  _type: 'index_section'
  _key: string
  title: SanityLocaleString
  links: SanityLink[]
}

export type SanityNewsletterSection = {
  _type: 'newsletter_section'
  _key: string
  title: SanityLocaleString
  subtitle: SanityLocaleString
  image: SanityImage
  email_form: SanityFormInputField
  query_section_title: SanityLocaleString
  query_section_subtitle: SanityLocaleString
  query_section_subtitle_icon: SanityImage
}

export type SanityTestimonial = {
  _type: 'testimonial'
  _key: string
  name: SanityLocaleString
  time: SanityLocaleString
  country: SanityLocaleString
  rating: number
  title: SanityLocaleString
  text: SanityLocaleString
}

export type SanityTestimonialSection = {
  _type: 'testimonial_section'
  _key: string
  title: SanityLocaleString
  subtitle: SanityLocaleString
  testimonials: SanityTestimonial[]
}

// Documents
export type SanityPage = {
  _type: 'page'
  slug: {
    _type: 'slug'
    current: string
  }
  meta_data: SanityMetaData
  sections: (
    | SanityBlogSection
    | SanityDealsSection
    | SanityFAQSection
    | SanityFeatureSection
    | SanityGallerySection
    | SanityHeroSection
    | SanityIndexSection
    | SanityNewsletterSection
    | SanityTestimonialSection
  )[]
}
