import { add, filter, search, visit } from "../../components/icons";
import InovoicesTable from "../../components/tables/invoicesTable";
import { customersList, InvoicesList } from "../../../Website-Assets";

import { sale, order, user } from "../../components/icons";
import React, { useContext, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useState } from "react";
import ListFilter from "../../components/filtering/listFilter";
import { DashboardContext } from "../../Dashboard";
import { Button, Group, MantineProvider, Tabs } from "@mantine/core";
import { BiRefresh } from "react-icons/bi";

//* --------------------------- Head Cells and Rows -------------------------- */

export const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nom",
  },
  {
    id: "orderId",
    numeric: true,
    disablePadding: false,
    label: "Id de commande",
  },
  {
    id: "orderAddress",
    numeric: false,
    disablePadding: false,
    label: "Addresse",
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: false,
    label: "Téléphone",
  },
  {
    id: "inDate",
    numeric: true,
    disablePadding: false,
    label: "La date",
  },
  {
    id: "orderQuantity",
    numeric: true,
    disablePadding: false,
    label: "Qté",
  },
  {
    id: "orderCostHT",
    numeric: true,
    disablePadding: false,
    label: "Coût H.T",
  },
  {
    id: "orderCost",
    numeric: true,
    disablePadding: false,
    label: "Coût TTC",
  },
  {
    id: "orderStatus",
    numeric: true,
    disablePadding: false,
    label: "Statut",
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
        <Group position="apart" mb={16}>
          <h1 className="dash-title">Les commandes</h1>
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
        <Tabs
          defaultValue={"all"}
          value={generalStatus}
          onTabChange={setGeneralStatus}
          radius={"none"}
          color={"red"}
        >
          <Tabs.List grow>
            <Tabs.Tab value="all">TOUT</Tabs.Tab>
            <Tabs.Tab value="pending">EN ATTENT</Tabs.Tab>
            <Tabs.Tab value="completed">COMPLÉTÉ</Tabs.Tab>
            <Tabs.Tab value="ongoing">EN COURS</Tabs.Tab>
            <Tabs.Tab value="returned">RETOUR</Tabs.Tab>
            <Tabs.Tab value="cancelled">ANNULÉ</Tabs.Tab>
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
      </MantineProvider>
      <InovoicesTable headCells={headCells} rows={rows} />
    </section>
  );
}

export default React.memo(Invoices);
