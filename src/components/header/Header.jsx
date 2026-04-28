import React, { useState } from "react";
import NavBar from "./NavBar";
import stockpulse from "../../assets/Images/stock-pulse (2).png";
import {
  MdAccountCircle,
} from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoIosLogOut } from "react-icons/io";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router";

const Header = ({ balance }) => {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  const { logout } = useLogout();

  const [showDetail, setShowDetail] = useState(false);

  const { username, email } = state.user || {};
  if (!state.user) return null;

  const handleLogout = () => {
    const confimed = window.confirm('do you want to logout?');
    if (confimed) {
      logout();
      navigate('/');
    }
  }

  return (
    <div className="bg-dark-bg sticky z-10 w-full md:px-5 ">
      <div className="w-full rounded-3xl h-20 bg-secondary-bg flex items-center justify-between lg:pr-5">
        <img
          src={stockpulse}
          alt="logo"
          className="w-50 md:w-80 invert"
        />
        <NavBar />

        <div className="flex gap-0 md:gap-2">
          <div className="bg-dark-bg flex text-white p-2 rounded-lg gap-2 items-center text-xs md:text-sm">
            <p className="text-pulse-green">${balance?.toFixed(2)}</p>
          </div>
          {/* account */}
          <div className="rounded-lg p-1.5 bg-secondary-bg flex items-center text-text-main gap-2 relative ">
            <MdAccountCircle className="text-4xl text-text-main " onClick={() => setShowDetail(!showDetail)} />
            <div className="text-sm hidden lg:block ">
              <p>{email}</p>
              <p>{username}</p>
            </div>
            <FaAngleDown className="text-lg hidden lg:block" onClick={() => setShowDetail(!showDetail)} />

          </div>
        </div>
      </div>
      {showDetail && (<div className="absolute flex flex-col px-5 gap-2 py-2  bg-secondary-bg text-text-main rounded-sm right-10" onMouseLeave={() => setShowDetail(false)}>
        <p className="text-text-dim">Account</p>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Balance: ${balance?.toFixed(2)}</p>
        <p className="hover:cursor-pointer flex items-center gap-2" onClick={handleLogout}>Logout <IoIosLogOut /></p>
      </div>)}
    </div>
  );
};

export default Header;
