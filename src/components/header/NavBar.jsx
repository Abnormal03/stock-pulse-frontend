import { NavLink } from 'react-router-dom'

import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { SiCardmarket } from "react-icons/si";
import { GrTransaction } from "react-icons/gr";
import { BsNewspaper } from "react-icons/bs";

const NavBar = () => {
  const style = ({ isActive }) => ({
    background: isActive ? "#4849DF" : ""
  })

  return (
    <nav className="text-text-main w-full fixed bottom-5 lg:sticky flex lg:w-[40%] bg-dark-bg h-10 rounded-3xl lg:flex items-center justify-around ">
      <NavLink style={style} className={"p-1.5 px-2.5 rounded-lg"} to={"/dashboard"}> <MdSpaceDashboard className='lg:hidden' />  <p className='hidden lg:block'>Dashboard</p> </NavLink>
      <NavLink style={style} className=" hover:bg-active-icon p-1.5 rounded-lg" to={"/portfolio"}>
        <p className='hidden lg:block'>Portofio</p>
        <AiOutlineStock className='lg:hidden' />

      </NavLink>
      <NavLink style={style} className=" hover:bg-active-icon p-1.5 rounded-lg" to={"/market"}>
        <p className='hidden lg:block'>Market</p>
        <SiCardmarket className='lg:hidden' />
      </NavLink>

      <NavLink style={style} className="hover:bg-active-icon p-1.5 rounded-lg" to={"/transactions"}>
        <p className='hidden lg:block'>Transactions</p>
        <GrTransaction className='lg:hidden' />
      </NavLink>

      <NavLink style={style} className="hover:bg-active-icon p-1.5 rounded-lg" to={"/news"}>
        <p className='hidden lg:block'>News</p>
        <BsNewspaper className='lg:hidden' />
      </NavLink>
    </nav>
  );
};

export default NavBar;
