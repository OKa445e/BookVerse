import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import  Loader  from "../components/Loader"; 

const About = () => {
  const [query, setQuery] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); 
  const [backgroundDimmed, setBackgroundDimmed] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query.name === "" || query.email === "" || query.message === "") {
      toast.error("All fields are required!");
    } else {
      setLoading(true); 
      setBackgroundDimmed(true); 

      try {
        
        const response = await axios.post(
          "https://bookapi-e12b.onrender.com/api/v1/contact/contactus",
          query
        );
        toast.success(response.data.message); 
        console.log(response);

        setQuery({ name: "", email: "", message: "" });
      } catch (error) {
        toast.error("Error while sending the query. Please try again.");
      } finally {
        setLoading(false); 
        setBackgroundDimmed(false); 
      }
    }
  };

  return (
    <div
      className={`min-h-screen px-12 py-8 flex flex-col items-center justify-center ${
        backgroundDimmed ? "bg-zinc-900 bg-opacity-50" : "bg-zinc-900"
      }`}
    >
      <div
        className={`bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`} 
      >
        <h1 className="text-zinc-200 text-2xl text-center mb-4">About Us</h1>
        <p className="text-zinc-400 mb-4">
          Welcome to our BookVerse! Here, we believe in providing the best books
          for all kinds of readers. Feel free to explore and make your purchase
          today!
        </p>
        <p className="text-zinc-400 mb-4">
          If you have any queries, feel free to reach out to us using the form
          below:
        </p>

        
        {loading && (
          <div className="flex justify-center mb-4">
            <Loader /> 
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-zinc-400">Name</label>
            <input
              type="text"
              name="name"
              value={query.name}
              onChange={handleChange}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter your name"
              required
              disabled={loading} 
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Email</label>
            <input
              type="email"
              name="email"
              value={query.email}
              onChange={handleChange}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter your email"
              required
              disabled={loading} // Disable input when loading
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Message</label>
            <textarea
              name="message"
              value={query.message}
              onChange={handleChange}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter your query"
              rows="4"
              required
              disabled={loading} 
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 cursor-pointer ${
                loading ? "bg-blue-400 cursor-not-allowed" : ""
              }`}
              disabled={loading} 
            >
              {loading ? "Sending..." : "Send Query"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default About;
