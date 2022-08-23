// import Styles
// import "./navbar.scss";

import { Bell, Dashboard, menu, Store } from "../icons";

const logo = require("../../../Website-Assets/logo.png");
const adminImg = require("../../../Website-Assets/Admin.png");

function Navbar() {
  return (
    <div className="dash-navbar">
      <div className="dash-left-nav">
        <div className="menu-icon icon ">
          <span className="icon center"> {Dashboard}</span>
        </div>
        <div className="back-btn">
          <button className="btn">
            {Store} <span className="button-text">Back to Store</span>{" "}
          </button>
        </div>
      </div>
      <div className="dash-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="dash-right-nav">
        <div className="dash-icon">{Bell}</div>
        <div className="dash-avatar">
          <img src={adminImg} alt="Admin Image" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
