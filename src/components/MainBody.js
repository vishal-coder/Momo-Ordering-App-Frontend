import React from "react";
import { Outlet } from "react-router-dom";

function MainBody() {
  return (
    <div>
      <div className="mainBody">
        <Outlet />
      </div>
    </div>
  );
}

export default MainBody;
