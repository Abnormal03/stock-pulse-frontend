import React, { useEffect } from 'react'
import { useMarket } from '../../hooks/useMarket';
import { CiBookmarkPlus } from "react-icons/ci";
import { useNavigate } from 'react-router';

const DisplayStocks = ({ dashboard, isSearching, searchTerm }) => {
    const { state, getTopGainer, getSearchResult, isLoading, error } = useMarket();

    const { setCurrentSymbol, addWatch, error: marketError } = dashboard;
    const navigate = useNavigate();

    const stockList = isSearching ? [] : (state.marketStocks || []);
    const searchedStocks = isSearching ? (state.searchedStocks || []) : [];

    useEffect(() => {
        if (isSearching && searchTerm) {
            getSearchResult(searchTerm);
        } else {
            getTopGainer();
        }
    }, [isSearching, searchTerm, getSearchResult, getTopGainer]);

    const handleClick = (symbol) => {
        if (!symbol) return;
        setCurrentSymbol(symbol);
        navigate('/dashboard');
    }

    const handleAddWatch = async (symbol) => {
        const added = await addWatch(symbol);
        if (!added) {
            console.log(error)
            console.log('couldnt add to watchlist.')
        }
    }
    return (
        <div className='text-white text-center mt-5  p-5 lg:px-10 flex flex-col gap-5 relative'>
            {stockList.length > 0 && <div className='w-full grid grid-cols-5 lg:grid-cols-6 bg-active-icon p-2 rounded-sm'>
                <p className=''>Symbol</p>
                <p className=''>price</p>
                <p className='hidden md:block'>name</p>
                <p className=''>change</p>
                <p className=''>exchange</p>
                <p className=''></p>
            </div>}
            {(!isLoading && stockList.length === 0) ? <p className='text-text-dim font-bold text-2xl'>NO stocks found...</p> : (
                !isSearching &&
                stockList.map((stock, index) => (
                    <div key={index} onClick={() => { handleClick(stock.symbol) }} className={`grid grid-cols-5 md:grid-cols-6 bg-surface hover:bg-transparent cursor-default py-2 rounded-sm ${stock.change >= 0 ? "text-pulse-green" : "text-bear-red"}`}>
                        <p>{stock.symbol}</p>
                        <p>{(stock.price).toFixed(2)}</p>
                        <p className='hidden md:block'>{stock.name}</p>
                        <p>{(stock.change).toFixed(2)}%</p>
                        <p>{stock.exchange}</p>
                        <p onClick={(event) => { handleAddWatch(stock.symbol); event.stopPropagation(); }} className='flex items-center justify-end-safe mr-2 md:mr-0 md:justify-center md:text-2xl text-active-icon'><CiBookmarkPlus /></p>
                    </div>
                ))
            )}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <p>Loading...</p>
                </div>
            )}
            {error && (
                <div className="z-50 absolute rounded-sm border-red-400 right-10 bottom-10 border px-10 py-3 bg-secondary-bg">
                    <p className=" text-red-600">Error: {error}</p>
                </div>
            )}


            {isSearching && (
                <div className='absolute inset-0 items-center justify-center bg-black/20 backdrop-blur-sm '>
                    {searchedStocks.length > 0 && <div className='w-full grid grid-cols-5 bg-active-icon p-2 rounded-sm'>
                        <p>Symbol</p>
                        <p >name</p>
                        <p>currency</p>
                        <p>exchange</p>
                        <p></p>
                    </div>}
                    {(!isLoading && searchedStocks.length === 0) ? <p className='text-text-dim font-bold text-2xl'>NO stocks found...</p> : (
                        searchedStocks.map((stock, index) => (
                            <div key={index} onClick={() => { handleClick(stock.symbol) }} className={`grid grid-cols-5 bg-surface hover:bg-transparent cursor-default py-2 rounded-sm text-text-dim/110`}>
                                <p>{stock.symbol}</p>
                                <p>{(stock.name)}</p>
                                <p>{stock.currency}</p>
                                <p>{stock.exchange}</p>
                                <button onClick={(event) => { handleAddWatch(stock.symbol); event.stopPropagation(); }} className='flex items-center justify-end-safe mr-2 md:mr-0 md:justify-center md:text-2xl text-active-icon'><CiBookmarkPlus /></button>
                            </div>
                        ))
                    )}

                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>
            )}
            {marketError && (
                <div className="z-50 absolute rounded-sm border-red-400 right-10 bottom-10 border px-10 py-3 bg-secondary-bg">
                    <p className=" text-red-600">Error: {marketError}</p>
                </div>
            )}
        </div>
    )
}

export default DisplayStocks