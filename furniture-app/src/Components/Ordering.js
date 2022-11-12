import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Icons
import { BiCheckCircle, BiChevronLeft } from "react-icons/bi";

//  import SVG's
import EMPTY_CART from "../Website-Assets/SVG/EMPTY_CART.svg";
import ORDER_SUCCESS from "../Website-Assets/SVG/ORDER_SUCCESS.svg";

// import Components needed
import { capitalizeSentence, GlobalContext } from "../App";
import { DashUniqueCard } from "./Card";

// import DATA

// import from Lib's
import { useForm } from "@mantine/form";

// import Styles
import "../styles/index.scss";
import {
  Button,
  Group,
  Modal,
  Stack,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { auth } from "../firebase/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";

//* ------------------------------ Shipping Info ----------------------------- */

function ShippingInfo() {
  const { setOrderData, currentUserData, sendOrder } =
    useContext(GlobalContext);

  const orderForm = useForm({
    initialValues: {
      firstName: currentUserData?.firstName,
      lastName: currentUserData?.lastName,
      willaya: currentUserData?.willaya,
      address: currentUserData?.address,
      phoneNumber: currentUserData?.phoneNumber,
    },
    validate: {
      firstName: (name) =>
        /^([a-zA-Z0-9]+ ?)+$/.test(name) && name
          ? null
          : "Please enter a valid name ",
      lastName: (name) =>
        /^([a-zA-Z0-9]+ ?)+$/.test(name) && name
          ? null
          : "Please enter a valid name ",
      willaya: (willaya) =>
        /^([a-zA-Z]+ ?)+$/.test(willaya) && willaya
          ? null
          : "Please enter a valid willaya ",
      address: (address) =>
        /^[\w\d ,\.]+$/.test(address) && address
          ? null
          : "Please enter a valid address ",
      phoneNumber: (phoneNumber) =>
        /^[0-9]{9,14}$/.test(phoneNumber) && phoneNumber
          ? null
          : "Please enter a valid phone number ",
    },
  });

  return (
    <section className="shipping_info  ">
      <h3 className="title">Shipping Information</h3>
      <form
        onSubmit={orderForm.onSubmit((formValues) => {
          formValues.firstName = capitalizeSentence(
            formValues.firstName,
            "string"
          );
          formValues.lastName = capitalizeSentence(
            formValues.lastName,
            "string"
          );
          formValues.willaya = capitalizeSentence(formValues.willaya, "string");
          formValues.address = capitalizeSentence(formValues.address, "string");
          if (auth.currentUser) {
            setOrderData(
              (lastData) => ({
                ...lastData,
                userId: auth.currentUser.uid,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                willaya: formValues.willaya,
                address: formValues.address,
                phoneNumber: Number(formValues.phoneNumber),
              }),
              sendOrder({
                userId: auth.currentUser.uid,
                fullName: `${formValues.firstName} ${formValues.lastName}`,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                willaya: formValues.willaya,
                address: formValues.address,
                phoneNumber: Number(formValues.phoneNumber),
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
            required
            label="First Name"
            type={"text"}
            size={"md"}
            className=" input half"
            placeholder="Enter your First Name"
            disabled={currentUserData?.firstName && true}
            withAsterisk
            {...orderForm.getInputProps("firstName")}
          />
          <TextInput
            required
            label="Last Name"
            type={"text"}
            size={"md"}
            className=" input half "
            disabled={currentUserData?.lastName && true}
            placeholder="Enter your Last Name"
            withAsterisk
            {...orderForm.getInputProps("lastName")}
          />
          <TextInput
            required
            label="Country"
            type={"text"}
            size={"md"}
            className=" input "
            value={"Algeria"}
            disabled
          />
          <TextInput
            required
            label="Willaya"
            type={"text"}
            size={"md"}
            className=" input "
            placeholder="Enter your current willaya"
            autoCapitalize
            withAsterisk
            {...orderForm.getInputProps("willaya")}
          />
          <TextInput
            required
            label="Address"
            type={"text"}
            size={"md"}
            autoCapitalize
            className=" input "
            placeholder="Enter your exact address"
            withAsterisk
            {...orderForm.getInputProps("address")}
          />
          <TextInput
            required
            label="Phone Number"
            type={"number"}
            size={"md"}
            className=" input "
            placeholder="Enter your exact address"
            withAsterisk
            {...orderForm.getInputProps("phoneNumber")}
          />
        </div>
        <div className="btns">
          <Button
            size="lg"
            radius="none"
            uppercase
            type="submit"
            className="btn CTA"
          >
            Order Now
          </Button>
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
          productTotal:
            ~~product.numberOfProduct *
            (~~product?.pricePromotion || ~~product.price),
          currentPrice: ~~product.price,
          promotionPrice: ~~product?.pricePromotion,
          selectedColor: product?.selectedColor || null,
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
        <Stack className="shopping_cart_list" spacing={10}>
          {cardProductsClone.map((Product) => {
            return (
              <DashUniqueCard
                Product={Product}
                setIsChanged={setIsChanged}
                cardProductsClone={cardProductsClone}
                isOrdering={true}
              />
            );
          })}
        </Stack>
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
      <Button
        variant="filled"
        className="shopping_cart_CTA"
        radius="none"
        size="lg"
        onClick={() => {
          updateCard(cardProductsClone);
          setIsChanged(false);
        }}
      >
        UPDATE
      </Button>
    </section>
  );
}

//* ------------------------------- Order Page ------------------------------- */

function Ordering() {
  const { isOrderSuccess, setIsOrderSuccess } = useContext(GlobalContext);
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const Success = () => {
    return (
      <div className="order_success">
        <img src={ORDER_SUCCESS} alt="Success" />
        <h3>WE ARE SO EXCITED TO WORK WITH YOU</h3>
        <Link to="/">
          <Button size="lg" radius="none">
            GO BACK TO HOME
          </Button>
        </Link>
      </div>
    );
  };
  return (
    <div className="order_page page container">
      <nav className="destination">
        <Link to={"/catalog"}>
          <BiChevronLeft className="icon" />
          &nbsp;continue shopping
        </Link>
      </nav>
      <Stepper my={32} px={8} active={active} onStepClick={setActive}>
        <Stepper.Step label="First Step">
          <ShoppingCart />
        </Stepper.Step>
        <Stepper.Step label="First Step">
          <ShippingInfo />
        </Stepper.Step>
        <Stepper.Completed>
          <Success />
        </Stepper.Completed>
      </Stepper>
      <Group>
        <Button variant="outline" onClick={() => prevStep()}>
          Back
        </Button>
        <Button variant="filled" onClick={() => nextStep()}>
          Next Step
        </Button>
      </Group>
      {/* <ShoppingBag /> */}
      <Modal
        opened={isOrderSuccess}
        onClose={() => setIsOrderSuccess(false)}
        centered
        withCloseButton={false}
        padding="xl"
      >
        <Stack align={"center"}>
          <BiCheckCircle fill="green" size={64} />
          <Text align="center" size={"xl"} color="black">
            ORDER DONE SUCCESSFULLY
          </Text>
        </Stack>
      </Modal>
    </div>
  );
}

export default Ordering;
