import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { MobileNav } from "../components/MobileNav";

const Profile = () => {
  const [profile, setprofile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/user-information",
          { headers }
        );
        setprofile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white h-screen"> {/* Add h-screen to take full height */}
  {!profile && (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  )}
  {profile && (
    <>
      <div className="w-full md:w-1/6 h-auto lg:h-screen">
        <SideBar data={profile} />
        <MobileNav/>
      </div>
      <div className="w-full md:w-5/6 flex-grow h-full">
        <Outlet />
      </div>
    </>
  )}
</div>

  );
};

export default Profile;
