import { add, filter, search, visit } from "../../components/icons";
import InovoicesTable from "../../components/tables/invoicesTable";
import { customersList, InvoicesList } from "../../../Website-Assets";

import { sale, order, user } from "../../components/icons";

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
    numeric: true,
    disablePadding: false,
    label: "Address",
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
    label: "Order Quantity",
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
  orderId,
  orderAddress,
  inDate,
  orderQuantity,
  orderCost,
  orderStatus
) {
  return {
    id,
    avatarImg,
    name,
    orderId,
    orderAddress,
    inDate,
    orderQuantity,
    orderCost,
    orderStatus,
  };
}

export let rows = [];
InvoicesList.map((order) => {
  rows.push(
    createData(
      order.id,
      order.avatarImg,
      order.name,
      order.orderId,
      order.orderAddress,
      order.inDate,
      order.orderQuantity,
      order.orderCost,
      order.orderStatus
    )
  );
});

function Invoices() {
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
