import React, { useContext, useEffect, useState } from "react";
import logo from "../Website-Assets/logo.png";
import {
  BiCartAlt,
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
import { DashUniqueCard, FavUniqueCard } from "./Card";
import { ShoppingCartList } from "./Products";
import { Footer } from "./Home";

//  import libraries
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

//  import SVG's
import EMPTY_CART from "../Website-Assets/SVG/EMPTY_CART.svg";
import FAVORITE_SVG from "../Website-Assets/SVG/FAVORITE_SVG (2).svg";
import AvatarProfile from "./smallComponents/avatarProfile/avatarProfile";
import {
  ActionIcon,
  Button,
  createStyles,
  Drawer,
  Group,
  SimpleGrid,
  Stack,
} from "@mantine/core";

//* --------------------------- Bag Side Component --------------------------- */

function ShoppingBag({ cardProducts, showCardProducts, setShowCardProducts }) {
  const { removeFromFavorite, setCardProducts, subTotal } =
    useContext(GlobalContext);
  console.log(subTotal);

  console.log("check if it;s updated : ", cardProducts);
  // set on value change subtotal change also
  return (
    <Drawer
      position="right"
      size={"550px"}
      padding={"md"}
      className="cardProducts-drawer"
      opened={showCardProducts}
      onClose={() => setShowCardProducts(false)}
      title="Card Products List"
    >
      <Stack justify={"space-between"} style={{ flex: 1, overflow: "hidden" }}>
        {cardProducts.length < 1 ? (
          <div className="svg-interactions">
            <img loading="lazy" src={EMPTY_CART} alt="EMPTY CART" />
          </div>
        ) : (
          <SimpleGrid style={{ width: "100%", overflow: "auto" }}>
            {cardProducts.map((Product) => {
              return <DashUniqueCard Product={Product} />;
            })}
          </SimpleGrid>
        )}
        <Stack style={{ width: "100%", gap: "8px" }}>
          <div className="shopping_cart_total unique_card">
            <li className="facture_price total">
              <h5 className="cart-total">SUBTOTAL</h5>
              <h5>{`${subTotal}`} DZD</h5>
            </li>
          </div>
          <Button
            size="md"
            radius={"none"}
            fullWidth
            color={"red"}
            uppercase
            className="checkout"
            onClick={() => setShowCardProducts(false)}
          >
            <Link to={"/ordering"}>Check Out</Link>
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

//* ----------------------- Favorite Products Component ---------------------- */

function FavoriteProducts({
  favoriteProducts,
  showFavoriteProducts,
  setShowFavoriteProducts,
}) {
  return (
    <Drawer
      position="right"
      size={"550px"}
      padding={"md"}
      title="FAVORITE PRODUCTS"
      opened={showFavoriteProducts}
      onClose={() => setShowFavoriteProducts(false)}
      id="favorite_products"
      className="favorite-drawer"
    >
      {favoriteProducts.length < 1 ? (
        <div className="svg-interactions">
          <img loading="lazy" src={FAVORITE_SVG} alt="FAVORITE SVG" />
        </div>
      ) : (
        <SimpleGrid cols={1}>
          {favoriteProducts.map((Product) => {
            return <FavUniqueCard Product={Product} />;
          })}
        </SimpleGrid>
      )}
    </Drawer>
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
            <img loading="lazy" src={logo} alt="Logo" />
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
