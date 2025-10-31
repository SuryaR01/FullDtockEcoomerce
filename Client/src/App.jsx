import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./Components/Nav";
import AdminLayout from "./Admin/AdminLayout";
import DashBoard from "./Admin/DashBoard";
import AdProduct from "./Admin/AdProduct";

const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
    },
    {
      path: "/admin",
      element: <AdminLayout />, 
      children: [
        {
          index: true, // /admin
          element: <DashBoard />,
        },
        {
          path: "products", // /admin/products
          element: <AdProduct />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
