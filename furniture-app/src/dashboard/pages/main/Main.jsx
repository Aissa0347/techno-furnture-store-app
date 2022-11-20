//* ---------------------------- Import Components --------------------------- */
import Statics from "../../components/statics/statics";
// Import Icons
import { visit, sale, order, user } from "../../components/icons";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { DashboardContext } from "../../Dashboard";
import { Button, Group, Select } from "@mantine/core";
import { BiRefresh } from "react-icons/bi";
import React from "react";
import {
  doc,
  endAt,
  getDoc,
  startAt,
  setAnalyticsData,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import moment from "moment";

//* --------------------------- Duration Component --------------------------- */

export function DurationSelect({ timeSelect, setTimeSelect }) {
  console.log("how much time past ", timeSelect);
  return (
    <div className="dash-duration">
      <Select
        data={[
          { label: "Last 7 Days", value: 7 },
          { label: "This Month", value: 31 },
          { label: "Last Month", value: 62 },
        ]}
        onChange={setTimeSelect}
        value={timeSelect}
        size="xs"
        width={120}
        radius="none"
        color="red"
        name="status duration"
        id="status-duration"
        variant="unstyled"
      />
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
      <div className="widget-wrapper">
        <div className="widget">
          <h3> Total Visits</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{visit}</span>{" "}
              <span className="status-number">{overallStatics.visits}</span>
            </h4>
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
        </div>
        <div className="widget">
          <h3> Total Orders</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{order}</span>{" "}
              <span className="status-number">{overallStatics.orders}</span>
            </h4>
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
        </div>
      </div>
    </section>
  );
}

//* ----------------------------- Main Component ----------------------------- */
function Main() {
  const { setAnalyticsData } = useContext(DashboardContext);
  const [refresh, setRefresh] = useState(false);
  const [timeSelect, setTimeSelect] = useState(31);

  function getAnalytics() {
    const defaultDayStatics = {
      visits: 1,
      sales: 0,
      orders: 0,
      ordersStatus: { completed: 0, returned: 0, ongoing: 0, cancelled: 0 },
    };

    let idOfDocument = moment().format("MMMM, YYYY");
    const nameOfDayObject = moment().format("DD-MM");
    let monthDocRef;

    if (timeSelect === 7 || timeSelect === 31) {
      monthDocRef = doc(db, "AnalyticsData", idOfDocument);
    } else {
      monthDocRef = doc(
        db,
        "AnalyticsData",
        moment().subtract(1, "months").format("MMMM, YYYY")
      );
    }

    console.log("inside of get analytics : ");
    getDoc(monthDocRef)
      .then((res) => {
        let arrayOfValues = Object.values(res.data());
        if (timeSelect === 7) {
          setAnalyticsData(
            arrayOfValues
              .sort((prev, next) => prev.date.seconds - next.date.seconds)
              .slice(0, 6)
          );
        } else {
          setAnalyticsData(arrayOfValues);
        }
      })
      .catch((error) => console.log(error.message, error.code));
  }

  useEffect(() => {
    getAnalytics();
    setRefresh(false);
  }, [refresh, timeSelect]);

  return (
    <section className="main in-dash-container">
      <Group position="apart">
        <h1 className="dash-title">Dashboard</h1>
        <Button
          variant="filled"
          radius={"none"}
          size={"sm"}
          rightIcon={<BiRefresh size={24} />}
          onClick={() => setRefresh(true)}
        >
          Refresh
        </Button>
      </Group>
      <DurationSelect timeSelect={timeSelect} setTimeSelect={setTimeSelect} />
      <Widgets />
      <Statics />
    </section>
  );
}

export default React.memo(Main);
