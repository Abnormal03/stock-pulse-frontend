const NavBar = () => {
  return (
    <nav className="text-text-main w-[40%] bg-dark-bg h-10 rounded-3xl flex items-center top-10 justify-around ">
      <p className="p-1.5 px-2.5 bg-surface rounded-lg  shadow shadow-secondary-bg">
        <a href="/dashboard">Dashboard</a>
      </p>
      <p className=" hover:bg-surface p-1.5 rounded-lg">
        <a href="/portfolio">Portofio</a>
      </p>
      <p className="hover:bg-surface p-1.5 rounded-lg">
        <a href="/transactions">Transactions</a>
      </p>
      <p className="hover:bg-surface p-1.5 rounded-lg">
        <a href="/news">News</a>
      </p>
    </nav>
  );
};

export default NavBar;
