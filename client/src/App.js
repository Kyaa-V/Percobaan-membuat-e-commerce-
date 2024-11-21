import PageProduct from "./components/pages/PageProduct";
import HomePage from "./components/pages/HomePage";
import Keranjang from "./components/pages/Keranjang";
import Category from "./components/pages/Category";
import CreateStore from "./components/pages/CreateStore";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setInsertUserId,
  setIsAdmin,
  setIsRole,
  setIsDataCart,
} from "./redux/InsertId";
import { io } from "socket.io-client";
import "./index.css";

const App = () => {
  const socket = io("http://localhost:5000");
  console.log(socket.id);

  const dispatch = useDispatch();
  useEffect(() => {
    // Function to fetch role data
    const fetchRoleData = () => {
      fetch("http://localhost:5000/api/check-role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(setIsRole(data.isRole));
          dispatch(setIsAdmin(data.isAdmin));
        })
        .catch((error) => console.error("Error fetching role data:", error));
    };

    // Function to fetch authenticated user
    const fetchAuthUser = () => {
      fetch("http://localhost:5000/api/auth-user", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(setInsertUserId(data.isAuthenticated));
        })
        .catch((error) =>
          console.error("Error fetching authenticated user:", error)
        );
    };

    //web socket
    socket.on("cart_updated", (cartData) => {
      dispatch(setIsDataCart(cartData));
    });
    socket.on("cart_data_on_connect", (cartData) => {
      dispatch(setIsDataCart(cartData));
    });
    // Call all functions initially
    fetchRoleData();
    fetchAuthUser();

    // Set interval to refresh token

    // Clean up interval on component unmount
    return () => {
      socket.off("cart_updated");
      socket.off("cart_data_on_connect");
    };
  }, [dispatch,socket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Cart" element={<Keranjang />} />
        <Route path="/PageProduct/:index" element={<PageProduct />} />
        <Route path="/Category/:index" element={<Category />} />
        <Route path="/CreateStore" element={<CreateStore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
