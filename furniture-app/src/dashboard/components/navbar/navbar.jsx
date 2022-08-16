// import Styles
// import "./navbar.scss";

import { Bell, Store } from "../icons";

const logo = require("../../../Website-Assets/logo.png");
const adminImg = require("../../../Website-Assets/Admin.png");

function Navbar() {
  return (
    <div className="dash-navbar">
      <div className="back-btn">
        <button className="btn">{Store} Back to Store</button>
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
