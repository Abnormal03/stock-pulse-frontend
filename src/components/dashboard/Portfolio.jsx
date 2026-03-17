import React, { useEffect, useState } from "react";

const Portfolio = ({ dashboard }) => {
  const [assets, setAssets] = useState(null);
  const { getPortfolio, portfolioLoading, portError } = dashboard;

  useEffect(() => {
    const fetchPortfolio = async () => {
      const portfolio = await getPortfolio();
      setAssets(portfolio);
    };

    fetchPortfolio();

    if (portError) {
      setAssets([]);
    }
  }, [getPortfolio]);

  if (portfolioLoading) return <div>Loading...</div>;

  return (
    <div className="text-white w-full lg:min-h-50 scroll-auto shadow-sm shadow-text-dim rounded-2xl  invisible lg:visible self-end col-span-3 flex flex-col gap-1 overflow-hidden">
      {/*headings...*/}
      <div className="grid grid-cols-6 text-text-dim bg-secondary-bg max-h-10 items-center justify-around w-full pl-15 py-1.5">
        <h1>ASSETS</h1>
        <h1>QUANTITY</h1>
        <h1>EQUITY VALUE</h1>
        <h1>AVG.BUY PRICE</h1>
        <h1>CURRENT PRICE</h1>
        <h1>TODAYS P&L</h1>
      </div>
      {!assets ? (
        <div className="items-start justify-center flex">no assets...</div>
      ) : (
        assets.map((asset) => (
          <div
            key={asset.avgPrice}
            className="grid grid-cols-6 text-text-main bg-secondary-bg max-h-10 items-center justify-around w-full pl-15 py-1.5"
          >
            <p>{asset.symbol}</p>
            <p>{asset.quantity}</p>
            <p>{asset.equityValue?.toFixed(2)}</p>
            <p>{asset.avgPrice}</p>
            <p>{asset.currentPrice}</p>
            <p className={asset.PL>=0? "text-pulse-green":"text-bear-red"}>{asset.PL?.toFixed(2)}</p>
          </div>
        ))
      )}
      {portError && <p>{portError}</p>}
    </div>
  );
};

export default Portfolio;
