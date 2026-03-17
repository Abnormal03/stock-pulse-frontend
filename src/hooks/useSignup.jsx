import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const user = await response.json();

      if (!response.ok) {
        setError(user.error);
        setIsLoading(false);
        return false;
      }
      if (response.ok) {
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

  return { signup, isLoading, error };
};
