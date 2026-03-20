import { Link, NavLink } from 'react-router-dom'
const NavBar = () => {
  const style = ({ isActive }) => ({
    background: isActive ? "#4849DF" : ""
  })

  return (
    <nav className="text-text-main w-[90%] fixed bottom-5 lg:sticky flex lg:w-[40%] bg-dark-bg h-10 rounded-3xl lg:flex items-center justify-around ">
      <NavLink style={style} className={"p-1.5 px-2.5 rounded-lg"} to={"/dashboard"}>Dashboard</NavLink>
      <NavLink style={style} className=" hover:bg-active-icon p-1.5 rounded-lg" to={"/portfolio"}>
        Portofio
      </NavLink>

      <NavLink style={style} className="hover:bg-active-icon p-1.5 rounded-lg" to={"/transactions"}>
        Transactions
      </NavLink>

      <NavLink style={style} className="hover:bg-active-icon p-1.5 rounded-lg" to={"/news"}>
        News
      </NavLink>
    </nav>
  );
};

export default NavBar;
