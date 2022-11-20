import React, { useContext, useEffect, useRef, useState } from "react";

// import Icons

// import Components needed
import { MediaSlider, SuggestedProducts } from "./Products";
import { GlobalContext } from "../App";

// import DATA
import { Products_Catalog, defaultProduct } from "../Website-Assets";

// import Styles
import "../styles/index.scss";
import { BiChevronLeft, BiErrorCircle, BiHeart } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import {
  ActionIcon,
  Alert,
  Button,
  ColorPicker,
  Group,
  NumberInput,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { color } from "@mui/system";
import Bradcrumbs from "./smallComponents/bradcrumbs";

// import Helper Functions
// import { findCurrentProduct } from "../App";

//* --------------------------- Product Media Show -------------------------- */

export function ProductDetailShow(props) {
  const { currentProduct } = props;
  const [isLoading, setIsLoading] = useState(true);
  let locations;

  locations = [
    { label: "Home", path: "/" },
    { label: "Catalog", path: "/catalog" },
    { label: currentProduct?.name },
  ];

  window.onloadeddata = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div className="destination">
        <Bradcrumbs locations={locations} />
      </div>
      <div className="product-show">
        <div className="product-show-media">
          <MediaSlider images={currentProduct.img} name={currentProduct.name} />
        </div>
        <div className="product-info">
          <ProductInfo {...currentProduct} currentProduct={currentProduct} />
        </div>
      </div>
      <div className="filter-box  product_details">
        <details className="filter-checkbox" open>
          <summary>
            Details <BiChevronLeft className="chevron" />
          </summary>

          <div className="col">
            <TypographyStylesProvider style={{ width: "100%" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentProduct?.description,
                }}
              ></div>
            </TypographyStylesProvider>
          </div>
        </details>
      </div>
    </>
  );
}

//* --------------------------- Product Detail Show -------------------------- */

function ProductInfo({
  name,
  price,
  category,
  mark,
  markName,
  id,
  description,
  dimensions,
  pricePromotion,
  details,
  colors,
  currentProduct,
}) {
  const {
    isFavorite,
    addToFavorite,
    addToCard,
    toggleToFavorite,
    favoriteProducts,
    setFavoriteProducts,
    cardProducts,
    setCardProducts,
    currentUserData,
    setOpenAuthDrawer,
  } = useContext(GlobalContext);
  const [colorPicked, setColorPicked] = useState("");
  const [quantityValue, setQuantityValue] = useState(1);
  const [error, setError] = useState(false);
  const handlers = useRef();
  let isSaved = isFavorite(currentProduct, favoriteProducts);

  useEffect(() => {
    setQuantityValue(1);
    setColorPicked("");
    setError(false);
  }, [currentProduct]);

  function validatedProduct() {
    if (colors?.length) {
      if (colorPicked) {
        setError(false);
        return true;
      } else {
        setError(true);
        return false;
      }
    } else {
      return true;
    }
  }

  return (
    <>
      <ul>
        <li className="product_name info">
          <span className="subTitle">{category}</span>
          <h3>
            <strong>{name}</strong>
          </h3>
        </li>
        <li className="product_maker info">
          <h5>Made by:</h5>
          {/*  <img loading="lazy" src={mark} alt="" /> */}
          <p>{markName}</p>
        </li>
        {dimensions?.width || dimensions?.height || dimensions?.depth ? (
          <li className="product_dimensions info">
            <h5>Dimensions:</h5>
            <table>
              <thead>
                <tr>
                  {dimensions?.width && (
                    <th>
                      {" "}
                      <small>Width-</small>&nbsp;{dimensions?.width}&nbsp;cm
                    </th>
                  )}
                  {dimensions?.height && (
                    <th>
                      <small>Height-</small>&nbsp;{dimensions?.height}&nbsp;cm
                    </th>
                  )}
                  {dimensions?.depth && (
                    <th>
                      {" "}
                      <small>Depth-</small>&nbsp;{dimensions?.depth}&nbsp;cm
                    </th>
                  )}
                </tr>
              </thead>
            </table>
          </li>
        ) : null}
        <li className="product_description ">
          <p>
            This product is really nice one I would to inform you that our
            product ranked with top 10 of the world
          </p>
        </li>
        {colors?.length ? (
          <li className="product_colors">
            <h5>Colors:</h5>
            <SelectProductColor
              setError={setError}
              colors={colors}
              colorPicked={colorPicked}
              setColorPicked={setColorPicked}
            />
            {colorPicked?.colorName}
          </li>
        ) : null}
        <li className="product_quantity">
          <label htmlFor="quantity">Qty:</label>
          <Group spacing={5}>
            <ActionIcon
              radius={"none"}
              size={42}
              variant="default"
              onClick={() => handlers.current.decrement()}
            >
              -
            </ActionIcon>

            <NumberInput
              size="md"
              radius={"none"}
              name="quantity"
              id="quantity"
              hideControls
              value={quantityValue}
              onChange={(val) => setQuantityValue(val)}
              min={1}
              step={1}
              handlersRef={handlers}
              styles={{ input: { width: 54, textAlign: "center" } }}
            />

            <ActionIcon
              radius={"none"}
              size={42}
              variant="default"
              onClick={() => handlers.current.increment()}
            >
              +
            </ActionIcon>
          </Group>
        </li>
        <li className="product_price">
          <Text size={32} color="red" weight={500}>
            {pricePromotion || price} DA
          </Text>
          {pricePromotion ? (
            <Text strikethrough size={20} color="gray" weight={"normal"}>
              {price} DA
            </Text>
          ) : null}
        </li>
        {error ? (
          <li>
            <Alert
              icon={<BiErrorCircle size={16} />}
              title="Bummer!"
              color="orange"
            >
              Please select a color !
            </Alert>
          </li>
        ) : null}
        <Stack spacing={10}>
          <Group spacing={10} noWrap>
            <Button
              size="lg"
              radius="none"
              // className="btn CTA"
              fullWidth
              onClick={() => {
                currentUserData && validatedProduct()
                  ? addToCard(
                      {
                        ...currentProduct,
                        numberOfProduct: quantityValue,
                        selectedColor: colorPicked,
                      },
                      cardProducts,
                      setCardProducts
                    )
                  : setOpenAuthDrawer(true);
              }}
            >
              ADD TO CART
            </Button>
            <ActionIcon
              variant="outline"
              size={50}
              radius="none"
              color="blue"
              // className="btn CTA-2"
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
              {isSaved ? (
                <RiHeartFill
                  size={20}
                  style={{ color: "red" }}
                  className="fav"
                />
              ) : (
                <RiHeartLine size={20} className="fav" />
              )}
            </ActionIcon>
          </Group>
          <Button
            variant="outline"
            size="lg"
            radius="none"
            // className="btn CTA"
            fullWidth
            onClick={() => {
              currentUserData && validatedProduct()
                ? addToCard(
                    {
                      ...currentProduct,
                      numberOfProduct: quantityValue,
                      selectedColor: colorPicked,
                    },
                    cardProducts,
                    setCardProducts,
                    true
                  )
                : setOpenAuthDrawer(true);
            }}
          >
            BUY NOW
          </Button>
        </Stack>
      </ul>
    </>
  );
}

function SelectProductColor({ colorPicked, setColorPicked, colors, setError }) {
  console.log("colors value : ", colors);
  return (
    <div className="select-product-color">
      {colors?.map((color, index) => (
        <div
          key={color.colorRef + color.colorName}
          className={
            index === colorPicked?.index
              ? "product-color selected"
              : "product-color"
          }
          style={{ backgroundColor: color.colorRef }}
          onClick={() => {
            setError(false);
            setColorPicked({ ...color, index: index });
          }}
        ></div>
      ))}
    </div>
  );
}

//* ------------------------------ Products Page ----------------------------- */

function ProductPage() {
  const { findCurrentProduct, ProductsCatalog } = useContext(GlobalContext);
  const [currentProduct, setCurrentProduct] = useState(defaultProduct);
  let { productId } = useParams();
  useEffect(() => {
    setCurrentProduct(
      findCurrentProduct(ProductsCatalog, productId) || defaultProduct
    );
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <div className="product_page page container">
      <ProductDetailShow currentProduct={currentProduct} />
      <SuggestedProducts />
    </div>
  );
}

export default React.memo(ProductPage);
