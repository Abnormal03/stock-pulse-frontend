import React, { useState } from 'react'

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);



    return (
        <div className='text-text-main w-full h-fit flex justify-center py-5 px-2 md:p-5 flex-col items-center md:items-baseline gap-5'>
            <p className='text-text-dim font-bold text-2xl'>Transactions</p>

            <div className='overflow-x-auto w-full '>
                {transactions.length >= 0 && (
                    <div className='grid grid-cols-5 min-w-150 bg-active-icon py-2 px-1 rounded-sm'>
                        <p>Symbols</p>
                        <p>Quantity</p>
                        <p>Avg.Buy/SellPrice</p>
                        <p>Status</p>
                        <p>Date</p>
                    </div>
                )}

                <div className='flex flex-col'>
                    {transactions.length === 0 ? <p className='text-center'>No transactions yet...</p> : (
                        transactions.map(transaction => (
                            <div className={`${transaction.status === 'buy' ? "bg-pulse-green" : "bg-bear-red"}`}>
                                <div className={`grid grid-cols-5 ml-1 p-2 border-b`}>
                                    <p>{transaction.symbol}</p>
                                    <p>{transaction.quantity}</p>
                                    <p>{transaction.price}</p>
                                    <p>{transaction.status}</p>
                                    <p>{transaction.date}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Transactions