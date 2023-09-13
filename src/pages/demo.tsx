import React from 'react'

import Layout from '@/components/layout'
import FeatureDropdown from '@/components/sections/FeatureDropdown'

const demo = () => {
  return (
    <Layout>
      <div className="my-10 max-w-[390px] mx-5">
        <FeatureDropdown
          items={[
            {
              title: 'Sample Title 1',
              subitems: [
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Sample Title 3',
              subitems: [
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Sample Title 2',
              subitems: [
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
                {
                  title: 'Sample Subtitle 1',
                  subitems: [
                    {
                      title: 'Sample Subtitle 1',
                      color: 'blue',
                    },
                    {
                      title: 'Sample Subtitle 2',
                      color: 'gray',
                    },
                  ],
                },
              ],
            },
          ]}
          selectedItemToggle={(item) => {}}
        />
      </div>
    </Layout>
  )
}

export default demo
