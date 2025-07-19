import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Checkout = () => {
  return (
    <div>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Checkout</title>
        </Helmet>
      </div>
      <Elements stripe={stripePromise}>
        <div>
          <CheckoutForm></CheckoutForm>
        </div>
      </Elements>
    </div>
  );
};

export default Checkout;
