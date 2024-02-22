import { useEffect, useState } from "react";
import { Grid, GridColumn, Segment, Statistic } from "semantic-ui-react";
import { fetchDashboardData } from "../services";

import handleError from "../utility/handleError";

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
  console.log("dashboardData", dashboardData);
  return (
    <>
      <Grid columns="equal" padded textAlign="center">
        <GridColumn>
          <Segment color="black">
            <Statistic
              size="small"
              label="Number of clients"
              value={dashboardData?.total_clients}
            />
          </Segment>
        </GridColumn>

        <GridColumn>
          <Segment color="black">
            <Statistic
              size="small"
              label="Number of POPs"
              value={dashboardData?.total_pop}
            />
          </Segment>
        </GridColumn>
      </Grid>
      <Grid columns="equal" padded textAlign="center">
        <GridColumn>
          <Segment color="black">
            <Statistic
              size="small"
              label="Number of TJ Boxs"
              value={dashboardData?.total_gpons}
            />
          </Segment>
        </GridColumn>

        <GridColumn>
          <Segment color="black">
            <Statistic
              size="small"
              label="Number of cables"
              value={dashboardData?.total_cables}
            />
          </Segment>
        </GridColumn>
      </Grid>
    </>
  );
};
export default Dashboard;
