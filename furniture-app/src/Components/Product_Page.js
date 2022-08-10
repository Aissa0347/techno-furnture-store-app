import React, { useContext, useEffect, useState } from "react";

// import Icons

// import Components needed
import { MediaSlider, SuggestedProducts } from "./Products";
import { NewsLetter } from "./Home";
import { Cards } from "./Card";
import { GlobalContext } from "../App";

// import DATA
import { Products_Catalog, defaultProduct } from "../Website-Assets";

// import Styles
import "../styles/index.scss";
import { BiChevronLeft, BiHeart } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

// import Helper Functions
// import { findCurrentProduct } from "../App";

//* --------------------------- Product Media Show -------------------------- */

function ProductDetailShow(props) {
  const [isLoading, setIsLoading] = useState(true);
  window.onloadeddata = () => {
    setIsLoading(false);
  };
  return (
    <>
      <div className="destination">
        <span>
          Home &nbsp;/&nbsp; Catalog &nbsp;/&nbsp; {props.currentProduct.name}
        </span>
      </div>
      <div className="product-show">
        <div className="product-show-media">
          <MediaSlider />
        </div>
        <div className="product-info">
          <ProductInfo
            {...props.currentProduct}
            currentProduct={props.currentProduct}
          />
        </div>
      </div>
    </>
  );
}

//* --------------------------- Product Detail Show -------------------------- */

function ProductInfo({
  name,
  price,
  category,
  mark,
  id,
  description,
  demonsion,
  details,
  currentProduct,
}) {
  const {
    isFavorite,
    addToFavorite,
    toggleToFavorite,
    favoriteProducts,
    setFavoriteProducts,
    cardProducts,
    setCardProducts,
  } = useContext(GlobalContext);
  let isSaved = isFavorite(currentProduct, favoriteProducts);
  return (
    <>
      <ul>
        <li className="product_name info">
          <span>{category}</span>
          <h2>
            <strong>{name}</strong>
          </h2>
        </li>
        <li className="product_maker info">
          <h4>Made by:</h4>
          <img src={mark} alt="" />
        </li>
        <li className="product_dimensions info">
          <h4>Dimensions:</h4>
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <small>Width-</small>&nbsp;{demonsion.width}m
                </th>
                <th>
                  <small>Height-</small>&nbsp;{demonsion.height}m
                </th>
                <th>
                  {" "}
                  <small>Depth-</small>&nbsp;{demonsion.depth}m
                </th>
              </tr>
            </thead>
          </table>
        </li>
        <li className="product_description ">
          <p>{description}</p>
        </li>
        <li className="product_colors">
          <h4>Colors:</h4>
          <span className="color"></span>
          <span className="color"></span>
          <span className="color"></span>
          <span className="color"></span>
          <span className="color"></span>
        </li>
        <li className="product_quantity">
          <label htmlFor="quantity">Qty:</label>
          <input type="number" name="quantity" id="quantity" defaultValue={1} />
        </li>
        <li className="product_price">
          <h3> {price} DZD</h3>
        </li>
        <div className="product_btns btns">
          <button
            className="btn CTA"
            onClick={() =>
              addToFavorite(currentProduct, cardProducts, setCardProducts)
            }
          >
            ADD TO CART
          </button>
          <button
            className="btn CTA-2"
            onClick={() =>
              toggleToFavorite(
                currentProduct,
                favoriteProducts,
                setFavoriteProducts
              )
            }
          >
            {isSaved ? (
              <RiHeartFill style={{ color: "red" }} className="fav" />
            ) : (
              <RiHeartLine className="fav" />
            )}
          </button>
        </div>
      </ul>
      <div className="filter-box filter-bar product_details">
        <details className="filter-checkbox" open>
          <summary>
            Details <BiChevronLeft className="chevron" />
          </summary>

          <div className="col">
            <p>
              hello world i want to say this product is a good stuf and i am
              sure that u gonna use it tommorrow
            </p>
          </div>
        </details>
      </div>
    </>
  );
}

//* ------------------------------ Products Page ----------------------------- */

function ProductPage() {
  const { findCurrentProduct } = useContext(GlobalContext);
  const [currentProduct, setCurrentProduct] = useState(defaultProduct);
  let { productId } = useParams();
  useEffect(() => {
    setCurrentProduct(
      findCurrentProduct(Products_Catalog, productId) || defaultProduct
    );
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <div className="product_page page container">
      <ProductDetailShow currentProduct={currentProduct} />
      <SuggestedProducts />
      <NewsLetter />
    </div>
  );
}

export default ProductPage;
