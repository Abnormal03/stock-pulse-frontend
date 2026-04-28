import { useEffect, lazy, Suspense } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import useDashboard from "./hooks/useDashboard";

// Lazy load page components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Login = lazy(() => import("./pages/loginPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const Market = lazy(() => import("./pages/Market"));
const Transactions = lazy(() => import("./pages/Transactions"));
const News = lazy(() => import("./pages/News"));

const LoadingFallback = () => <div className="loading-screen">Loading...</div>;

const RenderHeader = ({ state, userBalance }) => {

  const location = useLocation();

  const showHeader = location.pathname !== "/" && state.user;

  return showHeader ? <Header balance={userBalance} /> : null;
}

function App() {
  const { state } = useAuthContext();
  const dashboard = useDashboard();
  const { userBalance, getPortfolio, myWatchlists } = dashboard;
  useEffect(() => {
    getPortfolio();
  }, [getPortfolio])

  if (!state.authIsReady) {
    return <div className="loading-screen">Loading...</div>;
  }
  return (
    <BrowserRouter>
      <RenderHeader state={state} userBalance={userBalance} />
      <Suspense fallback={<LoadingFallback />}>
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

          <Route path="/market" element={state.user ? <Market dashboard={dashboard} /> : <Navigate to={"/"} />} />


          <Route path="/transactions" element={state.user ? <Transactions /> : <Navigate to={"/"} />} />

          <Route path="/news" element={state.user ? <News myWatchlists={myWatchlists} /> : <Navigate to={"/"} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
