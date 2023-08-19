import { FunctionComponent } from 'react'

import { SanitySectionNames } from '@/sanity/types'

import FeatureSection from './FeatureSection'
import HeroSection from './HeroSection'

export const SectionMap: { [name in SanitySectionNames]?: FunctionComponent<any> } = {
  hero_section:HeroSection,
  feature_section: FeatureSection,
  
}
