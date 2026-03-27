import { useContext } from "react"
import { MarketContext } from "../context/marketContext"

export const useMarket = () => {
    const context = useContext(MarketContext);

    if (!context) {
        throw Error("Market context can only be use inside the provider!")
    }

    return context;
}