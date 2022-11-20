// import Components
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import moment from "moment";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import React from "react";

// import Styles
// import "./_dashboard.scss";

export const DashboardContext = createContext({});

function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [primaryCustomers, setPrimaryCustomers] = useState([]);
  const [primaryProducts, setPrimaryProducts] = useState([]);
  const [primaryInvoices, setPrimaryInvoices] = useState([]);
  const [lastInvoicesData, setLastInvoicesData] = useState([]);

  console.log("TODAT IS : ", moment().format("MMMM, YYYY"));
  console.log("TODAT IS : ", moment().format("DD-MM"));

  console.log("hello we almost finish sir");

  //* ---------------------------- get data function --------------------------- */

  function getData(
    colName,
    setPrimaryValues,
    orderedBy = "name",
    limitNumber = 5000
  ) {
    const col = collection(db, colName);
    const theQuery = query(col, orderBy(orderedBy, "desc"), limit(limitNumber));
    let finalList = [];
    getDocs(theQuery)
      .then((res) => {
        res.docs.map((doc) => {
          finalList.push({ ...doc.data(), id: doc.id });
        });
        setPrimaryValues([...finalList]);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  return (
    <DashboardContext.Provider
      value={{
        setAnalyticsData,
        analyticsData,
        primaryCustomers,
        primaryProducts,
        primaryInvoices,
        setPrimaryCustomers,
        setPrimaryProducts,
        setPrimaryInvoices,
        lastInvoicesData,
        setLastInvoicesData,
        getData,
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

export default React.memo(Dashboard);
