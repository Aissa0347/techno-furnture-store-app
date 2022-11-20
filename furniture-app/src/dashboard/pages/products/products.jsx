// Import Component
import ProductsTable from "../../components/tables/productsTable";
import NewProductPopup from "../../components/popups/newProduct/newProductPopup";
import { ProductDetailShow } from "../../../Components/Product_Page";
import {
  MantineProvider,
  CloseButton,
  Group,
  Button,
  Tabs,
  Modal,
} from "@mantine/core";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { colProductList } from "../../components/popups/newProduct/newProductPopup.jsx";

// Import Data
import { customersList, defaultProduct } from "../../../Website-Assets";

import { add, filter, search, visit, sale } from "../../components/icons";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../App";
import ListFilter from "../../components/filtering/listFilter";
import { DashboardContext } from "../../Dashboard";
import { db } from "../../../firebase/firebaseConfig";
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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "productQuantity",
    numeric: true,
    disablePadding: false,
    label: "QTY",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "productStatus",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    label: "Actions",
    isNotSorted: true,
  },
];

function createData(
  id,
  productImg,
  name,
  category,
  productQuantity,
  price,
  productStatus,
  currentProduct
) {
  return {
    id,
    productImg,
    name,
    category,
    productQuantity,
    price,
    productStatus,
    currentProduct,
  };
}

let rows = [];

function Products() {
  const { primaryProducts, setPrimaryProducts, getData } =
    useContext(DashboardContext);
  const [newProductPopup, setNewProductPopup] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [generalStatus, setGeneralStatus] = useState("all");
  const [trigger, setTrigger] = useState(true);
  const [editProductPopup, setEditProductPopup] = useState({
    state: false,
    defaultValues: "",
  });
  const [productView, setProductView] = useState({
    state: false,
    currentProduct: defaultProduct,
  });
  const [refresh, setRefresh] = useState(false);

  console.log("check those lists : ", rows);

  function filterStatus(targetedList, currentStatus) {
    if (currentStatus === "all") return targetedList;
    return targetedList.filter(
      (listItem) => listItem.productStatus === currentStatus
    );
  }
  //* ------------------- Search Event and Regetting the data ------------------ */

  const chipsFilter = [
    { value: "name", label: "Name" },
    { value: "category", label: "Category" },
    { value: "productQuantity", label: "QTY" },
    { value: "productStatus", label: "Status" },
    { value: "price", label: "Price", format: "number" },
  ];

  //? wrap list of customers into the table
  function wrapProducts(ProductsList = primaryProducts) {
    rows = [];
    ProductsList.map((product) => {
      rows.push(
        createData(
          product?.id,
          product?.img[0]?.url,
          product?.name,
          product?.category,
          product?.productQuantity,
          product?.price,
          product?.productStatus,
          product
        )
      );
    });
    setTrigger((prev) => !prev);
  }

  useEffect(() => {
    if (primaryProducts.length < 1 || refresh)
      getData("ProductsList", setPrimaryProducts);
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    wrapProducts(
      filteredProducts?.length >= 1
        ? filterStatus(filteredProducts, generalStatus)
        : filterStatus(primaryProducts, generalStatus)
    );
  }, [filteredProducts, primaryProducts, generalStatus]);

  const AddProductsBtn = ({ radius, size }) => (
    <Button
      size={size}
      radius={radius}
      style={{ backgroundColor: "#d96b52" }}
      leftIcon={
        <span style={{ width: "18px", marginRight: "0.5rem" }}>{add}</span>
      }
      onClick={() => setNewProductPopup(true)}
    >
      Add Products
    </Button>
  );

  return (
    <>
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
            <Tabs.Tab value="inStock">IN STOCK</Tabs.Tab>
            <Tabs.Tab value="outStock">OUT STOCK</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <ListFilter
          primaryValues={primaryProducts}
          setFilteredValues={setFilteredProducts}
          chipsFilter={chipsFilter}
          col="ProductsList"
          RightButton={AddProductsBtn}
          date={""}
        />
        <ProductsTable
          headCells={headCells}
          rows={rows}
          setProductView={setProductView}
          setEditProductPopup={setEditProductPopup}
        />
      </section>
      <MantineProvider>
        {newProductPopup && (
          <section className="popup-bg">
            <NewProductPopup setClose={setNewProductPopup} />
          </section>
        )}
        {editProductPopup.state && (
          <section className="popup-bg">
            <NewProductPopup
              setClose={setEditProductPopup}
              primaryValues={editProductPopup.defaultValues}
              typeOfForm="edit"
            />
          </section>
        )}
        {productView.state && (
          <Modal
            transition="slide-down"
            transitionDuration={300}
            size="xl"
            radius="none"
            title={<h3>Product detail</h3>}
            withCloseButton={true}
            onClose={() =>
              setProductView((prev) => ({ ...prev, state: false }))
            }
            opened={true}
            className="product_page"
          >
            <ProductDetailShow
              className="dash-product-dash"
              currentProduct={productView.currentProduct}
            />
          </Modal>
        )}
      </MantineProvider>
    </>
  );
}

export default React.memo(Products);
