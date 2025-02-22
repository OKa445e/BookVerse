import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaShoppingCart, FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:4000/api/v1/book/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:4000/api/v1/favourite/favouritebook",
      {},
      { headers }
    );
    toast.success(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put("http://localhost:4000/api/v1/cart/newcart", {}, { headers });
    toast.success(response.data.message);
  };

  const deleteButton = async () => {
    const response = await axios.delete("http://localhost:4000/api/v1/book/delete-book", { headers });
    toast.success(response.data.message);
    setTimeout(() => {
      navigate("/all-books");
    }, 1000);
  };

  return (
    <>
      {data ? (
        <div className="px-6 md:px-12 py-8 bg-zinc-900 flex flex-wrap md:flex-nowrap gap-8">
          <div className="relative bg-zinc-800 rounded p-4 w-full md:w-2/5 flex justify-center items-center">
            <img
              src={data.url}
              alt={data.title}
              className="h-[50vh] md:h-[60vh] lg:h-[75vh] rounded"
            />

           
            {isLoggedIn && role === "user" && (
              <div className="absolute top-4 right-4 flex flex-col gap-4">
                <button
                  className="bg-white rounded-full text-xl sm:text-lg md:text-2xl p-2 sm:p-1 md:p-3 text-red-500 hover:bg-red-200 transition cursor-pointer"
                  onClick={handleFavourite}
                >
                  <FaHeart />
                  <span className="ms-4 block lg:hidden">Favourites</span>
                </button>
                <button
                  className="bg-white rounded-full text-xl sm:text-lg md:text-2xl p-2 sm:p-1 md:p-3 text-blue-500 hover:bg-blue-200 transition cursor-pointer"
                  onClick={handleCart}
                >
                  <FaShoppingCart />
                  <span className="ms-4 block lg:hidden">Add to cart</span>
                </button>
              </div>
            )}

            {isLoggedIn && role === "admin" && (
              <div className="absolute top-4 right-4 flex flex-col gap-4">
                <Link
                  to={`/updateBook/${id}`}
                  className="bg-white rounded-full text-xl sm:text-lg md:text-2xl p-2 sm:p-1 md:p-3 text-black-500 hover:bg-red-200 transition"
                >
                  <FaEdit />
                  <span className="ms-4 block lg:hidden">Edit Book</span>
                </Link>
                <button
                  className="bg-white rounded-full text-xl sm:text-lg md:text-2xl p-2 sm:p-1 md:p-3 text-red-500 hover:bg-white-200 transition cursor-pointer"
                  onClick={deleteButton}
                >
                  <MdDelete />
                  <span className="ms-4 block lg:hidden">Delete Book</span>
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-3/5 p-4">
            <h1 className="text-3xl md:text-4xl text-zinc-300 font-semibold">{data.title}</h1>
            <p className="text-zinc-400 mt-2 text-lg">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-base md:text-lg">{data.description}</p>
            <p className="flex items-center text-zinc-400 mt-4 text-lg">
              <GrLanguage className="mr-2 text-xl" /> {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-2xl md:text-3xl font-semibold">
              Price: ₹ {data.price}
            </p>
          </div>
        </div>
      ) : (
       
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default ViewBookDetails;
