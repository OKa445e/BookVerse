import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { FaUser, FaCheck } from "react-icons/fa";
import { TfiNewWindow } from "react-icons/tfi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/order/getallorders",
        { headers }
      );
      const groupedOrders = groupOrdersByBook(response.data.data);
      setAllOrders(groupedOrders);
    };
    fetch();
  }, []);

  const groupOrdersByBook = (orders) => {
    const grouped = orders.reduce((acc, order) => {
      const bookId = order.book._id;
      if (!acc[bookId]) {
        acc[bookId] = { ...order, quantity: 1 };
      } else {
        acc[bookId].quantity += 1;
      }
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    const response = await axios.put(
      `http://localhost:4000/api/v1/order/statusupdate/${id}`,
      values,
      { headers }
    );
    toast.success(response.data.message);

  
    const updatedOrders = [...allOrders];
    updatedOrders[i].status = values.status;
    setAllOrders(updatedOrders);
  };



  return (
    <>
      {!allOrders.length ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders History
          </h1>

  

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <div className="text-center">Sr.</div>
            </div>
            <div className="w-[30%] md:w-[20%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[10%] md:w-[10%]">
              <h1 className="">Quantity</h1>
            </div>
            <div className="w-0 md:w-[35%] hidden md:block">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1 className="">
                <FaUser />
              </h1>
            </div>
          </div>
          {allOrders.map((items, i) => (
            <div
              key={items._id}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[30%] md:w-[20%]">
                <Link
                  to={`/view-book-detail/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[10%] md:w-[10%]">
                <h1 className="text-center">{items.quantity}</h1>
              </div>
              <div className="w-0 md:w-[35%] hidden md:block">
                <h1 className="">{items.book.description.slice(0, 50)}...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">₹ {items.book.price}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Cancelled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>

                  <div className={`${options === i ? "flex" : "hidden"}`}>
                    <select
                      name="status"
                      id=""
                      className="bg-gray-800 hover:cursor-pointer"
                      onChange={change}
                      value={values.status}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Cancelled",
                      ].map((items, i) => (
                        <option value={items} key={i}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500 cursor:pointer"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  <TfiNewWindow />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default AllOrders;
