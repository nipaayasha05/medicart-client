import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loader from "../../../components/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import CategoryDetails from "../categoryCard/CategoryDetails";
import { FaEye } from "react-icons/fa";

import { FiShoppingCart } from "react-icons/fi";
import ProdutsDetails from "./ProdutsDetails";

const RecentProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  let [isOpen, setIsOpen] = useState(false);
  const { data: recentProducts = [], isLoading } = useQuery({
    queryKey: ["recentProducts"],

    queryFn: async () => {
      const { data } = await axios.get(
        `https://assignment-12-server-nine-hazel.vercel.app/newArrivals`,
      );
      // console.log(data);
      return data;
    },
  });

  const handleModal = (_id) => {
    document.getElementById("my_modal_2").showModal();
    setIsOpen(_id);
  };

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get-add-to-cart-shop?email=${user?.email}`,
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const handleAddToCart = async (medicine) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login First",
        text: "You need to be logged in to add items to cart.",
      });
      return;
    }
    const cartItem = {
      medicineId: medicine._id,
      userEmail: user.email,
      itemName: medicine.itemName,
      image: medicine.image,
      company: medicine.company,
      price: medicine.price,
      discount: medicine.discount,
      totalPrice: 1 * medicine.price * (1 - medicine.discount / 100),
      quantity: 1,
      status: "pending",
      addedBy: medicine.email,
      addedAt: new Date().toISOString(),
    };
    const res = await axiosSecure.post("/add-to-cart", cartItem);
    // console.log(res.data);

    toast.success("Product add to cart");

    queryClient.invalidateQueries(["cart", user.email]);
  };

  if (isLoading) return <Loader />;
  return (
    <div className="py-10">
      <p className="text-3xl font-montserrat text-sky-500 font-bold text-center py-5">
        Fresh on Shelf
      </p>
      <div className="container mx-auto    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 py-3">
        {recentProducts.map((product) => (
          <div product={product} key={product._id}>
            <div className="card transform transition duration-300 hover:scale-105 bg-gray-50 m-5 shadow-md">
              <figure>
                <img
                  src={product.image}
                  className="h-[200px] w-full p-2"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body sm:h-1/12 font-open-sans text-gray-700 ">
                <h2 className="card-title   h-[58px line-camp-1">
                  {product.itemName}
                </h2>
                <p className=" h-[140px line-camp-2">
                  <strong> </strong>
                  {product.description}
                </p>
                <div className="card-actions flex pt-3 justify-between">
                  <button
                    onClick={() => {
                      handleModal(product._id);
                    }}
                    className="btn btn-sm border-none text-white bg-sky-500  "
                  >
                    View <FaEye size={20} color="white" />
                  </button>

                  <button
                    disabled={cartItems.find(
                      (item) => item.medicineId === product._id,
                    )}
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                    className="btn btn-sm  border-none bg-sky-500 text-white      "
                  >
                    {cartItems.find(
                      (item) => item.medicineId === product._id,
                    ) ? (
                      ""
                    ) : (
                      <FiShoppingCart size={18} />
                    )}

                    {cartItems.find((item) => item.medicineId === product._id)
                      ? "Already Added"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <ProdutsDetails
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              recentProducts={recentProducts}
            ></ProdutsDetails>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default RecentProducts;
