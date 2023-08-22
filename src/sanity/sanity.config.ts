import { defineConfig } from 'sanity'
import type { DeskToolOptions } from 'sanity/desk'
import { deskTool } from 'sanity/desk'

import { Article, Browsers, Files, PenNib, Tag } from '@phosphor-icons/react'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const deskToolOptions: DeskToolOptions = {
  name: 'Traviio',
  title: 'Traviio',
  structure: (S) =>
    S.list()
      .title('Traviio')
      .items([
        S.listItem()
          .title('Blog')
          .icon(Article)
          .child(
            S.list()
              .title('Blog')
              .items([
                S.listItem()
                  .title('Articles')
                  .icon(PenNib)
                  .child(S.documentTypeList('article').title('Articles')),
                S.listItem()
                  .title('Blog Pages')
                  .icon(Files)
                  .child(S.documentTypeList('blog_page').title('Blog Pages')),
                S.listItem().title('Tags').icon(Tag).child(S.documentTypeList('tag').title('Tags')),
              ])
          ),
        S.listItem()
          .title('General Pages')
          .icon(Browsers)
          .child(S.documentTypeList('page').title('General Pages')),
      ]),
}

export default defineConfig({
  basePath: '/studio', // <-- important that `basePath` matches the route you're mounting your studio from, it applies to both `/pages` and `/app`
  name: 'traviio',
  title: 'Traviio',
  projectId,
  dataset,

  plugins: [deskTool(deskToolOptions), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
