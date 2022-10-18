import React, { useContext, useEffect, useState } from "react";

// import Icons

// import Components needed
import { MediaSlider, SuggestedProducts } from "./Products";
import { NewsLetter } from "./Home";
import { GlobalContext } from "../App";

// import DATA
import { Products_Catalog, defaultProduct } from "../Website-Assets";

// import Styles
import "../styles/index.scss";
import { BiChevronLeft, BiHeart } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { ColorPicker, TypographyStylesProvider } from "@mantine/core";

// import Helper Functions
// import { findCurrentProduct } from "../App";

//* --------------------------- Product Media Show -------------------------- */

export function ProductDetailShow(props) {
  const { currentProduct } = props;
  const [isLoading, setIsLoading] = useState(true);
  window.onloadeddata = () => {
    setIsLoading(false);
  };
  return (
    <>
      <div className="destination">
        <span>
          Home &nbsp;/&nbsp; Catalog &nbsp;/&nbsp; {currentProduct.name}
        </span>
      </div>
      <div className="product-show">
        <div className="product-show-media">
          <MediaSlider images={currentProduct.img} name={currentProduct.name} />
        </div>
        <div className="product-info">
          <ProductInfo {...currentProduct} currentProduct={currentProduct} />
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
  markName,
  id,
  description,
  dimensions,
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
  const [colorPicked, setColorPicked] = useState();
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
          {/*  <img loading="lazy" src={mark} alt="" /> */}
          <p>{markName}</p>
        </li>
        <li className="product_dimensions info">
          <h4>Dimensions:</h4>
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <small>Width-</small>&nbsp;{dimensions?.width}&nbsp;cm
                </th>
                <th>
                  <small>Height-</small>&nbsp;{dimensions?.height}&nbsp;cm
                </th>
                <th>
                  {" "}
                  <small>Depth-</small>&nbsp;{dimensions?.depth}&nbsp;cm
                </th>
              </tr>
            </thead>
          </table>
        </li>
        <li className="product_description ">
          <p>
            This product is really nice one I would to inform you that our
            product ranked with top 10 of the world
          </p>
        </li>
        <li className="product_colors">
          <h4>Colors:</h4>
          <ColorPicker
            value={colorPicked}
            onChange={setColorPicked}
            withPicker={false}
          />
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
      <div className="filter-box  product_details">
        <details className="filter-checkbox" open>
          <summary>
            Details <BiChevronLeft className="chevron" />
          </summary>

          <div className="col">
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </TypographyStylesProvider>
          </div>
        </details>
      </div>
    </>
  );
}

//* ------------------------------ Products Page ----------------------------- */

function ProductPage() {
  const { findCurrentProduct, ProductsCatalog } = useContext(GlobalContext);
  const [currentProduct, setCurrentProduct] = useState(defaultProduct);
  let { productId } = useParams();
  useEffect(() => {
    setCurrentProduct(
      findCurrentProduct(ProductsCatalog, productId) || defaultProduct
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
