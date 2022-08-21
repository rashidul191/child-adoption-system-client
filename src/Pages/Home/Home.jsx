import React from "react";
import Agency from "./Agency/Agency";
import Banner from "./Banner/Banner";
import ChildTypes from "./ChildTypes/ChildTypes";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <ChildTypes></ChildTypes>
      <Agency></Agency>
    </>
  );
};

export default Home;
