// ./utils/get-stripejs.ts
import { Stripe } from 'stripe'

let stripePromise: Stripe
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      // https://github.com/stripe/stripe-node#configuration
      apiVersion: '2023-08-16',
    })
  }
  return stripePromise
}
export default getStripe
