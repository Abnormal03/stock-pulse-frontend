import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";

const SignupPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { signup, isLoading, error } = useSignup();
  const { state } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs({ ...inputs, [name]: value });
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      return;
    }

    const signedIn = await signup(
      inputs.username,
      inputs.email,
      inputs.password,
    );
    if (signedIn) {
      navigate("/dashboard");
    }
    setInputs({ ...inputs, password: "" });
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-dark-bg text-shadow-gray-800">
      {state.user ? (
        <p>page not found!</p>
      ) : (
        <form
          onSubmit={handleSignup}
          action=""
          className="rounded-sm bg-surface text-text-main shadow-md shadow-pulse-green p-5 min-h-100 min-w-120 items-center justify-start flex flex-col gap-5"
        >
          <h3 className="text-3xl underline underline-offset-5 bg-clip-text bg-linear-to-l from-pulse-green to-bear-red text-transparent">
            Welcome to Stock Pulse
          </h3>
          <label htmlFor="username" className="self-baseline">
            username:
          </label>
          <input
            type="text"
            placeholder="username"
            name="username"
            required
            className="w-full h-10 border p-2 rounded-sm"
            onChange={handleChange}
            value={inputs.username}
          />
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
            Password:
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
          <label htmlFor="confId" className="self-baseline">
            Confirm Password:
          </label>
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            id="confId"
            required
            className="w-full h-10 border p-2 rounded-sm"
            onChange={handleChange}
            value={inputs.confirmPassword}
          />
          {inputs.confirmPassword &&
            inputs.confirmPassword !== inputs.password && (
              <p>password must match</p>
            )}
          <input
            type="submit"
            value="sign up"
            className="rounded-sm bg-blue-500 px-5 py-2 "
            disabled={isLoading}
          />
          {isLoading && <p className="text-text-main">loading....</p>}
          {error && <p className="text-red-400">{error}</p>}
          <p className="bg-clip-text bg-linear-to-l from-pulse-green to-bear-red text-transparent">
            you are a member?{" "}
            <a href="/login" className="text-blue-400 underline">
              login here
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
