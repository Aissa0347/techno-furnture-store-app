//* ------------------------------ Import SVG's ------------------------------ */

import LOGIN_SVG from "../Website-Assets/SVG/LOGIN_SVG.svg";
import ERROR_404 from "../Website-Assets/SVG/ERROR_404.svg";

export const brands = {
  Brand1: require("../Website-Assets/Brands 1.png"),
  Brand2: require("../Website-Assets/Brands 2.png"),
  Brand3: require("../Website-Assets/Brands 3.png"),
  Brand4: require("../Website-Assets/Brands 4.png"),
  Brand5: require("../Website-Assets/Brands 5.png"),
  Brand6: require("../Website-Assets/Brands 6.png"),
};

//* -------------------------------------------------------------------------- */
//*                                Category Data                               */
//* -------------------------------------------------------------------------- */

export const CategoryP = [
  {
    img: require("../Website-Assets/sofa.png"),
    name: "Sofa",
  },

  {
    img: require("../Website-Assets/bed.png"),
    name: "Bed",
  },

  {
    img: require("../Website-Assets/chair.png"),
    name: "Chair",
  },
  {
    img: require("../Website-Assets/books.png"),
    name: "Bad",
  },
];

//* -------------------------------------------------------------------------- */
//*                              Products Catalog                              */
//* -------------------------------------------------------------------------- */

export const defaultUser = {
  id: "",
  name: "",
  email: "",
  avatarImg:
    "https://firebasestorage.googleapis.com/v0/b/techno-furniture-ecommerce-app.appspot.com/o/Website%20Images%2FdefaultAvatar?alt=media&token=e9406c22-cbf4-41b6-af36-7ef96097544e",
  phoneNumber: "",
  favoriteProducts: [],
  productsInCart: [],
  numberOfOrders: 0,
  amountSpent: 0,
  createdAt: "",
};

export const defaultProduct = {
  name: "",
  category: "",
  img: "",
  price: 1,
  pricePromotion: 1,
  mark: "",
  markName: "",
  dimensions: { width: 0, height: 0, depth: 0 },
  numberOfProduct: 1,
  productStatus: "In stock",
  productQuantity: 1,
  totalProductPrice: 1,
  description: "",
  details: "",
  id: "",
};

export const Products_Catalog = [
  {
    name: "Broun Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image.png"),
    price: 45000,
    mark: require("../Website-Assets/Brands 1.png"),
    markName: "hp",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 35,
    totalProductPrice: 45000,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "3jtNVyrg7g",
  },
  {
    name: "Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-1.png"),
    price: 19000,
    mark: require("../Website-Assets/Brands 2.png"),
    markName: "hp",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 78,
    totalProductPrice: 19000,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "8m0IhgDyCd",
  },
  {
    name: "Black Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-2.png"),
    price: 3500,
    mark: require("../Website-Assets/Brands 3.png"),
    markName: "dell",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "Pending",
    productQuantity: 68,
    totalProductPrice: 3500,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "eF03wr6JNL",
  },
  {
    name: "Small Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-3.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 4.png"),
    markName: "benq",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 42,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "1Wd6AVutPJ",
  },
  {
    name: "Chair",
    category: "Chair",
    img: require("../Website-Assets/image-4.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 5.png"),
    markName: "Acer",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 34,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "NBJ153W28x",
  },
  {
    name: "Black Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-5.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 6.png"),
    markName: "Asus",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 53,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "k4u4gyB6Lt",
  },
  {
    name: "Bad",
    category: "Bad",
    img: require("../Website-Assets/image-6.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 1.png"),
    markName: "SAMSUNG",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 91,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "eLXbL6J5IF",
  },
  {
    name: "Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-7.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 2.png"),
    markName: "IRIS",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "Pending",
    productQuantity: 71,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "fSy35b3f5d",
  },
  {
    name: "Broun Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 3.png"),
    markName: "Apple",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 25,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "UbmXbYOtxQ",
  },
  {
    name: "Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-1.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 4.png"),
    markName: "Msi",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "Pending",
    productQuantity: 78,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "fLcllQw0Hq",
  },
  {
    name: "Black Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-2.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 5.png"),
    markName: "hp",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 14,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "3snVaL1ksE",
  },
  {
    name: "Small Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-3.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 6.png"),
    markName: "Acer",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 23,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "MoIIlMqPT0",
  },
  {
    name: "Chair",
    category: "Chair",
    img: require("../Website-Assets/image-4.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 1.png"),
    markName: "dell",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "Pending",
    productQuantity: 156,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "JX1mXvUVjj",
  },
  {
    name: "Black Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-5.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 2.png"),
    markName: "Apple",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 39,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "dvBxQKQIU7",
  },
  {
    name: "Bed",
    category: "Bed",
    img: require("../Website-Assets/image-6.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 3.png"),
    markName: "Msi",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "In stock",
    productQuantity: 59,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "xm7u2W6pbU",
  },
  {
    name: "Sofa",
    category: "Sofa",
    img: require("../Website-Assets/image-7.png"),
    price: 24.99,
    mark: require("../Website-Assets/Brands 4.png"),
    markName: "benq",
    dimensions: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    productStatus: "Pending",
    productQuantity: 41,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "DPEgiTgQZL",
  },
];

//* ----------------------------- Customers Data ----------------------------- */

export const customersList = [
  {
    id: "fsdk55647",
    avatarImg: require("../Website-Assets/avatar (1).png"),
    firstName: "Semaoui",
    lastName: "Aissa",
    phoneNumber: "0795914857",
    joinDate: "21/08/2022",
    numOfOrders: 24,
    amountSpent: "18000",
  },
  {
    id: "fos8566",
    avatarImg: require("../Website-Assets/avatar (2).png"),
    firstName: "Semaoui",
    lastName: "Bakir",
    phoneNumber: "0689574281",
    joinDate: "18/05/2022",
    numOfOrders: 89,
    amountSpent: "36500",
  },
  {
    id: "gjsk55647",
    avatarImg: require("../Website-Assets/avatar (3).png"),
    firstName: "Latrech",
    lastName: "Mohamed",
    phoneNumber: "0550951515",
    joinDate: "01/09/2022",
    numOfOrders: 16,
    amountSpent: "24000",
  },
];

//* -------------------------------------------------------------------------- */
//*                                  Invoices                                  */
//* -------------------------------------------------------------------------- */

export const InvoicesList = [
  {
    id: "user-4865",
    avatarImg: require("../Website-Assets/avatar (3).png"),
    name: "Aissa Semaoui",
    orderId: "fs-58932",
    orderAddress: "Bordj el Kiffan",
    inDate: "07/08/2022",
    orderQuantity: 35,
    orderCost: 15900,
    orderStatus: "pending",
  },
  {
    id: "user-4565",
    avatarImg: require("../Website-Assets/avatar (2).png"),
    name: "Bakir Semaoui",
    orderId: "fs-56932",
    orderAddress: "Bordj el Kiffan, Hamiz",
    inDate: "26/09/2022",
    orderQuantity: 53,
    orderCost: 19500,
    orderStatus: "completed",
  },
  {
    id: "user-4865",
    avatarImg: require("../Website-Assets/avatar (1).png"),
    name: "Latrech Mohamed",
    orderId: "fs-58662",
    orderAddress: "Blida,Chebli",
    inDate: "11/12/2022",
    orderQuantity: 12,
    orderCost: 89000,
    orderStatus: "returned",
  },
  {
    id: "user-1562",
    avatarImg: require("../Website-Assets/avatar (4).png"),
    name: "Doudou Yasser",
    orderId: "fs-58992",
    orderAddress: "Bordj el Kiffan",
    inDate: "07/08/2022",
    orderQuantity: 80,
    orderCost: 23500,
    orderStatus: "canceled",
  },
];

//* --------------------------------- Feature -------------------------------- */

export const FeautreP = [
  {
    img: require("../Website-Assets/shipping.png"),
    text: "Fast Shipping",
  },
  {
    img: require("../Website-Assets/security.png"),
    text: "Secure Payment",
  },
  {
    img: require("../Website-Assets/quality.png"),
    text: "High Quality",
  },
];

export const semiCategory = [
  {
    name: "Sofa",
    state: "active",
  },
  {
    name: "Chair",
  },
  {
    name: "Bad",
  },
  {
    name: "Bearu",
  },
];

//* ------------------------------ Export SVG's ------------------------------ */

//? Import Logo
export const LOGO = require("./logo.png");
