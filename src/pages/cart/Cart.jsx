import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { MdDeleteForever, MdOutlineShoppingCartCheckout } from "react-icons/md";

const Cart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [quantities, setQuantities] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`get-add-to-cart?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const deleteCartMutation = useMutation({
    mutationFn: async (_id) => {
      const res = await axiosSecure.delete(`/cart-delete/${_id}`);
      console.log(res.data);
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
      console.log(res.data);
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
      console.log(res.data);
      queryClient.invalidateQueries(["cart", user?.email]);
    }
  };

  const handleCheckoutSelect = async () => {
    const selectedItems = cartItems.filter((item) =>
      selectedIds.includes(item._id)
    );

    const orderItems = selectedItems.map((item) => {
      const quantity = quantities[item._id] || item.quantity;
      return {
        medicineId: item._id,
        itemName: item.itemName,
        image: item.image,
        quantity,
        price: item.price,
        discount: item.discount,
        totalPrice: quantity * item.price * (1 - item.discount / 100),
        userEmail: user.email,
        addedBy: item.email,
      };
    });
    const grandTotal = orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const orderData = {
      items: orderItems,
      grandTotal: grandTotal.toFixed(2),
      status: "unpaid",
      orderDate: new Date().toISOString(),
    };
    const res = await axiosSecure.post("/checkout", orderData);
    console.log(res.data);

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

  return (
    <div className="container mx-auto">
      {cartItems.length > 0 ? (
        <div>
          <div className="overflow-x-auto py-5">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-gray-200 text-gray-800 sm:text-xl sm:h-24 h-16">
                  <th></th>
                  <th>#</th>

                  <th>Medicine Image</th>
                  <th>Item Name</th>
                  <th>Company</th>
                  <th>Price per Unit</th>
                  <th>Quantity</th>
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
                    <td>{cart.company} </td>
                    <td>{cart.price}$</td>
                    <td>
                      {" "}
                      <input
                        type="number"
                        defaultValue={cart.quantity}
                        min={1}
                        className="w-20 input input-bordered"
                        onChange={(e) => {
                          handleQuantityChange(cart._id, e.target.value);
                        }}
                      />
                    </td>
                    <td>{cart.discount}%</td>
                    <td>
                      {" "}
                      {(
                        quantities[cart._id] *
                        cart.price *
                        (1 - cart.discount / 100)
                      ).toFixed(2)}
                    </td>

                    <td>
                      {" "}
                      <button
                        onClick={() => {
                          handleDelete(cart._id);
                        }}
                        className="btn  text-white btn-error"
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
    </div>
  );
};

export default Cart;
