import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function MainBody() {
  return (
    <div>
      <div className="mainBody">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default MainBody;
