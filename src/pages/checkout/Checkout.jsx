import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <CheckoutForm></CheckoutForm>
      </div>
    </Elements>
  );
};

export default Checkout;
