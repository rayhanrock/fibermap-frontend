import { useEffect, useState } from "react";
import { Grid, GridColumn, Segment, Statistic } from "semantic-ui-react";
import { fetchDashboardData } from "../services";

import handleError from "../utility/handleError";
import CountCard from "../component/ui/CounterCard/CountCard";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDashboardData();
      if (response.data) {
        setDashboardData(response.data);
      }

      if (response.error) {
        handleError(response.error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "20px",
          gap: "20px",
        }}
      >
        <CountCard
          title="Number of clients"
          color="#004953"
          value={dashboardData?.total_clients}
          icon="home"
        />

        <CountCard
          title="Number of resellers"
          color="#7261C9"
          value={dashboardData?.total_resellers}
          icon="dollar sign"
        />
        <CountCard
          title="Number of POPs"
          color="#568203"
          value={dashboardData?.total_pop}
          icon="building"
        />
        <CountCard
          title="Number of TJ Boxes"
          color="#1B9CFC"
          value={dashboardData?.total_gpons}
          icon="linkify"
        />
        <CountCard
          title="Number of cables"
          color="#FEBE10"
          value={dashboardData?.total_cables}
          icon="shuffle"
        />
      </div>
    </>
  );
};
export default Dashboard;
