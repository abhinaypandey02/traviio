import { content_layouts } from '@/sanity/schemas/atoms/content'
import { SupportedLanguage } from '@/sanity/schemas/atoms/locale'
import { sections } from '@/sanity/schemas/sections'

//                  ____      __          _ ____
//                 /  _/___  / /_  __  __(_) / /_
//                 / // __ \/ __ \/ / / / / / __/
//               _/ // / / / /_/ / /_/ / / / /_
//              /___/_/ /_/_.___/\__,_/_/_/\__/

export type SanityString = string

export type SanitySlug = {
  _type: 'slug'
  _key: string
  current: string
}

//                ___   __
//               /   | / /_____  ____ ___  _____
//              / /| |/ __/ __ \/ __ `__ \/ ___/
//             / ___ / /_/ /_/ / / / / / (__  )
//            /_/  |_\__/\____/_/ /_/ /_/____/

export type SanityLocale = SupportedLanguage['id']

export type SanityLocaleString = {
  [x in SanityLocale]?: string
} & {
  _type: 'localeString'
}

export type SanityLocaleText = {
  _type: 'locale_text'
} & { [x in SanityLocale]?: string }

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
  is_icon?: boolean
  label?: SanityLocaleString
  icon?: SanityIcon
}

export type SanityFormInputField = {
  _type: 'form_input_field'
  _key: string
  placeholder?: SanityLocaleString
  submit_button?: SanityFormButton
}

export type SanityLink = {
  _type: 'link'
  _key: string
  text?: SanityLocaleString
  url?: string
}

export type SanityLinkButton = {
  _type: 'link_button'
  _key: string
  type?: 'primary' | 'secondary'
  label?: SanityLocaleString
  url?: string
  icon?: SanityIcon
}

export type SanityMetaData = {
  _type: 'meta_data'
  _key: string
  meta_title?: SanityLocaleString
  meta_description?: SanityLocaleString
  meta_image?: SanityImage
}

export type SanityPromoBanner = {
  _type: 'promo_banner'
  _key: string
  text?: SanityLocaleString
  link?: SanityLink
}

//                   ______            __             __
//                  / ____/___  ____  / /____  ____  / /_
//                 / /   / __ \/ __ \/ __/ _ \/ __ \/ __/
//                / /___/ /_/ / / / / /_/  __/ / / / /_
//                \____/\____/_/ /_/\__/\___/_/ /_/\__/

export type SanityContentNames = (typeof content_layouts)[number]

export type SanityContentTypes =
  | SanityContentGroup
  | SanityContentStack
  | SanityContentImage
  | SanityContentText
  | SanityContentRichText

export type SanityContentText = {
  _type: 'content_text'
  _key: string
  text?: SanityString
}

export type SanityContentImage = {
  _type: 'content_image'
  _key: string
  image?: SanityImage
  alt?: SanityString
}

export type SanityContentGroup = {
  _type: 'layout_group'
  _key: string
  items?: SanityContentTypes[]
}

export type SanityContentStack = {
  _type: 'layout_stack'
  _key: string
  items?: SanityContentTypes[]
}

export type SanityContentRichText = any

//                 _____           __  _
//                / ___/___  _____/ /_(_)___  ____  _____
//                \__ \/ _ \/ ___/ __/ / __ \/ __ \/ ___/
//               ___/ /  __/ /__/ /_/ / /_/ / / / (__  )
//              /____/\___/\___/\__/_/\____/_/ /_/____/

export type SanitySectionNames = (typeof sections)[number]

export type SanityDealsSection = {
  _type: 'deals_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
}

export type SanityFAQ = {
  _type: 'faq'
  _key: string
  question?: SanityLocaleString
  answer?: SanityLocaleText
}

export type SanityFAQSection = {
  _type: 'faq_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  faqs?: SanityFAQ[]
}

export type SanityFeature = {
  _type: 'feature'
  _key: string
  title?: SanityLocaleString
  description?: SanityLocaleString
  icon?: SanityIcon
}

export type SanityFeatureSection = {
  _type: 'feature_section'
  _key: string
  type?: 'small' | 'large'
  title?: SanityLocaleString
  features?: SanityFeature[]
}

export type SanityGallerySection = {
  _type: 'gallery_section'
  _key: string
  title?: SanityLocaleString
  subtitle?: SanityLocaleString
  images?: SanityImage[]
}

export type SanityHeroCardSection = {
  _type: 'hero_card_section'
  _key: string
  heading?: SanityLocaleString
  cta?: SanityLinkButton
  image?: SanityImage
}

export type SanityHeroSection = {
  _type: 'hero_section'
  _key: string
  title?: SanityLocaleString
  subtitle?: SanityLocaleString
  image?: SanityImage
  cta_buttons?: SanityLinkButton[]
  cta_helper_text?: SanityLocaleString
  has_search?: boolean
  form_input_field?: SanityFormInputField
  scores?: SanityImage[]
}

export type SanityImageHeaderSection = {
  _type: 'image_header_section'
  _key: string
  header?: SanityLocaleString
  image?: SanityImage
}

export type SanityIndexSection = {
  _type: 'index_section'
  _key: string
  title?: SanityLocaleString
  links?: SanityLink[]
}

export type SanityNewsletterSection = {
  _type: 'newsletter_section'
  _key: string
  title?: SanityLocaleString
  subtitle?: SanityLocaleString
  image?: SanityImage
}

export type SanityReviewsSection = {
  _type: 'reviews_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  reviews?: {
    name?: SanityLocaleString
    time?: SanityLocaleString
    country?: SanityLocaleString
    rating?: number
    title?: SanityLocaleString
    text?: SanityLocaleString
  }[]
}

export type SanityOfficeLocationsSection = {
  _type: 'office_locations_section'
  _key: string
  title: SanityLocaleString
  locations: {
    title: SanityLocaleString
    image: SanityImage
    address: SanityLocaleString
    phone: SanityLocaleString
    email: SanityLocaleString
  }[]
}

export type SanityTestimonial = {
  _type: 'testimonial'
  _key: string
  name?: SanityLocaleString
  time?: SanityLocaleString
  country?: SanityLocaleString
  rating?: number
  title?: SanityLocaleString
  text?: SanityLocaleString
}

export type SanityTestimonialSection = {
  _type: 'testimonial_section'
  _key: string
  title?: SanityLocaleString
  image?: SanityImage
  subtitle?: SanityLocaleString
  testimonials?: SanityTestimonial[]
}

export type SanityContentSection = {
  _type: 'content_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  content?: any
}

export type SanitySidebarForm = {
  _type: 'sidebar_form'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  form_input_fields?: (SanityFormInputField | SanityFormButton)[]
}

export type SanitySidebarLatestArticles = {
  _type: 'sidebar_latest_articles'
  _key: string
  title?: SanityLocaleString
  tagline?: SanityLocaleString
  articles_count?: number
}

export type SanitySidebarRelatedTours = {
  _type: 'sidebar_related_tours'
  _key: string
  title?: SanityLocaleString
  tagline?: SanityLocaleString
  tours_count?: number
  tags?: ({
    _type: 'reference'
    _ref: string
  } & SanityTag)[]
}

export type SanityBlogSidebar = {
  _type: 'blog_sidebar'
  _key: string
} & (SanitySidebarForm | SanitySidebarLatestArticles | SanitySidebarRelatedTours)[]

export type SanityFeaturedBlogsSection = {
  _type: 'featured_blogs_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  featured_blogs?: ({
    _type: 'reference'
    _ref: string
  } & SanityArticle)[]
}

export type SanityFeaturedPlaceBlogsSection = {
  _type: 'featured_place_blogs_section'
  _key: string
  cards?: {
    _type: 'card'
    _key: string
    title?: SanityLocaleString
    link?: SanityLink
    image?: SanityImage
  }[]
}

export type SanityInterestsSection = {
  _type: 'interests_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  interests?: {
    _type: 'interest'
    _key: string
    title?: SanityLocaleString
    image?: SanityImage
  }[]
}

export type SanityLatestPostsSection = {
  _type: 'latest_posts_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  filter_tags?: ({
    _type: 'reference'
    _ref: string
  } & SanityTag)[]
  sorting_methods?: ('recent' | 'popular' | 'featured')[]
}

export type SanityAtGlanceSection = {
  _type: 'at_glance_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  facts?: {
    _type: 'fact'
    _key: string
    title?: SanityLocaleString
    subtitle?: SanityLocaleString
    icon?: SanityIcon
  }[]
  useful_links_section?: {
    _type: 'useful_links_section'
    _key: string
    title?: SanityLocaleString
    useful_links?: {
      _type: 'useful_link'
      _key: string
      title?: SanityLocaleString
      url?: string
      icon?: SanityImage
    }[]
  }[]
}

export type SanityTopThingsSection = {
  _type: 'top_things_section'
  _key: string
  destination?: {
    _type: 'reference'
    _ref: string
  } & SanityDestinationPage
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  top_things?: ({ _type: 'reference'; _ref: string } & SanityArticle)[]
  cta?: SanityLocaleString
}

export type SanityTopToursSection = {
  _type: 'top_tours_section'
  _key: string
  destination?: { _type: 'reference'; _ref: string } & SanityDestinationPage
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  tours?: ({ _type: 'reference'; _ref: string } & SanityTourPage)[]
}

export type SanityTourSelectionSection = {
  _type: 'tour_selection_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  filters?: {
    _type: 'filter'
    _key: string
    title?: SanityLocaleString
    filter_type?:
      | 'destinations'
      | 'special_offers'
      | 'city_count'
      | 'trip_type'
      | 'price_range'
      | 'duration'
  }[]
}

export type SanityAccommodationSection = {
  _type: 'accommodation_section'
  _key: string
  subtitle?: SanityLocaleString
  title?: SanityLocaleString
  accommodation_types?: {
    accommodation_type: {
      title?: SanityLocaleString
      subtitle?: SanityLocaleString
      rating?: number
      resorts?: {
        title?: SanityLocaleString
        image?: SanityImage
      }[]
    }
  }[]
}

export type SanityImageShowcase = {
  _type: 'image_showcase'
  _key: string
  title?: SanityLocaleString
  images_data?: {
    image?: SanityImage
    image_size?: {
      width?: number
      height?: number
    }
  }[]
}

export type SanityFeaturedToursSection = {
  _type: 'featured_tours_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  tour_cards?: {
    badge_content?: SanityLocaleString
    content?: {
      _type: 'reference'
      _ref: string
    } & SanityTourPage
  }[]
}

export type SanityItinerarySection = {
  _type: 'itinerary_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  enquire_sidebar?: {
    icon?: SanityIcon
    title?: SanityLocaleString
    subtitle?: SanityLocaleString
  }[]
  itinerary_day_cards?: {
    title?: SanityLocaleString
    description?: SanityLocaleText
    image?: SanityImage
    itinerary_details_lists?: {
      icon?: SanityIcon
      title?: SanityLocaleString
      itinerary_details_list_items?: {
        title?: SanityLocaleString
      }[]
    }[]
  }[]
}

export type SanityMemorableExperiencesSection = {
  _type: 'memorable_experiences_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  experience_cards?: {
    title?: SanityLocaleString
    image?: SanityImage
    description?: SanityLocaleText
  }[]
}

export type SanityPricingSection = {
  _type: 'pricing_section'
  _key: string
  title?: SanityLocaleString
}

export type SanityTravelInfoSection = {
  _type: 'travel_info_section'
  _key: string
  icon?: SanityIcon
  title?: SanityLocaleString
  subtitle?: SanityLocaleString
  cta?: SanityLinkButton
}

export type SanityWhatsIncludedSection = {
  _type: 'whats_included_section'
  _key: string
  title?: SanityLocaleString
  inclusion_list?: {
    icon?: SanityIcon
    title?: SanityLocaleString
    description?: SanityLocaleString[]
  }[]
}

//         ____                                        __
//        / __ \____  _______  ______ ___  ___  ____  / /______
//       / / / / __ \/ ___/ / / / __ `__ \/ _ \/ __ \/ __/ ___/
//      / /_/ / /_/ / /__/ /_/ / / / / / /  __/ / / / /_(__  )
//     /_____/\____/\___/\__,_/_/ /_/ /_/\___/_/ /_/\__/____/

export type SanityTag = {
  _type: 'tag'
  _key: string
  name?: SanityLocaleString
}

export type SanityDestinationSection =
  | SanityFeaturedBlogsSection
  | SanityFeaturedPlaceBlogsSection
  | SanityInterestsSection
  | SanityImageHeaderSection
  | SanityContentSection
  | SanityNewsletterSection

export type SanityDestinationSectionNames = SanityDestinationSection['_type']

export type SanityDestinationPage = {
  _type: 'destination_page'
  destination_id?: SanityString
  slug?: SanitySlug
  meta_data?: SanityMetaData
  promo_banner?: SanityPromoBanner
  hero_section?: {
    title?: SanityLocaleString
    image?: SanityImage
  }
  sections?: SanityDestinationSection[]
}

export type SanityPage = {
  _type: 'page'
  slug?: SanitySlug
  meta_data?: SanityMetaData
  sections?: (
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

export type SanityArticle = {
  _type: 'article'
  _key: string
  destination?: {
    _type: 'reference'
    _ref: string
  } & SanityDestinationPage
  slug?: SanitySlug
  cover_image?: SanityImage
  title?: SanityLocaleString
  tags?: {
    _type: 'array'
    _key: string
    _ref: string[]
    _weak?: boolean
  } & SanityTag[]
  introduction?: SanityContentRichText
  author?: SanityLocaleString
  time?: SanityLocaleString
  subsections?: {
    tagline?: SanityLocaleString
    title?: SanityLocaleString
    content?: SanityContentRichText[]
  }[]
}

export type SanityAllBlogsSection = {
  _type: 'all_blogs_section'
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
}

export type SanityBlogPageSection =
  | SanityFeaturedBlogsSection
  | SanityFeaturedPlaceBlogsSection
  | SanityInterestsSection
  | SanityImageHeaderSection
  | SanityContentSection
  | SanityNewsletterSection

export type SanityBlogPageSectionNames = SanityBlogPageSection['_type']

export type SanityBlogPage = {
  _type: 'blog_page'
  slug?: SanitySlug
  meta_data?: SanityMetaData
  promo_banner?: SanityPromoBanner
  article?: {
    _type: 'reference'
    _ref: string
  } & SanityArticle
  sections?: SanityBlogPageSection[]
  sidebar?: SanityBlogSidebar
}

export type SanityTailorYourTour = {
  _type: 'tailor_your_tour'
  slug?: SanitySlug
  step_1?: {
    title?: SanityLocaleString
    tagline?: SanityLocaleString
    place_cards?: {
      title?: SanityLocaleString
      image?: SanityImage
      is_primary_label?: boolean
    }[]
    next_btn?: SanityLocaleString
    faq_section?: SanityFAQSection
  }
  step_2?: {
    title?: SanityLocaleString
    tagline?: SanityLocaleString
    calendar_section?: {
      radio_buttons?: {
        text?: SanityLocaleString
      }[]
    }
    next_btn?: SanityLocaleString
    back_btn?: SanityLocaleString
    faq_section?: SanityFAQSection
  }
  step_3?: {
    title?: SanityLocaleString
    tagline?: SanityLocaleString
    form_section?: {
      radio_buttons?: {
        text?: SanityLocaleString
      }[]
    }
    next_btn?: SanityLocaleString
    back_btn?: SanityLocaleString
    faq_section?: SanityFAQSection
  }
  step_4?: {
    title?: SanityLocaleString
    tagline?: SanityLocaleString
    form_section?: string
    faq_section?: SanityFAQSection
  }
}

export type SanityTourPage = {
  _type: 'tour_page'
  _key: string
  destination?: {
    _type: 'reference'
    _ref: string
  } & SanityDestinationPage
  meta_data?: SanityMetaData
  slug?: SanitySlug
  promo_banner?: SanityPromoBanner
  hero_section?: {
    title?: SanityLocaleString
    image?: SanityImage
  }
  overview_card?: {
    duration?: SanityLocaleString
    countries?: SanityLocaleString
    cities?: number
    rating?: SanityLocaleString
    about?: SanityLocaleString
    price?: SanityLocaleString
    cta_button?: SanityLinkButton
    cta_helper_text?: SanityLocaleString
  }
  sections?: (
    | SanityContentSection
    | SanityFeatureSection
    | SanityReviewsSection
    | SanityPricingSection
    | SanityFAQSection
    | SanityAccommodationSection
    | SanityImageShowcase
    | SanityItinerarySection
    | SanityMemorableExperiencesSection
    | SanityTravelInfoSection
    | SanityFeaturedToursSection
    | SanityWhatsIncludedSection
  )[]
}

export type SanityTravelGuide = {
  _type: 'travel_guide'
  slug?: SanitySlug
  image_hero?: {
    image?: SanityImage
    text?: SanityLocaleString
  }
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  location?: SanityLocaleString
  sections?: {
    title?: SanityLocaleString
    content?: SanityContentRichText
  }[]
}

export type SanityTravelWiki = {
  _type: 'travel_wiki'
  slug?: SanitySlug
  image_hero?: {
    image?: SanityImage
    text?: SanityLocaleString
  }
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  location?: SanityLocaleString
  sections?: {
    title?: SanityLocaleString
    content?: SanityContentRichText
  }[]
}

export type SanityGlobals = {
  _type: 'globals'
  navbar?: {
    logo?: SanityImage
    links?: (
      | SanityLink
      | {
          _type: 'dropdown'
          _key: string
          title?: SanityLocaleString
          links?: SanityLink[]
        }
    )[]
    cta?: SanityLinkButton
  }
  footer?: {
    logo?: SanityImage
    title?: SanityLocaleString
    description?: SanityLocaleText
    link_groups?: {
      _type: 'link_group'
      _key: string
      title?: SanityLocaleString
      links?: SanityLink[]
    }[]
    locations?: {
      _type: 'location'
      _key: string
      title?: SanityLocaleString
      address?: SanityLocaleString
      phone_number?: SanityLocaleString
      email?: string
    }[]
    copyright_text?: SanityLocaleText
  }
}
