import CustomersTable from "../../components/tables/customerTable";
import { customersList, defaultUser } from "../../../Website-Assets";

import { search, visit } from "../../components/icons";
import { useMemo, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useCallback } from "react";

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
  {
    label: "Actions",
    isNotSorted: true,
  },
  { label: "", isNotSorted: true },
];

function createData(
  id,
  avatarImg,
  name,
  mobileNumber,
  joinDate,
  numberOfOrders,
  amountSpent
) {
  return {
    id,
    avatarImg,
    name,
    mobileNumber,
    joinDate,
    numberOfOrders,
    amountSpent,
  };
}

//* ------------------------- Customer Main Component ------------------------ */

function Customer() {
  const [customers, setCustomers] = useState([defaultUser]);
  let rows = [];
  customers.map((customer) => {
    rows.push(
      createData(
        customer.id,
        customer.avatarImg,
        customer.name,
        customer.mobileNumber,
        customer.createdAt,
        customer.numberOfOrders,
        customer.amountSpent
      )
    );
  });

  //* --------------------------- Get Users List Data -------------------------- */
  const usersCol = collection(db, "Users");

  function getUsersData() {
    let userList = [];
    console.log("heyyy friend");
    getDocs(usersCol)
      .then((users) => {
        users.docs.map((user) => {
          userList.push(user.data());
        });
        setCustomers(userList);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <section className="in-dash-container">
      <h1 className="dash-title">Customers</h1>
      <div className="dash-search-filter customer-filter">
        <button className="icon-btn">{search}</button>
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
