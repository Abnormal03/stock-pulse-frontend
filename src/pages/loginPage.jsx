import { useNavigate } from "react-router";
import { useState } from "react";

import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const isloggedIn = await login(inputs.email, inputs.password);

    if (isloggedIn) {
      navigate("/dashboard");
    } else {
      setInputs({ ...inputs, password: "" });
    }
  };

  return (
    <div className="flex w-full h-screen items-center bg-dark-bg justify-center text-shadow-gray-800">
      {state.user ? (
        <p>page Not found!</p>
      ) : (
        <form
          onSubmit={handleLogin}
          action=""
          className="rounded-sm shadow-md shadow-pulse-green text-text-main p-5 min-h-100 min-w-120 items-center justify-start flex flex-col gap-5"
        >
          <h3 className="text-3xl bg-clip-text bg-linear-to-l from-pulse-green to-bear-red text-transparent">
            Welcome Back, Trader
          </h3>
          <label htmlFor="email" className="self-baseline">
            Email:
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            required
            className="w-full h-10 border p-2 rounded-sm"
            onChange={handleChange}
            value={inputs.email}
          />
          <label htmlFor="password" className="self-baseline">
            password:
          </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            className="w-full h-10 border p-2 rounded-sm"
            onChange={handleChange}
            value={inputs.password}
          />
          <input
            type="submit"
            value="login"
            className="rounded-sm bg-blue-500 px-5 py-2 "
            disabled={isLoading}
          />
          {isLoading && <p className="text-text-main">loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          <p className="bg-clip-text bg-linear-to-l from-pulse-green to-bear-red text-transparent">
            you are here to join?{" "}
            <a href="/signup" className="text-blue-400 underline">
              SignUp here
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
