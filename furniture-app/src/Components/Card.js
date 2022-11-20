import React, { useState, useContext, useEffect, useRef } from "react";
import { BiShow, BiShowAlt, BiTrash } from "react-icons/bi";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

//  Import from Libraries
import { Link } from "react-router-dom";
import {
  Card,
  Text,
  Group,
  createStyles,
  Button,
  ActionIcon,
  NumberInput,
  Stack,
} from "@mantine/core";

//  Import Component Nedeed
import { GlobalContext } from "../App";

//* -------------------------------- Category -------------------------------- */

export function SmallCard(props) {
  const { setFilters } = useContext(GlobalContext);
  const { img, name } = props;
  return (
    <div className="category-wrapper ">
      <Link
        to={"/catalog"}
        onClick={() => {
          setFilters({ category: [name], markName: [] });
          window.scrollTo(0, 0);
        }}
      >
        <div className="category-icon">
          <img loading="lazy" src={img} alt={name} />
        </div>
      </Link>
      <h4>{name}</h4>
    </div>
  );
}

//* --------------------------- Products Main Cards -------------------------- */

export function Actions({ currentProduct }) {
  const {
    favoriteProducts,
    setFavoriteProducts,
    toggleToFavorite,
    isFavorite,
    currentUserData,
    setOpenAuthDrawer,
  } = useContext(GlobalContext);

  let isSaved = isFavorite(currentProduct, favoriteProducts);
  return (
    <>
      <Group style={{ gap: "8px" }}>
        <Link
          to={`/catalog/${currentProduct.id}`}
          style={{ flex: 1, width: "100%" }}
        >
          <Button radius={"none"} px={0} size={"md"} color={"red"} fullWidth>
            View more
            <BiShowAlt style={{ marginLeft: "5px" }} size={24} />
          </Button>
        </Link>
        <ActionIcon
          variant="outline"
          size={42}
          radius={"none"}
          onClick={() => {
            currentUserData
              ? toggleToFavorite(
                  currentProduct,
                  favoriteProducts,
                  setFavoriteProducts
                )
              : setOpenAuthDrawer(true);
          }}
        >
          {" "}
          {isSaved ? (
            <RiHeartFill size={24} color="#FA0A09" />
          ) : (
            <RiHeartLine size={24} />
          )}
        </ActionIcon>
      </Group>

      {/* <div className="actions">
        <div
          className="fav sbtn"
          onClick={() => {
            toggleToFavorite(
              currentProduct,
              favoriteProducts,
              setFavoriteProducts
            );
          }}
        >
          {isSaved ? <RiHeartFill color="#FA0A09" /> : <RiHeartLine />}
        </div>
        <div className="show sbtn">
          <BiShowAlt />
        </div>
        <div
          className="cart sbtn"
          onClick={() => {
            addToFavorite(currentProduct, cardProducts, setCardProducts);
          }}
        >
          <BiCartAlt />
        </div>
      </div> */}
    </>
  );
}

export const Cards = ({ img, name, price, id, currentProduct, markName }) => {
  return (
    <div className="card bx">
      <Link to={`/catalog/${id}`}>
        <div className="imgBx">
          <img loading="lazy" src={img[0].url} alt={name} />
        </div>
        {/* <h3>{markName}</h3> */}
        <h3>{name}</h3>
      </Link>
      <span>{price} DZD</span>
      <Actions currentProduct={currentProduct} />
    </div>
  );
};

//* ------------------------- Product Card Component ------------------------ */

const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  img: {
    height: "200px",
    maxHeight: "200px",
    width: "100%",
    objectFit: "contain",
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },

  productName: {
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "column",
    gap: "8px",
    height: "100%",
  },
}));

export function ProductsCard({
  img,
  name,
  price,
  pricePromotion,
  id,
  currentProduct,
  markName,
}) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius={"none"} className={classes.card + " product-card"}>
      <Link to={`/catalog/${id}`}>
        <Card.Section className={classes.imageSection} p="xs" mt={-16}>
          <img src={img[0].url} alt={name} className={classes.img} />
        </Card.Section>
      </Link>
      <Link to={`/catalog/${id}`} style={{ flex: "1" }}>
        <Group position="center" className={classes.productName} py="xs">
          <div>
            <Text weight={500} component="h3" transform="uppercase">
              {name}
            </Text>
          </div>
          <Stack align={"center"} spacing={2}>
            {pricePromotion ? (
              <div>
                <Text
                  component="span"
                  color={"gray"}
                  mr={5}
                  size="md"
                  weight={500}
                  sx={{ lineHeight: 1 }}
                  strikethrough
                >
                  {price}0,00
                </Text>
                <Text
                  component="span"
                  size="xs"
                  color="dimmed"
                  weight={300}
                  sx={{ lineHeight: "1px" }}
                >
                  DA
                </Text>
              </div>
            ) : null}
            <div>
              <Text
                component="span"
                style={{ color: "#d96b52" }}
                mr={5}
                size="xl"
                weight={700}
                sx={{ lineHeight: 1 }}
              >
                {pricePromotion || price}0,00
              </Text>
              <Text
                component="span"
                size="sm"
                style={{ color: "#d96b52" }}
                weight={500}
                sx={{ lineHeight: "1px" }}
              >
                DA
              </Text>
            </div>
          </Stack>
        </Group>
      </Link>

      <Card.Section className={classes.section} p="xs">
        <Actions currentProduct={currentProduct} />
      </Card.Section>
    </Card>
  );
}

//* ------------------------- Import Unique Cards ------------------------- */

export function DashUniqueCard({ Product, isOrdering = false }) {
  const [quantityValue, setQuantityValue] = useState(
    Product?.numberOfProduct || 1
  );
  const {
    cardProducts,
    removeFromCard,
    setCardProducts,
    setSubTotal,
    calcSubTotal,
  } = useContext(GlobalContext);
  const handlers = useRef();

  function defaultNumberAndTotal() {
    Product.totalProductPrice = 0;
    Product.totalProductPriceHT = 0;
    Product.numberOfProduct = 1;
  }

  useEffect(() => {
    setQuantityValue(Product?.numberOfProduct);
  }, [Product]);

  useEffect(() => {
    if (quantityValue > 0) {
      Product.numberOfProduct = quantityValue;
      Product.totalProductPrice =
        (~~Product?.pricePromotion || ~~Product?.price) * quantityValue;
      Product.totalProductPriceHT =
        (~~Product?.priceHT?.pricePromotion || ~~Product?.priceHT?.price) *
        quantityValue;
      setSubTotal(calcSubTotal());
      setCardProducts((prev) => prev);
    } else if (quantityValue < 1) {
      setQuantityValue(1);
    }
  }, [quantityValue]);

  console.log("product is here : ", Product);

  return (
    <div className="unique_card invoice-product-info">
      <div className="img_name ">
        <img
          src={Product?.img[0]?.url}
          alt={Product?.name}
          className="product_image invoice-img"
        />
        <div className="product_title ">
          <h5 className="color-label">
            {Product?.name}
            <div
              className="color-shower"
              style={{
                backgroundColor: Product?.selectedColor?.colorRef,
                display: "inline-block",
              }}
            ></div>
          </h5>
          <Group align={"flex-end"} spacing={5}>
            <Text color={"red"} size={18} weight={500}>
              {Product?.pricePromotion || Product?.price} DA
            </Text>
            {Product?.pricePromotion && (
              <Text color={"gray"} size={16} weight={400} strikethrough>
                {Product?.price} DA
              </Text>
            )}
          </Group>
        </div>
      </div>
      {isOrdering ? (
        <label htmlFor="Qty-input" className="quantity-controls">
          {" "}
          Qty:&nbsp;
          <Group spacing={5}>
            <ActionIcon
              radius={"none"}
              size={36}
              variant="default"
              onClick={() => handlers.current.increment()}
            >
              +
            </ActionIcon>

            <NumberInput
              size="sm"
              radius={"none"}
              name="quantity"
              id="quantity"
              hideControls
              value={quantityValue}
              onChange={(val) => {
                setQuantityValue(val);
              }}
              min={1}
              step={1}
              handlersRef={handlers}
              styles={{ input: { width: 50, textAlign: "center" } }}
            />

            <ActionIcon
              radius={"none"}
              size={36}
              variant="default"
              onClick={() => handlers.current.decrement()}
            >
              -
            </ActionIcon>
          </Group>
        </label>
      ) : (
        <NumberInput
          size="sm"
          radius={"none"}
          name="quantity"
          id="quantity"
          hideControls
          readOnly
          value={quantityValue}
          styles={{ input: { width: 50, textAlign: "center" } }}
        />
      )}

      <ActionIcon
        variant="subtle"
        size={"md"}
        radius={"none"}
        color={"red"}
        onClick={() => {
          removeFromCard(Product, cardProducts, setCardProducts);
          defaultNumberAndTotal();
          setSubTotal(calcSubTotal());
        }}
      >
        <BiTrash size={18} />
      </ActionIcon>
    </div>
  );
}

export function FavUniqueCard({ Product, setClose }) {
  const [quantityValue, setQuantityValue] = useState(
    Product?.numberOfProduct || 1
  );
  const {
    addToFavorite,
    removeFromFavorite,
    cardProducts,
    setCardProducts,
    favoriteProducts,
    setFavoriteProducts,
  } = useContext(GlobalContext);

  // useEffect(() => {
  //   quantityValue < 1 && setQuantityValue(1);
  // });

  return (
    <div className="unique_card product-info invoice-product-info">
      <div className="img_name ">
        <img
          src={Product?.img[0].url}
          alt={Product?.name}
          className="product_image invoice-img"
        />
        <div className="product_title ">
          <h5>{Product?.name}</h5>
          <Group align={"flex-end"} spacing={5}>
            <Text color={"red"} size={18} weight={500}>
              {Product?.pricePromotion || Product?.price} DA
            </Text>
            {Product?.pricePromotion && (
              <Text color={"gray"} size={16} weight={400} strikethrough>
                {Product?.price} DA
              </Text>
            )}
          </Group>
        </div>
      </div>
      <ActionIcon
        variant="subtle"
        size={"md"}
        radius={"none"}
        color={"red"}
        onClick={() => {
          removeFromFavorite(Product, favoriteProducts, setFavoriteProducts);
        }}
      >
        <BiTrash size={18} />
      </ActionIcon>
      <Link to={`catalog/${Product.id}`} onClick={() => setClose(false)}>
        <Button
          variant="light"
          size={"md"}
          radius={"none"}
          color="blue"
          rightIcon={<BiShow size={18} />}
        >
          show
        </Button>
      </Link>
    </div>
  );
}
