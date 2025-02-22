import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    description: "",
    language: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };


  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.description === "" ||
        data.language === ""
      )
        toast.error("All fields are required");
      else {
        const response = await axios.put(
          `http://localhost:4000/api/v1/book//update-book`,
          data,
         {headers}
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          description: "",
          language: "",
        });
        toast.success(response.data.message);
        setTimeout(() => {
          navigate(`/view-book-detail/${id}`)
        }, 1000);
   
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/v1/book/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className=" bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book{" "}
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="title of book"
            name="title"
            required
            value={data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of book"
            name="author"
            required
            value={data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="language of book"
              name="language"
              required
              value={data.language}
              onChange={change}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Price{" "}
          </label>
          <input
            type="number"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="price of book"
            name="price"
            required
            value={data.price}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="description of book"
            name="description"
            required
            value={data.description}
            onChange={change}
          />
        </div>

        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600  cursor-pointer transition-all duration-300 "
          onClick={submit}
        >
          Update Book{" "}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateBook;
