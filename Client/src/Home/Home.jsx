import React from "react";
import FlashSaleProduct from "../Components/FlashSaleProduct";
import Category from "../Components/Category";
import LandingPage from "../Components/LandingPage";
import OfferPage from "../Components/OfferPage";
import ExploreProduct from "./ExploreProduct";
import Featured from "./Featured";
import DeleveryDet from "./DeleveryDet";

const Home = () => {
  return (
    <div>
      <LandingPage />
      <Category />
      <FlashSaleProduct />
      <OfferPage />
      <ExploreProduct />
      <Featured />
      <DeleveryDet />
    </div>
  );
};

export default Home;
