import React, { createContext, useContext, useState } from "react";

//  import Libraries
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// import Component
import Navbar from "./Components/Navbar";
import { Footer } from "./Components/Home";
import Home from "./Components/Home";
import Catalog from "./Components/Catalog";
import ProductPage from "./Components/Product_Page";

// import Styles
import "./styles/index.scss";
import Product_Page from "./Components/Product_Page";
import Ordering from "./Components/Ordering";
import { Products_Catalog } from "./Website-Assets";

//* ---------------------------- Main App Function --------------------------- */

export const GlobalContext = createContext([]);

//  Helper Functions
const pickRandomProducts = (productsArray, productsMaxNumber) => {
  return productsArray
    .sort(() => 0.5 - Math.random())
    .slice(0, productsMaxNumber);
};

export const findCurrentProduct = (ProductList, paramsId) => {
  console.log("inside of findCurrentProduct");
  return ProductList.find((product) => product.id === paramsId);
};

export function scrollToTop() {
  window.scrollTo(0, 0);
}

function App() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cardProducts, setCardProducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    markName: [],
  });
  const [subTotal, setSubTotal] = useState(0);

  function calcSubTotal() {
    return cardProducts.reduce(
      (prev, current) => prev + current.totalProductPrice,
      0
    );
  }

  //  Toggle To Favorite Functions As example but it works also with card

  function addToFavorite(
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) {
    let isSavedToFavorite = false;
    favoriteProducts.forEach((favProduct) => {
      if (favProduct.id === currentProduct.id) isSavedToFavorite = true;
    });
    if (!isSavedToFavorite)
      setFavoriteProducts((lastProducts) => [...lastProducts, currentProduct]);
  }
  function isFavorite(currentProduct, favoriteProducts) {
    let isSaved = false;
    favoriteProducts.forEach((favProduct) => {
      console.log(currentProduct);
      if (favProduct.id === currentProduct.id) isSaved = true;
    });
    return isSaved;
  }
  function removeFromFavorite(
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) {
    let newFav = favoriteProducts.filter((favProduct) => {
      return favProduct.id !== currentProduct.id;
    });
    setFavoriteProducts(newFav);
  }
  function toggleToFavorite(
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) {
    if (!isFavorite(currentProduct, favoriteProducts))
      addToFavorite(currentProduct, favoriteProducts, setFavoriteProducts);
    else
      removeFromFavorite(currentProduct, favoriteProducts, setFavoriteProducts);
  }

  console.log("those are our favorite", favoriteProducts);
  return (
    <GlobalContext.Provider
      value={{
        pickRandomProducts,
        findCurrentProduct,
        isFavorite,
        addToFavorite,
        removeFromFavorite,
        toggleToFavorite,
        setFavoriteProducts,
        favoriteProducts,
        setCardProducts,
        cardProducts,
        setFilters,
        subTotal,
        setSubTotal,
        calcSubTotal,
      }}
    >
      <div className="main">
        <Navbar
          favoriteProducts={favoriteProducts}
          cardProducts={cardProducts}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/catalog"
            element={
              <Catalog
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                filters={filters}
                setFilters={setFilters}
              />
            }
          ></Route>
          <Route path="/productpage" element={<ProductPage />}></Route>
          <Route path="catalog/:productId" element={<ProductPage />}></Route>
          <Route path="/ordering" element={<Ordering />}></Route>
        </Routes>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
