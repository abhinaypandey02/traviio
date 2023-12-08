import { defineType } from 'sanity'

import { content_layouts } from '.'

export default defineType({
  name: 'rich_text',
  title: 'Rich Text',
  type: 'array',
  of: [{ type: 'block' }, ...content_layouts.map((layout) => ({ type: layout }))],
})
