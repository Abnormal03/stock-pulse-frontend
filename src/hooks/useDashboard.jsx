import React, { useCallback, useRef, useState, useEffect, useContext } from "react";
import { RiSpotifyFill } from "react-icons/ri";
import { AuthContext } from "../context/authContext";
import { useAuthContext } from "./useAuthContext";
import useLogout from "./useLogout";

export default function useDashboard() {
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const [chartLoading, setChartLoading] = useState(null);

  //tracking watchlist...
  const [myWatchlists, setMyWatchlists] = useState([]);

  //balance...
  const [userBalance, setUserBalance] = useState(null);

  //tracking update in the buy or sell of the stocks....
  const [portfolioTrigger, setPOrtfolioTrigger] = useState(0);

  //portfolio...
  const [portfolioLoading, setPortfolioLoading] = useState(null);
  const [portError, setPortError] = useState(null);

  //setting current symbol and price for future use in the trade
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currentSymbol, setCurrentSymbol] = useState(null);
  useEffect(() => {
    if (error) {
      if (error === "session Expired!") {
        logout();
      }
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer); //cleaning up the timeout...
    }
  }, [error]);

  const getChart = useCallback(async (symbol) => {
    setChartLoading(true);
    setError(null);
    setData([]);

    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch("/api/dashboard/chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user ? user.token : ""}`,
        },

        body: JSON.stringify({
          symbol: symbol,
        }),
      });

      if (response.status === 401) {
        setError('session Expired!');
        console.log(response)
        return;
      }

      const chartData = await response.json();

      if (response.ok && chartData.data) {
        const formatedData = chartData.data.map((item) => ({
          x: new Date(item.date),
          y: [item.open, item.high, item.low, item.close],
        }));

        setData(formatedData);

        if (formatedData.length > 0) {
          setCurrentPrice(formatedData[0].y[3]);
        }
      } else {
        setError("Something went wrong while loading the chart.");
        setData([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setChartLoading(false);
    }
  }, []);

  const addBuyTransaction = useCallback(
    async (amount) => {
      if (!currentSymbol || !currentPrice) {
        setError("could not resolve stock!");
        return false;
      }

      if (amount <= 0) {
        setError("invalid amount!");
        return false;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/trade/buy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token} || null`,
          },
          body: JSON.stringify({
            symbol: currentSymbol,
            quantity: amount,
            price: currentPrice,
          }),
        });

        const transaction = await response.json();
        if (transaction && transaction._id) {
          setIsLoading(false);
          setPOrtfolioTrigger((prev) => prev + 1);
          return true;
        } else {
          setIsLoading(false);
          setError(transaction.error || "something went wrong");
          return false;
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [currentSymbol, currentPrice],
  );

  const addSellTransaction = useCallback(
    async (amount) => {
      if (!currentSymbol || !currentPrice) {
        setError("could not resolve stock!");
        return false;
      }
      if (amount <= 0) {
        setError("invalid amount!");
        return false;
      }
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch("/api/trade/sell", {
          method: "POST",
          headers: {
            authorization: `Bearer ${user ? user.token : ""}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symbol: currentSymbol,
            quantity: Number(amount),
            price: currentPrice,
          }),
        });

        const transaction = await response.json();

        if (transaction && transaction._id) {
          setIsLoading(false);
          setPOrtfolioTrigger((prev) => prev + 1);
          return true;
        } else {
          setError(transaction.error || "something went wrong.");
          setIsLoading(false);
          return false;
        }
      } catch (error) {
        setError(error.message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [currentSymbol, currentPrice],
  );

  const getPortfolio = useCallback(async () => {
    setPortfolioLoading(true);
    setPortError(null);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("/api/dashboard/portfolio", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user ? user.token : ""}`,
        },
      });

      const json = await response.json();


      if (!response.ok) {
        setPortError(response.error);
        return null;
      }
      const { portfolio, balance } = json;
      setUserBalance(balance);
      const formatedPortfolio = await Promise.all(
        portfolio.map(async (asset) => {
          try {
            const priceRes = await fetch(
              `https://financialmodelingprep.com/stable/quote-short?symbol=${asset.symbol}&apikey=${import.meta.env.VITE_MARKET_API}`,
            );
            const priceData = await priceRes.json();
            const currentPrice = priceData[0]?.price || 0;

            return {
              ...asset,
              currentPrice: currentPrice,
              equityValue: currentPrice * asset.quantity,
              PL: ((currentPrice - asset.avgPrice) * asset.quantity),
            };
          } catch (err) {
            return { ...asset, currentPrice: 0, equityValue: 0, PL: 0 };
          }
        }),
      );

      if (!currentSymbol) {
        setCurrentSymbol(formatedPortfolio[0].symbol);
      }
      return formatedPortfolio;
    } catch (error) {
      setPortError(error.message);
      return false;
    } finally {
      setPortfolioLoading(false);
    }
  }, []);

  const getMyWatchlist = useCallback(async () => {
    setIsLoading(true);
    setError(null)
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`/api/dashboard/watchlist`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user ? user.token : ""}`
        }
      })
      const watchlist = await response.json();

      if (!response.ok) {
        setError(watchlist.error);
        setMyWatchlists([]);
        return false;
      }
      setMyWatchlists(watchlist.myWatchlist);
      return true;

    } catch (error) {
      setMyWatchlists([]);
      setError(error.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [])

  const addWatch = useCallback(async (symbol) => {
    setIsLoading(true);
    setPortError(false);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch('/api/dashboard/watchlist/addwatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user ? user.token : ""}`
        },
        body: JSON.stringify({
          symbol
        })
      })

      const json = await response.json();

      if (!response.ok) {
        console.log(response)
        setPortError(json.error || "Failed to add to watchlist");
        return false;
      }
      if (json.watch) {
        setMyWatchlists((prev) => [...prev, json.watch]);
        getMyWatchlist();
      }
      return true;

    } catch (error) {
      setPortError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [])

  const removeWatch = useCallback(async (_id) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`/api/dashboard/watchlist/delete/${_id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${user ? user.token : ""}`,
        }
      })

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        return false;
      }
      setMyWatchlists((prev) => prev.filter(watch => watch._id !== _id));
      return json.removed;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [])


  // const getDetail = async (asset)=>{
  //   try {
  //     const priceRes = await fetch(`https://financialmodelingprep.com/stable/quote-short?symbol=${asset.symbol}&apikey=${import.meta.env.VITE_MARKET_API}`,);
  //     const priceData = await priceRes.json();
  //     const currentPrice = priceData[0]?.price || 0;

  //     return {
  //               ...asset,
  //               currentPrice: currentPrice,
  //               equityValue: currentPrice * asset.quantity,
  //               PL: ((currentPrice - asset.avgPrice) * asset.quantity),
  //             };

  //   } catch (error) {
  //     return { ...asset, currentPrice: 0, equityValue: 0, PL: 0 };
  //   }
  // }

  return {
    getChart,
    addSellTransaction,
    addBuyTransaction,
    getPortfolio,
    getMyWatchlist,
    removeWatch,
    addWatch,
    portError,
    portfolioLoading,
    chartLoading,
    data,
    isLoading,
    error,
    portfolioTrigger,
    setPortError,
    userBalance,
    myWatchlists,
    currentSymbol,
    setCurrentSymbol
  };
}
