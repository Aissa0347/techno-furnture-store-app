import { add, filter, search, visit } from "../../components/icons";
import InovoicesTable from "../../components/tables/invoicesTable";
import { customersList, InvoicesList } from "../../../Website-Assets";

import { sale, order, user } from "../../components/icons";
import { useContext, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useState } from "react";
import ListFilter from "../../components/filtering/listFilter";
import { DashboardContext } from "../../Dashboard";
import { Button, Group, Tabs } from "@mantine/core";
import { BiRefresh } from "react-icons/bi";

//* ---------------------------- Products Widgets ---------------------------- */

function Widgets() {
  return (
    <section className="widgets">
      <div className="widget-wrapper">
        <div className="widget">
          <h3> Total Visits</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{visit}</span>{" "}
              <span className="status-number">168889</span>
            </h4>
          </div>
          <div className="widget-rank"></div>
        </div>
        <div className="widget">
          <h3> Total Sales</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{sale}</span>{" "}
              <span className="status-number">1688$</span>
            </h4>
          </div>
          <div className="widget-rank"></div>
        </div>
      </div>
    </section>
  );
}

//* --------------------------- Head Cells and Rows -------------------------- */

export const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "orderId",
    numeric: true,
    disablePadding: false,
    label: "Order Id",
  },
  {
    id: "orderAddress",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "inDate",
    numeric: true,
    disablePadding: false,
    label: "In Date",
  },
  {
    id: "orderQuantity",
    numeric: true,
    disablePadding: false,
    label: "QTY",
  },
  {
    id: "orderCostHT",
    numeric: true,
    disablePadding: false,
    label: "Cost H.T",
  },
  {
    id: "orderCost",
    numeric: true,
    disablePadding: false,
    label: "Cost TTC",
  },
  {
    id: "orderStatus",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },

  { label: "Actions", isNotSorted: true },
];

export function createData(
  id,
  avatarImg,
  name,
  phoneNumber,
  orderId,
  orderAddress,
  inDate,
  orderQuantity,
  orderCostHT,
  orderCost,
  orderStatus,
  order
) {
  return {
    id,
    avatarImg,
    name,
    phoneNumber,
    orderId,
    orderAddress,
    inDate,
    orderQuantity,
    orderCostHT,
    orderCost,
    orderStatus,
    order,
  };
}

export let rows = [];

function Invoices() {
  const { setPrimaryInvoices, primaryInvoices, getData } =
    useContext(DashboardContext);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [generalStatus, setGeneralStatus] = useState("all");
  const [trigger, setTrigger] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // const invoicesRef = collection(db, "Orders");
  // const getInvoicesList = () => {
  //   getDocs(invoicesRef).then((data) =>
  //     setInvoicesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   );
  // };

  function filterStatus(targetedList, currentStatus) {
    if (currentStatus === "all") return targetedList;
    return targetedList.filter((listItem) => listItem.status === currentStatus);
  }

  //* ------------------- Search Event and Regetting the data ------------------ */

  const chipsFilter = [
    { value: "name", label: "Name" },
    { value: "orderId", label: "Order id" },
    { value: "willaya", label: "Willaya" },
    { value: "address", label: "Address" },
    { value: "orderDate", label: "In date" },
    { value: "phoneNumber", label: "Phone number" },
    { value: "totalQuantity", label: "QTY", format: "number" },
    { value: "totalCostHT", label: "Cost H.T", format: "number" },
    { value: "totalCost", label: "Cost", format: "number" },
    { value: "status", label: "Status" },
  ];

  //? wrap list of customers into the table
  function wrapInvoices(listOfInvoices = primaryInvoices) {
    rows = [];
    listOfInvoices.map((order) => {
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
          order?.totalCostHT || 0,
          order?.totalCost,
          order?.status,
          order
        )
      );
    });
    setTrigger((prev) => !prev);
  }

  useEffect(() => {
    if (primaryInvoices.length < 1 || refresh)
      getData("Orders", setPrimaryInvoices, "orderDate");
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    wrapInvoices(
      filteredInvoices?.length >= 1
        ? filterStatus(filteredInvoices, generalStatus)
        : filterStatus(primaryInvoices, generalStatus)
    );
  }, [filteredInvoices, primaryInvoices, generalStatus]);

  return (
    <section className="dash-products in-dash-container">
      <Group position="apart">
        <h1 className="dash-title">Products</h1>
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
      <Widgets />
      <Tabs
        defaultValue={"all"}
        value={generalStatus}
        onTabChange={setGeneralStatus}
        radius={"none"}
        color={"red"}
      >
        <Tabs.List grow>
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="pending">PENDING</Tabs.Tab>
          <Tabs.Tab value="completed">COMPLETED</Tabs.Tab>
          <Tabs.Tab value="ongoing">ONGOING</Tabs.Tab>
          <Tabs.Tab value="returned">RETURNED</Tabs.Tab>
          <Tabs.Tab value="cancelled">CANCELLED</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <ListFilter
        primaryValues={primaryInvoices}
        setFilteredValues={setFilteredInvoices}
        chipsFilter={chipsFilter}
        col="Orders"
        date={"orderDate"}
        // RightButton={AddProductsBtn}
      />
      <InovoicesTable headCells={headCells} rows={rows} />
    </section>
  );
}

export default Invoices;
