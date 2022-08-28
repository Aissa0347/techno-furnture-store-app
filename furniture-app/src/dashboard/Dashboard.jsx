// import Components
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

// import Styles
// import "./_dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="dash-container">
        <Navbar />
        <Outlet />
      </section>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
