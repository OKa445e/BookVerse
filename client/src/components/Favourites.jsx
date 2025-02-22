import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

 const Favourites = () => {
  const [favourite, setFavourite] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/favourite/allfavouritebooks",
          { headers }
        );
        setFavourite(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [favourite]);

  const handleRemoveBook = (bookId) => {
    setFavourite(favourite.filter((book) => book._id !== bookId));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between"> {/* Make sure the container is flex and takes up full height */}
      {favourite.length === 0 ? (
        <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center flex-col w-full">
          No Favourite Books 
          <img src = "https://freedesignfile.com/image/preview/30398/bookshelf-vector.jpg" alt = "Empty-book" className="h-[20vh] my-8"/>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 p-4 w-full">
          {favourite.map((items, i) => (
            <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <BookCard data={items} favourite={true} onRemove={handleRemoveBook} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default Favourites;