import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import Icons
import { BiChevronDown, BiChevronLeft, BiChevronUp, BiX } from "react-icons/bi";

//  import SVG's
import EMPTY_CART from "../Website-Assets/SVG/EMPTY_CART.svg";

// import Components needed
import { NewsLetter } from "./Home";
import { ShoppingCartList } from "./Products";
import { GlobalContext } from "../App";
import { UniqueCard } from "./Card";

// import DATA
import { Products_Catalog } from "../Website-Assets";

// import Styles
import "../styles/index.scss";

//* ------------------------------ Shipping Info ----------------------------- */

function ShippingInfo() {
  return (
    <section className="shipping_info ">
      <h3 className="title">Shipping Information</h3>
      <ul className="info_form">
        <li className="input half">
          <label htmlFor="FName">First Name </label>
          <input type="text" name="FName" id="FName" />
        </li>
        <li className="input half">
          <label htmlFor="LName">Last Name </label>
          <input type="text" name="LName" id="LName" />
        </li>
        <li className="input ">
          <label htmlFor="Address">Address </label>
          <input type="text" name="Address" id="Address" />
        </li>
        <li className="input half">
          <label htmlFor="Country">Country </label>
          <input type="text" name="Country" id="Country" />
        </li>
        <li className="input half">
          <label htmlFor="City">City </label>
          <input type="text" name="City" id="City" />
        </li>
        <li className="input half">
          <label htmlFor="Phone-Number">Phone Number </label>
          <input type="tel" name="Phone-Number" id="Phone-Number" />
        </li>
      </ul>
      <div className="btns">
        <button className="btn CTA">Order Now</button>
      </div>
    </section>
  );
}

//* ------------------------------ Shopping Cart ----------------------------- */

function ShoppingCart() {
  const { cardProducts, subTotal } = useContext(GlobalContext);
  const [expand, setExpand] = useState(false);
  console.log("i am inside");
  return (
    <section className="shopping_cart">
      <h3 className="title">Shopping Cart</h3>
      {cardProducts.length < 1 ? (
        <div className="svg-interactions">
          <img src={EMPTY_CART} alt="EMPTY CART" />
        </div>
      ) : (
        <ul
          className="shopping_cart_list"
          style={expand ? { height: "100%" } : { height: "60vh" }}
        >
          {cardProducts.slice(0, 8).map((Product) => {
            return <UniqueCard Product={Product} />;
          })}
        </ul>
      )}
      <div className="expand-icon">
        {expand ? (
          <BiChevronUp className="icon" onClick={() => setExpand(!expand)} />
        ) : (
          <BiChevronDown className="icon" onClick={() => setExpand(!expand)} />
        )}
      </div>
      <ul className="shopping_cart_total unique_card">
        <li className="facture_price ">
          <h5>Subtotal</h5>
          <h4>{subTotal} DZD</h4>
        </li>
        <li className="facture_price ">
          <h5>Shipping</h5>
          <h4>0 DZD</h4>
        </li>
        <li className="facture_price total">
          <h5 className="cart-total">TOTAL</h5>
          <h5>{subTotal} DZD</h5>
        </li>
      </ul>
    </section>
  );
}

//* ------------------------------- Order Page ------------------------------- */

function Ordering() {
  return (
    <div className="order_page page container">
      <nav className="destination">
        <Link to={"/catalog"}>
          <BiChevronLeft className="icon" />
          &nbsp;continue shopping
        </Link>
      </nav>
      <div className="slice ">
        <ShippingInfo />
        <ShoppingCart />
      </div>
      {/* <ShoppingBag /> */}
      <NewsLetter />
    </div>
  );
}

export default Ordering;
