import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

//  import Libraries
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// import Component
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Catalog from "./Components/Catalog";
import ProductPage from "./Components/Product_Page";
import Dashboard from "./dashboard/Dashboard";

// import Dashboard Components
import Main from "./dashboard/pages/main/Main";
import Customers from "./dashboard/pages/customers/customers";
import Products from "./dashboard/pages/products/products";
import Invoices from "./dashboard/pages/invoices/invoices";

// import Styles
import "./styles/index.scss";
import Product_Page from "./Components/Product_Page";
import Ordering from "./Components/Ordering";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebase/firebaseConfig";
import { async } from "@firebase/util";
import { defaultProduct } from "./Website-Assets";
import Auth from "./authentication/auth";
import { useLayoutEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref } from "firebase/storage";
import moment from "moment";

//* ---------------------------- Main App Function --------------------------- */

export const GlobalContext = createContext({});

//  Helper Functions
const pickRandomProducts = (productsArray, productsMaxNumber) => {
  return productsArray
    .sort(() => 0.5 - Math.random())
    .slice(0, productsMaxNumber);
};

export const findCurrentProduct = (ProductList, paramsId) => {
  console.log("inside of findCurrentProduct");
  return ProductList.find((product) => product.id === paramsId);
};

export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function capitalizeSentence(text, outForm = "string") {
  let capitalizedText = text
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substr(1));
  if (outForm === "string") capitalizedText = capitalizedText.join(" ");
  return capitalizedText;
}

//* ---------------------------- Setting Analytics --------------------------- */

function setAnalytics() {
  const defaultDayStatics = {
    date: serverTimestamp(),
    visits: 1,
    sales: 0,
    orders: 0,
    newCustomers: 0,
    ordersStatus: {
      pending: 0,
      completed: 0,
      returned: 0,
      ongoing: 0,
      cancelled: 0,
    },
  };
  const idOfCollection = moment().format("MMMM, YYYY");
  const nameOfDayObject = moment().format("DD-MM");
  const monthDocRef = doc(db, "AnalyticsData", idOfCollection);
  getDoc(monthDocRef)
    .then((res) => {
      if (res.exists()) {
        let oldData = res.get(nameOfDayObject);
        console.log("old data is here : ", oldData);
        oldData
          ? updateDoc(monthDocRef, {
              [nameOfDayObject]: { ...oldData, visits: ~~oldData.visits + 1 },
            })
          : updateDoc(monthDocRef, {
              [nameOfDayObject]: { ...defaultDayStatics },
            });
      } else {
        setDoc(monthDocRef, { [nameOfDayObject]: { ...defaultDayStatics } });
      }
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
}

export function setStaticValue(field, amount, status, lastStatus) {
  const idOfCollection = moment().format("MMMM, YYYY");
  const nameOfDayObject = moment().format("DD-MM");
  const monthDocRef = doc(db, "AnalyticsData", idOfCollection);
  getDoc(monthDocRef).then((res) => {
    let oldData = res.get(nameOfDayObject);
    if (field === "ordersStatus") {
      updateDoc(monthDocRef, {
        [nameOfDayObject]: {
          ...oldData,
          ordersStatus: {
            ...oldData.ordersStatus,
            [status]: ~~amount + ~~oldData.ordersStatus[status],
            [lastStatus]: ~~oldData.ordersStatus[lastStatus] - ~~amount,
          },
        },
      });
    } else if (field === "orders") {
      updateDoc(monthDocRef, {
        [nameOfDayObject]: {
          ...oldData,
          ordersStatus: {
            ...oldData.ordersStatus,
            pending: ~~oldData.ordersStatus.pending + ~~amount,
          },
          orders: ~~oldData.orders + ~~amount,
        },
      });
    } else {
      updateDoc(monthDocRef, {
        [nameOfDayObject]: {
          ...oldData,
          [field]: ~~oldData[field] + ~~amount,
        },
      });
    }
  });
}

//* -------------------------------------------------------------------------- */
//*                                App Component                               */
//* -------------------------------------------------------------------------- */

function App() {
  const [ProductsCatalog, setProductsCatalog] = useState([defaultProduct]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cardProducts, setCardProducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    markName: [],
    price: [],
  });
  const [subTotal, setSubTotal] = useState(0);
  const [userUID, setUserUID] = useState("");
  const [currentUserData, setCurrentUserData] = useState("");
  const [orderData, setOrderData] = useState({
    userId: "",
    willaya: "",
    address: "",
    phoneNumber: "",
    orderId: "",
    orderDate: "",
    orderList: [],
    status: "pending",
    totalCost: "",
    totalQuantity: "",
    avatarImg: "",
  });

  useEffect(() => {
    setAnalytics();
  }, []);

  console.log(ProductsCatalog);
  function calcSubTotal() {
    return cardProducts.reduce(
      (prev, current) => prev + current.totalProductPrice,
      0
    );
  }

  //* ------------------------------ Get User Info ----------------------------- */

  const getUserData = async (userUID) => {
    const usersRef = collection(db, "Users");
    const userQuery = query(usersRef, where("id", "==", userUID));
    onSnapshot(
      userQuery,
      (user) => {
        console.log("this is user on snapshot", user);
        console.log("this is user data ", user.docs[0] == 1);
        let data = user.docs[0].data();
        setCurrentUserData(data);
      },
      undefined,
      (error) => {
        console.log("its error ", error.code, error.message);
      }
    );
  };

  console.log("this is current user data", currentUserData);

  onAuthStateChanged(auth, async (user) => {
    console.log("this is the true uid : ", user?.uid);
    console.log("this is the top uid : ", userUID);
    if (userUID !== user?.uid) setUserUID(user?.uid);
    if (user?.uid && !currentUserData) await getUserData(user?.uid);
    if (!user?.uid) setCurrentUserData("");
  });

  useCallback(() => {
    console.log("samir");
    getUserData(userUID);
  }, [userUID]);

  //* -------------------------------- Get Data -------------------------------- */

  const getData = async () => {
    const ProductRef = collection(db, "ProductsList");
    let dataPromise = await getDocs(ProductRef);
    let fullData = dataPromise.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
      // id: doc.id,
    }));
    setProductsCatalog(fullData);
    setIsDataLoaded(true);
    console.log("its on", ProductsCatalog);
  };
  console.log(ProductsCatalog);

  function updateData() {
    getData();
  }

  useEffect(() => {
    getData();
    console.log(ProductsCatalog);
  }, []);

  //?  Toggle To Favorite Functions As example but it works also with card

  function addToFavorite(
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) {
    let isSavedToFavorite = false;
    favoriteProducts.forEach((favProduct) => {
      if (favProduct.id === currentProduct.id) isSavedToFavorite = true;
    });
    if (!isSavedToFavorite)
      setFavoriteProducts((lastProducts) => [...lastProducts, currentProduct]);
  }
  function isFavorite(currentProduct, favoriteProducts) {
    let isSaved = false;
    favoriteProducts.forEach((favProduct) => {
      console.log(currentProduct);
      if (favProduct.id === currentProduct.id) isSaved = true;
    });
    return isSaved;
  }
  function removeFromFavorite(
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) {
    let newFav = favoriteProducts.filter((favProduct) => {
      return favProduct.id !== currentProduct.id;
    });
    setFavoriteProducts(newFav);
  }
  function toggleToFavorite(
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) {
    if (!isFavorite(currentProduct, favoriteProducts))
      addToFavorite(currentProduct, favoriteProducts, setFavoriteProducts);
    else
      removeFromFavorite(currentProduct, favoriteProducts, setFavoriteProducts);
  }

  //* ------------------------------- Send Order ------------------------------- */

  const generateOrderId = (countOfOrder) => {
    const includeZeros = countOfOrder.toString().padStart(4, "0");
    return "INV-" + includeZeros;
  };

  function sendOrder(userInfo) {
    const ordersInfosRef = doc(db, "GeneralInfos", "ORDERS-GENERAL-INFOS");
    const orderRef = collection(db, "Orders");
    const userRef = query(collection(db, "Users"), where("id", "==", userUID));
    const notificationsRef = doc(db, "Notifications", "Orders-Notifications");
    getDoc(ordersInfosRef)
      .then((res) => {
        const currentValue = res.data().ordersCount;
        const newOrderData = {
          ...orderData,
          ...userInfo,
          orderId: generateOrderId(currentValue + 1),
        };
        console.log(newOrderData);
        addDoc(orderRef, newOrderData);
        updateDoc(ordersInfosRef, { ordersCount: ~~currentValue + 1 });
        setStaticValue("orders", 1);
        getDocs(userRef).then((res) => {
          const data = res.docs[0].data();
          updateDoc(res.docs[0].ref, {
            invoices: arrayUnion(newOrderData.orderId),
            numberOfOrders: ~~data.numberOfOrders + 1,
            amountSpent: ~~data.amountSpent + ~~newOrderData.totalCost,
            phoneNumber: newOrderData.phoneNumber,
          }).then((res) => console.log("thanks its fullfilled : ", res));
        });
        getDoc(notificationsRef)
          .then((res) => {
            const oldData = res.data().notifications;
            const avatarImg = auth.currentUser.photoURL;
            updateDoc(notificationsRef, {
              notifications: [
                ...oldData,
                {
                  name: newOrderData.fullName,
                  action: "order",
                  time: moment().unix(),
                  userId: newOrderData.userId,
                  orderId: newOrderData.orderId,
                  avatarImg,
                },
              ],
            }).catch((error) => console.log(error.code, error.message));
          })
          .catch((error) => console.log(error.code, error.message));
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });

    console.log("this is what we send : ", orderData);
  }

  console.log("those are our favorite", favoriteProducts);

  return (
    <GlobalContext.Provider
      value={{
        ProductsCatalog,
        setProductsCatalog,
        updateData,
        pickRandomProducts,
        findCurrentProduct,
        isFavorite,
        addToFavorite,
        removeFromFavorite,
        toggleToFavorite,
        setFavoriteProducts,
        favoriteProducts,
        setCardProducts,
        cardProducts,
        setFilters,
        subTotal,
        setSubTotal,
        calcSubTotal,
        currentUserData,
        orderData,
        setOrderData,
        sendOrder,
      }}
    >
      {" "}
      {isDataLoaded ? (
        <div className="main">
          <Routes>
            <Route
              path="/auth/"
              element={<Auth setUserUID={setUserUID} />}
            ></Route>
            <Route path="/dashboard/" element={<Dashboard />}>
              <Route index element={<Main />}></Route>
              <Route path="customers" element={<Customers />}></Route>
              <Route path="products" element={<Products />}></Route>
              <Route path="invoices" element={<Invoices />}></Route>
            </Route>
            <Route
              path="/"
              element={
                <Navbar
                  favoriteProducts={favoriteProducts}
                  cardProducts={cardProducts}
                />
              }
            >
              <Route index element={<Home />}></Route>
              <Route
                path="/catalog"
                element={
                  <Catalog
                    searchFilter={searchFilter}
                    setSearchFilter={setSearchFilter}
                    filters={filters}
                    setFilters={setFilters}
                  />
                }
              ></Route>
              <Route path="/productpage" element={<ProductPage />}></Route>
              <Route
                path="catalog/:productId"
                element={<ProductPage />}
              ></Route>
              <Route path="/ordering" element={<Ordering />}></Route>
            </Route>
          </Routes>
        </div>
      ) : (
        <div>
          {" "}
          <h1>is loading shut up and wait</h1>
        </div>
      )}
    </GlobalContext.Provider>
  );
}

export default App;
