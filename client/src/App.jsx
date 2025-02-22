import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";
import About from "./pages/About";
import ViewBookDetails from "./components/ViewBookDetails";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Favourites";
import UserOrderHistory from "./components/UserOrderHistory";
import Setting from "./components/Setting";
import Cart from "./pages/Cart"
import AllOrders from "./pages/AllOrders";
import AddBooks from "./pages/AddBooks";
import UpdateBook from "./pages/UpdateBook";
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/profile" element={<Profile />}>         
          {role === "user" ?  <Route index element={<Favourites />} /> :  <Route index element={<AllOrders />} /> }
          {role === "admin" && (<Route path = "/profile/add-book" element = {<AddBooks/>}/>)}
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Setting />} />
        </Route>
        <Route path="view-book-detail/:id" element={<ViewBookDetails />} />
        <Route path="/cart" element={<Cart/>} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
