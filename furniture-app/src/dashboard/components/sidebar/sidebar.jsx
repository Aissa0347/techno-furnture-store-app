//  import Libraries
import { Link } from "react-router-dom";

// import Icons
import { Dashboard, Users, Products, Invoices, menu } from "../icons";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="menu-icon icon center">
        <span className="icon center"> {menu}</span>
      </div>
      <nav className="navLinks">
        <ul>
          <li className="link">
            <Link to={"/dashboard"}>
              <span className="dash-icon "> {Dashboard}</span>{" "}
              <span className="link-text">Dashboard</span>
            </Link>
          </li>
          <li className="link">
            <Link to={"customers"}>
              <span className="dash-icon "> {Users}</span>{" "}
              <span className="link-text">Customers</span>
            </Link>
          </li>
          <li className="link">
            <Link to={"products"}>
              <span className="dash-icon "> {Products}</span>{" "}
              <span className="link-text">Products</span>
            </Link>
          </li>
          <li className="link">
            <Link to={"invoices"}>
              <span className="dash-icon "> {Invoices}</span>{" "}
              <span className="link-text">Invoices</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
