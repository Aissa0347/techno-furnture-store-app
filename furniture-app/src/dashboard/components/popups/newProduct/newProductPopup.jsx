import { useState, useEffect } from "react";
import {
  MantineProvider,
  TextInput,
  Select,
  Button,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import TextArea from "../../textArea/textArea";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { show } from "../../icons";

export function NewProductPopup({ defaultValues, setClose }) {
  const [files, setFiles] = useState("");

  useEffect(() => {
    document.querySelectorAll(".ql-blank").value = show;
  });

  return (
    <MantineProvider>
      <div className="popup popup_new-product">
        <h2>Add New Product</h2>
        <form className="info_form new-product-form">
          <div className="input half">
            <TextInput
              placeholder="Product name"
              label="Product name"
              radius="xs"
              size="md"
              defaultValue={defaultValues?.name}
              withAsterisk
            />
          </div>
          <div className="input half">
            <Select
              label="Category"
              placeholder="Chose category"
              searchable
              nothingFound="No options"
              data={["Bed", "Bad", "Chair", "Sofa"]}
              defaultValue={defaultValues?.category}
              withAsterisk
            />
          </div>
          <div className="input half">
            <TextInput
              placeholder="Brand"
              label="Brand"
              radius="xs"
              size="md"
              defaultValue={defaultValues?.markName}
              withAsterisk
            />
          </div>
          <div className="input half">
            <TextInput
              placeholder="Status"
              label="Status"
              radius="xs"
              size="md"
              defaultValue={defaultValues?.productStatus}
              withAsterisk
            />
          </div>
          <div className="input half">
            <NumberInput
              placeholder="Price in DZD"
              label="Price"
              min={0}
              defaultValue={defaultValues?.price}
              withAsterisk
            />
          </div>
          <div className="input half">
            <NumberInput
              placeholder="Price in DZD"
              label="Promotion Price"
              min={0}
              defaultValue={defaultValues?.price}
            />
          </div>
          <div className="input half ">
            <MultiSelect
              data={["Red", "Purple", "Black", "Yellow"]}
              placeholder="Pick all you like"
              label="Colors"
              radius="xs"
              size="md"
              className="multi-select"
              defaultValue={defaultValues?.colors}
              searchable
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div className="input half">
            <label htmlFor="description" className="popup-label">
              description
            </label>
            <TextArea
              id="description"
              value={defaultValues?.description}
              className="description"
            ></TextArea>
          </div>
          <hr className="popup-line" />
          <div className="image-uploader">
            <h3>Add Product Images</h3>
            <FilePond
              allowMultiple={true}
              maxFiles={3}
              files={files}
              onupdatefiles={setFiles}
              className={"uploader"}
            />
          </div>
          <div className="dash-submit-btns">
            <Button
              className="cancel-btn"
              variant="default"
              radius="xs"
              size="md"
              onClick={(e) => {
                e.preventDefault();
                setClose(false);
              }}
            >
              Cancel
            </Button>
            <Button className="submit-btn" radius="xs" size="md">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </MantineProvider>
  );
}

export default NewProductPopup;
