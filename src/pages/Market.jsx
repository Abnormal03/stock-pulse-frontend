import { useEffect, useState } from 'react'
import DisplayStocks from '../components/market/DisplayStocks';

const Market = ({ dashboard }) => {
    const [input, setinput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (input.length < 3) {
            setIsSearching(false);
            setSearchTerm(null);
            return;
        };
        setIsSearching(true);
        setSearchTerm(input)
    }

    useEffect(() => {
        const id = setTimeout(() => {
            handleSubmit();
        }, 3000);
        return () => clearTimeout(id)
    }, [input])

    const onChange = (event) => {
        setinput(event.target.value)
    }
    return (
        <div>
            <p className='flex text-text-dim font-bold text-2xl my-5 items-center justify-center h-fit'>STOCK MARKET</p>
            <form action="" onSubmit={handleSubmit} className='w-full flex justify-center'>
                <input type='text' onChange={onChange} value={input} placeholder='search for a stock...' className='w-[80%] h-9 rounded-2xl border-2 border-active-icon text-text-main text-center text-lg max-w-100' />
            </form>
            <DisplayStocks dashboard={dashboard} searchTerm={searchTerm} isSearching={isSearching} />
        </div>
    )
}

export default Market