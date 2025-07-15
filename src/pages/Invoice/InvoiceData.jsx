import React, { useEffect, useState } from "react";
// import Invoice from "./Invoice";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import InvoicePdf from "./InvoicePdf";

const InvoiceData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [invoice, setInvoice] = useState([]);

  //   const { data: invoice, isLoading } = useQuery({
  //     queryKey: ["invoice", _id],
  //     queryFn: async () => {
  //       await axios.get(`http://localhost:3000/invoice/${_id}`).then((res) => {
  //         console.log(res.data);
  //         return res.data;
  //       });
  //       //   console.log("roerieor", res.data);

  //       //   return res.data;
  //     },
  //   });
  //   if (isLoading) return <div>Loading....</div>;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axiosSecure.get(`/invoice/${id}`);
        setInvoice(res.data);
      } catch (error) {
        console.error("Invoice fetch failed", error);
      }
    };
    fetchInvoice();
  }, [id, axiosSecure]);
  return (
    <div>
      {/* <Invoice invoice={invoice}></Invoice> */}
      <InvoicePdf invoice={invoice} />
    </div>
  );
};

export default InvoiceData;
