import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Icons
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronUp,
  BiRevision,
  BiX,
} from "react-icons/bi";

//  import SVG's
import EMPTY_CART from "../Website-Assets/SVG/EMPTY_CART.svg";

// import Components needed
import { NewsLetter } from "./Home";
import { ShoppingCartList } from "./Products";
import { GlobalContext } from "../App";
import { DashUniqueCard } from "./Card";

// import DATA

// import from Lib's
import { useForm } from "@mantine/form";

// import Styles
import "../styles/index.scss";
import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
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
  const { cardProducts, subTotal, setOrderData, updateCard } =
    useContext(GlobalContext);
  const [trigger, setTrigger] = useState(false);
  const [expand, setExpand] = useState(false);
  let totalQuantity, totalCost;
  const [cardProductsClone, setCardProductsClone] = useState(
    structuredClone(cardProducts)
  );
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setCardProductsClone(structuredClone(cardProducts));
  }, [cardProducts]);

  useEffect(() => {
    !isChanged && setCardProductsClone(structuredClone(cardProducts));
  }, [isChanged]);

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
        avatarImg: auth?.currentUser?.photoURL,
      };
    });
  }, [cardProducts, trigger]);

  console.log("is shopping cart trigger again");
  return (
    <section className="shopping_cart">
      <h3 className="title">Shopping Cart</h3>
      {cardProductsClone.length < 1 ? (
        <div className="svg-interactions">
          <img loading="lazy" src={EMPTY_CART} alt="EMPTY CART" />
        </div>
      ) : (
        <Stack
          className="shopping_cart_list"
          spacing={10}
          style={expand ? { height: "100%" } : { height: "60vh" }}
        >
          {cardProductsClone.map((Product) => {
            return (
              <DashUniqueCard
                Product={Product}
                setIsChanged={setIsChanged}
                cardProductsClone={cardProductsClone}
              />
            );
          })}
        </Stack>
      )}
      <div className="expand-icon">
        {expand ? (
          <BiChevronUp className="icon" onClick={() => setExpand(!expand)} />
        ) : (
          <BiChevronDown className="icon" onClick={() => setExpand(!expand)} />
        )}
      </div>
      {isChanged && (
        <Group spacing={5} mb={5} noWrap>
          <Button
            variant="filled"
            fullWidth
            radius={"none"}
            size="md"
            onClick={() => {
              updateCard(cardProductsClone);
              setIsChanged(false);
            }}
          >
            UPDATE
          </Button>
          <ActionIcon
            variant="filled"
            color={"red"}
            radius={"none"}
            size={42}
            onClick={() => {
              setCardProductsClone(structuredClone(cardProducts));
              setIsChanged(false);
            }}
          >
            <BiRevision size={24} />
          </ActionIcon>
        </Group>
      )}
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
