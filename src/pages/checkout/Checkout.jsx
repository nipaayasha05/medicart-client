import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Checkout = () => {
  return (
    <div>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>MediCart|Checkout</title>
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
