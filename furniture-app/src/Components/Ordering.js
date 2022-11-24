import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Icons
import { BiCheckCircle, BiChevronLeft, BiLeftArrowAlt } from "react-icons/bi";

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
  Paper,
  Stack,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { auth } from "../firebase/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";

//* ------------------------------ Shipping Info ----------------------------- */

function ShippingInfo({ goNext, goBack }) {
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
      <h3 className="title">ADRESSE DE LIVRAISON</h3>
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
            setOrderData((lastData) => ({
              ...lastData,
              userId: auth.currentUser.uid,
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              willaya: formValues.willaya,
              address: formValues.address,
              phoneNumber: Number(formValues.phoneNumber),
            }));
            sendOrder(
              {
                userId: auth.currentUser.uid,
                fullName: `${formValues.firstName} ${formValues.lastName}`,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                willaya: formValues.willaya,
                address: formValues.address,
                phoneNumber: Number(formValues.phoneNumber),
                orderDate: serverTimestamp(),
              },
              goNext
            );
          } else {
            console.log("go to sign up sir");
          }
        })}
      >
        <div className=" info_form">
          <TextInput
            required
            label="Nom"
            type={"text"}
            size={"md"}
            className=" input half"
            placeholder="Entrez votre nom"
            disabled={currentUserData?.firstName && true}
            withAsterisk
            {...orderForm.getInputProps("firstName")}
          />
          <TextInput
            required
            label="Prénom"
            type={"text"}
            size={"md"}
            className=" input half "
            disabled={currentUserData?.lastName && true}
            placeholder="Entrez votre prénom"
            withAsterisk
            {...orderForm.getInputProps("lastName")}
          />
          <TextInput
            required
            label="Pays"
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
            placeholder="Entrez votre actuel willaya"
            withAsterisk
            {...orderForm.getInputProps("willaya")}
          />
          <TextInput
            required
            label="Adresse"
            type={"text"}
            size={"md"}
            className=" input "
            placeholder="Entrez votre adresse exacte"
            withAsterisk
            {...orderForm.getInputProps("address")}
          />
          <TextInput
            required
            label="Numéro de téléphone"
            type={"number"}
            size={"md"}
            className=" input "
            placeholder="Entrez votre numéro de téléphone"
            withAsterisk
            {...orderForm.getInputProps("phoneNumber")}
          />
        </div>
        <div className="btns">
          <Button
            size="lg"
            radius="none"
            uppercase
            color="blue"
            type="submit"
            className="btn CTA"
          >
            Commandez maintenant
          </Button>
        </div>
      </form>
      <Group position="apart" my={8}>
        <Button
          variant="light"
          size="xs"
          radius="none"
          color="red"
          onClick={goBack}
        >
          Retour
        </Button>
      </Group>
    </section>
  );
}

//* ------------------------------ Shopping Cart ----------------------------- */

function ShoppingCart({ goNext, subTotal, totalHT }) {
  const { cardProducts, setOrderData, updateCard } = useContext(GlobalContext);

  useEffect(() => {
    setOrderData((prevOrderData) => {
      return {
        ...prevOrderData,
        orderList: cardProducts.map((product) => ({
          productId: product.id,
          quantity: product.numberOfProduct,
          productTotal:
            ~~product.numberOfProduct *
            (~~product?.pricePromotion || ~~product.price),
          productTotalHT:
            ~~product.numberOfProduct *
            (~~product?.priceHT?.pricePromotion || ~~product.priceHT?.price),
          currentPrice: ~~product?.pricePromotion || ~~product.price,
          promotionPrice: ~~product?.pricePromotion,
          selectedColor: product?.selectedColor || null,
          productName: product.name,
          currentPriceHT:
            ~~product?.priceHT?.pricePromotion || ~~product?.priceHT?.price,
          tax: product?.tax,
          taxAmount: ~~product?.priceHT?.taxAmount,
        })),
        totalCost: subTotal,
        totalCostHT: totalHT,
        totalQuantity: cardProducts.reduce((acc, item) => {
          return acc + item?.numberOfProduct;
        }, 0),
        avatarImg: auth?.currentUser?.photoURL,
      };
    });
  }, [cardProducts]);

  console.log("is shopping cart trigger again");
  return (
    <section className="shopping_cart">
      <h3 className="title">PANIER</h3>
      {cardProducts.length < 1 ? (
        <div className="svg-interactions">
          <img loading="lazy" src={EMPTY_CART} alt="EMPTY CART" />
        </div>
      ) : (
        <Stack className="shopping_cart_list" spacing={10}>
          {cardProducts.map((Product) => {
            return (
              <DashUniqueCard
                Product={Product}
                isOrdering={true}
                key={Product.id + Product?.selectedColor?.colorRef}
              />
            );
          })}
        </Stack>
      )}
      <ul className="shopping_cart_total unique_card">
        <li className="facture_price ">
          <h5>total H.T</h5>
          <h5>{totalHT},00 DA</h5>
        </li>
        <li className="facture_price ">
          <h5>Subtotal</h5>
          <h5>{subTotal},00 DA</h5>
        </li>
        <li className="facture_price total">
          <h5 className="cart-total">TOTAL</h5>
          <h4>{subTotal},00 DA</h4>
        </li>
      </ul>
      <Button
        variant="filled"
        className="shopping_cart_CTA"
        radius="none"
        color="red"
        size="lg"
        disabled={cardProducts.length < 1}
        onClick={() => {
          updateCard(cardProducts, goNext);
        }}
      >
        VALIDER
      </Button>
    </section>
  );
}

//* ------------------------------- Order Page ------------------------------- */

function Ordering() {
  const { subTotal, totalHT } = useContext(GlobalContext);

  const [active, setActive] = useState(0);
  const nextStep = () => {
    setActive((current) => (current < 2 ? current + 1 : current));
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const Success = () => {
    return (
      <Paper shadow="md" className="order_success">
        <img src={ORDER_SUCCESS} alt="Success" loading="lazy" />
        <h3>Notre équipe est ravie de travailler avec vous</h3>
        <Link to="/">
          <Button size="lg" uppercase radius="none">
            Retour à l'accueil
          </Button>
        </Link>
      </Paper>
    );
  };
  return (
    <div className="order_page page container">
      <nav className="destination">
        <Link to={"/catalog"} className="destination-link">
          ← &nbsp;Continuer vos achats
        </Link>
      </nav>
      <Stepper
        mb={32}
        active={active}
        onStepClick={setActive}
        sx={{ margin: "12px 0" }}
      >
        <Stepper.Step
          label="First Step"
          allowStepSelect={active === 1}
          allowStepClick={active === 1}
        >
          <ShoppingCart
            goNext={nextStep}
            subTotal={subTotal}
            totalHT={totalHT}
          />
        </Stepper.Step>
        <Stepper.Step
          label="First Step"
          allowStepClick={false}
          allowStepSelect={false}
        >
          <ShippingInfo goNext={nextStep} goBack={prevStep} />
        </Stepper.Step>
        <Stepper.Completed>
          <Success />
        </Stepper.Completed>
      </Stepper>
    </div>
  );
}

export default React.memo(Ordering);
