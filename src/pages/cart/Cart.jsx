import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { MdDeleteForever, MdOutlineShoppingCartCheckout } from "react-icons/md";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Cart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Low to High");

  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState("");

  const itemsPerPage = 10;

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: [
      "cart",
      user?.email,
      search,
      sortOrder,
      currentPage,
      itemsPerPage,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get-add-to-cart?email=${user?.email}&search=${search}&sort=${sortOrder}&page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const { data: getAddToCart = {} } = useQuery({
    queryKey: ["getAddToCart"],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/get-add-to-cart-count?email=${user?.email}`
      );
      console.log(data.count);
      return data;
    },
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [search, sortOrder]);

  const numberOfPages = getAddToCart?.count
    ? Math.ceil(getAddToCart?.count / itemsPerPage)
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

  const deleteCartMutation = useMutation({
    mutationFn: async (_id) => {
      const res = await axiosSecure.delete(`/cart-delete/${_id}`);
      // console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire("Deleted!", "Item removed from cart", "success");
        queryClient.invalidateQueries(["cart", user.email]);
      }
    },
    onError: (error) => {
      console.error("Delete failed", error);
      Swal.fire("Error!", "Failed to delete item", "error");
    },
  });

  const allDeleteCartMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.delete(
        `/all-cart-delete?email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire("Deleted!", "all item removed from cart", "success");
        queryClient.invalidateQueries(["cart", user.email]);
      }
    },
    onError: (error) => {
      console.error("Delete failed", error);
      Swal.fire("Error!", "Failed to delete item", "error");
    },
  });

  const handleCheckBox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (cartItems.length && Object.keys(quantities).length === 0) {
      const initialQunatities = {};
      cartItems.forEach((item) => {
        initialQunatities[item._id] = item.quantity;
      });
      setQuantities(initialQunatities);
    }
  }, [cartItems, quantities]);

  const handleQuantityChange = async (id, value) => {
    const carts = Number(value);
    if (!isNaN(carts)) {
      const cartItem = cartItems.find((item) => item._id === id);
      const updatedTotalPrice =
        carts * cartItem.price * (1 - cartItem.discount / 100);
      setQuantities((prev) => ({
        ...prev,
        [id]: carts,
      }));

      const res = await axiosSecure.patch(`/update-cart/${id}`, {
        quantity: carts,
        totalPrice: updatedTotalPrice,
        discount: cartItem.discount,
        price: cartItem.price,
      });
      // console.log(res.data);
      queryClient.invalidateQueries(["cart", user?.email]);
    }
  };

  const handleCheckoutSelect = async () => {
    const selectedItems = cartItems.filter((item) =>
      selectedIds.includes(item._id)
    );
    if (selectedIds.length === 0) {
      Swal.fire("Warning!!", "please select at least one item", "warning");
      return;
    }

    const orderItems = selectedItems.map((item) => {
      const quantity = quantities[item._id] || item.quantity;
      return {
        medicineId: item._id,
        itemName: item.itemName,
        image: item.image,
        category: item.category,
        quantity,
        price: item.price,
        discount: item.discount,
        totalPrice: quantity * item.price * (1 - item.discount / 100),
        userEmail: user.email,
        addedBy: item.addedBy,
      };
    });
    const grandTotal = orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const orderData = {
      items: orderItems,
      grandTotal: parseFloat(grandTotal.toFixed(2)),
      status: "pending",
      orderDate: new Date().toISOString(),
    };
    const res = await axiosSecure.post("/checkout", orderData);
    // console.log(res.data);

    queryClient.invalidateQueries(["cart", user.email]);
    // setSelectedIds([]);

    const orderId = res.data.insertedId;
    navigate(`/checkout/${orderId}`);
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCartMutation.mutate(_id);
      }
    });
  };
  const handleAllDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        allDeleteCartMutation.mutate();
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Cart</title>
      </Helmet>
      <p
        className="text-3xl font-bold text-center py-3 text-sky-500
      "
      >
        Cart
      </p>
      {cartItems.length > 0 ? (
        <div>
          <div className="flex flex-col sm:flex-row   items-center justify-start">
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
          <div className="overflow-x-auto py-5 ">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-gray-200 text-gray-800 sm:text-xl sm:h-24 h-16">
                  <th></th>
                  <th>#</th>

                  <th>Medicine Image</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Company</th>
                  <th>Price per Unit</th>
                  <th className="text-center  ">Quantity</th>
                  <th>Discount</th>
                  <th>Total Price</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cartItems.map((cart, index) => (
                  <tr
                    className="lg:text-xl md:text-sm hover:bg-gray-100"
                    medicine={cart}
                    index={index}
                    key={cart._id}
                  >
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedIds.includes(cart._id)}
                        onChange={() => {
                          handleCheckBox(cart._id);
                        }}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="w-36 sm:h-24 h-14  rounded-xl"
                        src={cart?.image}
                        alt=""
                      />
                    </td>
                    <td>{cart?.itemName}</td>
                    <td>{cart?.category}</td>
                    <td>{cart.company} </td>
                    <td>{cart.price}$</td>
                    <td className="">
                      <div className="flex justify-center items-center   gap-2">
                        <button
                          className="btn btn-sm bg-sky-500 text-white font-extrabold"
                          onClick={() => {
                            if (quantities[cart._id] > 1)
                              handleQuantityChange(
                                cart._id,
                                quantities[cart._id] - 1
                              );
                          }}
                        >
                          -
                        </button>{" "}
                        <p className="border border-gray-300 py-1 px-2 rounded-sm">
                          {cart.quantity}
                        </p>
                        <button
                          className="btn btn-sm bg-sky-500 text-white font-extrabold"
                          onClick={() =>
                            handleQuantityChange(
                              cart._id,
                              quantities[cart._id] + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{cart.discount}%</td>
                    <td>
                      {" "}
                      {(
                        quantities[cart._id] *
                        cart.price *
                        (1 - cart.discount / 100)
                      ).toFixed(2)}
                      $
                    </td>

                    <td>
                      {" "}
                      <button
                        onClick={() => {
                          handleDelete(cart._id);
                        }}
                        className="btn text-red-400       border-2 border-red-400"
                      >
                        <MdDeleteForever size={24} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col  items-end   gap-4    mr-4 mt-6 px-4   ">
            <div>
              <button
                className="btn btn-success text-white"
                onClick={handleCheckoutSelect}
              >
                <MdOutlineShoppingCartCheckout size={24} />
                Checkout
              </button>
            </div>

            <div>
              <button
                className="btn  text-white btn-error "
                onClick={handleAllDelete}
              >
                <MdDeleteForever size={24} />
                Delete All
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>No Medicine Found</p>
        </div>
      )}{" "}
      {/* pagination */}
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
    </div>
  );
};

export default Cart;
