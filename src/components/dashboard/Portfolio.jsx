import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

const Portfolio = ({ dashboard }) => {
  const [assets, setAssets] = useState(null);
  const [displayError, setDisplayError] = useState(false);

  const { setCurrentSymbol, getPortfolio, addWatch, portfolioTrigger, portfolioLoading, portError, setPortError } = dashboard;

  useEffect(() => {
    const fetchPortfolio = async () => {
      const portfolio = await getPortfolio();
      setAssets(portfolio);
    };

    fetchPortfolio();

    if (portError) {
      setAssets([]);
    }
  }, [getPortfolio, portfolioTrigger]);

  useEffect(() => {
    let timeoutId;
    if (portError) {
      setDisplayError(true);
      timeoutId = setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [portError])

  const handleAdd = async (symbol) => {
    const added = addWatch(symbol);
    if (!added) {
      setPortError('unable to add to watchlist')
    }
  }

  if (portfolioLoading) return <div>Loading...</div>;

  return (
    <div className="text-white w-full min-h-[200px] lg:min-h-50 scroll-auto shadow-sm shadow-active-icon rounded-2xl flex flex-col gap-1 overflow-hidden">
      {/*headings...*/}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 text-text-dim bg-secondary-bg max-h-10 items-center justify-around w-full pl-4 lg:pl-15 py-1.5 text-xs md:text-sm">
        <h1 className="truncate">ASSETS</h1>
        <h1 className="hidden md:block">QUANTITY</h1>
        <h1 className="hidden lg:block">EQUITY VALUE</h1>
        <h1 className="hidden lg:block">AVG.BUY PRICE</h1>
        <h1 className="hidden md:block">CURRENT PRICE</h1>
        <h1 className="hidden lg:block">TODAYS P&L</h1>
        <h1></h1>
      </div>
      {!assets || assets.length === 0 ? (
        <div className="items-start justify-center flex">no assets...</div>
      ) : (
        assets.map((asset) => (
          <div
            key={asset.symbol}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 text-text-main bg-secondary-bg max-h-10 items-center justify-around w-full pl-4 lg:pl-15 py-1.5 text-xs md:text-sm"
            onClick={() => { setCurrentSymbol(asset.symbol) }}
          >
            <p className="truncate font-semibold">{asset.symbol}</p>
            <p className="hidden md:block">{asset.quantity}</p>
            <p className="hidden lg:block">${asset.equityValue?.toFixed(2)}</p>
            <p className="hidden lg:block">${asset.avgPrice}</p>
            <p className="hidden md:block">${asset.currentPrice}</p>
            <p className={`${asset.PL >= 0 ? "text-pulse-green" : "text-bear-red"} truncate`}>{asset.PL?.toFixed(2)}</p>
            <button onClick={(event) => { handleAdd(asset.symbol); event.stopPropagation(); }}><IoAddCircleOutline className="text-pulse-green text-xl lg:text-2xl" /></button>
          </div>
        ))
      )}
      {displayError && (
        <div className="absolute rounded-sm border-red-400 right-10 bottom-10 border px-10 py-3 bg-secondary-bg">
          <p className=" text-red-600">failed to fetch assets data</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
