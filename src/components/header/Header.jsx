import React from "react";
import NavBar from "./NavBar";
import stockpulse from "../../assets/Images/stock-pulse (2).png";
import {
  MdOutlineWbSunny,
  MdOutlineNightlightRound,
  MdAccountCircle,
} from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { useAuthContext } from "../../hooks/useAuthContext";

const Header = () => {
  const {state} = useAuthContext();
  const {username, email} = state.user;
  return (
    <div className="bg-dark-bg sticky w-full px-5">
      <div className="w-full rounded-3xl h-20 bg-surface flex items-center justify-between pr-5">
        <img
          src={stockpulse}
          width={300}
          alt="logo"
          className="brightness-0 invert"
        />
        <NavBar />

        <div className="flex gap-2">
          <div className="bg-dark-bg p-2 rounded-lg flex gap-2 items-center ">
            <div className="rounded-lg p-1.5">
              <MdOutlineWbSunny className="text-2xl text-text-main" />
            </div>
            <div className="rounded-lg bg-active-icon p-1.5">
              <MdOutlineNightlightRound className="text-2xl text-white " />
            </div>
          </div>
          <div className="rounded-lg p-1.5 bg-secondary-bg flex items-center text-text-main gap-2">
            <MdAccountCircle className="text-4xl text-text-main" />
            <div className="text-sm">
              <p>{email}</p>
              <p>{username}</p>
            </div>
            <FaAngleDown className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
