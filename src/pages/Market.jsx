import React, { useEffect, useState } from 'react'
import DisplayStocks from '../components/market/DisplayStocks';

const Market = ({ dashboard }) => {
    const [input, setinput] = useState("");

    let timeOutId;
    useEffect(() => {
        timeOutId = setTimeout(() => {
            if (input.length >= 3) {
                handleSubmit();
            }
        }, 5000);

        return () => clearTimeout(timeOutId)
    }, [input])

    const onChange = (event) => {
        setinput(event.target.value)
    }

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        clearTimeout(timeOutId);
        console.log(`searching for ${input}`);

    }
    return (
        <div>
            <p className='flex text-text-dim font-bold text-2xl my-5 items-center justify-center h-fit'>STOCK MARKET</p>
            <form action="" onSubmit={handleSubmit} className='w-full flex justify-center'>
                <input type='text' onChange={onChange} value={input} placeholder='search for a stock...' className='w-[80%] h-9 rounded-2xl border border-active-icon text-text-main text-center text-lg max-w-100' />
            </form>
            <DisplayStocks dashboard={dashboard} />
        </div>
    )
}

export default Market