import { toggleSideBar } from "../navbar/navbar";
//  import Libraries
import { Link } from "react-router-dom";
import { useClickOutside } from "@mantine/hooks";

// import Icons
import { Dashboard, Users, Products, Invoices, menu } from "../icons";

function Sidebar() {
  const sidebarRef = useClickOutside(() => toggleSideBar("remove"));

  return (
    <aside className="sidebar" ref={sidebarRef} id="sidebar">
      <div className="menu-icon icon center">
        <span className="icon center" onClick={toggleSideBar}>
          {" "}
          {menu}
        </span>
      </div>
      <nav className="navLinks">
        <ul>
          <li className="link">
            <Link to={"/dashboard"} onClick={toggleSideBar}>
              <span className="dash-icon "> {Dashboard}</span>{" "}
              <span className="link-text">Dashboard</span>
            </Link>
          </li>
          <li className="link">
            <Link to={"customers"} onClick={toggleSideBar}>
              <span className="dash-icon "> {Users}</span>{" "}
              <span className="link-text">Customers</span>
            </Link>
          </li>
          <li className="link">
            <Link to={"products"} onClick={toggleSideBar}>
              <span className="dash-icon "> {Products}</span>{" "}
              <span className="link-text">Products</span>
            </Link>
          </li>
          <li className="link">
            <Link to={"invoices"} onClick={toggleSideBar}>
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
