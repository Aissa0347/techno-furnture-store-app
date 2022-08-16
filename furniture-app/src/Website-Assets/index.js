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
export const defaultProduct = {
  name: "",
  category: "",
  img: "",
  price: "",
  mark: "",
  markName: "",
  demonsion: { widht: "", height: "", depth: "" },
  numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
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
    demonsion: { height: 1.5, width: 5.4, depth: 2.2 },
    numberOfProduct: 1,
    totalProductPrice: 24.99,
    description:
      "This product is somethig great that i would suggest to each client put it on his desk",
    details:
      "the sofa is really impressive because of his cotton material so i would suggest to to use it in your home better tha n desk",
    id: "DPEgiTgQZL",
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
