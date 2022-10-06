// import Components
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { createContext, useEffect, useState } from "react";
import moment from "moment";
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// import Styles
// import "./_dashboard.scss";

export const DashboardContext = createContext({});

function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [primaryCustomers, setPrimaryCustomers] = useState([]);
  const [primaryProducts, setPrimaryProducts] = useState([]);
  const [primaryInvoices, setPrimaryInvoices] = useState([]);

  console.log("TODAT IS : ", moment().format("MMMM, YYYY"));
  console.log("TODAT IS : ", moment().format("DD-MM"));

  console.log("hello we almost finish sir");
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

  console.log(
    "analytics are here sir : ",
    analyticsData,
    analyticsData.reverse()
  );
  useEffect(() => {
    getAnalytics();
  }, []);

  //* ---------------------------- get data function --------------------------- */

  function getData(colName, setPrimaryValues, orderedBy = "name") {
    const col = collection(db, colName);
    const theQuery = query(col, orderBy(orderedBy), limit(16));
    let finalList = [];
    getDocs(theQuery)
      .then((res) => {
        res.docs.map((doc) => {
          finalList.push(doc.data());
        });
        setPrimaryValues([...finalList]);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  function goNext(
    colName,
    setPrimaryValues,
    startIn,
    endIn,
    orderedBy = "name"
    // { currentPage, setNextPage }
  ) {
    const col = collection(db, colName);
    const theQuery = query(
      col,
      orderBy(orderedBy),
      startAt(startIn),
      endAt(endIn)
    );
    let finalList = [];
    getDocs(theQuery)
      .then((res) => {
        console.log(res.docs);
        res.docs.map((doc) => {
          finalList.push(doc.data());
        });
        // if (finalList.length >= 30) {
        //   setNextPage(currentPage + 1);
        // }
        console.log("we put here the finalList ", finalList);

        setPrimaryValues((prev) => [...prev, ...finalList]);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  return (
    <DashboardContext.Provider
      value={{
        analyticsData,
        primaryCustomers,
        primaryProducts,
        primaryInvoices,
        setPrimaryCustomers,
        setPrimaryProducts,
        setPrimaryInvoices,
        getData,
        goNext,
      }}
    >
      <div className="dashboard">
        <section className="dash-container">
          <Navbar />
          <Outlet />
        </section>
        <Sidebar />
      </div>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
