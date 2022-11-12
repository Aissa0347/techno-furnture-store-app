import React, { useState, useContext, useEffect, useRef } from "react";
import {
  BiCartAlt,
  BiHeart,
  BiShow,
  BiShowAlt,
  BiTrash,
  BiX,
} from "react-icons/bi";
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
  Stack,
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
      <Link to={`/catalog/${id}`}>
        <Group position="center" className={classes.productName} py="xs">
          <div>
            <Text weight={500} component="h3" transform="uppercase">
              {name}
            </Text>
          </div>
          <Stack align={"center"} spacing={2}>
            {pricePromotion && (
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
            )}
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

export function DashUniqueCard({
  Product,
  setIsChanged,
  cardProductsClone,
  isOrdering = false,
}) {
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
    Product.numberOfProduct = 1;
  }

  function setChanged(not = true) {
    not ? setIsChanged(true) : setIsChanged(false);
  }

  useEffect(() => {
    setQuantityValue(Product?.numberOfProduct);
  }, [Product]);

  useEffect(() => {
    setChanged();
  }, [quantityValue]);

  useEffect(() => {
    if (quantityValue > 0) {
      Product.numberOfProduct = quantityValue;
      Product.totalProductPrice =
        (~~Product?.pricePromotion || ~~Product?.price) * quantityValue;
      setSubTotal(calcSubTotal(cardProductsClone));
    } else if (quantityValue < 1) {
      setQuantityValue(1);
    }
  }, [quantityValue]);

  console.log("product is here : ", Product);

  return (
    <div className="unique_card product-info invoice-product-info">
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
        {/* <Group spacing={5}>
          <ActionIcon
            variant="default"
            size={36}
            radius={"none"}
            onClick={() => {
              setQuantityValue((prev) => prev + 1);
            }}
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
            onClick={() => {
              setIsChanged(true);
              setQuantityValue((prev) => prev - 1);
            }}
          >
            -
          </ActionIcon>
        </Group> */}
      </label>
      {isOrdering ? (
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
      ) : (
        <CloseButton
          size={"lg"}
          radius={"none"}
          color={"red"}
          onClick={() => {
            removeFromCard(Product, cardProducts, setCardProducts);
            defaultNumberAndTotal();
            setSubTotal(calcSubTotal());
          }}
          style={{ position: "absolute", top: "5px", right: "5px" }}
        />
      )}
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
      {/* <Group
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
      </Group> */}
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
