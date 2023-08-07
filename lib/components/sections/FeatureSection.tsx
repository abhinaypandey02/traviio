import { SanityFeature, SanityFeatureSection } from '../../sanity/types'

export type FeatureSectionProps = {
  data: SanityFeatureSection
}

const FeatureSection = ({ data }: FeatureSectionProps) => {
  return (
    <>
      {data.features.map((feature) => (
        <Feature key={feature._key} data={feature} />
      ))}
    </>
  )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data }: FeatureProps) => {
  return JSON.stringify(data)
}

FeatureSection.Feature = Feature

export default FeatureSection
