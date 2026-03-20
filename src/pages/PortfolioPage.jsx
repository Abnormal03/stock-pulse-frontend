import React, { useEffect, useState } from 'react'
import TotalEquityHeader from '../components/portfolio/TotalEquityHeader'
import CurrentHoldings from '../components/portfolio/CurrentHoldings'

const PortfolioPage = ({ useDashboard, userBalance }) => {
    const { getPortfolio, portfolioLoading, portError } = useDashboard;
    const [portfolio, setPortfolio] = useState([]);
    const [profit, setProfit] = useState(0);
    const [totalEquity, setTotalEquity] = useState(0);

    const [openPosition, setOpenPosition] = useState(0);

    useEffect(() => {
        const FetchPortfolio = async () => {
            const portfolio = await getPortfolio();
            if (portfolio) {
                setPortfolio(portfolio);
            }
        }

        FetchPortfolio();
    }, [])

    useEffect(() => {
        const updateDetails = () => {
            const PNL = portfolio.reduce((acc, stock) => acc + stock.PL, 0);
            setOpenPosition(portfolio.length);
            setProfit(PNL);
            setTotalEquity(PNL + userBalance)
        }
        updateDetails();
    }, [portfolio, userBalance])
    return (
        <div className='text-text-main lg:p-10 lg:min-h-180 h-fit'>
            <TotalEquityHeader totalEquity={totalEquity} userBalance={userBalance} isLoading={portfolioLoading} openPosition={openPosition} />
            <CurrentHoldings portfolio={portfolio} />
        </div>
    )
}

export default PortfolioPage