import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/loginPage";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import useDashboard from "./hooks/useDashboard";
import Transactions from "./pages/Transactions";

const RenderHeader = ({ state, userBalance }) => {

  const location = useLocation();

  const showHeader = location.pathname !== "/" && state.user;

  return showHeader ? <Header balance={userBalance} /> : null;
}

function App() {
  const { state } = useAuthContext();
  const [balance, setBalance] = useState(null);
  const dashboard = useDashboard();
  const { userBalance } = dashboard;
  useEffect(() => {
    setBalance(userBalance);
  }, [userBalance])

  if (!state.authIsReady) {
    return <div className="loading-screen">Loading...</div>;
  }
  return (
    <BrowserRouter>
      <RenderHeader state={state} userBalance={balance} />
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
          element={state.user ? <Dashboard useDashboard={dashboard} /> : <Navigate to={"/"} />}
        />
        <Route path="/portfolio" element={state.user ? <PortfolioPage userBalance={userBalance} useDashboard={dashboard} /> : <Navigate to={"/"} />} />


        <Route path="/transactions" element={state.user ? <Transactions /> : <Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
