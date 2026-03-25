import React, { useEffect, useState } from 'react'
import { useMarket } from '../../hooks/useMarket';
import { CiBookmarkPlus } from "react-icons/ci";
import { useNavigate } from 'react-router';

const DisplayStocks = ({ dashboard }) => {
    const { state, getTopGainer } = useMarket();
    const [stockList, setStockList] = useState([]);
    const { setCurrentSymbol } = dashboard;
    const [loaded, setloaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.marketStocks) {
            console.log(state.marketStocks);
            setStockList(state.marketStocks);
        }
    }, [state.marketStocks]);

    useEffect(() => {
        getTopGainer();
    }, [])

    useEffect(() => {
        setloaded(true);
    }, [setCurrentSymbol])

    const handleClick = (symbol) => {
        if (symbol && loaded) {
            setCurrentSymbol(symbol);
            navigate('/dashboard');
        }

    }
    return (
        <div className='text-white text-center mt-5  p-5 lg:px-10 flex flex-col gap-5'>
            {stockList.length > 0 && <div className='w-full grid grid-cols-5 lg:grid-cols-6 bg-active-icon p-2 rounded-sm'>
                <p className=''>Symbol</p>
                <p className=''>price</p>
                <p className='hidden md:block'>name</p>
                <p className=''>change</p>
                <p className=''>exchange</p>
                <p className=''></p>
            </div>}
            {(stockList && stockList.length === 0) ? "NO stocks found..." : (
                stockList.map((stock, index) => (
                    <div key={index} onClick={() => { handleClick(stock.symbol) }} className={`grid grid-cols-5 md:grid-cols-6 bg-surface hover:bg-transparent cursor-default py-2 rounded-sm ${stock.change >= 0 ? "text-pulse-green" : "text-bear-red"}`}>
                        <p>{stock.symbol}</p>
                        <p>{(stock.price).toFixed(2)}</p>
                        <p className='hidden md:block'>{stock.name}</p>
                        <p>{(stock.change).toFixed(2)}%</p>
                        <p>{stock.exchange}</p>
                        <p className='flex items-center justify-end-safe md:justify-center md:text-2xl'><CiBookmarkPlus /></p>
                    </div>
                ))
            )}
        </div>
    )
}

export default DisplayStocks