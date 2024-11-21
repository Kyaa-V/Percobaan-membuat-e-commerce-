import Navbar from "../Navbar";
import SignUp from "../Form/SignUp";
import Login from "../Form/Login";
import { useState } from "react";

const HomePage = () => {
  
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [refTableUser, setRefTableUser] = useState(false);

  return (
    <>
      <Navbar open={() => setOpen(true)} refTableUser={refTableUser} />
      <Login
        openModal={open}
        closeModal={() => setOpen(false)}
        openSignUp={() => setOpenSignUp(true)}
      />
      <SignUp
        refreshUser={() => setRefTableUser(true)}
        open={openSignUp}
        closeSignUp={() => setOpenSignUp(false)}
        openLogin={() => setOpen(true)}
      />
    </>
  );
};

export default HomePage;
