import stockpulse from "../../assets/Images/stock-pulse (2).png";

const Header = () => {
  return (
    <div className="bg-dark-bg max-h-20 w-full flex items-center justify-between px-20 absolute text-white">
      <img
        src={stockpulse}
        width={300}
        alt="logo"
        className="brightness-0 invert"
      />
      <div className="flex items-center justify-center gap-10">
        <p className="px-5 py-2 bg-pulse-green rounded-2xl text-black">
          <a href="/login">Login</a>
        </p>
        <p className="px-5 py-2 bg-pulse-green rounded-2xl text-black">
          <a href="/signup">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Header;
