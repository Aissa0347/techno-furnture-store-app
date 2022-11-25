import React, { useContext, useEffect, useState } from "react";
import logo from "../Website-Assets/logo.png";
import {
  BiCart,
  BiCategory,
  BiHome,
  BiShoppingBag,
  BiStore,
} from "react-icons/bi";
import { RiHeartLine, RiMenuFill } from "react-icons/ri";
import "../styles/index.scss";

//  import Components
import { GlobalContext } from "../App";
import { DashUniqueCard, FavUniqueCard } from "./Card";
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
  Drawer,
  MantineProvider,
  Paper,
  SimpleGrid,
  Stack,
} from "@mantine/core";

//* --------------------------- Bag Side Component --------------------------- */

function ShoppingBag({ cardProducts, showCardProducts, setShowCardProducts }) {
  const {
    updateCard,
    setCardProducts,
    subTotal,
    totalHT,
    setSubTotal,
    calcSubTotal,
  } = useContext(GlobalContext);

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
              <h5 className="cart-total">TOTAL HT</h5>
              <h5>{`${totalHT}`},00 DA</h5>
            </li>
            <li className="facture_price total">
              <h5 className="cart-total">SUBTOTAL TTC</h5>
              <h4>{`${subTotal}`},00 DA</h4>
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
      className="favorite-drawer favorite-drawer-body"
    >
      {favoriteProducts.length < 1 ? (
        <div className="svg-interactions">
          <img loading="lazy" src={FAVORITE_SVG} alt="FAVORITE SVG" />
        </div>
      ) : (
        <SimpleGrid className="favorite-drawer-wrapper" cols={1}>
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

//* ---------------------------- Navbar Component ---------------------------- */

function Navbar({ favoriteProducts, cardProducts }) {
  const { currentUserData, isUser, openAuthDrawer, setOpenAuthDrawer } =
    useContext(GlobalContext);
  const [showFavoriteProducts, setShowFavoriteProducts] = useState(false);
  const [showCardProducts, setShowCardProducts] = useState(false);
  const [isWider, setIsWider] = useState(true);

  let favoriteProductsNumber = favoriteProducts.length;
  let cardProductsNumber = cardProducts.length;

  useEffect(() => {
    const isItWide = () => {
      if (window.innerWidth > 576) {
        setIsWider(true);
      } else {
        setIsWider(false);
      }
    };
    isItWide();
    window.addEventListener("resize", isItWide);
    return window.removeEventListener("resize", isItWide);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  return (
    <>
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
        <div className="navbar" id="navbar">
          <div className="logo">
            <Link to={"/"}>
              <img loading="lazy" src={logo} alt="Logo" />
            </Link>
          </div>
          {!isWider ? (
            <div className="icon-set login">
              {currentUserData ? (
                <AvatarProfile />
              ) : (
                <Link to="/auth">
                  <Button
                    variant="outline"
                    size="md"
                    radius="none"
                    color="blue"
                  >
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          ) : null}
          {isWider ? (
            <>
              <nav className="nav-links">
                <ul>
                  <li className="link N-1">
                    {" "}
                    <Link to="/">ACCUEIL </Link>
                  </li>
                  <li className="link N-2">
                    <Link to="/catalog">TOUS LES PRODUITS </Link>
                  </li>
                  <li className="link N-3">
                    {" "}
                    <Link to="/ordering">PANIER</Link>
                  </li>
                  {!isUser && (
                    <li className="link N-3">
                      {" "}
                      <Link to="/dashboard">CONTROL PANEL</Link>
                    </li>
                  )}
                </ul>
              </nav>
              <div className="icon">
                <div
                  className="icon-set icon-size bag"
                  onClick={() => {
                    setShowCardProducts(!showCardProducts);
                  }}
                >
                  <BiShoppingBag />
                  {cardProductsNumber === 0 ? (
                    ""
                  ) : (
                    <span className="product-number counter-size">
                      {cardProductsNumber}
                    </span>
                  )}
                </div>

                <div
                  className="icon-set icon-size  favorite"
                  onClick={() => {
                    setShowFavoriteProducts(!showFavoriteProducts);
                  }}
                >
                  <RiHeartLine />
                  {favoriteProductsNumber === 0 ? (
                    ""
                  ) : (
                    <span className="product-number counter-size">
                      {favoriteProductsNumber}
                    </span>
                  )}
                </div>

                <div className="login">
                  {currentUserData ? (
                    <AvatarProfile />
                  ) : (
                    <Link to="/auth">
                      <Button
                        variant="outline"
                        size="md"
                        radius="none"
                        color="blue"
                      >
                        Connexion
                      </Button>
                    </Link>
                  )}
                </div>
                <div
                  className="icon-set icon-size burger-menu"
                  onClick={() => {
                    let navLinksStyle =
                      document.querySelector(".nav-links").style;
                    navLinksStyle.height === "50px"
                      ? (navLinksStyle.height = "0px")
                      : (navLinksStyle.height = "50px");
                  }}
                >
                  <RiMenuFill />
                </div>
              </div>{" "}
            </>
          ) : null}
          <FavoriteProducts
            favoriteProducts={favoriteProducts}
            showFavoriteProducts={showFavoriteProducts}
            setShowFavoriteProducts={setShowFavoriteProducts}
          />
          <ShoppingBag
            cardProducts={cardProducts}
            showCardProducts={showCardProducts}
            setShowCardProducts={setShowCardProducts}
          />
        </div>
        <Outlet />
        <div className="call-float">
          <Anchor href="https://wa.me/213550951515" target="_blank">
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
        <Paper shadow="md" className="bottom-navbar">
          <nav className="nav-links nav-icons">
            <ul>
              <li className="link N-1 icon-size" onClick={scrollTop}>
                {" "}
                <Link to="/">
                  <BiHome />{" "}
                </Link>
              </li>
              <li className="link icon-size N-2" onClick={scrollTop}>
                <Link to="/catalog">
                  <BiStore />{" "}
                </Link>
              </li>
              <li className="link icon-size N-3" onClick={scrollTop}>
                {" "}
                <Link to="/ordering">
                  <BiCart />{" "}
                </Link>
              </li>
              {!isUser && (
                <li className="link icon-size N-4" onClick={scrollTop}>
                  {" "}
                  <Link to="/dashboard">
                    <BiCategory />{" "}
                  </Link>
                </li>
              )}

              <li
                className="icon-set icon-size bag"
                onClick={() => {
                  setShowCardProducts(!showCardProducts);
                }}
              >
                <a>
                  <BiShoppingBag />
                  {cardProductsNumber === 0 ? (
                    ""
                  ) : (
                    <span className="product-number counter-size">
                      {cardProductsNumber}
                    </span>
                  )}
                </a>
              </li>
              <li
                className="icon-set icon-size favorite"
                onClick={() => {
                  setShowFavoriteProducts(!showFavoriteProducts);
                }}
              >
                <a>
                  <RiHeartLine />
                  {favoriteProductsNumber === 0 ? (
                    ""
                  ) : (
                    <span className="product-number counter-size">
                      {favoriteProductsNumber}
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </nav>
        </Paper>{" "}
      </MantineProvider>
    </>
  );
}

export default React.memo(Navbar);
