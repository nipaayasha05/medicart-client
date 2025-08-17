import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import MedicineDetails from "./MedicineDetails";
import { FiShoppingCart } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
// import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa";
import Loader from "../../components/Loader";
import { ReTitle } from "re-title";
import { Helmet } from "react-helmet";

const Shop = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  let [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Low to High");

  // const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState("");

  const itemsPerPage = 10;

  const { data: allMedicine = [], isLoading } = useQuery({
    queryKey: ["addMedicine", search, sortOrder, currentPage, itemsPerPage],

    queryFn: async () => {
      const { data } = await axiosSecure(
        `/getAllMedicine?search=${search}&sort=${sortOrder}&page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(data);
      return data;
    },
  });

  const { data: allMedicineCount = {} } = useQuery({
    queryKey: ["allMedicineCount"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/getAllMedicineCount`);
      // console.log(data.count);
      return data;
    },
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [search, sortOrder]);

  const numberOfPages = allMedicineCount?.count
    ? Math.ceil(allMedicineCount?.count / itemsPerPage)
    : 0;
  // console.log(numberOfPages);

  // const pages = [];
  // for (let i = 0; i < numberOfPages; i++) {
  //   pages.push(i);
  // }

  const pages = [...Array(numberOfPages).keys()];
  // console.log(pages);

  // const handleItemsPerPage = (e) => {
  //   // console.log(e.target.value);
  //   const val = parseInt(e.target.value);
  //   setItemsPerPage(val);
  //   setCurrentPage(0);
  // };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setLastClicked("previous");
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setLastClicked("next");
    }
  };

  const handleModal = (_id) => {
    document.getElementById("my_modal_2").showModal();
    setIsOpen(_id);
  };

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get-add-to-cart-shop?email=${user?.email}`
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
      category: medicine.category,
      company: medicine.company,
      price: medicine.price,
      discount: medicine.discount,
      description: medicine.description,
      totalPrice: 1 * medicine.price * (1 - medicine.discount / 100),
      quantity: 1,
      status: "pending",
      addedBy: medicine.email,
      addedAt: new Date().toISOString(),
    };
    const res = await axiosSecure.post("/add-to-cart", cartItem);
    // console.log(res.data);

    queryClient.invalidateQueries(["cart", user.email]);
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto pb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Shop</title>
      </Helmet>
      <p className="py-2 text-3xl font-bold text-center text-sky-600 ">shop</p>

      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row   items-center">
          <button
            onClick={() =>
              setSortOrder(
                sortOrder === "Low to High" ? "High to Low" : "Low to High"
              )
            }
            className="btn text-white bg-sky-500"
          >
            Sort by price(
            {sortOrder})
          </button>

          <label className="input m-1  ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="text"
              onBlur={(e) => setSearch(e.target.value)}
              className="grow  "
              placeholder="Search"
            />
          </label>
        </div>
        <div className=" p-2 ">
          <p className="relative text-white badge badge-sm  rounded-full  badge-error  ">
            {cartItems.length ? cartItems.length : 0}
          </p>
          <p className="-mt-3 -mx-3 ">
            {" "}
            <FiShoppingCart size={26} />
          </p>
        </div>
      </div>

      <div className="overflow-x-auto py-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className=" bg-gray-200  text-gray-800 lg:text-xl md:text-sm sm:h-24 h-16 ">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Medicine Image</th>

              <th>Medicine Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Unit</th>
              <th> Details</th>
              <th> Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allMedicine.map((all, index) => (
              <tr
                all={all}
                key={all._id}
                className="lg:text-xl md:text-sm hover:bg-gray-100"
              >
                <th>{index + 1}</th>

                <td>
                  <img
                    className="w-36 sm:h-24 h-14  rounded-xl"
                    src={all?.image}
                    alt=""
                  />
                </td>

                <td>{all?.itemName}</td>
                <td>{all?.category}</td>

                <td>{all.company}</td>
                <td>{all.price}$</td>
                <td>{all.discount}%</td>
                <td>{all.massUnit}</td>
                <td>
                  {" "}
                  <button
                    onClick={() => {
                      handleModal(all._id);
                    }}
                    className="btn bg-sky-500  "
                  >
                    {" "}
                    <FaEye size={24} color="white" />
                  </button>
                </td>
                <td>
                  <button
                    disabled={cartItems.find(
                      (item) => item.medicineId === all._id
                    )}
                    onClick={() => {
                      handleAddToCart(all);
                    }}
                    className="btn  bg-sky-500 text-white  py-6 sm:py-4 "
                  >
                    {/* <FiShoppingCart size={18} /> */}
                    {cartItems.find((item) => item.medicineId === all._id)
                      ? "Already Added"
                      : "Add to Cart"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* p */}
      <div className="py-5 text-center space-x-3  ">
        <p>{currentPage}</p>
        {currentPage > 0 && (
          <button
            onClick={handlePreviousPage}
            className={`btn ${
              lastClicked === "previous"
                ? "bg-sky-300 text-blue-500 border-2 border-sky-200"
                : "bg-sky-500 text-white"
            }`}
          >
            <FaArrowLeft /> Previous
          </button>
        )}
        {/* {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            key={page}
            className={`btn ${
              currentPage === page
                ? "bg-sky-200 text-blue-600 border-2 border-blue-300"
                : "bg-sky-500 text-white"
            }`}
          >
            {page}
          </button>
        ))} */}
        {/* <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          name=""
          id=""
        >
          <option
            value="
          "
          >
            10
          </option>
          <option
            value="5
          "
          >
            5
          </option>
          <option
            value="10
          "
          >
            10
          </option>
          <option
            value="15
          "
          >
            15
          </option>
        </select> */}
        {currentPage < pages.length - 1 && (
          <button
            onClick={handleNextPage}
            className={`btn ${
              lastClicked === "next"
                ? "bg-sky-300 text-blue-500 border-2 border-sky-200"
                : "bg-sky-500 text-white"
            }`}
          >
            Next <FaArrowRight />
          </button>
        )}
      </div>
      {/* p */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <MedicineDetails
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              allMedicine={allMedicine}
            ></MedicineDetails>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Shop;
