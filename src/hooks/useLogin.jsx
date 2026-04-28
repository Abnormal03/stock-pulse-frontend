import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });


      if (!response.ok) {
        setError('something went wrong, please try again!');
        setIsLoading(false);
        return false;
      }
      const user = await response.json();
      if (response.ok) {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN-USER", payload: user });
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      return false;
    }
  };

  return { login, isLoading, error };
};
