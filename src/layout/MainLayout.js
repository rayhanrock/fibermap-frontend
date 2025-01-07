import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import { Suspense } from "react";
import { Grid } from "semantic-ui-react";

export default function Layout() {
  return (
    <>
      <Grid columns="equal" padded textAlign="center">
        <Header />
      </Grid>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
