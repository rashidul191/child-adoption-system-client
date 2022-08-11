import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChildApplyForm from "./Pages/ChildApplyForm/ChildApplyForm";
import AllChild from "./Pages/Home/ChildTypes/AllChild/AllChild";
import Child from "./Pages/Home/ChildTypes/Child/Child";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register/Register";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";
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

        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
