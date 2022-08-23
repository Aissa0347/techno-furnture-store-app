import CustomersTable from "../../components/tables/customerTable";
import { customersList } from "../../../Website-Assets";

import { visit } from "../../components/icons";

//* ------------------------------ Table Cell's and Rows ------------------------------ */

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Full Name",
  },
  {
    id: "mobileNumber",
    numeric: true,
    disablePadding: false,
    label: "Mobile Number",
  },
  {
    id: "joinDate",
    numeric: true,
    disablePadding: false,
    label: "Join Date",
  },
  {
    id: "numOfOrders",
    numeric: true,
    disablePadding: false,
    label: "Orders",
  },
  {
    id: "amountSpent",
    numeric: true,
    disablePadding: false,
    label: "SPENT",
  },
];

function createData(
  id,
  avatarImg,
  firstName,
  lastName,
  mobileNumber,
  joinDate,
  numOfOrders,
  amountSpent
) {
  return {
    id,
    avatarImg,
    name: firstName + " " + lastName,
    lastName,
    mobileNumber,
    joinDate,
    numOfOrders,
    amountSpent,
  };
}

let rows = [];
customersList.map((customer) => {
  rows.push(
    createData(
      customer.id,
      customer.avatarImg,
      customer.firstName,
      customer.lastName,
      customer.mobileNumber,
      customer.joinDate,
      customer.numOfOrders,
      customer.amountSpent
    )
  );
});

//* ------------------------- Customer Main Component ------------------------ */

function Customer() {
  return (
    <section className="in-dash-container">
      <h1 className="dash-title">Customers</h1>
      <div className="dash-search-filter customer-filter">
        <button className="icon-btn">{visit}</button>
        <input
          type="text"
          id="customer-search"
          placeholder="Search Customers..."
        />
      </div>
      <CustomersTable headCells={headCells} rows={rows}></CustomersTable>
    </section>
  );
}

export default Customer;
