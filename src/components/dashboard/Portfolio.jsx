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
  }, [portError])

  const handleAdd = async (symbol) => {
    const added = addWatch(symbol);
    if (!added) {
      setPortError('unable to add to watchlist')
    }
  }

  if (portfolioLoading) return <div>Loading...</div>;

  return (
    <div className="text-white w-full lg:min-h-50 scroll-auto shadow-sm shadow-active-icon rounded-2xl  invisible lg:visible self-end col-span-3 flex flex-col gap-1 overflow-hidden">
      {/*headings...*/}
      <div className="grid grid-cols-7 text-text-dim bg-secondary-bg max-h-10 items-center justify-around w-full pl-15 py-1.5">
        <h1>ASSETS</h1>
        <h1>QUANTITY</h1>
        <h1>EQUITY VALUE</h1>
        <h1>AVG.BUY PRICE</h1>
        <h1>CURRENT PRICE</h1>
        <h1>TODAYS P&L</h1>
        <h1></h1>
      </div>
      {!assets || assets.length === 0 ? (
        <div className="items-start justify-center flex">no assets...</div>
      ) : (
        assets.map((asset) => (
          <div
            key={asset.symbol}
            className="grid grid-cols-7 text-text-main bg-secondary-bg max-h-10 items-center justify-around w-full pl-15 py-1.5"
            onClick={() => { setCurrentSymbol(asset.symbol) }}
          >
            <p>{asset.symbol}</p>
            <p>{asset.quantity}</p>
            <p>{asset.equityValue?.toFixed(2)}</p>
            <p>{asset.avgPrice}</p>
            <p>{asset.currentPrice}</p>
            <p className={asset.PL >= 0 ? "text-pulse-green" : "text-bear-red"}>{asset.PL?.toFixed(2)}</p>
            <button onClick={(event) => { handleAdd(asset.symbol); event.stopPropagation(); }}><IoAddCircleOutline className="text-pulse-green text-2xl" /></button>
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
