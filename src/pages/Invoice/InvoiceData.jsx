import React, { useEffect, useState } from "react";
// import Invoice from "./Invoice";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useParams } from "react-router";

import InvoicePdf from "./InvoicePdf";
import { Helmet } from "react-helmet";

const InvoiceData = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [invoice, setInvoice] = useState([]);

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Invoice</title>
      </Helmet>
      {/* <Invoice invoice={invoice}></Invoice> */}
      <InvoicePdf invoice={invoice} />
    </div>
  );
};

export default InvoiceData;
