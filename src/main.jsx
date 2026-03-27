import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { MarketContextProvider } from './context/MarketContextProvider.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MarketContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MarketContextProvider>
  </StrictMode>,
);
