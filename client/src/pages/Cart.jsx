import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Bookempty from "../utils/emptyIcons.png";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookapi-e12b.onrender.com/api/v1/cart/allcarts",
          { headers }
        );
        setCart(response.data.data);
        const initialQuantities = response.data.data.reduce((acc, item) => {
          acc[item._id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `https://bookapi-e12b.onrender.com/api/v1/cart/removecart/${bookid}`,
        {},
        { headers }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== bookid));
        setQuantities((prevQuantities) => {
          const newQuantities = { ...prevQuantities };
          delete newQuantities[bookid];
          return newQuantities;
        });
      }, 1000);
    } catch (error) {
      toast.error("Failed to delete the book");
      console.error(error);
    }
  };

  const increaseQuantity = (bookid) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [bookid]: prevQuantities[bookid] + 1,
    }));
  };

  const PlaceOrder = async () => {
    try {
      const order = cart.map((item) => ({
        ...item,
        quantity: quantities[item._id],
      }));
      const response = await axios.post(
        "https://bookapi-e12b.onrender.com/api/v1/order/placeorder",
        { order },
        { headers }
      );
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/profile/orderHistory");
      }, 1500);
    } catch (error) {
      toast.error("Failed to place the order");
      console.error(error);
    }
  };

  const ClearCart = async () => {
    try {
      const response = await axios.delete(
        "https://bookapi-e12b.onrender.com/api/v1/cart/clearcart",
        { headers }
      );
      toast.success(response.data.message);
      setCart([]);
      setQuantities({});
    } catch (error) {
      toast.error("Failed to clear the cart");
      console.error(error);
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * quantities[item._id];
      });
      setTotal(total);
    }
  }, [cart, quantities]);

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col px-6 lg:px-12 py-8">
      {!cart && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {cart && cart.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
          <img src={Bookempty} alt="empty cart" className="lg:h-[50vh]" />
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
          <div className="space-y-4 flex-grow">
            {cart.map((item, i) => (
              <div
                key={i}
                className="w-full rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              >
                <img
                  src={item.url}
                  alt="/"
                  className="h-[20vh] md:h-[10vh] object-cover"
                />
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                    {item.title}
                  </h1>
                  <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                    {item.description.slice(0, 100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {item.description.slice(0, 100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                    {item.description.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-100 text-3xl font-semibold flex mr-4">
                    ₹ {item.price}
                  </h2>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-4">
                      <button
                        className="bg-red-100 text-red-700 border border-red-700 rounded p-2 cursor-pointer"
                        onClick={() => deleteItem(item._id)}
                      >
                        <AiFillDelete />
                      </button>
                      <button
                        className="bg-green-100 text-green-700 border border-green-700 rounded p-2 cursor-pointer"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        <MdAdd />
                      </button>
                    </div>
                    <div className="mt-2">
                      <span className="text-zinc-100 text-xl font-semibold">
                        Quantity: {quantities[item._id]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded w-full md:w-auto">
              <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>book</h2> <h2>₹ {total}</h2>
              </div>
              <div className="w-full mt-3">
                <button
                  className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-300 mb-2"
                  onClick={PlaceOrder}
                >
                  Place your order
                </button>
                <button
                  className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-300"
                  onClick={ClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
