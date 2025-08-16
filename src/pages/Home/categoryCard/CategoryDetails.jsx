import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FiShoppingCart } from "react-icons/fi";
import CatMedicineDetails from "./CatMedicineDetails";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa";

const CategoryDetails = () => {
  const { category } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  let [isOpen, setIsOpen] = useState(false);
  const [sortData, setSortData] = useState([]);
  const [sortOrder, setSortOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState("");

  const itemsPerPage = 10;

  const { data: categoryDetails = [], isLoading } = useQuery({
    queryKey: ["categoryDetails", currentPage, itemsPerPage],
    // enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/category/${category}?page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(data);
      return data;
    },
  });

  const { data: categoryDetail = {} } = useQuery({
    queryKey: ["categoryDetail", category],
    queryFn: async () => {
      const { data } = await axiosSecure(`/category-count/${category}`);
      console.log(data.count);
      return data;
    },
  });

  // useEffect(() => {
  //   setCurrentPage(0);
  // }, [search, sortOrder]);

  const numberOfPages = categoryDetail?.count
    ? Math.ceil(categoryDetail?.count / itemsPerPage)
    : 0;
  const pages = [...Array(numberOfPages).keys()];

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

  useEffect(() => {
    setSortData(categoryDetails);
  }, [categoryDetails]);

  const handleSort = () => {
    const sort = [...sortData].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setSortData(sort);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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

    queryClient.invalidateQueries(["cart", user.email]);
  };

  // console.log(category);

  return (
    <div>
      <div className="container mx-auto py-5">
        <p className="py- text-3xl font-bold p-2 font-montserrat text-sky-500">
          {" "}
          {category}
        </p>
        <div className="flex justify-between items-center font-open-sans">
          <button onClick={handleSort} className="btn text-white bg-sky-500">
            Sort by price({sortOrder === "asc" ? "High to Low" : "Low to High"})
          </button>
          <div className="   ">
            <p className="relative text-white badge badge-sm  rounded-full  badge-error  ">
              {cartItems.length ? cartItems.length : 0}
            </p>
            <p className="-mt-3 -mx-3">
              {" "}
              <FiShoppingCart size={26} />
            </p>
          </div>
        </div>

        <div className="overflow-x-auto py-5 font-open-sans">
          <table className="table">
            {/* head */}
            <thead>
              <tr className=" bg-gray-200  text-gray-800   lg:text-xl  h-16 sm:h-24  ">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Medicine Image</th>

                <th>Medicine Name</th>
                <th>Company</th>
                <th>Price</th>
                <th>Unit</th>
                <th> Details</th>
                <th> Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {sortData.map((all, index) => (
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

                  <th>{all?.itemName}</th>

                  <td>{all.company}</td>
                  <td>{all.price}$</td>
                  <td>{all.massUnit}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() => {
                        handleModal(all._id);
                      }}
                      className="btn bg-sky-500 text-white  "
                    >
                      {" "}
                      <FaEye size={24} />
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
                      className="btn bg-sky-500 text-white   py-6 lg:py-4 "
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

        <div className="py-5 text-center space-x-3  ">
          {/* <p>{currentPage}</p> */}
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

        <dialog id="my_modal_2" className="modal">
          <div className="modal-box   overflow-auto">
            {isOpen && (
              <CatMedicineDetails
                CatMedicineDetails
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                categoryDetails={categoryDetails}
              ></CatMedicineDetails>
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default CategoryDetails;
