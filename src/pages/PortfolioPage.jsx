import React, { useEffect, useState } from 'react'
import TotalEquityHeader from '../components/portfolio/TotalEquityHeader'
import CurrentHoldings from '../components/portfolio/CurrentHoldings'

const PortfolioPage = ({ useDashboard, userBalance }) => {
    const { getPortfolio, portfolioLoading, portError } = useDashboard;
    const [portfolio, setPortfolio] = useState([]);
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
            setTotalEquity(PNL + userBalance)
        }
        updateDetails();
    }, [portfolio, userBalance])
    return (
        <div className='text-text-main mt-2 lg:p-10 lg:min-h-180 h-fit flex flex-col items-center lg:block'>
            <TotalEquityHeader totalEquity={totalEquity} userBalance={userBalance} isLoading={portfolioLoading} openPosition={openPosition} />
            <CurrentHoldings portfolio={portfolio} portError={portError} />
        </div>
    )
}

export default PortfolioPage