import Chart from "../components/dashboard/Chart";
import Trade from "../components/dashboard/Trade";
import Portfolio from "../components/dashboard/Portfolio";

import useDashboard from "../hooks/useDashboard";

const Dashboard = () => {
  const dashboard = useDashboard();
  return (
    <div className="bg-dark-bg h-fit grid grid-cols-1 lg:grid-cols-3 p-5 gap-10">
      <Chart dashboard={dashboard} />
      <Trade dashboard={dashboard} />
      <Portfolio dashboard={dashboard} />
    </div>
  );
};

export default Dashboard;
