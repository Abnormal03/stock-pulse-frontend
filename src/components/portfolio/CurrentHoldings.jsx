import { useEffect, useState } from "react"

const CurrentHoldings = ({ portfolio, portError }) => {
  const [displayError, setDisplayError] = useState(false);

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
  return (
    <div className='min-h-100 lg:max-h-150 lg:w-full w-[90%]'>
      <h1 className='text-text-main mb-5 text-2xl'>Current Holdings</h1>

      <div className='flex flex-col gap-2 min-h-100 max-h-150 rounded-lg pt-2 bg-secondary-bg shadow-sm shadow-active-icon overflow-hidden text-text-dim'>
        <div className='flex justify-between bg-dark-bg py-2 w-full  px-3'>
          <h1>ASSETS</h1>
          <h1>QUANTITY</h1>
          <h1 className='hidden lg:block'>EQUITY VALUE</h1>
          <h1 className='hidden lg:block'>AVG.BUY PRICE</h1>
          <h1 className='hidden lg:block'>CURRENT PRICE</h1>
          <h1>TODAYS P&L</h1>
        </div>
        {(portfolio && portfolio?.length === 0) ? "no assets to display " : portfolio.map(stock => (
          <div
            key={stock.symbol}
            className="flex text-text-main bg-dark-bg max-h-10 items-center justify-between w-full px-3 py-2 hover:bg-secondary-bg"
          >
            <p>{stock.symbol}</p>
            <p>{stock.quantity}</p>
            <p className='hidden lg:block'>{stock.equityValue?.toFixed(2)}</p>
            <p className='hidden lg:block'>{stock.avgPrice}</p>
            <p className='hidden lg:block'>{stock.currentPrice}</p>
            <p className={stock.PL >= 0 ? "text-pulse-green" : "text-bear-red"}>{stock.PL?.toFixed(2)}</p>
          </div>
        ))}

      </div>
      {displayError && (
        <div className="absolute rounded-sm border-red-400 right-10 bottom-10 border px-10 py-3 bg-secondary-bg">
          <p className=" text-red-600">failed to fetch assets data</p>
        </div>
      )}
    </div>
  )
}

export default CurrentHoldings