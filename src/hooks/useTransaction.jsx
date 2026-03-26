import { useCallback, useEffect, useState } from "react"

export const useTransactions = () => {
    const [isLoading, setIsloading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let timeOutId;
        if (error) {
            timeOutId = setTimeout(() => {
                setError(null);
            }, 5000)
        }

        return () => clearTimeout(timeOutId);
    })

    const getTransactions = useCallback(async () => {
        setIsloading(true);
        setError(null)
        console.log('starting fetching...')
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            const response = await fetch(`/api/transactions`, {
                headers: {
                    Authorization: `Bearer ${user ? user.token : ""}`,
                }
            })

            if (!response.ok) {
                setError('error while fetching transactions...')
                return [];
            }
            const json = await response.json();

            return json;
        } catch (error) {
            setError(error.error);
            return [];
        } finally {
            setIsloading(false);
        }
    }, []);

    return { getTransactions, isLoading, error };
}