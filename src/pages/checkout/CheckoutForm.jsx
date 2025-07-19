import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../components/Loader";

const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: checkoutInfo = {}, isLoading } = useQuery({
    queryKey: ["checkout", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/checkout/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  console.log(checkoutInfo);
  const amount = parseFloat(checkoutInfo.grandTotal);
  const amountInCents = Math.round(amount * 100);
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }

    // create-payment-intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      id,
    });
    console.log("payment-intent", res.data);

    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment succeeded");
        console.log(result);

        checkoutInfo.email = user?.email;
        checkoutInfo.transaction = result?.paymentIntent?.id;
        checkoutInfo.paymentMethod =
          result?.paymentIntent?.payment_method_types;
        checkoutInfo.amount = result?.payment_method?.amount;

        const res = await axiosSecure.post("/payments-complete", checkoutInfo);
        console.log(res.data);
        if (res.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${checkoutInfo.transaction}</code>`,

            backdrop: true,
          });
          const checkoutId = res.data.insertedId;
          navigate(`/invoice/${checkoutId}`);
        }
      }
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mt-5">
      <form
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto "
        onSubmit={handleSubmit}
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          disabled={!stripe}
          type="submit"
          className="btn btn-primary text-white w-full"
        >
          Pay ${amount} For Product
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
