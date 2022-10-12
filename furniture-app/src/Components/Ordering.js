import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

// import from Lib's
import { useForm } from "@mantine/form";

// import Styles
import "../styles/index.scss";
import { TextInput } from "@mantine/core";
import { auth } from "../firebase/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";

//* ------------------------------ Shipping Info ----------------------------- */

function ShippingInfo() {
  const { setOrderData, orderData, sendOrder } = useContext(GlobalContext);

  const orderForm = useForm({
    initialValues: {
      fullName: "",
      willaya: "",
      address: "",
      phoneNumber: "",
    },
  });

  return (
    <section className="shipping_info  ">
      <h3 className="title">Shipping Information</h3>
      <form
        onSubmit={orderForm.onSubmit((formValues) => {
          if (auth.currentUser) {
            setOrderData(
              (lastData) => ({
                ...lastData,
                userId: auth.currentUser.uid,
                fullName: formValues.fullName,
                willaya: formValues.willaya,
                address: formValues.address,
                phoneNumber: formValues.phoneNumber,
              }),
              sendOrder({
                userId: auth.currentUser.uid,
                fullName: formValues.fullName,
                willaya: formValues.willaya,
                address: formValues.address,
                phoneNumber: formValues.phoneNumber,
                orderDate: serverTimestamp(),
              })
            );
          } else {
            console.log("go to sign up sir");
          }
        })}
      >
        <div className=" info_form">
          <TextInput
            label="Full name"
            type={"text"}
            size={"md"}
            className=" input half"
            placeholder="Enter your full name"
            withAsterisk
            {...orderForm.getInputProps("fullName")}
            required
          />
          <TextInput
            label="Country"
            type={"text"}
            size={"md"}
            className=" input half"
            value={"Algeria"}
            disabled
          />
          <TextInput
            label="Willaya"
            type={"text"}
            size={"md"}
            className=" input half"
            placeholder="Enter your current willaya"
            withAsterisk
            {...orderForm.getInputProps("willaya")}
            required
          />
          <TextInput
            label="Address"
            type={"text"}
            size={"md"}
            className=" input half"
            placeholder="Enter your exact address"
            withAsterisk
            {...orderForm.getInputProps("address")}
            required
          />
          <TextInput
            label="Phone Number"
            type={"number"}
            size={"md"}
            className=" input half"
            placeholder="Enter your exact address"
            withAsterisk
            {...orderForm.getInputProps("phoneNumber")}
            required
          />
        </div>
        <div className="btns">
          <button type="submit" className="btn CTA">
            Order Now
          </button>
        </div>
      </form>
    </section>
  );
}

//* ------------------------------ Shopping Cart ----------------------------- */

function ShoppingCart() {
  const { cardProducts, subTotal, setOrderData } = useContext(GlobalContext);
  const [trigger, setTrigger] = useState(false);
  let totalQuantity, totalCost;
  useEffect(() => {
    totalQuantity = cardProducts.reduce(
      (acc, current) => acc + ~~current.numberOfProduct,
      0
    );
    totalCost = cardProducts.reduce(
      (acc, current) => acc + ~~current?.totalProductPrice,
      0
    );
    setOrderData((prevOrderData) => {
      return {
        ...prevOrderData,
        orderList: cardProducts.map((product) => ({
          productId: product.id,
          quantity: product.numberOfProduct,
          productTotal: ~~product.numberOfProduct * ~~product.price,
          currentPrice: ~~product.price,
          productName: product.name,
        })),
        totalCost,
        totalQuantity,
        avatarImg: auth.currentUser.photoURL,
      };
    });
  }, [cardProducts, trigger]);

  const [expand, setExpand] = useState(false);
  console.log("is shopping cart trigger again");
  return (
    <section className="shopping_cart">
      <h3 className="title">Shopping Cart</h3>
      {cardProducts.length < 1 ? (
        <div className="svg-interactions">
          <img loading="lazy" src={EMPTY_CART} alt="EMPTY CART" />
        </div>
      ) : (
        <ul
          className="shopping_cart_list"
          style={expand ? { height: "100%" } : { height: "60vh" }}
        >
          {cardProducts.slice(0, 8).map((Product) => {
            return <UniqueCard Product={Product} setTrigger={setTrigger} />;
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
