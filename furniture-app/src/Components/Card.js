import React, { useState, useContext, useEffect } from "react";
import { BiCartAlt, BiShowAlt, BiX } from "react-icons/bi";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

//  Import from Libraries
import { Link } from "react-router-dom";

//  Import Component Nedeed
import { GlobalContext } from "../App";

//* -------------------------------- Category -------------------------------- */

export function Card(props) {
  const { setFilters } = useContext(GlobalContext);
  const { img, name } = props;
  return (
    <div className="card ">
      <Link
        to={"/catalog"}
        onClick={() => {
          setFilters({ category: [name], markName: [] });
          window.scrollTo(0, 0);
        }}
      >
        <div className="imgbx">
          <img src={img} alt={name} />
        </div>
      </Link>
      <h3>{name}</h3>
    </div>
  );
}

//* --------------------------- Products Main Cards -------------------------- */

export function Actions({ currentProduct }) {
  const {
    favoriteProducts,
    setFavoriteProducts,
    cardProducts,
    setCardProducts,
    toggleToFavorite,
    addToFavorite,
    isFavorite,
  } = useContext(GlobalContext);

  let isSaved = isFavorite(currentProduct, favoriteProducts);
  return (
    <div className="actions">
      <div
        className="fav sbtn"
        onClick={() => {
          toggleToFavorite(
            currentProduct,
            favoriteProducts,
            setFavoriteProducts
          );
        }}
      >
        {isSaved ? <RiHeartFill color="#FA0A09" /> : <RiHeartLine />}
      </div>
      <div className="show sbtn">
        <BiShowAlt />
      </div>
      <div
        className="cart sbtn"
        onClick={() => {
          addToFavorite(currentProduct, cardProducts, setCardProducts);
        }}
      >
        <BiCartAlt />
      </div>
    </div>
  );
}

export const Cards = ({ img, name, price, id, currentProduct, markName }) => {
  return (
    <div className="card bx">
      <Link to={`/catalog/${id}`}>
        <div className="imgBx">
          <img src={img} alt={name} />
        </div>
        {/* <h3>{markName}</h3> */}
        <h3>{name}</h3>
      </Link>
      <span>{price} DZD</span>
      <Actions currentProduct={currentProduct} />
    </div>
  );
};

//* ------------------------- Import Unique Cards ------------------------- */

export function UniqueCard({ Product }) {
  const {
    cardProducts,
    removeFromFavorite,
    setCardProducts,
    setSubTotal,
    calcSubTotal,
  } = useContext(GlobalContext);
  const [productNumber, setProductNumber] = useState(
    Product.numberOfProduct || 1
  );
  if (productNumber < 1) {
    console.log(typeof productNumber);
    setProductNumber(1);
  }
  Product.numberOfProduct = productNumber;
  Product.totalProductPrice = Product.price * Product.numberOfProduct;
  useEffect(() => {
    setSubTotal(calcSubTotal());
  }, [productNumber]);

  function defaultNumberAndTotal() {
    Product.totalProductPrice = 0;
    Product.numberOfProduct = 0;
  }
  return (
    <li className="unique_card product-info">
      <div className="img_name">
        <img src={Product.img} alt={Product.name} className="product_image" />
        <div className="product_title">
          <h5>{Product.name}</h5>
          <h4>{Product.category}</h4>
        </div>
      </div>
      <label htmlFor="Qty-input" className="product_quantity">
        {" "}
        Qty:&nbsp;
        <button onClick={() => setProductNumber(+(productNumber + 1))}>
          +
        </button>
        <input
          type="number"
          name="Qty-input"
          id="Qty-input"
          value={Product.numberOfProduct}
          onChange={(event) => setProductNumber(+event.target.value)}
        />
        <button onClick={() => setProductNumber(+(productNumber - 1))}>
          -
        </button>
      </label>
      <h4 className="product_price">{Product.totalProductPrice} DZD</h4>
      <BiX
        className="remove-icon icon"
        onClick={() => {
          removeFromFavorite(Product, cardProducts, setCardProducts);
          defaultNumberAndTotal();
          setSubTotal(calcSubTotal());
        }}
      />
    </li>
  );
}
