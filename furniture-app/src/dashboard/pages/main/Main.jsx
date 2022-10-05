//* ---------------------------- Import Components --------------------------- */
import Statics from "../../components/statics/statics";
// Import Icons
import { visit, sale, order, user } from "../../components/icons";
import moment from "moment";
import { useContext, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useEffect } from "react";
import { DashboardContext } from "../../Dashboard";

//* --------------------------- Duration Component --------------------------- */

export function DurationSelect() {
  return (
    <div className="dash-duration">
      <select name="status duration" id="status-duration">
        <option value="7">last 7 days</option>
        <option value="30">last month</option>
      </select>
    </div>
  );
}

//* ---------------------------- Widgets Component --------------------------- */

function Widgets() {
  const { analyticsData } = useContext(DashboardContext);
  const [overallStatics, setOverallStatics] = useState({
    visits: 0,
    sales: 0,
    orders: 0,
    newCustomers: 0,
  });

  function getOverallStatics() {
    let visits = 0;
    let sales = 0;
    let orders = 0;
    let newCustomers = 0;
    analyticsData.forEach((current) => {
      visits += current?.visits;
      sales += current?.sales;
      orders += current?.orders;
      newCustomers += current?.newCustomers;
    });

    setOverallStatics((prev) => ({
      ...prev,
      visits,
      sales,
      orders,
      newCustomers,
    }));
    console.log("values are here : ", analyticsData);
  }

  useEffect(() => {
    getOverallStatics();
  }, [analyticsData]);

  return (
    <section className="widgets">
      <DurationSelect />
      <div className="widget-wrapper">
        <div className="widget">
          <h3> Total Visits</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{visit}</span>{" "}
              <span className="status-number">{overallStatics.visits}</span>
            </h4>
          </div>
          <div className="widget-rank">
            <span>3.8%</span>
          </div>
        </div>
        <div className="widget">
          <h3> Total Sales</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{sale}</span>{" "}
              <span className="status-number">{overallStatics.sales} DZD</span>
            </h4>
          </div>
          <div className="widget-rank">
            <span>3.8%</span>
          </div>
        </div>
        <div className="widget">
          <h3> Total Orders</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{order}</span>{" "}
              <span className="status-number">{overallStatics.orders}</span>
            </h4>
          </div>
          <div className="widget-rank">
            <span>3.8%</span>
          </div>
        </div>
        <div className="widget">
          <h3> Total Users</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{user}</span>{" "}
              <span className="status-number">
                {overallStatics.newCustomers}
              </span>
            </h4>
          </div>
          <div className="widget-rank">
            <span>3.8%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

//* ----------------------------- Main Component ----------------------------- */
function Main() {
  // useEffect(() => {
  //   let smallObj = [];
  //   const docRef = doc(db, "Testing", "Max");
  //   for (let i = 0; i <= 1000; i++) {
  //     smallObj.push({
  //       name: "Madara" + i,
  //       age: i * 5,
  //       address: "abs" + i * 3,
  //       workout: i + i,
  //     });
  //   }
  //   updateDoc(docRef, { MAX_RANGE: [...smallObj] });
  // }, []);

  return (
    <section className="main in-dash-container">
      <h1 className="dash-title">Dashboard</h1>
      <Widgets />
      <Statics />
    </section>
  );
}

export default Main;
