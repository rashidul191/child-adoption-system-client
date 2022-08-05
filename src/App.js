import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Pages/Shared/Footer/Footer";
import Navbar from "./Pages/Shared/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
