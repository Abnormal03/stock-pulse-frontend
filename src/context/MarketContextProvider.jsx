import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { MarketContext } from './marketContext'

const Reducer = (state, action) => {
    switch (action.type) {
        case "LOAD_STOCKS":
            return { ...state, marketStocks: action.payload };
        case 'SEARCH_STOCKS':
            return { ...state, searchedStocks: action.payload };
        default:
            return state;
    }
}

export const MarketContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, {
        marketStocks: [],
        searchedStocks: []
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

    const getTopGainer = useCallback(async () => {
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
        } catch (_err) {
            setError('unable to get stock information...');
            dispatch({ type: 'LOAD_STOCKS', payload: [] });
        } finally {
            setIsloading(false);
        }
    }, []);

    const getSearchResult = useCallback(async (symbol) => {
        setIsloading(true);
        setError(null);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await fetch(`/api/market/search/${symbol}`, {
                headers: {
                    authorization: `Bearer ${user ? user.token : ""}`
                }
            });

            if (!response.ok) {
                setError('error while fetching stocks...');
                return;
            }

            const json = await response.json();
            dispatch({ type: "SEARCH_STOCKS", payload: json.searchResult })
        } catch (_err) {
            setError('unable to get searched stock')
            dispatch({ type: 'SEARCH_STOCKS', payload: [] });
        } finally {
            setIsloading(false);
        }
    }, []);

    const value = useMemo(
        () => ({ state, dispatch, getTopGainer, getSearchResult, isLoading, error }),
        [state, getTopGainer, getSearchResult, isLoading, error],
    );

    return (<MarketContext.Provider value={value}>
        {children}
    </MarketContext.Provider>)

}