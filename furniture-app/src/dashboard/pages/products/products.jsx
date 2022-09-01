// Import Component
import ProductsTable from "../../components/tables/productsTable";
import NewProductPopup from "../../components/popups/newProduct/newProductPopup";
import { ProductDetailShow } from "../../../Components/Product_Page";
import { MantineProvider, CloseButton, Group } from "@mantine/core";
import { onSnapshot, collection } from "firebase/firestore";
import { colProductList } from "../../components/popups/newProduct/newProductPopup.jsx";

// Import Data
import { customersList, defaultProduct } from "../../../Website-Assets";

import { add, filter, search, visit, sale } from "../../components/icons";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../App";

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
  {
    label: "",
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

function Products() {
  const { ProductsCatalog, setProductsCatalog } = useContext(GlobalContext);
  const [newProductPopup, setNewProductPopup] = useState(false);
  const [editProductPopup, setEditProductPopup] = useState({
    state: false,
    defaultValues: "",
  });
  const [productView, setProductView] = useState({
    state: false,
    currentProduct: defaultProduct,
  });
  useEffect(() => {
    // let realtimeUpdate = onSnapshot(colProductList, (res) => {
    //   let resData = [];
    //   res.docs.map((doc) => resData.push(doc.data()));
    //   console.log(resData);
    //   setProductsCatalog(resData);
    //   console.log("its done");
    // });
  });

  let rows = [];
  ProductsCatalog.map((product) => {
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

  return (
    <>
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
            <button className="icon-btn"> {filter}</button>
          </div>
          <div className="new-product">
            <button
              className="icon-btn"
              onClick={() => setNewProductPopup(true)}
            >
              <span className="icon ">{add}</span>&nbsp;
              <span className="text">Add Product</span>
            </button>
          </div>
        </div>

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
          <section className="popup-bg ">
            <div className="product-view popup ">
              <Group position="left">
                <CloseButton
                  title="Close popover"
                  size="xl"
                  iconSize={20}
                  onClick={() =>
                    setProductView({ ...productView, state: false })
                  }
                />
              </Group>
              <ProductDetailShow
                className="dash-product-dash"
                currentProduct={productView.currentProduct}
              />
            </div>
          </section>
        )}
      </MantineProvider>
    </>
  );
}

export default Products;
