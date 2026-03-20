import React from 'react'

const TotalEquityHeader = () => {
  return (
    <div className='min-h-50 w-full flex flex-col p-5 px-20 bg-secondary-bg rounded-lg shadow-sm gap-10 shadow-active-icon'>
        <div className=''>
            <p className='text-text-dim text-sm'>TOTAL EQUITY VALUE</p>
            <h1 className='font-bold text-5xl'>$1,500,000.00 <span className='text-sm text-pulse-green py-1 px-4 bg-pulse-green/30 rounded-3xl'>+35%</span> </h1>
        </div>
        <div className='flex justify-baseline gap-100 items-center'>
            <div className='flex flex-col gap-1 items-center justify-center'>
                <p className='text-text-dim text-sm'>PROFIT/LOSS</p>
                <h1 className='font-bold text-2xl text-pulse-green'>+$25000.00</h1>
            </div>
            <div className='flex flex-col gap-1 items-center justify-center'>
                <p className='text-text-dim text-sm'>BUYYING POWER</p>
                <h1 className='font-bold text-2xl text-text-main'>$4563.00</h1>
            </div>
            <div className='flex flex-col gap-1 items-center justify-center'>
                <p className='text-text-dim text-sm'>OPEN POSITIONS</p>
                <h1 className='font-bold text-2xl text-text-main'>15</h1>
            </div>
        </div>
    </div>
  )
}

export default TotalEquityHeader