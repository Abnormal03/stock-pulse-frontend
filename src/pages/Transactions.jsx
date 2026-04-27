import React, { useEffect, useState } from 'react'
import { useTransactions } from '../hooks/useTransaction';

const Transactions = () => {
    const { getTransactions, isLoading, error } = useTransactions();
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        const fetchAndAttach = async () => {
            const TRs = await getTransactions();
            setTransactions(TRs);
        }

        fetchAndAttach();
    }, [])

    return (
        <div className='text-text-main w-full h-fit flex justify-center py-5 px-2 md:p-5 flex-col items-center md:items-baseline gap-5'>
            <p className='text-text-dim font-bold text-2xl'>Transactions</p>

            <div className='overflow-x-auto w-full '>
                {transactions.length > 0 && (
                    <div className='grid grid-cols-4 md:grid-cols-5 min-w-150 bg-active-icon py-2 px-1 rounded-sm'>
                        <p>Symbols</p>
                        <p>Quantity</p>
                        <p>Date</p>
                        <p>Avg.Buy/SellPrice{"($)"}</p>
                        <p className='hidden md:block'>Status</p>
                    </div>
                )}

                <div className='flex flex-col gap-2'>
                    {transactions.length === 0 ? <p className='text-center'>No transactions yet...</p> : (
                        transactions.map((transaction, index) => (
                            <div key={index} className={`${transaction.status === 'buy' ? "bg-pulse-green" : "bg-bear-red"} rounded-sm`}>
                                <div className={`grid grid-cols-4 md:grid-cols-5 min-w-150 ml-1 p-2 bg-surface gap-2`}>
                                    <p>{transaction.symbol}</p>
                                    <p>{transaction.quantity}</p>
                                    <p>{(transaction.createdAt).split('T')[0]}</p>
                                    <p>{transaction.priceAtTransaction.toFixed(2)}</p>
                                    <p className='hidden md:block'>{transaction.status}</p>
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && <p>Loading...</p>}
                </div>
            </div>
            {error && (
                <div className="absolute rounded-sm border-red-400 right-10 bottom-10 border px-10 py-3 bg-secondary-bg">
                    <p className=" text-red-600">Error: {error}</p>
                </div>
            )}
        </div>
    )
}

export default Transactions