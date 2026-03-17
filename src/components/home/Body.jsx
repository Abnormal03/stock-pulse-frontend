import React from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const Body = () => {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const onclick = () => {
    state.user ? navigate("/dashboard") : navigate("/signup");
  };
  return (
    <div className="bg-dark-bg  w-screen h-screen grid  grid-cols-1 lg:grid-cols-2 text-text-main items-center">
      {/* intro section */}

      <div className="flex items-start justify-center px-10 flex-col -mt-50">
        <h2 className="font-bold text-4xl bg-clip-text bg-linear-to-r from-white to-pulse-green text-transparent ">
          Welcome to stock pulse
        </h2>

        <h1 className="text-6xl font-extrabold leading-tight">
          Track your <span className="text-pulse-green">Wealth</span> <br />
          in Real-Time.
        </h1>
        <p className="text-2xl mb-2">
          Master the Market. <span className="text-pulse-green">One Pulse</span>{" "}
          at a time.
        </p>
        <p>
          All the money you use is a simulation for only educational purpose.
        </p>

        <button
          onClick={onclick}
          className="px-5 py-2 bg-pulse-green rounded-2xl text-black mt-10 ml-5 shadow-lg shadow-pulse-green  hover:-translate-y-1 duration-500"
        >
          Register for free
        </button>
      </div>
      <div className="relative hidden lg:block h-87.5">
        <div className="absolute rounded-4xl bg-floats p-5 text-center top-10 animate-bounce [animation-duration:4s]">
          <p className="text-text-main">AAPL</p>
          <p className="text-pulse-green">+22.5%</p>
        </div>
        <div className="absolute rounded-4xl bg-floats p-5 text-center top-30 left-50 animate-bounce [animation-duration:4s]">
          <p className="text-text-main">NVEDIA</p>
          <p className="text-pulse-green">+50.3%</p>
        </div>
        <div className="absolute rounded-4xl bg-floats p-5 text-center top-40 left-20 animate-bounce [animation-duration:5s]">
          <p className="text-text-main">TSLA</p>
          <p className="text-bear-red">-1.9%</p>
        </div>
        <div className="absolute rounded-4xl bg-floats p-5 text-center top-50 left-80 animate-bounce [animation-duration:6s]">
          <p className="text-text-main">6898.HK</p>
          <p className="text-bear-red">-5.2%</p>
        </div>
        <div className="absolute rounded-4xl bg-floats p-5 text-center top-10 left-90 animate-bounce [animation-duration:5s]">
          <p className="text-text-main">MCUJF</p>
          <p className="text-bear-red">-8.3%</p>
        </div>
      </div>
    </div>
  );
};

export default Body;
