import { add, filter, search, visit } from "../../components/icons";
import ProductsTable from "../../components/tables/productsTable";
import { customersList } from "../../../Website-Assets";
import { Products_Catalog } from "../../../Website-Assets";

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
  productStatus
) {
  return {
    id,
    productImg,
    name,
    category,
    productQuantity,
    price,
    productStatus,
  };
}

let rows = [];
Products_Catalog.map((product) => {
  rows.push(
    createData(
      product.id,
      product.img,
      product.name,
      product.category,
      product.productQuantity,
      product.price,
      product.productStatus
    )
  );
});

function Products() {
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
            <span className="text">Add Product</span>
          </button>
        </div>
      </div>

      <ProductsTable headCells={headCells} rows={rows} />
    </section>
  );
}

export default Products;
