import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Component/Main_Page/Navbar";
import Main from "./Component/Main_Page/Main";
import About from "./Component/About/About.jsx";
import NvidiaPages from "./Component/nvidia/Nv";
import AmdPages from "./Component/amd/Amd";
import NvPage from "./Component/nvidia/NvPage";
import IntelPages from "./Component/intel/Intel.jsx";
import IntelPage from "./Component/intel/IntelPage";
import AmdPage from "./Component/amd/AmdPage";
import Create from "./Component/Create/Create.jsx";
import Search from "./Component/Search/Search.jsx";
import Login from "./Component/Login/Login.jsx";
import Signup from "./Component/Login/Signup.jsx";
import { AuthProvider } from "./Component/AuthContext.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css"

function App() {

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Nav className="awok" />
        <Routes>
          <Route path="home" element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="amd" element={<AmdPages />} />
          <Route path="amd/:id" element={<AmdPage />} />
          <Route path="nvd" element={<NvidiaPages />} />
          <Route path="nvidia/:id" element={<NvPage />} />
          <Route path="intel" element={<IntelPages />} />
          <Route path="intel/:id" element={<IntelPage />} />
          <Route path="create" element={<Create />} />
          <Route path="search" element={<Search />} />
          <Route index element={<Login />} />
          <Route path="sign" element={<Signup />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
