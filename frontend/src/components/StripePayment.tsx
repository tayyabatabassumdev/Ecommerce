import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);
const StripePayment = ({ amount }: { amount: number }) => (
  <Elements stripe={stripePromise}>
    <StripeCheckoutForm amount={amount} />
  </Elements>
);
export default StripePayment;
