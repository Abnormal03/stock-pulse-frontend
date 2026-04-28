import React, { useEffect, useState } from 'react'
import { CiCircleRemove } from "react-icons/ci";

const MyWatchlist = ({ dashboard }) => {
  const { getMyWatchlist, myWatchlists, removeWatch, isLoading, error, setCurrentSymbol } = dashboard;

  const [success, setSuccess] = useState(null);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      await getMyWatchlist();
    }

    fetchWatchlist();
  }, [getMyWatchlist])

  useEffect(() => {
    let timeoutId;
    if (error) {
      setDisplayError(true);
      timeoutId = setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [error])

  useEffect(() => {
    const removeModal = async () => {
      const time = await setTimeout(() => {
        if (success) {
          setSuccess(null);
        }
      }, 3000)

      return () => clearTimeout(time);
    }

    removeModal();
  }, [success]);

  const handleRemove = async (_id) => {
    const removed = await removeWatch(_id);
    if (removed) {
      setSuccess('stock removed from watchlist.')
    }
  }

  return (
    <div className='text-text-dim w-full flex flex-col items-center justify-center gap-2 shadow-sm shadow-active-icon bg-secondary-bg max-h-80 mt-4 lg:mt-10 rounded-sm p-2'>
      <h1 className='text-lg self-baseline'>WATCHLIST</h1>
      <div className={`flex justify-between w-full text-text-main text-xs md:text-sm ${myWatchlists.length === 0 ? 'hidden' : ""}`}>
        <p className="font-semibold">SYMBOL</p>
        <p className="hidden md:block">PRICE</p>
        <p className="hidden md:block">CHANGE</p>
        <p></p>
      </div>
      {isLoading ? <p>loading...</p> : (myWatchlists.length === 0 ? "add stock to see them in watchlist" : myWatchlists.map(watch => (
        <div key={watch._id} onClick={() => setCurrentSymbol(watch.symbol)} className={`w-full flex justify-between items-center ${watch.change > 0 ? "text-pulse-green" : "text-bear-red"} hover:bg-dark-bg px-2 md:px-3 py-2 rounded-sm cursor-default text-sm`}>
          <p className="font-semibold truncate">{watch.symbol}</p>
          <p className="hidden md:block">${watch.currentPrice}</p>
          <p className=''>{watch.change}%</p>
          <button onClick={() => { handleRemove(watch._id) }}><CiCircleRemove className='text-bear-red text-xl' /></button>
        </div>
      )))}
      {success && <div className="absolute rounded-sm border-pulse-green right-10 bottom-10 border px-10 py-3 bg-secondary-bg">
        <p className=" text-pulse-green">success: {success}</p>
      </div>}
      {displayError && <div className="lg:hidden absolute rounded-sm border-red-400 right-10 bottom-10 border px-10 py-3 bg-secondary-bg">
        <p className=" text-red-600">failed to fetch watchlist</p>
      </div>}
    </div>
  )
}

export default MyWatchlist