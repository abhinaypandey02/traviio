import { content_layouts } from '@/sanity/schemas/atoms/content'
import { SupportedLanguage } from '@/sanity/schemas/atoms/locale'
import { sections } from '@/sanity/schemas/sections'

import { TourSections } from './schemas/sections/Tours/index'

//                  ____      __          _ ____
//                 /  _/___  / /_  __  __(_) / /_
//                 / // __ \/ __ \/ / / / / / __/
//               _/ // / / / /_/ / /_/ / / / /_
//              /___/_/ /_/_.___/\__,_/_/_/\__/

export type SanityString = string

export type SanitySlug = {
  _type: 'slug'
  _id: string
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
  // _type: 'localeString'
  // _id: string
}

export type SanityLocaleText = {
  _type: 'locale_text'
  _id: string
} & { [x in SanityLocale]?: string }

export type SanityLocaleNumber = {
  _type: 'locale_number'
  _id: string
} & { [x in SanityLocale]?: number }

export type SanityImage = {
  _type: 'image'
  _id: string
  _key: string
  asset: {
    _type: 'reference'
    _id: string
    _ref: string
  }
}

export type SanityPhoto = {
  asset: {
    _type: 'reference'
    _id: string
    _ref: string
  }
  _key: string
  _type: 'photo'
  _id: string
  alt?: SanityLocaleString
}

export type SanityPrice = {
  _type: 'price'
  _id: string
  _key: string
  currency_symbol?: SanityLocaleString
  initial_price?: SanityLocaleNumber
  discounted_price?: SanityLocaleNumber
}

export type SanityIcon = {
  _type: 'icon'
  _id: string
  _key: string
  alt?: SanityLocaleString
  asset: {
    _type: 'reference'
    _id: string
    _ref: string
  }
  variants?: {
    variant?: SanityImage
  }[]
}

export type SanityFormButton = {
  _type: 'form_button'
  _id: string
  _key: string
  is_icon?: boolean
  label?: SanityLocaleString
  icon?: SanityIcon
}

export type SanityFormInputField = {
  _type: 'form_input_field'
  _id: string
  _key: string
  placeholder?: SanityLocaleString
  submit_button?: SanityFormButton
}

export type SanityLink = {
  _type: 'link'
  _id: string
  _key: string
  text?: SanityLocaleString
  url?: string
}

export type SanityLinkButton = {
  _type: 'link_button'
  _id: string
  _key: string
  type?: 'primary' | 'secondary'
  label?: SanityLocaleString
  url?: string
  icon?: SanityIcon
}

export type SanityMetaData = {
  _type: 'meta_data'
  _id: string
  _key: string
  meta_title?: SanityLocaleString
  meta_description?: SanityLocaleString
  meta_image?: SanityImage
}

export type SanityPromoBanner = {
  _type: 'promo_banner'
  _id: string
  _key: string
  text?: SanityLocaleString
  link?: SanityLink
}

export type SanityTimeline = {
  _type: 'timeline'
  _id: string
  _key: string
  start_date?: string
  end_date?: string
}

export type SanityTourTimeline = {
  _type: 'tour_timeline'
  _id: string
  _key: string
  start_day?: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
  duration?: number
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
  _id: string
  _key: string
  text?: SanityString
  styles?: {
    color?: SanityString
  }
}

export type SanityContentImage = {
  _type: 'content_image'
  _id: string
  _key: string
  image?: SanityImage
  alt?: SanityString
}

export type SanityContentGroup = {
  _type: 'layout_group'
  _id: string
  _key: string
  items?: SanityContentTypes[]
}

export type SanityContentStack = {
  _type: 'layout_stack'
  _id: string
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

export type SanityTourSectionNames = (typeof TourSections)[number]

export type SanityDealsSection = {
  _type: 'deals_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  deals?: SanityDeal[]
}

export type SanityDeal = {
  _type: 'deal'
  _id: string
  _key: string
  tour?: {
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityTourPage
  label?: SanityLocaleString
}

export type SanityDestinationsSection = {
  _type: 'destinations_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  destinations?: {
    count: number
    _type: 'destination'
    _id: string
    _key: string
    destination: ({ _ref: string } & SanityDestinationPage) | undefined // reference
    image?: SanityImage
  }[]
}

export type SanityFAQ = {
  _type: 'faq'
  _id: string
  _key: string
  question?: SanityLocaleString
  answer?: SanityLocaleText
}

export type SanityFAQSection = {
  _type: 'faq_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  faqs?: SanityFAQ[]
}

export type SanityFeature = {
  _type: 'feature'
  _id: string
  _key: string
  title?: SanityLocaleString
  description?: SanityLocaleString
  icon?: SanityIcon
}

export type SanityFeatureSection = {
  _type: 'feature_section'
  _id: string
  _key: string
  type?: 'small' | 'large'
  title?: SanityLocaleString
  features?: SanityFeature[]
}

export type SanityGallerySection = {
  _type: 'gallery_section'
  _id: string
  _key: string
  title?: SanityLocaleString
  subtitle?: SanityLocaleString
  images?: SanityImage[]
}

export type SanityHeroCardSection = {
  _type: 'hero_card_section'
  _id: string
  _key: string
  heading?: SanityLocaleString
  cta?: SanityLinkButton
  image?: SanityImage
}

export type SanityHeroSection = {
  _type: 'hero_section'
  _id: string
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
  _id?: string
  _key?: string
  header?: SanityLocaleString
  image?: SanityImage | SanityPhoto
  content?: SanityLocaleText
}

export type SanityIndexSection = {
  _type: 'index_section'
  _id: string
  _key: string
  title?: SanityLocaleString
  tours?: ({
    _type: 'link'
  } & SanityLink)[]
}

export type SanityOtherToursSection = {
  _type: 'other_tours_section'
  title?: SanityLocaleString
  tagline?: SanityLocaleString
  tour_cards?: {
    badge_content?: SanityLocaleString
    content?: {
      _type: 'reference'
      _id: string
      _ref: string
    } & SanityTourPage
  }[]
}

export type SanityNewsletterSection = {
  _type: 'newsletter_section'
  _id: string
  _key: string
  title?: SanityLocaleString
  subtitle?: SanityLocaleString
  image?: SanityImage
}

export type SanityReviewsSection = {
  _type: 'reviews_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  reviews?: {
    name?: SanityLocaleString
    time?: SanityLocaleString
    avatar?: SanityImage
    country?: SanityLocaleString
    rating?: number
    title?: SanityLocaleString
    text?: SanityLocaleString
  }[]
}

export type SanityOfficeLocationsSection = {
  _type: 'office_locations_section'
  _id: string
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
  _id: string
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
  _id: string
  _key: string
  title?: SanityLocaleString
  image?: SanityImage
  subtitle?: SanityLocaleString
  testimonials?: SanityTestimonial[]
}

export type SanityContentSection = {
  _type: 'content_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  content?: any
}

export type SanitySidebarForm = {
  _type: 'sidebar_form'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  form_input_fields?: (SanityFormInputField | SanityFormButton)[]
}

export type SanitySidebarLatestArticles = {
  _type: 'sidebar_latest_articles'
  _id: string
  _key: string
  title?: SanityLocaleString
  tagline?: SanityLocaleString
  articles?: ({
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityArticle)[]
}

export type SanitySidebarRelatedTours = {
  _type: 'sidebar_related_tours'
  _id: string
  _key: string
  title?: SanityLocaleString
  tagline?: SanityLocaleString
  tours?: ({
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityTourPage)[]
  tags?: ({
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityTag)[]
}

export type SanityBlogSidebar = {
  _type: 'blog_sidebar'
  _id: string
  _key: string
} & (SanitySidebarForm | SanitySidebarLatestArticles | SanitySidebarRelatedTours)[]

export type SanityFeaturedBlogsSection = {
  _type: 'featured_blogs_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  featured_blogs?: ({
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityArticle)[]
}

export type SanityFeaturedPlaceBlogsSection = {
  _type: 'featured_place_blogs_section'
  _id: string
  _key: string
  cards?: SanityDestinationPage[]
}

export type SanityInterestsSection = {
  _type: 'interests_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  interests?: {
    _type: 'interest'
    _id: string
    _key: string
    title?: SanityLocaleString
    image?: SanityImage
  }[]
}

export type SanityLatestPostsSection = {
  _type: 'latest_posts_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  filter_tags?: ({
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityTag)[]
  sorting_methods?: ('recent' | 'popular' | 'featured')[]
  multiple_rows?: boolean
  variant?: 'default' | 'with_tags'
}

export type SanityAtGlanceSection = {
  _type: 'at_glance_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  facts?: {
    _type: 'fact'
    _id: string
    _key: string
    title?: SanityLocaleString
    subtitle?: SanityLocaleString
    icon?: SanityIcon
  }[]
  useful_links_section?: {
    _type: 'useful_links_section'
    _id: string
    _key: string
    title?: SanityLocaleString
    useful_links?: {
      _type: 'useful_link'
      _id: string
      _key: string
      title?: SanityLocaleString
      url?: string
      icon?: SanityImage
    }[]
  }
}

export type SanityTopThingsSection = {
  _type: 'top_things_section'
  _id: string
  _key: string
  destination?: {
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityDestinationPage
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  // top_things?: ({ _type: 'reference'; _ref: string } & SanityArticle)[]
  top_things?: {
    _type: 'top_thing'
    title?: SanityLocaleString
    description?: SanityLocaleText
    image?: SanityImage
    link?: SanityLink
  }[]
  cta?: SanityLocaleString
}

export type SanityTopToursSection = {
  _type: 'top_tours_section'
  _id: string
  _key: string
  destination?: { _type: 'reference'; _ref: string } & SanityDestinationPage
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  tours?: ({ _type: 'reference'; _ref: string } & SanityTourPage)[]
}

export type SanityTourSelectionSection = {
  _type: 'tour_selection_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  tags?: ({
    _type: 'reference'
    _ref: string
  } & SanityTag)[]
  filters?: {
    _type: 'filter'
    _id: string
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
  _type: 'accommodation_types_section'
  _id: string
  _key: string
  subtitle?: SanityLocaleString
  title?: SanityLocaleString
  accommodation_types?: {
    title?: SanityLocaleString
    subtitle?: SanityLocaleString
    rating?: number
    resorts?: {
      title?: SanityLocaleString
      image?: SanityImage
    }[]
  }[]
}

export type SanityImageShowcase = {
  _type: 'image_showcase_section'
  _id: string
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
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  tour_cards?: {
    badge_content?: SanityLocaleString
    content?: {
      _type: 'reference'
      _id: string
      _ref: string
    } & SanityTourPage
  }[]
}

export type SanityItineraryDetailsListItem = {
  title?: SanityLocaleString
  description?: SanityLocaleText
  image?: SanityImage
  itinerary_details_lists?: {
    icon?: SanityIcon
    title?: SanityLocaleString
    itinerary_details_list_items?: SanityLocaleString[]
  }[]
  special_information?: {
    title?: SanityLocaleString
    description?: SanityLocaleText
    icon?: SanityIcon
  }
}

export type SanityItinerarySection = {
  _type: 'itinerary_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  enquire_sidebar?: {
    icon?: SanityIcon
    title?: SanityLocaleString
    subtitle?: SanityLocaleString
  }[]
  itinerary_day_cards?: SanityItineraryDetailsListItem[]
}

export type SanityMemorableExperiencesSection = {
  _type: 'memorable_experiences_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  experience_cards?: {
    slug?: SanitySlug
    title?: SanityLocaleString
    image_hero?: { image: SanityImage }
    tagline?: SanityLocaleText
  }[]
}

export type SanityPricingSection = {
  _type: 'pricing_section'
  _id: string
  _key: string
  title?: SanityLocaleString
  weekly_schedule?: SanityTourTimeline & {
    price: SanityPrice
  }
  disabled?: SanityTimeline[]
  price_overrides?: {
    timeline?: SanityTimeline
    price?: SanityPrice
  }[]
}
export type SanityPromoCode = {
  _type: 'promo'
  _id: string
  _key: string
  code: string
  percent: number
  max_discount: number
}

export type SanityTravelInfoSection = {
  _type: 'travel_info_section'
  _id: string
  _key: string
  icon?: SanityIcon
  title?: SanityLocaleString
  subtitle?: SanityLocaleString
  cta?: SanityLinkButton
}

export type SanityWhatsIncludedSection = {
  _type: 'whats_included_section'
  _id: string
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
  _id: string
  _key: string
  name?: SanityLocaleString
  icon?: SanityPhoto
  hero_image?: SanityPhoto
  slug?: SanitySlug
}

export type SanityDestinationSection =
  | SanityImageHeaderSection
  | SanityAllBlogsSection
  | SanityReviewsSection
  | SanityFAQSection
  | SanityHeroCardSection
  | SanityFeaturedToursSection
  | SanityTourSelectionSection
  | SanityTopThingsSection
  | SanityAtGlanceSection
  | SanityContactAgentSection

export type SanityDestinationSectionNames = SanityDestinationSection['_type']

export type SanityContactAgentSection = {
  _type: 'contact_agent_section'
  title?: SanityLocaleString
  cta?: SanityLinkButton
  hero_image?: SanityPhoto
}

export type SanityDestinationPage = {
  _type: 'destination_page'
  _id: string
  name?: SanityLocaleString
  slug?: SanitySlug
  meta_data?: SanityMetaData
  promo_banner?: SanityPromoBanner
  // hero_section?: {
  //   title?: SanityLocaleString
  //   image?: SanityImage
  // }
  discounts_section?: {
    header_section: SanityImageHeaderSection
  }
  sections?: SanityDestinationSection[]
}

export type SanityPage = {
  _type: 'page'
  _id: string
  slug?: SanitySlug
  meta_data?: SanityMetaData
  promo_banner?: SanityPromoBanner
  sections?: (
    | SanityDealsSection
    | SanityFAQSection
    | SanityDestinationsSection
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
  _id: string
  _key: string
  destination?: {
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityDestinationPage
  slug?: SanitySlug
  cover_image?: SanityImage
  title?: SanityLocaleString
  tags?: {
    _type: 'array'
    _id: string
    _key: string
    _ref: string[]
    _weak?: boolean
  } & SanityTag[]
  introduction?: SanityLocaleString
  author?: {
    name?: SanityLocaleString
    avatar?: SanityImage
    bio?: SanityLocaleString
    socials?: {
      name: string
      icon: SanityImage
      link: string
    }[]
  }
  time?: SanityLocaleString
  subsections?: {
    tagline?: SanityLocaleString
    title?: SanityLocaleString
    content?: SanityContentRichText[]
  }[]
  _createdAt?: string
  _updatedAt?: string
}

export type SanityAllBlogsSection = {
  _type: 'all_blogs_section'
  _id: string
  _key: string
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  blogs?: SanityArticle[]
}

export type SanityFeaturedImagesSection = {
  _type: 'featured_images_section'
} & { [x: string]: SanityImage }[]

export type SanityBlogPageSection =
  | SanityFeaturedBlogsSection
  | SanityAllBlogsSection
  | SanityFeaturedPlaceBlogsSection
  | SanityInterestsSection
  | SanityImageHeaderSection
  | SanityContentSection
  | SanityNewsletterSection
  | SanityLatestPostsSection
  | SanityFeaturedImagesSection

export type SanityBlogPageSectionNames = SanityBlogPageSection['_type']

export type SanityBlogPage = {
  _type: 'blog_page'
  _id: string
  slug?: SanitySlug
  meta_data?: SanityMetaData
  promo_banner?: SanityPromoBanner
  is_article?: boolean
  article?: SanityArticle // reference
  tags?: ({
    _type: 'tag'
    _id: string
    _key: string
    _ref: string[]
    _weak?: boolean
  } & SanityTag)[]
  sections?: SanityBlogPageSection[]
  sidebar?: SanityBlogSidebar
}

export type SanityTailorYourTour = {
  _type: 'tailor_your_tour'
  _id: string
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

export type SanityTourPageSection =
  | SanityContentSection
  | SanityFeatureSection
  | SanityReviewsSection
  | SanityPricingSection
  | SanityFAQSection
  | SanityAccommodationSection
  | SanityGallerySection
  | SanityItinerarySection
  | SanityMemorableExperiencesSection
  | SanityTravelInfoSection
  | SanityFeaturedToursSection
  | SanityWhatsIncludedSection

export type SanityTourPageSectionNames = SanityTourPageSection['_type']

export type SanityTourPage = {
  _type: 'tour_page'
  _id: string
  _key: string
  destination?: {
    _type: 'reference'
    _id: string
    _ref: string
  } & SanityDestinationPage
  meta_data?: SanityMetaData
  slug?: SanitySlug
  promo_banner?: SanityPromoBanner
  hero_section?: {
    title?: SanityLocaleString
    image?: SanityImage
  }
  timeline?: {
    timeline?: SanityTourTimeline
    disabled?: SanityTimeline[]
  }
  price_override?: {
    timeline?: SanityTimeline
    price?: SanityPrice
  }[]
  payment?: {
    room_options?: {
      title?: SanityLocaleString
      description?: SanityLocaleString
      image?: SanityImage
      rating?: number
      price?: SanityPrice
    }[]
    room_sharing_options?: {
      title?: SanityLocaleString
      description?: SanityLocaleString
      image?: SanityImage
      price?: SanityPrice
    }[]
    extras?: {
      _key: string
      city_name?: SanityLocaleString
      count?: number
      visits?: {
        _key: string
        title?: SanityLocaleString
        description?: SanityLocaleString
        image?: SanityImage
        price?: SanityPrice
      }[]
    }[]
  }
  overview_card?: {
    duration?: SanityLocaleString
    countries?: number
    cities?: number
    rating?: number
    about?: SanityLocaleString
    price?: SanityPrice
    cta_button?: SanityLinkButton
    cta_helper_text?: SanityLocaleString
  }
  sections?: SanityTourPageSection[]
}

export type SanityTravelGuideSection = {
  tree_title?: SanityLocaleString
  title?: SanityLocaleString
  content?: SanityContentRichText
}

export type SanityTravelGuide = {
  _type: 'travel_guide'
  _id: string
  slug?: SanitySlug
  image_hero?: {
    image?: SanityImage
    text?: SanityLocaleString
  }
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  tab_title?: SanityLocaleString
  location?: SanityLocaleString
  sections?: SanityTravelGuideSection[]
}

export type SanityTravelWikiSection = {
  tree_title?: SanityLocaleString
  title?: SanityLocaleString
  content?: SanityContentRichText
  nested_sections?: ({
    _type: 'nested_section'
  } & SanityTravelWikiSection)[]
}

export type SanityTravelWiki = {
  _type: 'travel_wiki'
  _id: string
  slug?: SanitySlug
  image_hero?: {
    image?: SanityImage
    text?: SanityLocaleString
  }
  tagline?: SanityLocaleString
  title?: SanityLocaleString
  location?: SanityLocaleString
  sections?: SanityTravelWikiSection[]
}

export type SanityTourDropdown = {
  _type: 'tour_dropdown'
  _id: string
  _key: string
  destinations_title?: SanityLocaleString
  tours_title?: SanityLocaleString
  destinations?: {
    _type: 'destination_link'
    destination?: {
      _type: 'reference'
      _id: string
      _ref: string
    } & SanityDestinationPage
    tours?: ({
      _type: 'reference'
      _id: string
      _ref: string
    } & SanityTourPage)[]
    blogs?: {
      _type: 'reference'
      _id: string
      _ref: string
    } & SanityArticle
  }[]
}

export type SanityGlobals = {
  _type: 'globals'
  _id: string
  navbar?: {
    logo?: SanityImage
    info_banner?: {
      text?: SanityLocaleString
      cta?: SanityLinkButton
    }
    links?: (
      | SanityLink
      | {
          _type: 'dropdown'
          _id: string
          _key: string
          title?: SanityLocaleString
          links?: SanityLink[]
        }
      | SanityTourDropdown
    )[]
    cta?: SanityLinkButton
  }
  footer?: {
    logo?: SanityImage
    title?: SanityLocaleString
    description?: SanityLocaleText
    link_groups?: {
      _type: 'link_group'
      _id: string
      _key: string
      title?: SanityLocaleString
      links?: SanityLink[]
    }[]
    locations?: {
      _type: 'location'
      _id: string
      _key: string
      title?: SanityLocaleString
      address?: SanityLocaleString
      phone_number?: SanityLocaleString
      email?: string
    }[]
    social_media?: {
      _type: 'social'
      _id: string
      _key: string
      icon: SanityIcon
      link?: string
    }[]
    payment_methods?: {
      _type: 'payment_method'
      _id: string
      _key: string
      icon: SanityIcon
    }[]
    copyright_text?: SanityLocaleText
  }
}
