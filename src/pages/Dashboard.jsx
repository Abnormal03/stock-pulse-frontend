import Chart from "../components/dashboard/Chart";
import Trade from "../components/dashboard/Trade";
import Portfolio from "../components/dashboard/Portfolio";
import MyWatchlist from "../components/dashboard/MyWatchlist";

const Dashboard = ({ useDashboard }) => {
  const dashboard = useDashboard;
  return (
    <div className="bg-dark-bg h-fit grid grid-cols-1 lg:grid-cols-3 p-5 gap-10">
      <Chart dashboard={dashboard} />
      <div>

        <Trade dashboard={dashboard} />
        {/* the watchlist goes here... */}
        <MyWatchlist dashboard={dashboard} />
      </div>
      <Portfolio dashboard={dashboard} />
    </div>
  );
};

export default Dashboard;
