//* ---------------------------- Import Components --------------------------- */
import Statics from "../../components/statics/statics";
// Import Icons
import { visit, sale, order, user } from "../../components/icons";
import moment from "moment";
import { useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useEffect } from "react";

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

function Widgets({ analyticsData }) {
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
  const [analyticsData, setAnalyticsData] = useState([]);
  console.log("TODAT IS : ", moment().format("MMMM, YYYY"));
  console.log("TODAT IS : ", moment().format("DD-MM"));

  function getAnalytics() {
    const defaultDayStatics = {
      visits: 1,
      sales: 0,
      orders: 0,
      ordersStatus: { completed: 0, returned: 0, ongoing: 0, cancelled: 0 },
    };
    const idOfCollection = moment().format("MMMM, YYYY");
    const nameOfDayObject = moment().format("DD-MM");
    const monthDocRef = doc(db, "AnalyticsData", idOfCollection);
    getDoc(monthDocRef)
      .then((res) => {
        let arrayOfValues = Object.values(res.data());
        setAnalyticsData(arrayOfValues);
      })
      .catch((error) => console.log(error.message, error.code));
  }

  console.log("analytics are here sir : ", analyticsData);
  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <section className="main in-dash-container">
      <h1 className="dash-title">Dashboard</h1>
      <Widgets analyticsData={analyticsData} />
      <Statics analyticsData={analyticsData} />
    </section>
  );
}

export default Main;
