//  import Charts
import Visits from "./visits";
import Sales from "./sales";
import Orders from "./orders";
import LastInvoicesTable from "../tables/lastInvoicesTable";
import { createData, rows } from "../../pages/invoices/invoices";
import { useContext, useEffect } from "react";
import { DashboardContext } from "../../Dashboard";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
//* ---------------------------- Statics Component --------------------------- */

function Statics() {
  const { getData, lastInvoicesData, setLastInvoicesData } =
    useContext(DashboardContext);
  const [refresh, setRefresh] = useState(false);
  let rows = [];
  const getLastData = () =>
    getData("Orders", setLastInvoicesData, "orderDate", 5);

  useEffect(() => {
    if (lastInvoicesData.length < 1 || refresh) getLastData();
    getLastData();
    setRefresh(false);
  }, [refresh]);

  rows = [];
  lastInvoicesData.map((order) => {
    rows.push(
      createData(
        order?.id,
        order?.avatarImg,
        order?.firstName
          ? order?.firstName + " " + order?.lastName
          : order?.fullName,
        order?.phoneNumber,
        order?.orderId,
        order?.willaya + ", " + order?.address,
        order?.orderDate,
        order?.totalQuantity,
        order?.totalCost,
        order?.status,
        order
      )
    );
  });

  useEffect(() => {
    onSnapshot(doc(db, "Notifications", "Orders-Notifications"), (res) => {
      console.log("other snapshot ");
      if (res?.metadata?.hasPendingWrites) {
        getLastData();
      }
    });
  }, []);

  return (
    <div className="statics-wrapper">
      <section className="analyse">
        <Visits />
        <Sales />
      </section>
      <section className="statics-order-invoices">
        <Orders />
        <div className="last-invoices">
          <Group position="apart">
            <h2>Last Invoices</h2>
            <Link to="invoices">
              <Button size="sm" radius={"none"} variant="light">
                View all
              </Button>
            </Link>
          </Group>
          <LastInvoicesTable rows={rows} />
        </div>
      </section>
    </div>
  );
}

export default Statics;
