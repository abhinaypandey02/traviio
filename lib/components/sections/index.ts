import { FunctionComponent } from 'react'

import { SanitySectionNames } from '@/lib/sanity/types'

import FeatureSection from './FeatureSection'

export const SectionMap: { [name in SanitySectionNames]?: FunctionComponent<any> } = {
  feature_section: FeatureSection,
}
