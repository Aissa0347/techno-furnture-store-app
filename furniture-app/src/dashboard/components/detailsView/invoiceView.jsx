import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Button,
  CloseButton,
  Group,
  NumberInput,
  Text,
} from "@mantine/core";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { BiEdit, BiFile, BiShowAlt } from "react-icons/bi";
import { filter, order } from "../icons";
import { LensTwoTone } from "@mui/icons-material";
import { async } from "@firebase/util";
import MainPDF from "../../../invoicePDF/mainPDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

//* ---------------------------- Frame of invoice ---------------------------- */

//* ------------------------------ Frame of Edit ----------------------------- */

function EditInvoice({
  data,
  id,
  orderedProductsList,
  orderedProducts,
  setOrderedProducts,
}) {
  let [filteredProductsList, setFilteredProductsList] = useState([]);
  let [totalCost, setTotalCost] = useState({
    totalCost: data.totalCost,
    totalCostHT: data.totalCostHT,
    totalTaxAmount: data?.totalTaxAmount,
  });

  console.log("check is deep : ", totalCost);

  useEffect(() => {
    console.log("check is shallow : ", orderedProducts);
    let totalCostHT = orderedProducts.reduce(
      (acc, current) => acc + ~~current?.productTotalHT,
      0
    );
    let totalTaxAmount = orderedProducts.reduce(
      (acc, current) => acc + ~~current?.taxAmount,
      0
    );
    let cost = orderedProducts.reduce(
      (acc, current) => acc + ~~current?.productTotal,
      0
    );
    setTotalCost({
      totalCost: cost,
      totalCostHT: totalCostHT,
      totalTaxAmount: totalTaxAmount,
    });
  }, [orderedProducts]);

  // useEffect(() => {
  //   const datas = Object.assign({}, data);
  //   console.log("lets see whats the data : ", data, datas);
  //   setOrderedProducts([...datas.orderList]);
  // }, []);

  useMemo(() => {
    let filteredProducts = [];
    orderedProducts.forEach((productFromOrdered) =>
      orderedProductsList.find((productFromList) => {
        if (productFromList?.id === productFromOrdered?.productId) {
          filteredProducts.push(productFromList);
        }
        return productFromList?.id === productFromOrdered?.productId;
      })
    );
    console.log("filtered products : ", filteredProducts);
    setFilteredProductsList(filteredProducts);
  }, [orderedProducts]);

  return (
    <div className="invoice-products-wrapper">
      <div className="invoice-products">
        {filteredProductsList.map((Product, index) => (
          <DashUniqueCard
            key={Product.id}
            Product={Product}
            orderProduct={orderedProducts[index]}
            orderedProducts={orderedProducts}
            setOrderedProducts={setOrderedProducts}
          />
        ))}
      </div>
      <div className="invoice-products-cost-wrapper">
        <div className="invoice-products-cost ">
          <h5>Total H.T</h5>
          <p>{totalCost.totalCostHT} DA</p>
        </div>
        <div className="invoice-products-cost">
          <h5>TAX Amount</h5>
          <p>{totalCost.totalTaxAmount} DA</p>
        </div>
        <div className="invoice-products-cost primary">
          <h5>TOTAL TTC</h5>
          <p>{totalCost.totalCost} DA</p>
        </div>
      </div>
    </div>
  );
}

function DashUniqueCard({
  Product,
  orderProduct,
  orderedProducts,
  setOrderedProducts,
}) {
  const [quantityValue, setQuantityValue] = useState(orderProduct?.quantity);

  // useEffect(() => {
  //   setQuantityValue(orderProduct.quantity);
  // }, []);

  console.log("this is product example : ", orderProduct);

  useEffect(() => {
    if (quantityValue > 0) {
      orderProduct.quantity = quantityValue;
      orderProduct.productTotalHT =
        (~~orderProduct?.promotionPriceHT || ~~orderProduct?.currentPriceHT) *
        quantityValue;
      orderProduct.taxAmount = Product.priceHT?.taxAmount * quantityValue;
      orderProduct.productTotal =
        (~~orderProduct?.promotionPrice || ~~orderProduct?.currentPrice) *
        quantityValue;
      setOrderedProducts([...orderedProducts]);
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
          <h5>
            {Product?.name}
            <div
              className="color-shower"
              style={{
                backgroundColor: orderProduct?.selectedColor?.colorRef,
                display: "inline-block",
                marginLeft: "5px",
              }}
            ></div>
          </h5>
          <Group align={"flex-end"} spacing={5}>
            <Text color={"red"} size={18} weight={500}>
              {orderProduct?.promotionPrice || orderProduct?.currentPrice} DA
            </Text>
            {orderProduct?.promotionPrice && (
              <Text color={"gray"} size={16} weight={400} strikethrough>
                {orderProduct?.currentPrice} DA
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
        radius={"none"}
        color={"red"}
        onClick={() =>
          setOrderedProducts((prev) =>
            prev.filter(
              (lastOrderProduct) =>
                lastOrderProduct?.productId !== orderProduct?.productId ||
                lastOrderProduct?.selectedColor?.colorRef !==
                  orderProduct?.selectedColor?.colorRef
            )
          )
        }
        style={{ position: "absolute", top: "5px", right: "5px" }}
      />
    </div>
  );
}

//* ------------------------------ Invoice View ------------------------------ */

export function InvoiceView({ data, id }) {
  const [showPDF, setShowPDF] = useState(true);
  const datas = structuredClone(data.orderList);
  const [orderedProducts, setOrderedProducts] = useState(datas);
  const [orderedProductsList, setOrderedProductsList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    setOrderedProducts(datas);
  }, [cancel]);

  const productsRef = collection(db, "ProductsList");

  let productsId = data.orderList.map((product) => product.productId);

  //? Get ordered products from Firestore

  const getOrderedProducts = async () => {
    let orderedQuery;
    await productsId.forEach(async (id) => {
      orderedQuery = query(productsRef, where("id", "==", id));
      await getDocs(orderedQuery).then((orderedProductData) =>
        setOrderedProductsList((prev) => [
          ...prev,
          orderedProductData.docs[0]?.data(),
        ])
      );
      console.log("we still inside ");
    });
  };
  console.log(
    "Here is ordered products : ",
    orderedProductsList,
    orderedProducts
  );

  console.log("we are out now : ", orderedProductsList);

  //? update ordered products on Firestore

  const updateOrder = () => {
    const orderRef = doc(db, "Orders", id);
    let totalQuantity = orderedProducts.reduce(
      (acc, current) => acc + ~~current.quantity,
      0
    );
    let totalCost = orderedProducts.reduce(
      (acc, current) => acc + ~~current?.productTotal,
      0
    );
    updateDoc(orderRef, {
      ...data,
      totalQuantity,
      totalCost,
      orderList: orderedProducts,
    }).then((res) => setShowPDF(true));
    setIsUpdated(true);
  };

  useEffect(() => {
    if (isUpdated) {
      setOrderedProductsList([]);
      getOrderedProducts();
      setIsUpdated(false);
    }
  }, [isUpdated]);

  return (
    <div className="invoice-view">
      <div className="invoice-overview">
        <h4 className="sm-title">overview</h4>
        <section className="invoice-overview-wrapper">
          {showPDF ? (
            <PDFViewer
              children={<MainPDF data={orderedProducts} />}
              height={"99%"}
              width={"100%"}
              className="pdf-viewer"
              showToolbar={false}
            />
          ) : (
            <EditInvoice
              data={data}
              id={id}
              orderedProductsList={orderedProductsList}
              orderedProducts={orderedProducts}
              setOrderedProducts={setOrderedProducts}
            />
          )}
        </section>
        <Group align={"center"} position="apart">
          <ActionIcon
            variant="outline"
            color={"blue"}
            size={"md"}
            radius="none"
            onClick={() => {
              setShowPDF((prevState) => !prevState);
              setCancel((prev) => !prev);
            }}
          >
            {showPDF ? <BiEdit /> : <BiFile />}
          </ActionIcon>
          {showPDF ? (
            <Button
              className="submit-btn"
              variant="light"
              radius="none"
              size="sm"
            >
              <PDFDownloadLink
                fileName="InvoiceSir"
                document={<MainPDF data={orderedProducts} />}
                style={{ color: "#228BE6" }}
              >
                Download me
              </PDFDownloadLink>
            </Button>
          ) : (
            <div>
              <Button
                className="cancel-btn"
                variant="subtle"
                radius="none"
                size="sm"
                color={"red"}
                onClick={() => {
                  setShowPDF((prevState) => !prevState);
                  setCancel((prev) => !prev);
                }}
              >
                Cancel
              </Button>

              <Button
                className="submit-btn"
                variant="light"
                radius="none"
                size="sm"
                onClick={() => updateOrder()}
              >
                Update
              </Button>
            </div>
          )}
        </Group>
      </div>

      <div className="invoice-user-info">
        <h4 className="sm-title">Detail of user</h4>
        <div className="user-info">
          <img
            loading="lazy"
            className="user-info-avatar"
            src={data.avatarImg}
          />
          <h5>{data?.fullName}</h5>
          <p>{data?.address}</p>
          <p>{data?.phoneNumber}</p>
          <ActionIcon
            variant="outline"
            color={"blue"}
            style={{ marginTop: ".5rem" }}
            size={"md"}
            radius="none"
          >
            <BiShowAlt />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}

export default InvoiceView;
