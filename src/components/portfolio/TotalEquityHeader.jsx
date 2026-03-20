import React from 'react'

const TotalEquityHeader = ({ totalEquity, userBalance, openPosition, isLoading }) => {
    return (
        <div className='text-text-dim text-sm min-h-50 w-[90%] lg:w-full flex flex-col p-5 lg:px-20 bg-secondary-bg rounded-lg shadow-sm gap-10 mb-10 shadow-active-icon'>
            <div className='flex flex-col lg:flex'>
                <p className=''>TOTAL EQUITY VALUE</p>
                <h1 className='font-bold text-5xl text-text-main'>${totalEquity.toFixed(2)}<span className={` text-sm y-3 px-4 ${totalEquity > userBalance ? "text-pulse-green bg-pulse-green/30" : "text-bear-red bg-bear-red/30"}  rounded-3xl`}>{isLoading ? "----" : (((totalEquity - userBalance) / userBalance) * 100).toFixed(1)}%</span> </h1>
            </div>
            <div className='flex wrap-normal lg:flex-row justify-baseline gap-5 lg:gap-100 items-center'>
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <p className=' '>PROFIT/LOSS</p>
                    <h1 className={`font-bold text-2xl ${totalEquity - userBalance > 0 ? "text-pulse-green" : "text-bear-red"} `}>${isLoading ? "---" : (totalEquity - userBalance).toFixed(2)}</h1>
                </div>
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <p className=' '>BUYING POWER</p>
                    <h1 className='font-bold text-2xl text-text-main'>${isLoading ? "---" : userBalance?.toFixed(2)}</h1>
                </div>
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <p className=' text-center '>OPEN POSITIONS</p>
                    <h1 className='font-bold text-2xl text-text-main'>{isLoading ? "---" : openPosition}</h1>
                </div>
            </div>
        </div>
    )
}

export default TotalEquityHeader