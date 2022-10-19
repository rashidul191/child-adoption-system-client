import React from "react";
import DesignDonatePage from "../Shared/Donation/DesignDonatePage";
import DynamicTitle from "../Shared/DynamicTitle/DynamicTitle";
import Agency from "./Agency/Agency";
import Banner from "./Banner/Banner";
import ChildTypes from "./ChildTypes/ChildTypes";

const Home = () => {
  DynamicTitle("");

  return (
    <>
      <Banner></Banner>
      <ChildTypes></ChildTypes>
      <Agency></Agency>
      <DesignDonatePage></DesignDonatePage>
    </>
  );
};

export default Home;
