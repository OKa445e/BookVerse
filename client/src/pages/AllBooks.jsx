import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import BookCard from '../components/BookCard'
import axios from 'axios'

const AllBooks = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookapi-e12b.onrender.com/api/v1/book/get-all-books"
      );
      setData(response.data.data); 
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 px-12 py-8"> {/* Changed h-auto to min-h-screen */}
        <h4 className="text-3xl text-yellow-100">
          All Books
        </h4>
        {
          !data && (
            <div className="w-full h-screen flex items-center justify-center">
              <Loader/> 
            </div>
          )
        }
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {
            data &&
            data.map((item, i) => (
              <div key={i}>
                <BookCard data={item} /> 
              </div>
            ))
          }
        </div>
    </div>
  );
}

export default AllBooks;
