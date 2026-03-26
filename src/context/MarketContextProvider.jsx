import { useEffect, useReducer, useState } from "react";
import { MarketContext } from './marketContext'

const Reducer = (state, action) => {
    switch (action.type) {
        case "LOAD_STOCKS":
            return { marketStocks: action.payload };
        default:
            return state;
    }
}

export const MarketContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, {
        marketStocks: []
    });


    const [isLoading, setIsloading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let timeOutId;
        if (error) {
            timeOutId = setTimeout(() => {
                setError(null);
            }, 5000);
        }

        return () => { clearTimeout(timeOutId) }
    }, [error])

    const getTopGainer = async () => {
        setIsloading(true);
        setError(null);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await fetch("/api/market/toptraded", {
                headers: {
                    authorization: `Bearer ${user ? user.token : ""}`
                }
            });

            const json = await response.json();
            const topTen = json.symbols?.splice(0, 20);
            dispatch({ type: 'LOAD_STOCKS', payload: topTen });
        } catch (error) {
            setError('unable to get stock information...');
            dispatch({ type: 'LOAD_STOCKS', payload: [] });
        } finally {
            setIsloading(false);
        }
    }

    const getSearchResult = async (symbol) => {
        setIsloading(true);
        setError(null);
        try {
            const response = await fetch(`/api/market/${symbol}`);
            const json = await response.json();

            dispatch({ type: "LOAD_STOCKS", payload: json.searchResult })
        } catch (error) {
            setError('unable to get searched stock')
            dispatch({ type: 'LOAD_STOCKS', payload: [] });
        } finally {
            setIsloading(false);
        }
    }


    return (<MarketContext.Provider value={{ state, dispatch, getTopGainer, getSearchResult, isLoading, error }}>
        {children}
    </MarketContext.Provider>)

}