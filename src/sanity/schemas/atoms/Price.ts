import { defineField, defineType } from 'sanity'

import { CurrencyDollar } from '@phosphor-icons/react'

export default defineType({
  name: 'price',
  title: 'Price',
  description: 'Price of the tour',
  icon: CurrencyDollar as any,
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'currency_symbol',
      title: 'Currency Symbol',
      description: 'Currency symbol of the price',
      type: 'locale_string',
    }),
    defineField({
      name: 'initial_price',
      title: 'Initial Price',
      description: 'Initial price of the tour',
      type: 'locale_number',
    }),
    defineField({
      name: 'discounted_price',
      title: 'Discounted Price',
      description: 'Discounted price of the tour',
      type: 'locale_number',
    }),
  ],
  preview: {
    select: {
      currency_symbol: 'currency_symbol.en',
      initial_price: 'initial_price',
      discounted_price: 'discounted_price',
    },
    prepare({ currency_symbol, initial_price, discounted_price }) {
      return {
        title: currency_symbol,
        subtitle: `${initial_price} - ${discounted_price}`,
      }
    },
  },
})
