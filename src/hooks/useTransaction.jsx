import { useState } from "react"

export const useTransactions = () => {
    const [transaction, setTransactions] = useState([]);

    const [isLoading, setIsloading] = useState(null);
    const [error, setError] = useState(null);

    const getTransactions = async () => {
        setIsloading(true);
        setError(null)
        try {
            const user = JSON.parse(localStorage('user'));

            const response = await fetch(`/api/transactions`, {
                headers: {
                    autorizations: `Bearer ${user ? user.token : ""}`,
                }
            })

            const json = await response.json();

            setTransactions(json);
        } catch (error) {
            setError(error.error);
            setTransactions([]);
        } finally {
            setIsloading(false);
        }
    }
}