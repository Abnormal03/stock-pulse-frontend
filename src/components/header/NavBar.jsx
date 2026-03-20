import {Link, NavLink} from 'react-router-dom'
const NavBar = () => {
  const style = ({isActive})=>({
    background: isActive ?"#1C2025":""
  })

  return (
    <nav className="text-text-main w-[40%] bg-dark-bg h-10 rounded-3xl flex items-center top-10 justify-around ">
      <NavLink style={style} className={"p-1.5 px-2.5 rounded-lg  shadow shadow-secondary-bg"} to={"/dashboard"}>Dashboard</NavLink>
      <NavLink  style={style} className=" hover:bg-surface p-1.5 rounded-lg" to={"/portfolio"}>
        Portofio
      </NavLink>
    
      <NavLink style={style} className="hover:bg-surface p-1.5 rounded-lg" to={"/transactions"}>
        Transactions
      </NavLink>

      <NavLink style={style} className="hover:bg-surface p-1.5 rounded-lg" to={"/news"}>
        News
      </NavLink>
    </nav>
  );
};

export default NavBar;
