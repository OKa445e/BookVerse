import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookapi-e12b.onrender.com/api/v1/order/orderhistory",
          { headers }
        );
        setOrderHistory(response.data.data);
        setIsLoading(false); 
      } catch (error) {
        console.error(error);
        setIsLoading(false); 
      }
    };
    fetch();
  }, []);

 
  const clearOrderHistory = async () => {
    try {
      const response = await axios.delete(
        "https://bookapi-e12b.onrender.com/api/v1/order/clearorderhistory",
        { headers }
      );
      setOrderHistory([]); // Clear the local state after successful deletion
      console.log(response);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  const groupByBookId = (orders) => {
    const grouped = orders.reduce((acc, order) => {
      const bookId = order.book._id;
      if (!acc[bookId]) {
        acc[bookId] = { ...order, quantity: 0 };
      }
      acc[bookId].quantity += 1;
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const groupedOrderHistory = groupByBookId(orderHistory);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No order History
            </h1>
            <img
              src="https://imgs.search.brave.com/2vLpa6uoXjtZzVWcpbPSpROK7EwkBwODbP_nNo_SewI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waG90/b3MzLndhbG1hcnQu/Y29tL2Ntcy9hc3Nl/dC85MDUwNTI3MWNj/ZTk0ZmM3MWE5MzZm/NzM2ZjQyZTM1ZC5w/bmc"
              alt="No book"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>

          {/* Button to clear order history */}
          <button
            onClick={clearOrderHistory}
            className="bg-red-500 text-white py-2 px-4 rounded mb-8 hover:bg-red-600 cursor-pointer"
          >
            Clear Order History
          </button>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center">
              <h1>Sr.</h1>
            </div>
            <div className="w-[22%] text-center">
              <h1>Books</h1>
            </div>
            <div className="w-[35%] text-center">
              <h1>Description</h1>
            </div>
            <div className="w-[9%] text-center">
              <h1>Price</h1>
            </div>
            <div className="w-[10%] text-center">
              <h1>Quantity</h1>
            </div>
            <div className="w-[16%] text-center">
              <h1>Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block text-center">
              <h1>Mode</h1>
            </div>
          </div>

          {groupedOrderHistory.map((items, i) => (
            <div
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
              key={items.book._id}
            >
              <div className="w-[3%] text-center">
                <h1>{i + 1}</h1>
              </div>
              <div className="w-[22%] text-center">
                <Link
                  to={`/view-book-detail/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[35%] text-center">
                <h1>{items.book.description.slice(0, 50)} ...</h1>
              </div>
              <div className="w-[9%] text-center">
                <h1>₹ {items.book.price}</h1>
              </div>
              <div className="w-[10%] text-center">
                <h1>{items.quantity}</h1>
              </div>
              <div className="w-[16%] text-center">
                <h1 className="font-semibold text-green-500">
                  {items.status === "order placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block text-center">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default UserOrderHistory;
