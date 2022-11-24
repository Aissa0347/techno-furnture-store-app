import CustomersTable from "../../components/tables/customerTable";

import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Button, Group, MantineProvider } from "@mantine/core";
import { BiRefresh } from "react-icons/bi";
import ListFilter from "../../components/filtering/listFilter";
import { DashboardContext } from "../../Dashboard";

//* ------------------------------ Table Cell's and Rows ------------------------------ */

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nom complet",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "téléphone",
  },
  {
    id: "joinDate",
    numeric: true,
    disablePadding: false,
    label: "Date d'inscription",
  },
  {
    id: "numberOfOrders",
    numeric: true,
    disablePadding: false,
    label: "N des commandes",
  },
  {
    id: "amountSpent",
    numeric: true,
    disablePadding: false,
    label: "dépensé",
  },
  {
    label: "Actions",
    isNotSorted: true,
  },
];

function createData(
  id,
  avatarImg,
  name,
  phoneNumber,
  joinDate,
  numberOfOrders,
  amountSpent,
  customer
) {
  return {
    id,
    avatarImg,
    name,
    phoneNumber,
    joinDate,
    numberOfOrders,
    amountSpent,
    customer,
  };
}

//* ------------------- Search Event and Regetting the data ------------------ */

const chipsFilter = [
  { value: "name", label: "Fullname" },
  { value: "phoneNumber", label: "Phone number" },
  { value: "joinDate", label: "Join date" },
  { value: "numberOfOrders", label: "Orders", format: "number" },
  { value: "amountSpent", label: "Spent", format: "number" },
];

//* ------------------------- Customer Main Component ------------------------ */

function Customer() {
  const { setPrimaryCustomers, primaryCustomers, getData } =
    useContext(DashboardContext);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  //* --------------------------- Get Users List Data -------------------------- */

  // const usersCol = collection(db, "Users");

  // function getUsersData() {
  //   let userList = [];
  //   getDocs(usersCol)
  //     .then((users) => {
  //       users.docs.map((user) => {
  //         userList.push(user.data());
  //       });
  //       setCustomers(userList);
  //     })
  //     .catch((error) => {
  //     });
  // }

  //? wrap list of customers into the table
  let rows = [];
  function wrapCustomers(customersList = primaryCustomers) {
    customersList.map((customer) => {
      rows.push(
        createData(
          customer.id,
          customer.avatarImg,
          customer?.firstName
            ? `${customer.firstName} ${customer.lastName}`
            : customer?.name,
          customer.phoneNumber,
          customer.createdAt,
          customer.numberOfOrders,
          customer.amountSpent,
          customer
        )
      );
    });
  }

  wrapCustomers(
    filteredCustomers?.length >= 1 ? filteredCustomers : primaryCustomers
  );

  useEffect(() => {
    if (primaryCustomers.length < 1 || refresh)
      getData("Users", setPrimaryCustomers, "createdAt");
    setRefresh(false);
  }, [refresh]);

  return (
    <section className="in-dash-container">
      <MantineProvider
        theme={{
          colors: {
            blue: [
              "#d7feff",
              "#aaf3ff",
              "#7aebff",
              "#48e1ff",
              "#1ad9ff",
              "#00bfe6",
              "#0095b4",
              "#006a82",
              "#004150",
              "#00171f",
            ],
            red: [
              "#FFDBDC",
              "#FFDBDC",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
            ],
          },
        }}
      >
        <Group position="apart">
          <h1 className="dash-title">Clients</h1>
          <Button
            variant="filled"
            radius={"none"}
            size={"sm"}
            rightIcon={<BiRefresh size={24} />}
            onClick={() => setRefresh((prev) => !prev)}
          >
            Actualiser
          </Button>
        </Group>
        <ListFilter
          primaryValues={primaryCustomers}
          setFilteredValues={setFilteredCustomers}
          chipsFilter={chipsFilter}
          col="Orders"
          date={"createdAt"}
        />{" "}
      </MantineProvider>
      <CustomersTable headCells={headCells} rows={rows}></CustomersTable>
    </section>
  );
}

export default React.memo(Customer);
