import React, { useState, useContext, useEffect } from "react";
import { BiCartAlt, BiHeart, BiShowAlt, BiX } from "react-icons/bi";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

//  Import from Libraries
import { Link } from "react-router-dom";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  ActionIcon,
  NumberInput,
  CloseButton,
} from "@mantine/core";

//  Import Component Nedeed
import { GlobalContext } from "../App";

//* -------------------------------- Category -------------------------------- */

export function SmallCard(props) {
  const { setFilters } = useContext(GlobalContext);
  const { img, name } = props;
  return (
    <div className="card ">
      <Link
        to={"/catalog"}
        onClick={() => {
          setFilters({ category: [name], markName: [] });
          window.scrollTo(0, 0);
        }}
      >
        <div className="imgbx">
          <img loading="lazy" src={img} alt={name} />
        </div>
      </Link>
      <h3>{name}</h3>
    </div>
  );
}

//* --------------------------- Products Main Cards -------------------------- */

export function Actions({ currentProduct }) {
  const {
    favoriteProducts,
    setFavoriteProducts,
    cardProducts,
    setCardProducts,
    toggleToFavorite,
    addToFavorite,
    isFavorite,
  } = useContext(GlobalContext);

  let isSaved = isFavorite(currentProduct, favoriteProducts);
  return (
    <>
      <Group style={{ gap: "8px" }}>
        <Button
          radius={"none"}
          size={"md"}
          style={{ flex: 1, backgroundColor: "#d96b52" }}
          onClick={() => {
            addToFavorite(currentProduct, cardProducts, setCardProducts);
          }}
        >
          Add to card
        </Button>
        <ActionIcon
          variant="outline"
          size={42}
          radius={"none"}
          onClick={() => {
            toggleToFavorite(
              currentProduct,
              favoriteProducts,
              setFavoriteProducts
            );
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
    flex: 1,
    flexDirection: "column",
    gap: "8px",
  },
}));

export function ProductsCard({
  img,
  name,
  price,
  id,
  currentProduct,
  markName,
}) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius={"none"} className={classes.card}>
      <Link to={`/catalog/${id}`}>
        <Card.Section className={classes.imageSection} p="xs" mt={-16}>
          <Image src={img[0].url} alt={name} height={200} fit={"contain"} />
        </Card.Section>
      </Link>

      <Group position="center" className={classes.productName} my="xs">
        <div>
          <Text weight={500} component="h3" transform="uppercase">
            {name}
          </Text>
        </div>
        <div>
          <Text
            component="span"
            style={{ color: "#d96b52" }}
            mr={5}
            size="xl"
            weight={700}
            sx={{ lineHeight: 1 }}
          >
            {price}0,00
          </Text>
          <Text
            component="span"
            size="sm"
            color="dimmed"
            weight={500}
            sx={{ lineHeight: "1px" }}
          >
            DA
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} p="xs">
        <Actions currentProduct={currentProduct} />
      </Card.Section>
    </Card>
  );
}

//* ------------------------- Import Unique Cards ------------------------- */

export function UniqueCard({ Product, setTrigger }) {
  const {
    cardProducts,
    removeFromFavorite,
    setCardProducts,
    setSubTotal,
    calcSubTotal,
  } = useContext(GlobalContext);
  const [productNumber, setProductNumber] = useState(
    Product.numberOfProduct || 1
  );
  if (productNumber < 1) {
    console.log(typeof productNumber);
    setProductNumber(1);
  }
  let variable;

  Product.numberOfProduct = ~~productNumber;
  variable = productNumber;
  console.log(Product.img);
  Product.totalProductPrice = ~~Product.price * ~~Product.numberOfProduct;

  useEffect(() => {
    setProductNumber(Product.numberOfProduct);
  }, [cardProducts]);

  useEffect(() => {
    if (setTrigger) setTrigger((prev) => !prev);
  }, [variable]);

  useEffect(() => {
    setSubTotal(calcSubTotal());
  }, [productNumber]);

  function defaultNumberAndTotal() {
    Product.totalProductPrice = 0;
    Product.numberOfProduct = 1;
  }
  return (
    <li className="unique_card product-info">
      <div className="img_name">
        <img
          src={Product.img[0].url}
          alt={Product.name}
          className="product_image"
        />
        <div className="product_title">
          <h5>{Product.name}</h5>
          <h4>{Product.category}</h4>
        </div>
      </div>
      <label htmlFor="Qty-input" className="product_quantity">
        {" "}
        Qty:&nbsp;
        <button onClick={() => setProductNumber(+(productNumber + 1))}>
          +
        </button>
        <input
          type="number"
          name="Qty-input"
          id="Qty-input"
          value={Product.numberOfProduct}
          onChange={(event) => setProductNumber(+event.target.value)}
        />
        <button onClick={() => setProductNumber(+(productNumber - 1))}>
          -
        </button>
      </label>
      <h4 className="product_price">{Product.totalProductPrice} DZD</h4>
      <BiX
        className="remove-icon icon"
        onClick={() => {
          removeFromFavorite(Product, cardProducts, setCardProducts);
          defaultNumberAndTotal();
          setSubTotal(calcSubTotal());
        }}
      />
    </li>
  );
}

export function DashUniqueCard({ Product, setTrigger }) {
  const [quantityValue, setQuantityValue] = useState(
    Product?.numberOfProduct || 1
  );
  const {
    cardProducts,
    removeFromFavorite,
    setCardProducts,
    setSubTotal,
    calcSubTotal,
  } = useContext(GlobalContext);

  function defaultNumberAndTotal() {
    Product.totalProductPrice = 0;
    Product.numberOfProduct = 1;
  }

  useEffect(() => {
    if (quantityValue > 0) {
      Product.numberOfProduct = quantityValue;
      Product.totalProductPrice = ~~Product?.price * quantityValue;
      setSubTotal(calcSubTotal());
    } else if (quantityValue < 1) {
      setQuantityValue(1);
    }
  }, [quantityValue]);

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
          <h4>{Product?.price} DZD</h4>
        </div>
      </div>
      <label htmlFor="Qty-input" className="quantity-controls">
        {" "}
        Qty:&nbsp;
        <Group spacing={5}>
          <ActionIcon
            variant="default"
            size={36}
            radius={"none"}
            onClick={() => setQuantityValue((prev) => prev + 1)}
          >
            +
          </ActionIcon>
          <NumberInput
            radius={"none"}
            hideControls
            type="number"
            name="Qty-input"
            id="Qty-input"
            styles={{ input: { width: 50, textAlign: "center" } }}
            min={1}
            value={quantityValue}
            onChange={(e) => {
              setQuantityValue(e !== undefined ? e : 1);
            }}
          />
          <ActionIcon
            variant="default"
            size={36}
            radius={"none"}
            onClick={() => setQuantityValue((prev) => prev - 1)}
          >
            -
          </ActionIcon>
        </Group>
      </label>
      <CloseButton
        size={"lg"}
        radius={"none"}
        color={"red"}
        onClick={() => {
          removeFromFavorite(Product, cardProducts, setCardProducts);
          defaultNumberAndTotal();
          setSubTotal(calcSubTotal());
        }}
        style={{ position: "absolute", top: "5px", right: "5px" }}
      />
    </div>
  );
}

export function FavUniqueCard({ Product, setTrigger }) {
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

  useEffect(() => {
    quantityValue < 1 && setQuantityValue(1);
  });

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
          <h4>{Product?.price} DZD</h4>
        </div>
      </div>
      <Group
        position="apart"
        align={"center"}
        mt={"0.5rem"}
        style={{ width: "100%" }}
      >
        <label htmlFor="Qty-input" className="quantity-controls">
          {" "}
          Qty:&nbsp;
          <Group spacing={5}>
            <ActionIcon
              variant="default"
              size={36}
              radius={"none"}
              onClick={() => setQuantityValue((prev) => prev + 1)}
            >
              +
            </ActionIcon>
            <NumberInput
              radius={"none"}
              hideControls
              type="number"
              name="Qty-input"
              id="Qty-input"
              styles={{ input: { width: 50, textAlign: "center" } }}
              min={1}
              value={quantityValue}
              onChange={(e) => {
                setQuantityValue(e !== undefined ? e : 1);
              }}
            />
            <ActionIcon
              variant="default"
              size={36}
              radius={"none"}
              onClick={() => setQuantityValue((prev) => prev - 1)}
            >
              -
            </ActionIcon>
          </Group>
        </label>
        <ActionIcon
          variant="filled"
          size={"lg"}
          radius={"none"}
          color="red"
          onClick={() => {
            addToFavorite(Product, cardProducts, setCardProducts);
            Product.numberOfProduct = quantityValue;
            setQuantityValue(1);
          }}
        >
          <BiCartAlt size={24} />
        </ActionIcon>
      </Group>
      <CloseButton
        size={"lg"}
        radius={"none"}
        color={"red"}
        onClick={() =>
          removeFromFavorite(Product, favoriteProducts, setFavoriteProducts)
        }
        style={{ position: "absolute", top: "5px", right: "5px" }}
      />
    </div>
  );
}
