import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChildApplyForm from "./Pages/ChildApplyForm/ChildApplyForm";
import AddAgency from "./Pages/Dashboard/AddAgency/AddAgency";
import AddChild from "./Pages/Dashboard/AddChild/AddChild";
import AgencyManage from "./Pages/Dashboard/AgencyManage/AgencyManage";
import AllDonation from "./Pages/Dashboard/AllDonation/AllDonation";
import CheckApplyResult from "./Pages/Dashboard/CheckApplyResult/CheckApplyResult";
import CheckForApply from "./Pages/Dashboard/CheckForApply/CheckForApply";
import ChildManage from "./Pages/Dashboard/ChildManage/ChildManage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import MyProfile from "./Pages/Dashboard/MyProfile/MyProfile";
import MyReview from "./Pages/Dashboard/MyReview/MyReview";
import AgencyInfo from "./Pages/Home/Agency/AgencyInfo/AgencyInfo";
import AllAgency from "./Pages/Home/Agency/AllAgency/AllAgency";
import AllChild from "./Pages/Home/ChildTypes/AllChild/AllChild";
import Child from "./Pages/Home/ChildTypes/Child/Child";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register/Register";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";
import Donation from "./Pages/Shared/Donation/Donation";
import Footer from "./Pages/Shared/Footer/Footer";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import NotFound from "./Pages/Shared/NotFound/NotFound";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/childType/:childType"
          element={<AllChild></AllChild>}
        ></Route>
        <Route path="/child/:id" element={<Child></Child>}></Route>
        <Route path="/all-agency" element={<AllAgency></AllAgency>}></Route>
        <Route path="/donation" element={<Donation></Donation>}></Route>
        <Route path="/agency/:id" element={<AgencyInfo></AgencyInfo>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/child-adaption-form"
          element={
            <RequireAuth>
              <ChildApplyForm></ChildApplyForm>
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path="review" element={<MyReview></MyReview>}></Route>
          <Route
            path="check-eligibility"
            element={<CheckForApply></CheckForApply>}
          ></Route>
          <Route
            path="eligibility-score"
            element={<CheckApplyResult></CheckApplyResult>}
          ></Route>
          <Route path="add-child" element={<AddChild></AddChild>}></Route>
          <Route
            path="child-manage"
            element={<ChildManage></ChildManage>}
          ></Route>
          <Route path="add-agency" element={<AddAgency></AddAgency>}></Route>
          <Route
            path="agency-manage"
            element={<AgencyManage></AgencyManage>}
          ></Route>
          <Route path="user-manage" element={<MakeAdmin></MakeAdmin>}></Route>
          <Route
            path="all-donation"
            element={<AllDonation></AllDonation>}
          ></Route>
        </Route>

        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
