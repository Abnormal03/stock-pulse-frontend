import React, { useCallback, useRef, useState, useEffect } from "react";

export default function useDashboard() {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const [chartLoading, setChartLoading] = useState(null);

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
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer); //cleaning up the timeout...
    }
  }, [error]);

  const getChart = useCallback(async (symbol) => {
    setChartLoading(true);
    setError(null);
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

      const chartData = await response.json();

      if (response.ok && chartData.data) {
        const formatedData = chartData.data.map((item) => ({
          x: new Date(item.date),
          y: [item.open, item.high, item.low, item.close],
        }));

        setData(formatedData);

        if (formatedData.length > 0) {
          setCurrentPrice(formatedData[0].y[3]);
          setCurrentSymbol(symbol);
        }
      } else {
        setError(chartData.error || "Something went wrong");
        setData([]);
      }
    } catch (error) {
      setError(error.error);
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

      console.log(currentPrice)
      
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
          setPOrtfolioTrigger((prev)=>prev+1);
          return true;
        } else {
          setIsLoading(false);
          setError(transaction.error || "something went wrong");
          return false;
        }
      } catch (error) {
        setError(error.error);
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
          setPOrtfolioTrigger((prev)=>prev+1);
          return true;
        } else {
          setError(transaction.error || "something went wrong.");
          setIsLoading(false);
          return false;
        }
      } catch (error) {
        setError(error.error);
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
      const {portfolio, balance} = json;
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

      setUserBalance(balance);
      return formatedPortfolio;
    } catch (error) {
      setPortError(error.error);
      return false;
    } finally {
      setPortfolioLoading(false);
    }
  }, []);

  return {
    getChart,
    addSellTransaction,
    addBuyTransaction,
    getPortfolio,
    portError,
    portfolioLoading,
    chartLoading,
    data,
    isLoading,
    error,
    portfolioTrigger,
    userBalance
  };
}
