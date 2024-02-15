import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes";
import Layout from "./layout/MainLayout";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import RequireAuth from "./HOC/RequireAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authCheckState } from "./store/auth/actions";

function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/login",
      errorElement: <Page404 />,
    },
    {
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      path: "/",
      errorElement: <Page404 />,
      children: routes,
    },
  ]);

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
