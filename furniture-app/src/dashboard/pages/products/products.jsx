// Import Component
import ProductsTable from "../../components/tables/productsTable";
import NewProductPopup from "../../components/popups/newProduct/newProductPopup";
import { ProductDetailShow } from "../../../Components/Product_Page";
import { MantineProvider, Group, Button, Tabs, Modal } from "@mantine/core";

// Import Data
import { defaultProduct } from "../../../Website-Assets";

import { add, sale } from "../../components/icons";
import React, { useContext, useEffect, useState } from "react";
import ListFilter from "../../components/filtering/listFilter";
import { DashboardContext } from "../../Dashboard";
import { db } from "../../../firebase/firebaseConfig";
import { BiRefresh } from "react-icons/bi";

//* ---------------------------- Products Widgets ---------------------------- */

function Widgets({ allProducts, stock, outStock }) {
  return (
    <section className="widgets">
      <div className="widget-wrapper">
        <div className="widget">
          <h3>NOMBRE DE PRODUITS</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{sale}</span>{" "}
              <span className="status-number">{allProducts}</span>
            </h4>
          </div>
          <div className="widget-rank"></div>
        </div>
        <div className="widget">
          <h3>PRODUITS EN STOCK</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{sale}</span>{" "}
              <span className="status-number">{stock}</span>
            </h4>
          </div>
          <div className="widget-rank"></div>
        </div>
        <div className="widget">
          <h3>PRODUITS HORS STOCK</h3>
          <div className="widget-status">
            <h4>
              <span className="icon">{sale}</span>{" "}
              <span className="status-number">{outStock}</span>
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
    label: "Nom",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Catégorie",
  },

  {
    id: "priceHT",
    numeric: true,
    disablePadding: false,
    label: "Prix H.T",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Prix TTC",
  },
  {
    id: "pricePromotion",
    numeric: true,
    disablePadding: false,
    label: "Prix de promotion",
  },
  {
    id: "productStatus",
    numeric: true,
    disablePadding: false,
    label: "Statut",
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
  priceHT,
  price,
  pricePromotion,
  productStatus,
  currentProduct
) {
  return {
    id,
    productImg,
    name,
    category,
    priceHT,
    price,
    pricePromotion,
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
          product?.priceHT.price,
          product?.price,
          product?.pricePromotion,
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
      Ajouter Produit
    </Button>
  );

  return (
    <>
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
                "#FF0000",
                "#FF0000",
              ],
            },
          }}
        >
          <Group position="apart">
            <h1 className="dash-title">Products</h1>
            <Button
              variant="outline"
              radius={"none"}
              size={"sm"}
              rightIcon={<BiRefresh size={24} />}
              onClick={() => setRefresh(true)}
            >
              Actualiser
            </Button>
          </Group>
          <Widgets
            allProducts={rows.length}
            stock={
              [
                ...primaryProducts.filter(
                  (row) => row.productStatus === "inStock"
                ),
              ].length
            }
            outStock={
              [
                ...primaryProducts.filter(
                  (row) => row.productStatus === "outStock"
                ),
              ].length
            }
          />
          <Tabs
            defaultValue={"all"}
            value={generalStatus}
            onTabChange={setGeneralStatus}
            radius={"none"}
            color={"red"}
          >
            <Tabs.List grow>
              <Tabs.Tab value="all">Tout</Tabs.Tab>
              <Tabs.Tab value="inStock">EN STOCK</Tabs.Tab>
              <Tabs.Tab value="outStock">EN RUPTURE</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <ListFilter
            primaryValues={primaryProducts}
            setFilteredValues={setFilteredProducts}
            chipsFilter={chipsFilter}
            col="ProductsList"
            RightButton={AddProductsBtn}
            date={""}
          />{" "}
        </MantineProvider>
        <ProductsTable
          headCells={headCells}
          rows={rows}
          setProductView={setProductView}
          setEditProductPopup={setEditProductPopup}
        />
      </section>
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
            size="min(1200px,90%)"
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
