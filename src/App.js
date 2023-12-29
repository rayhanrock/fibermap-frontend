import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import Layout from "./layout/MainLayout";
import Page404 from "./pages/Page404";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      errorElement: <Page404 />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
