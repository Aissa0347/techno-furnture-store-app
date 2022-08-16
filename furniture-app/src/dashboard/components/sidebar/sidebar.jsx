//  import Libraries
import { Link } from "react-router-dom";

// import Icons
import { Dashboard, Users, Products, Invoices } from "../icons";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="menu-icon icon center">
        <span> This is menu</span>
      </div>
      <nav className="navLinks">
        <ul>
          <li className="link">
            <Link to={"/main"}>
              <span className="dash-icon "> {Dashboard}</span> Dashboard
            </Link>
          </li>
          <li className="link">
            <Link to={"/customers"}>
              <span className="dash-icon "> {Users}</span> Customers
            </Link>
          </li>
          <li className="link">
            <Link to={"/products"}>
              <span className="dash-icon "> {Products}</span> Products
            </Link>
          </li>
          <li className="link">
            <Link to={"/invoices"}>
              <span className="dash-icon "> {Invoices}</span> Invoices
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
