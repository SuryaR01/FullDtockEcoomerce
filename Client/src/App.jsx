import React from "react";

import Nav from "./Components/Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";


const App = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
