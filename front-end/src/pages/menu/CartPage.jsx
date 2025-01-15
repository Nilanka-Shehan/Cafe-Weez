import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/Authprovider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false); // Track checkout status
  const [cartModified, setCartModified] = useState(false); // Track cart modifications
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (cartModified) {
      setCheckoutCompleted(false); // Reset checkout status if cart is modified
    }
  }, [cartModified]);

  // Handle cart modifications
  const handleCartModification = () => {
    setCartModified(true); // Set cart as modified
  };

  // Handle Increase Quantity
  const handleIncrease = (item) => {
    const currentQuantity = item.quantity;
    fetch(`http://localhost:3001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ quantity: currentQuantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: currentQuantity + 1,
            };
          }
          return cartItem;
        });
        setCartItems(updatedCart);
        handleCartModification(); // Mark cart as modified
      });
    refetch();
  };

  // Handle Decrease Quantity
  const handleDecrease = (item) => {
    const currentQuantity = item.quantity;
    fetch(`http://localhost:3001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ quantity: currentQuantity - 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: currentQuantity - 1,
            };
          }
          return cartItem;
        });
        setCartItems(updatedCart);
        handleCartModification(); // Mark cart as modified
      });
    refetch();
  };

  // Calculate Price
  const calculatePrice = (item) => item.price * item.quantity;

  // Calculate Total Price
  const calculateSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);
  const totalPrice = calculateSubTotal;

  // Handle Delete
  const handleDelete = (item) => {
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
        fetch(`http://localhost:3001/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              handleCartModification(); // Mark cart as modified
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleError = (msg) =>
    Swal.fire({
      title: msg,
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`,
      },
    });

  const handleSuccess = (msg) =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });

  // Handle Checkout Submission
  const handleSubmit = async () => {
    const checkouts = {
      username: user.username,
      email: user.email,
      totalItems: cart.length,
      totalAmount: totalPrice.toFixed(2),
    };
  
    try {
      // Check if a checkout already exists for this user
      const existingCheckout = await axiosSecure.get(`/checkouts/${user.email}`);
      console.log("Existing Checkout Response:", existingCheckout.data);
  
      if (existingCheckout?.data?.success) {
        // Update the existing checkout
        const response = await axiosSecure.put(
          `/checkouts/${existingCheckout.data.checkout.checkoutId}`,
          checkouts
        );
        if (response?.data?.success) {
          handleSuccess("Checkout updated successfully");
        }
      }
    } catch (error) {
      // Handle case where no existing checkout is found
      if (error.response?.status === 404) {
        //console.log("No existing checkout found. Creating a new one.");
        // Create a new checkout
        try {
          const response = await axiosSecure.post("/checkouts", checkouts);
          if (response?.data?.success) {
            handleSuccess("Checkout created successfully");
          }
        } catch (creationError) {
          handleError("Failed to create a new checkout");
          console.error("Checkout Creation Error:", creationError);
        }
      } else {
        // Handle other errors
        handleError("Failed to process the checkout");
        console.error("Checkout Error:", error);
      }
    }
    refetch();
  };
  
  

  return (
    <div className="section-container m-10">
      {user ? (
        <>
          <div className="py-16 flex flex-col items-center justify-center">
            {/* Banner */}
            <h2 className="md:text-5xl text-4xl text-black font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-carmine">Cart</span>
            </h2>
          </div>

          {/* Table */}
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-rose-red text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} className="text-secondary">
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{item.name}</td>
                      <td className="gap-5">
                        <button
                          className="btn btn-xs bg-slate-100 text-secondary border-none hover:bg-slate-300"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity ?? 1}
                          readOnly
                          className="bg-white text-secondary w-10 mx-2 text-center overflow-hidden appearance-none"
                        />
                        <button
                          className="btn btn-xs bg-slate-100 text-secondary border-none hover:bg-slate-300"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>{parseFloat(calculatePrice(item)).toFixed(2)} LKR</td>
                      <th>
                        <button
                          className="btn btn-ghost text-red btn-xs"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shopping Details */}
          <div>
            <div className="my-12 flex flex-col md:flex-row justify-between items-start text-secondary">
              <div className="md:w-1/2 space-y-3">
                <h3 className="font-medium">Customer Details</h3>
                <p>Name : {user.username}</p>
                <p>Email : {user.email}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="font-medium">Shopping Details</h3>
                <p>Total Items: {cart.length}</p>
                <p>Total Price : {totalPrice.toFixed(2)} LKR</p>
              </div>
            </div>
            {(!checkoutCompleted || cartModified) && (
                  <button
                    onClick={handleSubmit}
                    className="btn w-full bg-rose-red text-white rounded-2xl"
                  >
                    Proceed Checkout
                  </button>
                )}
          </div>
        </>
      ) : (
        <div className="py-36 flex flex-col items-center justify-center">
          <h2 className="md:text-5xl text-4xl text-black font-bold md:leading-snug leading-snug">
            Please <span className="text-green">Login</span> to view your cart.
          </h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
