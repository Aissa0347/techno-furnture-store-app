import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  MantineProvider,
  TextInput,
  Select,
  Button,
  NumberInput,
  Group,
  Text,
  Divider,
} from "@mantine/core";
import { AddCategoriesPopup, AddColorsPopup } from "./addPopup";
// Import React Lib
import { show } from "../../icons";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../../../../firebase/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { uuidv4 } from "@firebase/util";
// Import styles
import { useContext } from "react";
import { GlobalContext } from "../../../../App";
import { defaultProduct } from "../../../../Website-Assets";
import ImageDropzone from "../../uploading/uploadImages";
import TextEditor from "../../textEditor/textEditor";
import { MultiSelectColors } from "../../multiSelectColors/multiSelectColors";

export function collectionRef(colName) {
  return collection(db, colName);
}

export const colProductList = collection(db, "ProductsList");
export const colProductFilters = collection(db, "newProductFilters");

//* -------------------------------------------------------------------------- */
//*                        New Product Popup Components                        */
//* -------------------------------------------------------------------------- */

export default function NewProductPopup({
  primaryValues,
  typeOfForm,
  setClose,
}) {
  const { updateData } = useContext(GlobalContext);
  const [isUploaded, setIsUploaded] = useState(false);
  const [newImageList, setNewImageList] = useState([]);
  const [updatedImageList, setUpdatedImageList] = useState([]);
  const [primaryImages, setPrimaryImages] = useState([]);
  const [descriptionTextContent, setDescriptionTextContent] = useState("");
  const [failedValidation, setFailedValidation] = useState(false);
  const [isImagesUploaded, setIsImagesUploaded] = useState(
    typeOfForm == "edit" ? true : false
  );
  const [TAX, setTAX] = useState();
  const [priceHT, setPriceHT] = useState(0);
  const [price, setPrice] = useState(0);
  const [pricePromotion, setPricePromotion] = useState(0);
  const [isUploadImagesLoading, setIsUploadImagesLoading] = useState(false);
  const [selectColors, setSelectColors] = useState({
    state: false,
    value: [],
    data: [],
    id: "",
  });
  const [selectCategory, setSelectCategory] = useState({
    state: false,
    value: "",
    data: [],
    id: "",
  });

  const [defaultValues, setDefaultValues] = useState(defaultProduct);
  const newProductFormRef = useRef();
  const selectRef = useRef();
  const productNameRef = useRef();
  const priceRef = useRef();
  const brandRef = useRef();

  const validate = () => {
    const newProductForm = document.querySelector(".new-product-form");
    if (
      newProductForm.productName?.value &&
      newProductForm.category?.value &&
      newProductForm.price?.value &&
      newProductForm.brand?.value &&
      (newImageList[0] || primaryImages[0])
    ) {
      setFailedValidation(false);
      return true;
    }
    setFailedValidation(true);
    return false;
  };

  const addNewCategory = (value, textOfAdd, setState) => {
    if (value !== textOfAdd) return;
    setState((prev) => {
      return { ...prev, value: "", state: true };
    });
  };

  const calcTaxPrice = (defaultPrice, tax = TAX) => {
    return (defaultPrice * (100 - tax)) / 100;
  };

  const calcTaxAmount = (defaultPrice, tax = TAX) => {
    if (pricePromotion) return (pricePromotion * tax) / 100;
    return (defaultPrice * tax) / 100;
  };

  useEffect(() => {
    document.querySelectorAll(".ql-blank").value = show;
    console.log(selectRef.current.value);
  });

  useEffect(() => {
    let priceHT = calcTaxPrice(price);
    console.log("here is the TAX :", priceHT);
    setPriceHT(priceHT);
  }, [TAX]);

  //* --------------------------- Upload new Product --------------------------- */
  // console.log(files.name);
  let imgListRef = [];

  function submitImages(files, operation = "upload") {
    if (files.length < 1) {
      return;
    }
    setUpdatedImageList([]);
    setNewImageList([]);
    let imgList = [];
    let newImgList = [];

    setIsUploadImagesLoading(true);
    setIsUploaded(false);

    let fileNotUploaded = files.length;
    console.log("primary Images : ", primaryImages);
    files.map(async (file) => {
      if (!primaryImages?.some((primaryImg) => file?.url === primaryImg.url)) {
        const imageRef = ref(storage, `Product Images/${file.name + uuidv4()}`);

        await uploadBytes(imageRef, file)
          .then(async (reponse) => {
            await getDownloadURL(reponse.ref).then((url) => {
              imgList.push({ url: url, path: reponse.ref.fullPath });
              newImgList.push({ url: url, path: reponse.ref.fullPath });
              console.log("check this", reponse);

              fileNotUploaded--;
            });
          })
          .catch((err) => console.log(err));
      } else {
        imgList.push(file);
        console.log("this is uploaded one", file);

        fileNotUploaded--;
      }
      if (fileNotUploaded == 0) {
        setIsImagesUploaded(true);
        setNewImageList((prev) => [...prev, ...newImgList]);
        setUpdatedImageList((prev) => [...prev, ...imgList]);
        setIsUploaded(true);
        setIsUploadImagesLoading(false);
        console.log(typeof newImageList, newImageList);
      }
    });
  }
  newImageList.map((img) => console.log(img));

  function deleteImages(
    selectedArray = newImageList,
    setSelectedArray = setNewImageList
  ) {
    selectedArray.map((imgInfo) => {
      const imgRef = ref(storage, imgInfo.path);
      deleteObject(imgRef);
      setSelectedArray([]);
    });
  }

  function assignedProduct() {
    const newProductForm = document.querySelector(".new-product-form");
    let productTemplate;

    return {
      name: newProductForm.productName?.value.toUpperCase(),
      category: newProductForm.category?.value,
      colors: selectColors?.value,
      img: updatedImageList[0] ? updatedImageList : primaryImages,
      price: Number(price),
      pricePromotion: Number(pricePromotion),
      priceHT: {
        price: priceHT,
        pricePromotion: calcTaxPrice(pricePromotion) || 0,
        taxAmount: calcTaxAmount(newProductForm.price?.value),
      },
      tax: TAX,
      // box: {
      // price: Number(newProductForm.priceOfBox?.value),
      // numberOfPieces: Number(newProductForm.numberOfBoxPieces?.value),
      // pricePromotion:
      // Number(newProductForm.pricePromotion?.value) *
      // Number(newProductForm.numberOfBoxPieces?.value),
      // },
      mark: "",
      markName: newProductForm.brand?.value.toUpperCase(),
      dimensions: {
        height: Number(newProductForm?.height?.value),
        width: Number(newProductForm?.width?.value),
        depth: Number(newProductForm?.depth?.value),
      },
      productStatus: newProductForm.status?.value,
      productQuantity: Number(50),
      numberOfProduct: Number(1),
      totalProductPrice: Number(0),
      totalProductPriceHT: Number(0),
      description: descriptionTextContent,
      details: "",
      id: typeOfForm === "edit" ? primaryValues?.id : uuidv4(),
    };
  }
  console.log("this is the primary images : ", primaryImages);

  //* ----------------------------- Get Categories ----------------------------- */
  const getFilters = async () => {
    setPrimaryImages(primaryValues?.img);
    console.log("this is the primary values images : ", primaryValues?.img);
    setDescriptionTextContent(primaryValues?.description);
    await getDoc(doc(colProductFilters, "colors")).then((promiseData) => {
      console.log("its done downloading ", promiseData.data());
      let fullColorsData = {
        data: promiseData.data().colors,
        id: promiseData.id,
      };
      setSelectColors((prev) => ({
        ...prev,
        data: fullColorsData?.data,
        id: fullColorsData?.id,
      }));
    });
    await getDoc(doc(colProductFilters, "categories")).then((promiseData) => {
      console.log("its done downloading 2 ", promiseData.data());
      let fullCategoriesData = {
        data: promiseData.data().categories,
        id: promiseData.id,
      };
      console.log("categories setted !!");
      setSelectCategory((prev) => ({
        ...prev,
        data: fullCategoriesData.data,
        id: fullCategoriesData.id,
      }));
    });
  };

  function toPrimaryValues() {
    setDefaultValues(primaryValues);
    setPrice(primaryValues?.price);
    setPricePromotion(primaryValues?.pricePromotion);
    setTAX(primaryValues?.tax);
    setSelectCategory((prev) => ({
      ...prev,
      value: primaryValues?.category || [],
    }));
    setSelectColors((prev) => ({
      ...prev,
      data: prev.data,
      value: primaryValues?.colors || [],
    }));
  }

  useLayoutEffect(() => {
    getFilters()
      .then((res) => {
        console.log("this is res of filters ", res);
        toPrimaryValues();
      })
      .catch((error) => console.log("pls throw error", error));
  }, []);

  const filterNotUploaded = (filterWith = newImageList) => {
    return primaryImages.filter((primaryImg) =>
      filterWith.map((newImg) => primaryImg.url !== newImg.url)
    );
  };

  console.log("colors : ", primaryValues?.colors);

  return (
    <MantineProvider>
      <div className="popup popup_new-product">
        <h2>Add New Product</h2>
        <form className="info_form new-product-form" ref={newProductFormRef}>
          <div className="input half">
            <TextInput
              placeholder="Product Name"
              label="Product Name"
              radius="none"
              size="md"
              name="productName"
              ref={productNameRef}
              onChange={() => setFailedValidation(false)}
              defaultValue={primaryValues?.name}
              error={
                failedValidation && !productNameRef.current?.value
                  ? "Please enter a valid Name"
                  : null
              }
              withAsterisk
            />
          </div>
          <div className="input half">
            <Select
              label="Category"
              placeholder="Chose category"
              searchable
              clearable
              name="category"
              ref={selectRef}
              error={
                failedValidation && !selectRef.current?.value
                  ? "Please enter a valid Name"
                  : null
              }
              onChange={(event) => {
                setFailedValidation(false);
                setSelectCategory((prev) => {
                  return { ...prev, value: event };
                });
                addNewCategory(event, "+ ADD NEW CATEGORY", setSelectCategory);
              }}
              nothingFound="No options"
              data={[...selectCategory.data, "+ ADD NEW CATEGORY"]}
              defaultValue={primaryValues?.category}
              value={selectCategory.value}
              withAsterisk
            />
          </div>
          <div className="input half">
            <TextInput
              placeholder="Brand"
              label="Brand"
              radius="none"
              size="md"
              name="brand"
              ref={brandRef}
              onChange={() => setFailedValidation(false)}
              error={
                failedValidation && !brandRef.current?.value
                  ? "Please enter a valid Name"
                  : null
              }
              defaultValue={primaryValues?.markName}
              withAsterisk
            />
          </div>
          <div className="input half">
            <Select
              placeholder="Status"
              label="Status"
              radius="none"
              size="md"
              data={[
                { value: "inStock", label: "IN STOCK" },
                { value: "outStock", label: "OUT OF STOCK" },
              ]}
              defaultValue={primaryValues?.productStatus || "inStock"}
              name="status"
              withAsterisk
            />
          </div>
          <div className="input half">
            <NumberInput
              placeholder="Price in DA"
              label="Price TTC"
              min={0}
              name="price"
              ref={priceRef}
              value={setPrice}
              onChange={(e) => {
                setPrice(e);
                setFailedValidation(false);
              }}
              error={
                failedValidation && !priceRef.current?.value
                  ? "Please enter a valid Name"
                  : null
              }
              defaultValue={primaryValues?.price}
              withAsterisk
            />
          </div>
          <div className="input half">
            <Group noWrap>
              <NumberInput
                placeholder="Price in DA"
                label="Price generated HT"
                min={0}
                readOnly
                value={priceHT}
                onChange={setPriceHT}
                name="priceHT"
                defaultValue={primaryValues?.priceHT}
              />
              <Select
                placeholder="TVA percentage"
                label="TVA %"
                data={[
                  { label: "19%", value: 19 },
                  { label: "9%", value: 9 },
                  { label: "0%", value: 0 },
                ]}
                value={TAX}
                onChange={setTAX}
                name="TAX"
                defaultValue={primaryValues?.TAX}
              />
            </Group>
          </div>
          {/* <div className="input half">
            <Group noWrap>
              <NumberInput
                placeholder="Price in DA"
                label="Price of box"
                min={0}
                name="priceOfBox"
                defaultValue={primaryValues?.box?.price}
              />

              <NumberInput
                placeholder="Number of pieces"
                label="Box pieces"
                min={0}
                name="numberOfBoxPieces"
                defaultValue={primaryValues?.box?.numberOfPieces}
              />
            </Group>
          </div> */}
          <div className="input half">
            <NumberInput
              placeholder="Price in DA"
              label="Promotion Price"
              min={0}
              name="pricePromotion"
              value={pricePromotion}
              onChange={setPricePromotion}
              defaultValue={primaryValues?.pricePromotion}
            />
          </div>
          <Divider variant="solid" my="sm" />
          <div className=" half ">
            <MultiSelectColors
              data={selectColors.data}
              colors={selectColors}
              setColors={setSelectColors}
            />
          </div>
          <div className="input half new-product-dimension">
            <NumberInput
              label="Width"
              placeholder="(cm)"
              min={0}
              name="width"
              defaultValue={primaryValues?.dimensions?.width}
            />{" "}
            <NumberInput
              label="Height"
              placeholder="(cm)"
              min={0}
              name="height"
              defaultValue={primaryValues?.dimensions?.height}
            />{" "}
            <NumberInput
              label="Depth"
              placeholder="(cm)"
              min={0}
              name="depth"
              defaultValue={primaryValues?.dimensions?.depth}
            />
          </div>
          <div className=" text-editor">
            <label htmlFor="description" className="popup-label">
              description
            </label>
            <TextEditor
              descriptionTextContent={descriptionTextContent}
              setDescriptionTextContent={setDescriptionTextContent}
            />
          </div>
          <hr className="popup-line" />
          <div className="image-uploader">
            <h3>Add Product Images</h3>
            {/* <input
              type="file"
              name="productImg"
              id="productImg"
              multiple
              onChange={(e) => submitImages([...e.target.files])}
            /> */}
            {failedValidation &&
            !(primaryImages?.length || newImageList?.length) ? (
              <Text color={"red"} size="md">
                Please Pick Some Images
              </Text>
            ) : null}
            <ImageDropzone
              submitImages={submitImages}
              isImagesUploaded={isImagesUploaded}
              setIsImagesUploaded={setIsImagesUploaded}
              deleteImages={deleteImages}
              newImageList={newImageList}
              primaryImages={primaryImages}
              setNewImageList={setNewImageList}
              isUploadImagesLoading={isUploadImagesLoading}
              typeOfForm={typeOfForm}
            />
          </div>
          {typeOfForm == "edit" ? (
            <div className="dash-submit-btns dash-mg-y">
              <Button
                className="cancel-btn"
                variant="subtle"
                radius="none"
                size="md"
                color={"red"}
                onClick={(e) => {
                  e.preventDefault();
                  deleteImages();
                  setClose(false);
                }}
              >
                Cancel
              </Button>

              <Button
                className="submit-btn"
                radius="none"
                size="md"
                onClick={() => {
                  console.log(newImageList);
                  if (validate())
                    updateDoc(
                      doc(db, "ProductsList", primaryValues.id),
                      assignedProduct()
                    ).then((res) => {
                      updateData();
                      setClose(false);
                      console.log(
                        "last chance of new image list",
                        newImageList
                      );
                      // if (newImageList.length)
                      //   deleteImages(filterNotUploaded(), setPrimaryImages);
                    });
                }}
              >
                Update
              </Button>
            </div>
          ) : (
            <div className="dash-submit-btns">
              <Button
                className="cancel-btn"
                variant="subtle"
                radius="none"
                size="md"
                color={"red"}
                onClick={(e) => {
                  e.preventDefault();
                  deleteImages();
                  setClose(false);
                }}
              >
                Cancel
              </Button>

              <Button
                className="submit-btn"
                radius="none"
                size="md"
                onClick={() => {
                  console.log(newImageList);
                  if (validate())
                    isUploaded
                      ? addDoc(colProductList, assignedProduct()).then(
                          (res) => {
                            updateData();
                            setClose(false);
                          }
                        )
                      : console.log("please wait till uploading finished");
                }}
              >
                Submit
              </Button>
            </div>
          )}
        </form>
      </div>
      {selectCategory.state && (
        <AddCategoriesPopup
          setSubmitAndState={setSelectCategory}
          submitAndState={selectCategory}
        />
      )}
      {selectColors.state && (
        <AddColorsPopup
          setSubmitAndState={setSelectColors}
          submitAndState={selectColors}
        />
      )}
    </MantineProvider>
  );
}
