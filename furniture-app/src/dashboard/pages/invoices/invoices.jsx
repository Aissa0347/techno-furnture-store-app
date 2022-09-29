import { add, filter, search, visit } from "../../components/icons";
import InovoicesTable from "../../components/tables/invoicesTable";
import { customersList, InvoicesList } from "../../../Website-Assets";

import { sale, order, user } from "../../components/icons";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useState } from "react";

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
  const [invoicesList, setInovicesList] = useState([]);

  const invoicesRef = collection(db, "Orders");
  const getInvoicesList = () => {
    getDocs(invoicesRef).then((data) =>
      setInovicesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };
  useEffect(() => {
    getInvoicesList();
  }, []);

  console.log("inovices here : ", invoicesList);

  rows = [];
  invoicesList.map((order) => {
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

  return (
    <section className="dash-products in-dash-container">
      <h1 className="dash-title">Products</h1>
      <Widgets />
      <div className="filters newProducts">
        <div className="dash-search-filter customer-filter">
          <button className="icon-btn">{search}</button>
          <input
            type="text"
            id="customer-search"
            placeholder="Search Products..."
          />
        </div>
        <div className="filter-btn">
          <button className="icon-btn">{filter}</button>
        </div>
        <div className="new-product">
          <button className="icon-btn">
            <span className="icon ">{add}</span>&nbsp;
            <span className="text">Add Invoice</span>
          </button>
        </div>
      </div>

      <InovoicesTable headCells={headCells} rows={rows} />
    </section>
  );
}

export default Invoices;
