import React from 'react'
import Script from 'next/script'

function Schema({ data }: { data: { [key: string]: any } }) {
  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      id={'jsonld' + new Date().toISOString()}
    />
  )
}

export default Schema
