import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN-USER":
      return { user: action.payload };
    case "LOGOUT-USER":
      return { user: null };
    case "AUTH_IS_READY":
      return { ...state, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN-USER", payload: user });
    }

    dispatch({ type: "AUTH_IS_READY" });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
