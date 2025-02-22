import React from "react";
import Book from "../utils/book.png"
import { Link } from "react-router-dom";
const Content = () => {
  return (
    <div className=" h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Unlock Worlds of Imagination & Wisdom
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Dive into captivating stories, expand your knowledge, and get inspired
          with our handpicked collection of books!
        </p>
        <div className="mt-8">
          <Link to = "/all-books" className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 rounded-full px-6 py-2">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
      <img src={Book} alt="book"/>
      </div>
    </div>
  );
};

export default Content;
