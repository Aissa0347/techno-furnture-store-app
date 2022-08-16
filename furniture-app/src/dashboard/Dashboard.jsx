// import Components
import Main from "./pages/main/Main";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";

// import Styles
// import "./_dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="dash-container">
        <Navbar />
        <Main />
      </section>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
