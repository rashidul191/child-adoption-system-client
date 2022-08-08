import React from "react";
import { Routes, Route } from "react-router-dom";
import AllChild from "./Pages/Home/ChildTypes/AllChild/AllChild";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
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
        <Route path="/childType/:childType" element={<AllChild></AllChild>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
       
        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      
    </div>
  );
}

export default App;
