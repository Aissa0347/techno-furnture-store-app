import React, { useContext, useEffect, useState } from "react";
import logo from "../Website-Assets/logo.png";
import {
  BiCategory,
  BiChevronDown,
  BiCreditCard,
  BiCurrentLocation,
  BiHome,
  BiMessageDetail,
  BiShoppingBag,
  BiStore,
  BiUser,
  BiX,
} from "react-icons/bi";
import { RiHeartLine, RiMenuFill } from "react-icons/ri";
import "../styles/index.scss";

//  import Components
import App, { GlobalContext, scrollToTop } from "../App";
import { UniqueCard } from "./Card";
import { ShoppingCartList } from "./Products";
import { Footer } from "./Home";

//  import libraries
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

//  import SVG's
import EMPTY_CART from "../Website-Assets/SVG/EMPTY_CART.svg";
import FAVORITE_SVG from "../Website-Assets/SVG/FAVORITE_SVG (2).svg";
import AvatarProfile from "./smallComponents/avatarProfile/avatarProfile";

//* --------------------------- Bag Side Component --------------------------- */

function ShoppingBag({ cardProducts, showCardProducts, setShowCardProducts }) {
  const { removeFromFavorite, setCardProducts, subTotal } =
    useContext(GlobalContext);
  console.log(subTotal);

  console.log("check if it;s updated : ", cardProducts);
  // set on value change subtotal change also
  return (
    <section
      className="shopping_cart shopping_bag card_products"
      id="card_products"
    >
      <BiX
        className="exit-icon icon"
        onClick={() => {
          let cartProducts = document.getElementById("card_products");
          if (showCardProducts) {
            cartProducts.classList.remove("active");
            setShowCardProducts(false);
          }
        }}
      />
      <h3 className="title">My Favorite</h3>
      {cardProducts.length < 1 ? (
        <div className="svg-interactions">
          <img src={EMPTY_CART} alt="EMPTY CART" />
        </div>
      ) : (
        <ul className="shopping_cart_list">
          {cardProducts.map((Product) => {
            return <UniqueCard Product={Product} />;
          })}
        </ul>
      )}
      <ul className="shopping_cart_total unique_card">
        <li className="facture_price total">
          <h5 className="cart-total">SUBTOTAL</h5>
          <h5>{`${subTotal}`} DZD</h5>
        </li>
      </ul>
      <div className="btns">
        <Link to={"/ordering"}>
          <button
            className="CTA btn"
            onClick={() => {
              let cartProducts = document.getElementById("card_products");
              if (showCardProducts) {
                cartProducts.classList.remove("active");
                setShowCardProducts(false);
              }
            }}
          >
            Check Out
          </button>
        </Link>
      </div>
    </section>
  );
}

//* ----------------------- Favorite Products Component ---------------------- */

function FavoriteProducts({
  favoriteProducts,
  showFavoriteProducts,
  setShowFavoriteProducts,
}) {
  return (
    <section
      className="shopping_cart shopping_bag favorite_products"
      id="favorite_products"
    >
      <BiX
        className="exit-icon icon"
        onClick={() => {
          let favProducts = document.getElementById("favorite_products");
          if (showFavoriteProducts) {
            favProducts.classList.remove("active");
            setShowFavoriteProducts(false);
          }
        }}
      />
      <h3 className="title">My Favorite</h3>
      {favoriteProducts.length < 1 ? (
        <div className="svg-interactions">
          <img src={FAVORITE_SVG} alt="FAVORITE SVG" />
        </div>
      ) : (
        <ul className="shopping_cart_list">
          {favoriteProducts.map((Product) => {
            return <UniqueCardFav Product={Product} />;
          })}
        </ul>
      )}
    </section>
  );
}

function UniqueCardFav({ Product }) {
  const {
    toggleToFavorite,
    isFavorite,
    addToFavorite,
    removeFromFavorite,
    cardProducts,
    setCardProducts,
    favoriteProducts,
    setFavoriteProducts,
  } = useContext(GlobalContext);
  const [productNumber, setProductNumber] = useState(1);

  return (
    <li className="unique_card product-info">
      <Link to={`catalog/${Product.id}`}>
        <div className="img_name">
          <img
            src={Product.img[0].url}
            alt={Product.name}
            className="product_image"
          />
          <div className="product_title">
            <h5>{Product.name}</h5>
            <h4>{Product.category}</h4>
          </div>
        </div>
      </Link>
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
          value={productNumber}
          onChange={(event) => setProductNumber(+event.target.value)}
        />
        <button onClick={() => setProductNumber(+(productNumber - 1))}>
          -
        </button>
      </label>
      <h4 className="product_price">{Product.price} DZD</h4>
      <BiX
        className="remove-icon icon"
        onClick={() =>
          removeFromFavorite(Product, favoriteProducts, setFavoriteProducts)
        }
      />
      <div className="btns">
        <button
          className="btn CTA"
          onClick={() => {
            addToFavorite(Product, cardProducts, setCardProducts);
            Product.numberOfProduct = productNumber;
            setProductNumber(0);
          }}
        >
          Add to cart
        </button>
      </div>
    </li>
  );
}
//* ---------------------------- Helper Functions ---------------------------- */

// function stickyBar(element) {
//   // console.log(window.pageYOffset);

//   if (window.pageYOffset >= 500) {
//     element.classList.add("onTop");
//   } else if (window.pageXOffset < 550) {
//     element.classList.remove("onTop");
//   }
// }

//* ---------------------------- Navbar Component ---------------------------- */

function Navbar({ favoriteProducts, cardProducts }) {
  const [showFavoriteProducts, setShowFavoriteProducts] = useState(false);
  const [showCardProducts, setShowCardProducts] = useState(false);
  const { currentUserData } = useContext(GlobalContext);
  let favoriteProductsNumber = favoriteProducts.length;
  let cardProductsNumber = cardProducts.length;
  var favProducts = document.getElementById("favorite_products");

  // useEffect(() => {
  //   const barOffset = document.getElementById("navbar").offsetTop;
  //   window.addEventListener("scroll", () =>
  //     stickyBar(document.getElementById("navbar"))
  //   );
  // }, []);
  return (
    <>
      <div className="navbar  " id="navbar">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav className="nav-links">
          <ul>
            <li className="link N-1" onClick={scrollToTop}>
              {" "}
              <Link to="/">Home </Link>
            </li>
            <li className="link N-2">
              <Link to="/catalog">All&nbsp;Products </Link>
            </li>
            <li className="link N-3" onClick={scrollToTop}>
              {" "}
              <Link to="/ordering">Basket</Link>
            </li>
            <li className="link N-3" onClick={scrollToTop}>
              {" "}
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        {/* ------------------------------ Mobile Navbar ------------------------------ */}
        <nav className="nav-links nav-icons">
          <ul>
            <li className="link N-1" onClick={scrollToTop}>
              {" "}
              <Link to="/">
                <BiHome />{" "}
              </Link>
            </li>
            <li className="link N-2">
              <Link to="/catalog">
                <BiStore />{" "}
              </Link>
            </li>
            <li className="link N-3" onClick={scrollToTop}>
              {" "}
              <Link to="/ordering">
                <BiCreditCard />{" "}
              </Link>
            </li>
            <li className="link N-4" onClick={scrollToTop}>
              {" "}
              <Link to="/dashboard">
                <BiCategory />{" "}
              </Link>
            </li>
            <li
              className="icon-set bag"
              onClick={() => {
                setShowCardProducts(!showCardProducts);
                var cartProducts = document.getElementById("card_products");
                if (!showCardProducts) {
                  cartProducts.classList.add("active");
                } else cartProducts.classList.remove("active");
              }}
            >
              <a>
                <BiShoppingBag />
                {cardProductsNumber === 0 ? (
                  ""
                ) : (
                  <span className="product-number">{cardProductsNumber}</span>
                )}
              </a>
            </li>
            <li>
              <div
                className="icon-set favorite"
                onClick={() => {
                  setShowFavoriteProducts(!showFavoriteProducts);
                  var favProducts =
                    document.getElementById("favorite_products");
                  if (!showFavoriteProducts) {
                    favProducts.classList.add("active");
                  } else favProducts.classList.remove("active");
                }}
              >
                <a>
                  <RiHeartLine />
                </a>
                {favoriteProductsNumber === 0 ? (
                  ""
                ) : (
                  <span className="product-number">
                    {favoriteProductsNumber}
                  </span>
                )}
              </div>
            </li>
          </ul>
        </nav>
        {/* ------------------------------ Tablet Navbar ------------------------------ */}
        <div className="icon">
          <div
            className="icon-set bag"
            onClick={() => {
              setShowCardProducts(!showCardProducts);
              var cartProducts = document.getElementById("card_products");
              if (!showCardProducts) {
                cartProducts.classList.add("active");
              } else cartProducts.classList.remove("active");
            }}
          >
            <BiShoppingBag />
            {cardProductsNumber === 0 ? (
              ""
            ) : (
              <span className="product-number">{cardProductsNumber}</span>
            )}
          </div>
          <ShoppingBag
            cardProducts={cardProducts}
            showCardProducts={showCardProducts}
            setShowCardProducts={setShowCardProducts}
          />
          <div
            className="icon-set favorite"
            onClick={() => {
              setShowFavoriteProducts(!showFavoriteProducts);
              var favProducts = document.getElementById("favorite_products");
              if (!showFavoriteProducts) {
                favProducts.classList.add("active");
              } else favProducts.classList.remove("active");
            }}
          >
            <RiHeartLine />
            {favoriteProductsNumber === 0 ? (
              ""
            ) : (
              <span className="product-number">{favoriteProductsNumber}</span>
            )}
          </div>
          <FavoriteProducts
            favoriteProducts={favoriteProducts}
            showFavoriteProducts={showFavoriteProducts}
            setShowFavoriteProducts={setShowFavoriteProducts}
          />
          <div className="icon-set login">
            {currentUserData ? (
              <AvatarProfile />
            ) : (
              <Link to="/auth">
                <BiUser />
              </Link>
            )}
          </div>
          <div
            className="icon-set burger-menu"
            onClick={() => {
              let navLinksStyle = document.querySelector(".nav-links").style;
              navLinksStyle.height === "50px"
                ? (navLinksStyle.height = "0px")
                : (navLinksStyle.height = "50px");
            }}
          >
            <RiMenuFill />
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default Navbar;
