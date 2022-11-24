import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  lazy,
  Suspense,
  useState,
} from "react";

//  import Libraries
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

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
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebase/firebaseConfig";
import { defaultProduct } from "./Website-Assets";
import Auth from "./authentication/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import moment from "moment";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  BiCheckCircle,
  BiErrorAlt,
  BiHeartCircle,
  BiXCircle,
} from "react-icons/bi";
import { Drawer } from "@mantine/core";

// import Component
import Navbar from "./Components/Navbar";
import ProductPage from "./Components/Product_Page";
// import Dashboard Components
import Main from "./dashboard/pages/main/Main";
import Customers from "./dashboard/pages/customers/customers";
import Products from "./dashboard/pages/products/products";
import Invoices from "./dashboard/pages/invoices/invoices";
import { PropagateLoader, PuffLoader } from "react-spinners";

//* ----------------------- import lazy load components ---------------------- */
const Home = lazy(() => import("./Components/Home"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Catalog = lazy(() => import("./Components/Catalog"));

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
  window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
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
  const [openAuthDrawer, setOpenAuthDrawer] = useState(false);
  const [userRef, setUserRef] = useState("");

  const [subTotal, setSubTotal] = useState(0);
  const [totalHT, setTotalHT] = useState(0);
  const [userUID, setUserUID] = useState("");
  const [currentUserData, setCurrentUserData] = useState("");
  const [isUser, setIsUser] = useState(true);
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
  const navigate = useNavigate("/ordering");

  console.log(ProductsCatalog);
  const calcSubTotal = useCallback(
    (ProductList = cardProducts) => {
      console.log("here we are in reduce card :", subTotal);
      let totalSomHT = ProductList.reduce(
        (prev, current) => prev + ~~current?.totalProductPriceHT,
        0
      );
      setTotalHT(totalSomHT);

      return ProductList.reduce(
        (prev, current) => prev + ~~current.totalProductPrice,
        0
      );
    },
    [cardProducts]
  );

  //* ------------------------------ Get User Info ----------------------------- */

  const getUserData = async (userUID) => {
    const usersRef = collection(db, "Users");
    const userQuery = query(usersRef, where("id", "==", userUID));
    await getDocs(userQuery)
      .then((user) => {
        console.log("this is user on snapshot", user);
        console.log("this is user data ", user.docs[0] == 1);
        let data = user.docs[0].data();
        setCurrentUserData({ ...data, docId: user.docs[0].id });
      })
      .catch((error) => {
        console.log("its error ", error.code, error.message);
      });
  };

  console.log("this is current user data", currentUserData);

  onAuthStateChanged(auth, async (user) => {
    let adminsUID = [
      "dGnlVOf16zUFWWgEtYH6E4s8mEf2",
      "5F2owTlKwjPwZNNjcKOuKRKDSpC2",
    ];

    // console.log("this is the top uid : ", userUID);
    if (adminsUID.some((uid) => uid === user?.uid)) setIsUser(false);
    if (userUID !== user?.uid) setUserUID(user?.uid);
    if (user?.uid && !currentUserData) await getUserData(user?.uid);
    if (!user?.uid) setCurrentUserData("");
  });

  //* -------------------------------- Get Data -------------------------------- */

  const getData = useCallback(async () => {
    console.log("i get the data now");
    const ProductRef = collection(db, "ProductsList");
    let dataPromise = await getDocs(
      query(ProductRef, where("productStatus", "==", "inStock"))
    );
    let fullData = dataPromise.docs.map(
      (doc) => ({
        ...doc.data(),
        docId: doc.id,
        // id: doc.id,
      }),
      []
    );
    setProductsCatalog(fullData);
    setIsDataLoaded(true);
  });
  console.log("its on", ProductsCatalog);
  console.log(ProductsCatalog);

  function updateData() {
    getData();
  }

  const getCardProductsFromLocal = (productsInCard) => {
    let cardProducts = [];
    for (let i = 0; i < productsInCard.length; i++) {
      let currentProduct = productsInCard[i];
      let foundProduct = ProductsCatalog.find(
        (product) =>
          product.docId === currentProduct.docId &&
          product?.colors.find(
            (color) =>
              color?.colorRef === currentProduct?.selectedColor?.colorRef
          )
      );
      if (foundProduct)
        cardProducts.push({
          ...foundProduct,
          selectedColor: currentProduct?.selectedColor,
          numberOfProduct: currentProduct?.quantity,
          totalProductPrice:
            currentProduct?.quantity *
            (foundProduct?.pricePromotion || foundProduct?.price),
          totalProductPriceHT:
            currentProduct?.quantity *
            (foundProduct?.priceHT?.pricePromotion ||
              foundProduct?.priceHT?.price),
        });
    }
    console.log("check this first : ", cardProducts);
    return cardProducts;
  };

  const getFavoriteProductsFromLocal = (productsInFavorite) => {
    let favFromLocal = [];
    for (let i = 0; i < productsInFavorite.length; i++) {
      let favProduct = ProductsCatalog.find(
        (product) => product.id === productsInFavorite[i]
      );
      if (favProduct) favFromLocal.push(favProduct);
    }
    console.log("favorite from local : ", favFromLocal, productsInFavorite);
    return favFromLocal;
  };

  //?  Toggle To Favorite Functions As example but it works also with card

  const addToFavorite = (
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) => {
    console.log("here is the current in card : ", currentProduct);
    let isSavedToFavorite = false;
    favoriteProducts.forEach((favProduct) => {
      if (favProduct.id === currentProduct.id) isSavedToFavorite = true;
    });
    if (!isSavedToFavorite)
      updateDoc(userRef, {
        favoriteProducts: arrayUnion(currentProduct.id),
      })
        .then((res) => {
          setFavoriteProducts((lastFavorites) => {
            return [...lastFavorites, currentProduct];
          });

          showNotification({
            autoClose: 2000,
            title: "Ajouté aux favoris avec succès",
            color: "red",
            icon: <BiHeartCircle size={32} />,
            className: "my-notification-class",
            style: { backgroundColor: "white" },
            sx: { backgroundColor: "red" },
            loading: false,
          });
        })
        .catch((error) =>
          showNotification({
            autoClose: 2000,
            title: "Erreur, le produit n'est pas ajouté aux favoris",
            message: (
              <div>
                {" "}
                Veuillez vérifier votre connexion Internet ou actualiser la
                page, puis réessayer
              </div>
            ),
            color: "red",
            icon: <BiErrorAlt size={32} />,
            className: "my-notification-class",
            style: { backgroundColor: "white" },
            sx: { backgroundColor: "red" },
            loading: false,
          })
        );
  };

  const addToCard = (
    currentProduct,
    cardProducts,
    setCardProducts,
    checkout = false
  ) => {
    let isSavedToFavorite = false;
    let isSavedSameVariant = false;

    cardProducts.forEach((cardProduct, index) => {
      if (cardProduct.id === currentProduct.id) {
        isSavedToFavorite = true;

        if (
          cardProduct?.selectedColor?.colorRef ===
          currentProduct?.selectedColor?.colorRef
        ) {
          favoriteProducts[index] = currentProduct;
          setCardProducts(favoriteProducts);
          isSavedSameVariant = true;
        }
      }
    });

    let updatedCard = cardProducts.map((product) => ({
      docId: product.docId,
      selectedColor: product?.selectedColor,
      quantity: product?.numberOfProduct,
    }));

    if (!isSavedSameVariant) {
      setCardProducts((lastProducts) => {
        updateDoc(userRef, {
          productsInCart: [
            ...updatedCard,
            {
              docId: currentProduct.docId,
              selectedColor: currentProduct?.selectedColor,
              quantity: currentProduct?.numberOfProduct,
            },
          ],
        })
          .then((res) => {
            showNotification({
              autoClose: 2000,
              title: "Ajouté au panier avec succès",
              message: (
                <div>
                  {" "}
                  Vous pouvez passer à
                  <Link to="/ordering" style={{ color: "blue" }}>
                    {" "}
                    la caisse{" "}
                  </Link>{" "}
                  pour terminer le processus
                </div>
              ),
              color: "green",
              icon: <BiCheckCircle size={32} />,
              className: "my-notification-class",
              style: { backgroundColor: "white" },
              sx: { backgroundColor: "red" },
              loading: false,
            });
            if (checkout) navigate("/ordering");
          })
          .catch((error) =>
            showNotification({
              autoClose: 2000,
              title: "Erreur, la quantité n'est pas mise à jour",
              message: (
                <div>
                  Veuillez vérifier votre connexion Internet ou actualiser la
                  page, puis réessayer
                </div>
              ),
              color: "red",
              icon: <BiErrorAlt size={32} />,
              className: "my-notification-class",
              style: { backgroundColor: "white" },
              sx: { backgroundColor: "red" },
              loading: false,
            })
          );
        return [...lastProducts, currentProduct];
      });
      return;
    }

    if (isSavedToFavorite) {
      setCardProducts(cardProducts);

      updateDoc(userRef, { productsInCart: updatedCard })
        .then((res) => {
          showNotification({
            autoClose: 2000,
            title: "Quantité mise à jour avec succès",
            message: (
              <div>
                {" "}
                Vous pouvez passer à
                <Link to="/ordering" style={{ color: "blue" }}>
                  {" "}
                  la caisse{" "}
                </Link>{" "}
                pour terminer le processus
              </div>
            ),
            color: "green",
            icon: <BiCheckCircle size={32} />,
            className: "my-notification-class",
            style: { backgroundColor: "white" },
            sx: { backgroundColor: "red" },
            loading: false,
          });
          if (checkout) navigate("/ordering");
        })
        .catch((error) =>
          showNotification({
            autoClose: 2000,
            title: "Erreur, le produit n'est pas ajouté à votre panier",
            message: (
              <div>
                Veuillez vérifier votre connexion Internet ou actualiser la
                page, puis réessayer
              </div>
            ),
            color: "red",
            icon: <BiErrorAlt size={32} />,
            className: "my-notification-class",
            style: { backgroundColor: "white" },
            sx: { backgroundColor: "red" },
            loading: false,
          })
        );
    }
    return;
  };

  const isFavorite = (currentProduct, cardProducts) => {
    let isSaved = false;
    cardProducts.forEach((cardProduct) => {
      console.log(currentProduct);
      if (cardProduct.id === currentProduct.id) isSaved = true;
    });
    return isSaved;
  };

  const removeFromCard = (currentProduct, cardProducts, setCardProducts) => {
    let newFav = cardProducts.filter((favProduct) => {
      return favProduct.id !== currentProduct.id
        ? true
        : favProduct?.selectedColor?.colorRef !==
            currentProduct?.selectedColor?.colorRef;
    });

    let updatedCard = newFav.map((fav) => ({
      docId: fav.docId,
      selectedColor: fav?.selectedColor,
      quantity: fav?.numberOfProduct,
    }));

    updateDoc(userRef, { productsInCart: updatedCard })
      .then((res) => setCardProducts(newFav))
      .then((res) =>
        showNotification({
          autoClose: 2000,
          title: "Produit supprimé du panier",
          color: "red",
          icon: <BiXCircle size={32} />,
          className: "my-notification-class",
          style: { backgroundColor: "white" },
          sx: { backgroundColor: "red" },
          loading: false,
        })
      );
  };

  const removeFromFavorite = (
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) => {
    let newFav = favoriteProducts.filter((favProduct) => {
      return favProduct.id !== currentProduct.id;
    });
    let newFavIds = newFav.map((fav) => fav.id);
    updateDoc(userRef, { favoriteProducts: newFavIds })
      .then((res) => setFavoriteProducts(newFav))
      .then((res) =>
        showNotification({
          autoClose: 2000,
          title: "Produit supprimé des favoris",
          color: "red",
          icon: <BiXCircle size={32} />,
          className: "my-notification-class",
          style: { backgroundColor: "white" },
          sx: { backgroundColor: "red" },
          loading: false,
        })
      )
      .catch((error) =>
        showNotification({
          autoClose: 2000,
          title: "Erreur, le produit n'a pas été supprimé du favoris",
          message: (
            <div>
              Veuillez vérifier votre connexion Internet ou actualiser la page,
              puis réessayer
            </div>
          ),
          color: "red",
          icon: <BiErrorAlt size={32} />,
          className: "my-notification-class",
          style: { backgroundColor: "white" },
          sx: { backgroundColor: "red" },
          loading: false,
        })
      );
  };

  const toggleToFavorite = (
    currentProduct,
    favoriteProducts,
    setFavoriteProducts
  ) => {
    if (!isFavorite(currentProduct, favoriteProducts))
      addToFavorite(currentProduct, favoriteProducts, setFavoriteProducts);
    else
      removeFromFavorite(currentProduct, favoriteProducts, setFavoriteProducts);
  };

  const updateCard = (updatedCard, goNext = false) => {
    setCardProducts(updatedCard);
    let updateFormat = updatedCard.map((product) => ({
      docId: product?.docId,
      quantity: product?.numberOfProduct,
      selectedColor: product?.selectedColor,
    }));
    updateDoc(userRef, { productsInCart: updateFormat }).then((res) => {
      if (goNext) goNext();
    });
  };

  //* ------------------------------- Send Order ------------------------------- */

  const generateOrderId = (countOfOrder) => {
    const includeZeros = countOfOrder.toString().padStart(4, "0");
    return "INV-" + includeZeros;
  };

  const sendOrder = async (userInfo, goNext) => {
    showNotification({
      id: "sending-order",
      loading: true,
      title: "Already Sending Order",
      message: "Please Wait Till Order Done Successfully",
      autoClose: false,
      disallowClose: true,
    });
    const ordersInfosRef = doc(db, "GeneralInfos", "ORDERS-GENERAL-INFOS");
    const orderRef = collection(db, "Orders");
    const userRef = query(collection(db, "Users"), where("id", "==", userUID));
    const notificationsRef = doc(db, "Notifications", "Orders-Notifications");
    await getDoc(ordersInfosRef)
      .then(async (res) => {
        const currentValue = res.data().ordersCount;
        const newOrderData = {
          ...orderData,
          ...userInfo,
          orderId: generateOrderId(currentValue + 1),
        };
        console.log("newOrderData", newOrderData);
        await addDoc(orderRef, newOrderData);
        await updateDoc(ordersInfosRef, { ordersCount: ~~currentValue + 1 });
        setStaticValue("orders", 1);
        await getDocs(userRef).then(async (res) => {
          const data = res.docs[0].data();
          await updateDoc(res.docs[0].ref, {
            invoices: arrayUnion(newOrderData.orderId),
            numberOfOrders: ~~data.numberOfOrders + 1,
            amountSpent: ~~data.amountSpent + ~~newOrderData.totalCost,
            lastOrderAt: newOrderData?.orderDate,
            address: newOrderData?.address,
            willaya: newOrderData?.willaya,
            phoneNumber: newOrderData.phoneNumber,
            firstName: userInfo?.firstName || null,
            lastName: userInfo?.lastName || null,
          })
            .then((res) => {
              updateNotification({ id: "sending-order", autoClose: 0 });
            })
            .catch((error) =>
              updateNotification({
                id: "sending-order",
                autoClose: 2000,
                title: "Produit supprimé du panier",
                color: "red",
                icon: <BiXCircle size={32} />,
                className: "my-notification-class",
                style: { backgroundColor: "white" },
                sx: { backgroundColor: "red" },
                loading: false,
              })
            );
        });
        const avatarImg = auth.currentUser.photoURL;
        await updateDoc(notificationsRef, {
          notifications: arrayUnion({
            name: newOrderData.fullName,
            action: "order",
            time: moment().unix(),
            userId: newOrderData.userId,
            orderId: newOrderData.orderId,
            avatarImg,
          }),
        })
          .then((res) => goNext())
          .catch((error) => console.log(error.code, error.message));
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });

    console.log("this is what we send : ", orderData);
    return;
  };

  console.log("those are our favorite", favoriteProducts);
  useEffect(() => {
    setAnalytics();
  }, []);

  useEffect(() => {
    getData();
    console.log(ProductsCatalog);
  }, []);

  useEffect(() => {
    console.log("user uid changed :", userUID);
  }, [userUID]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      let adminsUID = [
        "iSl5uvXoIsUBODvqBAIPfFQy2Du2",
        "5F2owTlKwjPwZNNjcKOuKRKDSpC2",
      ];

      // console.log("this is the top uid : ", userUID);
      if (adminsUID.some((uid) => uid === user?.uid)) setIsUser(false);
      if (userUID !== user?.uid) setUserUID(user?.uid);
      if (user?.uid && !currentUserData) await getUserData(user?.uid);
      if (!user?.uid) setCurrentUserData("");
    });
  }, []);

  useEffect(() => {
    setSubTotal(calcSubTotal());
  }, [cardProducts]);

  // useEffect(() => {
  //   console.log("samir");
  //   getUserData(userUID);
  // }, [userUID]);

  console.log("is user : ", isUser);
  useEffect(() => {
    if (currentUserData) {
      setUserRef(doc(db, "Users", currentUserData.docId));
      setCardProducts(
        getCardProductsFromLocal(currentUserData?.productsInCart)
      );
      setFavoriteProducts(
        getFavoriteProductsFromLocal(currentUserData?.favoriteProducts)
      );
    } else {
      setIsUser(true);
      setCardProducts([]);
      setFavoriteProducts([]);
    }
  }, [currentUserData]);

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
        addToCard,
        removeFromFavorite,
        removeFromCard,
        toggleToFavorite,
        setFavoriteProducts,
        favoriteProducts,
        setCardProducts,
        cardProducts,
        subTotal,
        totalHT,
        setSubTotal,
        calcSubTotal,
        currentUserData,
        orderData,
        setOrderData,
        sendOrder,
        updateCard,
        isUser,
        openAuthDrawer,
        setOpenAuthDrawer,
      }}
    >
      {" "}
      {isDataLoaded ? (
        <div className="main">
          <Suspense
            fallback={
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                {" "}
                <PuffLoader color="#df3d45" />
              </div>
            }
          >
            <Routes>
              {!currentUserData && (
                <Route
                  path="/auth/"
                  element={
                    <Auth
                      setUserUID={setUserUID}
                      setOpenAuthDrawer={setOpenAuthDrawer}
                    />
                  }
                ></Route>
              )}
              {!isUser && (
                <Route path="/dashboard/" element={<Dashboard />}>
                  <Route index element={<Main />}></Route>
                  <Route path="customers" element={<Customers />}></Route>
                  <Route path="products" element={<Products />}></Route>
                  <Route path="invoices" element={<Invoices />}></Route>
                </Route>
              )}

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
                <Route path="/catalog" element={<Catalog />}></Route>
                <Route
                  path="catalog/:productId"
                  element={<ProductPage />}
                ></Route>
                <Route path="/ordering" element={<Ordering />}></Route>
              </Route>
            </Routes>
          </Suspense>
          <Drawer
            opened={!currentUserData && openAuthDrawer}
            onClose={() => setOpenAuthDrawer(false)}
            withCloseButton={true}
            lockScroll={true}
            shadow="sm"
            color="red"
            className="auth-drawer"
            // size="60%"
            padding={0}
          >
            <Auth
              setUserUID={setUserUID}
              setOpenAuthDrawer={setOpenAuthDrawer}
            />{" "}
          </Drawer>
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          {" "}
          <PropagateLoader color="#df3d45" />
        </div>
      )}
    </GlobalContext.Provider>
  );
}

export default App = React.memo(App);
