import "./App.css";
import Header from "./components/header/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/loginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { state } = useAuthContext();

  if (!state.authIsReady) {
    return <div className="loading-screen">Loading...</div>;
  }
  return (
    <BrowserRouter>
      {state.user && <Header />}
      <Routes>
        <Route
          path="/login"
          element={!state.user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!state.user ? <SignupPage /> : <Navigate to="/dashboard" />}
        />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={state.user ? <Dashboard /> : <Navigate to={"/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
