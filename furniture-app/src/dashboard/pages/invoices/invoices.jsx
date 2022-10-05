import { add, filter, search, visit } from "../../components/icons";
import InovoicesTable from "../../components/tables/invoicesTable";
import { customersList, InvoicesList } from "../../../Website-Assets";

import { sale, order, user } from "../../components/icons";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useState } from "react";
import ListFilter from "../../components/filtering/listFilter";

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
    id: "address",
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
    id: "orderCost",
    numeric: true,
    disablePadding: false,
    label: "Cost",
  },
  {
    id: "orderStatus",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  { label: "Actions", isNotSorted: true },
  { label: "", isNotSorted: true },
];

function createData(
  id,
  avatarImg,
  name,
  phoneNumber,
  orderId,
  orderAddress,
  inDate,
  orderQuantity,
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
    orderCost,
    orderStatus,
    order,
  };
}

export let rows = [];

function Invoices() {
  const [invoicesList, setInvoicesList] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  const invoicesRef = collection(db, "Orders");
  const getInvoicesList = () => {
    getDocs(invoicesRef).then((data) =>
      setInvoicesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };
  useEffect(() => {
    getInvoicesList();
  }, []);

  console.log("inovices here : ", invoicesList);

  //* ------------------- Search Event and Regetting the data ------------------ */

  const chipsFilter = [
    { value: "name", label: "Name" },
    { value: "orderId", label: "Order id" },
    { value: "willaya", label: "Willaya" },
    { value: "address", label: "Address" },
    { value: "orderDate", label: "In date" },
    { value: "phoneNumber", label: "Phone number" },
    { value: "totalQuantity", label: "QTY", format: "number" },
    { value: "totalCost", label: "Cost", format: "number" },
    { value: "status", label: "Status" },
  ];

  //? wrap list of customers into the table
  rows = [];
  function wrapInvoices(listOfInvoices = invoicesList) {
    listOfInvoices.map((order) => {
      rows.push(
        createData(
          order?.id,
          order?.avatarImg,
          order?.fullName,
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
  }

  wrapInvoices(filteredInvoices?.length >= 1 ? filteredInvoices : invoicesList);

  return (
    <section className="dash-products in-dash-container">
      <h1 className="dash-title">Products</h1>
      <Widgets />
      <ListFilter
        setFilteredValues={setFilteredInvoices}
        chipsFilter={chipsFilter}
        col="Orders"
        // RightButton={AddProductsBtn}
      />
      <InovoicesTable headCells={headCells} rows={rows} />
    </section>
  );
}

export default Invoices;
