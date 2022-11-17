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
  BiRevision,
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
import WhatsApp from "../Website-Assets/WhatsApp.png";

import {
  ActionIcon,
  Anchor,
  Button,
  CloseButton,
  createStyles,
  Drawer,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import Auth from "../authentication/auth";

//* --------------------------- Bag Side Component --------------------------- */

function ShoppingBag({ cardProducts, showCardProducts, setShowCardProducts }) {
  const { updateCard, setCardProducts, subTotal, setSubTotal, calcSubTotal } =
    useContext(GlobalContext);

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
              return (
                <DashUniqueCard
                  Product={Product}
                  key={Product.id + Product?.selectedColor?.colorRef}
                />
              );
            })}
          </SimpleGrid>
        )}
        <Stack style={{ width: "100%", gap: "8px" }}>
          <div className="shopping_cart_total unique_card">
            <li className="facture_price total">
              <h5 className="cart-total">SUBTOTAL TTC</h5>
              <h5>{`${subTotal}`} DA</h5>
            </li>
          </div>

          <Link to={"/ordering"}>
            {" "}
            <Button
              size="md"
              radius={"none"}
              fullWidth
              color={"red"}
              uppercase
              className="checkout"
              onClick={() => setShowCardProducts(false)}
            >
              Check Out{" "}
            </Button>
          </Link>
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
            return (
              <FavUniqueCard
                Product={Product}
                setClose={setShowFavoriteProducts}
                key={Product.id + Product?.selectedColor?.colorRef}
              />
            );
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
  const { currentUserData, isUser, openAuthDrawer, setOpenAuthDrawer } =
    useContext(GlobalContext);
  const [showFavoriteProducts, setShowFavoriteProducts] = useState(false);
  const [showCardProducts, setShowCardProducts] = useState(false);

  let favoriteProductsNumber = favoriteProducts.length;
  let cardProductsNumber = cardProducts.length;

  return (
    <>
      <div className="navbar" id="navbar">
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
            {!isUser && (
              <li className="link N-3" onClick={scrollToTop}>
                {" "}
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </nav>

        {/* ------------------------------ Tablet Navbar ------------------------------ */}
        <div className="icon">
          <div
            className="icon-set bag"
            onClick={() => {
              setShowCardProducts(!showCardProducts);
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
                <Button variant="outline" size="md" radius="none" color="blue">
                  Sign in
                </Button>
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
      <div className="call-float">
        <Anchor href="https://wa.me/550951515" target="_blank">
          <ActionIcon
            variant="filled"
            size={50}
            radius="xl"
            className="call-btn"
            p={8}
          >
            <img src={WhatsApp} alt="WhatsApp" className="WhatsApp" />
          </ActionIcon>
        </Anchor>
      </div>
      <Footer />
      {/* ------------------------------ Mobile Navbar ------------------------------ */}
      <div className="bottom-navbar">
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
            {!isUser && (
              <li className="link N-4" onClick={scrollToTop}>
                {" "}
                <Link to="/dashboard">
                  <BiCategory />{" "}
                </Link>
              </li>
            )}

            <li
              className="icon-set bag"
              onClick={() => {
                setShowCardProducts(!showCardProducts);
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
      </div>
    </>
  );
}

export default React.memo(Navbar);
