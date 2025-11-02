import React from "react";

import Nav from "./Components/Nav";
import AdminLayout from "./Admin/AdminLayout";
import DashBoard from "./Admin/DashBoard";
import AdProduct from "./Admin/AdProduct";
import LandingPage from "./Components/LandingPage";
import { Outlet } from "react-router-dom";

const App = () => {

  return (
    <div>
      <Nav />
      <Outlet />
      <LandingPage />      
    </div>
  );
};

export default App;
