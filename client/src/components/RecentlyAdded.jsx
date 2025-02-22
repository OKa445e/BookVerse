import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from './BookCard';
import Loader from "./Loader"

const RecentlyAdded = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/book/get-recent-book"
      );
      setData(response.data.data); 
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">
        Recently Added Books
      </h4>
      {
       !data && (
        <div className="flex items-center justify-center my-8">
          <Loader/>{" "}
          </div>
       )
      }
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {
          data &&
          data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />{" "}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default RecentlyAdded;