import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BookCard = ({ data, favourite, onRemove }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "https://bookapi-e12b.onrender.com/api/v1/favourite/deletefavouritebook",
        { bookId: data._id }, // Ensure you are sending the necessary data
        { headers }
      );
      
      toast.success(response.data.message, {
        autoClose: 1500,
      });

   
      setTimeout(() => {
        onRemove(data._id); 
      }, 1500); 

    } catch (error) {
      console.error(error.response?.data?.message || error);
      toast.error("Failed to remove the book.");
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-detail/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4">
          <div className="bg-zinc-800">
            <img src={data.url} alt="/" className="h-[20vh]" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 cursor-pointer"
          onClick={handleRemoveBook}
        >
          Remove from Book
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default BookCard;
