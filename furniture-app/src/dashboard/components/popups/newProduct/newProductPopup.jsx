import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  MantineProvider,
  TextInput,
  Select,
  Button,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import { AddCategoriesPopup, AddColorsPopup } from "./addPopup";
import TextArea from "../../textArea/textArea";
// Import React Lib
import { show } from "../../icons";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
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
import { newImageList } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import { useContext } from "react";
import { GlobalContext } from "../../../../App";
import { defaultProduct } from "../../../../Website-Assets";
import ImageDropzone from "../../uploading/uploadImages";
import TextEditor from "../../textEditor/textEditor";

export function collectionRef(colName) {
  return collection(db, colName);
}

export const colProductList = collection(db, "ProductsList");
export const colProductFilters = collection(db, "new Product Filters");

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
  const [primaryImages, setPrimaryImages] = useState([]);
  const [descriptionTextContent, setDescriptionTextContent] = useState("");

  const [isImagesUploaded, setIsImagesUploaded] = useState(
    typeOfForm == "edit" ? true : false
  );
  const [isUploadImagesLoading, setIsUploadImagesLoading] = useState(false);
  const [selectColors, setSelectColors] = useState({
    state: false,
    value: [""],
    data: ["+ ADD NEW COLOR"],
    id: "",
  });
  const [selectCategory, setSelectCategory] = useState({
    state: false,
    value: "",
    data: ["+ ADD NEW CATEGORY"],
    id: "",
  });

  const [defaultValues, setDefaultValues] = useState(defaultProduct);

  const categoryData = ["Bed", "Bad", "Chair", "Sofa", "+ ADD NEW CATEGORY"];
  const selectRef = useRef();

  const addNewCategory = (value, textOfAdd, setState) => {
    if (value !== textOfAdd) return;
    setState((prev) => {
      return { ...prev, value: "", state: true };
    });
  };

  console.log("this is image list : ", newImageList);

  useEffect(() => {
    document.querySelectorAll(".ql-blank").value = show;
    console.log(selectRef.current.value);
  });

  //* --------------------------- Upload new Product --------------------------- */
  // console.log(files.name);
  let imgListRef = [];

  function submitImages(files) {
    if (files.length < 1) {
      return;
    }
    let imgList = [];

    setIsUploadImagesLoading(true);
    setIsUploaded(false);

    let fileNotUploaded = files.length;

    files.map(async (file) => {
      if (!primaryImages?.some((primaryImg) => file?.url === primaryImg.url)) {
        const imageRef = ref(storage, `Product Images/${file.name + uuidv4()}`);

        await uploadBytes(imageRef, file)
          .then(async (reponse) => {
            await getDownloadURL(reponse.ref).then((url) => {
              imgList.push({ url: url, path: reponse.ref.fullPath });
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
        setNewImageList((prev) => [...prev, ...imgList]);
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
      name: newProductForm.productName?.value,
      category: newProductForm.category?.value,
      colors: selectColors.value,
      img: newImageList[0] ? newImageList : primaryImages,
      price: Number(newProductForm.price?.value),
      pricePromotion: Number(newProductForm.promotionPrice?.value),
      mark: "",
      markName: newProductForm.brand?.value,
      dimensions: {
        height: Number(newProductForm?.height?.value),
        width: Number(newProductForm?.width?.value),
        depth: Number(newProductForm?.depth?.value),
      },
      productStatus: newProductForm.status?.value,
      productQuantity: Number(50),
      numberOfProduct: Number(1),
      totalProductPrice: Number(0),
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
    await getDocs(colProductFilters).then((promiseData) => {
      console.log("its done downloading");
      let fullColorsData = {
        data: promiseData.docs[0].data().colors,
        id: promiseData.docs[0].id,
      };
      let fullCategoriesData = {
        data: promiseData.docs[1].data().categories,
        id: promiseData.docs[1].id,
      };
      console.log("categories setted !!");
      setSelectCategory((prev) => ({
        ...prev,
        data: fullCategoriesData.data,
        id: fullCategoriesData.id,
      }));
      console.log("is done ?");
      setSelectColors((prev) => ({
        ...prev,
        data: fullColorsData.data,
        id: fullColorsData.id,
      }));
    });
  };

  function toPrimaryValues() {
    setDefaultValues(primaryValues);
    setSelectCategory((prev) => ({ ...prev, value: primaryValues?.category }));
    setSelectColors((prev) => ({ ...prev, value: primaryValues?.colors }));
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

  return (
    <MantineProvider>
      <div className="popup popup_new-product">
        <h2>Add New Product</h2>
        <form className="info_form new-product-form">
          <div className="input half">
            <TextInput
              placeholder="Product name"
              label="Product name"
              radius="none"
              size="md"
              name="productName"
              defaultValue={primaryValues?.name}
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
              onChange={(event) => {
                setSelectCategory((prev) => {
                  return { ...prev, value: event };
                });
                addNewCategory(event, "+ ADD NEW CATEGORY", setSelectCategory);
              }}
              nothingFound="No options"
              data={selectCategory.data}
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
              data={["In Stock", "Pending"]}
              defaultValue={primaryValues?.productStatus}
              name="status"
              withAsterisk
            />
          </div>
          <div className="input half">
            <NumberInput
              placeholder="Price in DZD"
              label="Price"
              min={0}
              name="price"
              defaultValue={primaryValues?.price}
              withAsterisk
            />
          </div>
          <div className="input half">
            <NumberInput
              placeholder="Price in DZD"
              label="Promotion Price"
              min={0}
              name="promotionPrice"
              defaultValue={primaryValues?.pricePromotion}
            />
          </div>
          <div className="input half ">
            <MultiSelect
              placeholder="Pick all you like"
              label="Colors"
              radius="none"
              size="md"
              name="colors"
              className="multi-select"
              defaultValue={primaryValues?.colors}
              searchable
              style={{ marginBottom: "20px" }}
              ref={selectRef}
              onChange={(event) => {
                console.log("this is colors event", selectColors.value);
                setSelectColors((prev) => {
                  return {
                    ...prev,
                    value:
                      event[event.length - 1] === "+ ADD NEW COLOR"
                        ? [...prev.value]
                        : [...event],
                  };
                });
                addNewCategory(
                  event[event.length - 1],
                  "+ ADD NEW COLOR",
                  setSelectColors
                );
              }}
              nothingFound="No options"
              data={selectColors.data}
              value={selectColors.value}
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
            {/* <TextArea
              id="description"
              value={primaryValues?.description}
              name="description"
              className="description"
            ></TextArea> */}
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
                  updateDoc(
                    doc(db, "ProductsList", primaryValues.docId),
                    assignedProduct()
                  ).then((res) => {
                    updateData();
                    setClose(false);
                    console.log("last chance of new image list", newImageList);
                    if (newImageList[0])
                      deleteImages(filterNotUploaded(), setPrimaryImages);
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
                  isUploaded
                    ? addDoc(colProductList, assignedProduct()).then((res) => {
                        updateData();
                        setClose(false);
                      })
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
