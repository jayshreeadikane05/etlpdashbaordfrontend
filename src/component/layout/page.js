import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";

const Page = () => {
  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Outlet /> {/* This is where different content will be rendered */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
