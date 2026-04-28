import Chart from "../components/dashboard/Chart";
import Trade from "../components/dashboard/Trade";
import Portfolio from "../components/dashboard/Portfolio";
import MyWatchlist from "../components/dashboard/MyWatchlist";

const Dashboard = ({ useDashboard }) => {
  const dashboard = useDashboard;
  return (
    <div className="bg-dark-bg min-h-screen flex flex-col p-4 gap-6 lg:grid lg:grid-cols-3 lg:p-5 lg:gap-10">
      <div className="lg:col-span-2">
        <Chart dashboard={dashboard} />
        <div className="mt-6 lg:mt-0">
          <Trade dashboard={dashboard} />
          <MyWatchlist dashboard={dashboard} />
        </div>
      </div>
      <Portfolio dashboard={dashboard} />
    </div>
  );
};

export default Dashboard;
