// import Styles
// import "./navbar.scss";

import { Bell, Dashboard, menu, Store } from "../icons";
import { Link } from "react-router-dom";

const logo = require("../../../Website-Assets/logo.png");
const adminImg = require("../../../Website-Assets/Admin.png");

export function toggleSideBar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

function Navbar() {
  return (
    <div className="dash-navbar">
      <div className="dash-left-nav">
        <div className="menu-icon icon ">
          <span className="icon center" onClick={toggleSideBar}>
            {" "}
            {menu}
          </span>
        </div>
        <div className="back-btn">
          <Link to="/">
            <button className="btn">
              {Store} <span className="button-text">Back to Store</span>{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className="dash-logo">
        <img loading="lazy" src={logo} alt="Logo" />
      </div>

      <div className="dash-right-nav">
        <div className="dash-icon">{Bell}</div>
        <div className="dash-avatar">
          <img loading="lazy" src={adminImg} alt="Admin Image" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
