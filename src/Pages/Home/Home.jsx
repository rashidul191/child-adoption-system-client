import React from "react";
import DesignDonatePage from "../Shared/Donation/DesignDonatePage";
import DynamicTitle from "../Shared/DynamicTitle/DynamicTitle";
import Agency from "./Agency/Agency";
import Banner from "./Banner/Banner";
import Blogs from "./Blogs/Blogs";
import ChildTypes from "./ChildTypes/ChildTypes";
import ConsideringFosterCare from "./ConsideringFosterCare/ConsideringFosterCare";
import Subscription from "./Subscription/Subscription";
import TotalActivity from "./TotalActivity/TotalActivity";
import UserReviews from "./UserReviews/UserReviews";

const Home = () => {
  DynamicTitle("");

  return (
    <>
      <Banner></Banner>
      <ChildTypes></ChildTypes>
      <ConsideringFosterCare></ConsideringFosterCare>
      <Agency></Agency>
      <TotalActivity></TotalActivity>
      <DesignDonatePage></DesignDonatePage>
      <Blogs></Blogs>
      <UserReviews></UserReviews>
      <Subscription></Subscription>
    </>
  );
};

export default Home;
