import { useRef, useEffect, useState } from "react";
import { TextInput, Button, Stack, ColorPicker } from "@mantine/core";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

//* -------------------------- Popup Add Stuff Componenet -------------------------- */

export function AddCategoriesPopup({ setSubmitAndState, submitAndState }) {
  const valueInput = useRef("");
  let isDuplicate = false;
  const categoriesRef = doc(db, "new Product Filters", submitAndState.id);
  useEffect(() => {
    valueInput.current.focus();
  });
  return (
    <div className="new-category mini-popup">
      <div className="input half">
        <TextInput
          placeholder="Add new category"
          label="Add new category"
          ref={valueInput}
          radius="none"
          size="md"
          name="newCategory"
        />
      </div>
      <div className="dash-submit-btns">
        <Button
          className="cancel-btn"
          variant="subtle"
          radius="none"
          size="md"
          color={"red"}
          onClick={(e) => {
            e.preventDefault();
            setSubmitAndState((prev) => {
              return { ...prev, state: false };
            });
          }}
        >
          Cancel
        </Button>

        <Button
          className="submit-btn"
          radius="none"
          size="md"
          onClick={() => {
            updateDoc(categoriesRef, {
              categories: [valueInput.current.value, ...submitAndState.data],
            });
            setSubmitAndState((prev) => {
              return {
                ...prev,
                value: valueInput.current.value,
                data: (() => {
                  prev.data.forEach((val) => {
                    console.log(val);
                    if (val === valueInput.current.value) isDuplicate = true;
                  });
                  return isDuplicate === false
                    ? [valueInput.current.value, ...prev.data]
                    : [...prev.data];
                })(),
                state: false,
              };
            });
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export function AddColorsPopup({ setSubmitAndState, submitAndState }) {
  const [colorRef, setColorRef] = useState("");
  const valueInput = useRef("");
  let isDuplicate = false;
  const colorsRef = doc(db, "new Product Filters", submitAndState.id);

  useEffect(() => {
    console.log(...submitAndState.data, {
      label: valueInput.current.value,
      value: colorRef,
    });
  });

  console.log(valueInput);
  return (
    <div className="new-category mini-popup">
      <Stack mb={10}>
        <ColorPicker
          format="rgb"
          swatches={[
            "#25262b",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
          ]}
          size="md"
          value={colorRef}
          onChange={setColorRef}
        />
        <TextInput
          label="Add color name"
          placeholder="color name"
          defaultValue={"hops"}
          ref={valueInput}
          radius="none"
          size="md"
          name="newCategory"
          autoFocus
          icon={
            <span
              className="color-shower"
              style={{ backgroundColor: colorRef }}
            ></span>
          }
        />
      </Stack>
      <div className="dash-submit-btns">
        <Button
          className="cancel-btn"
          variant="subtle"
          radius="none"
          size="md"
          color={"red"}
          onClick={(e) => {
            e.preventDefault();
            setSubmitAndState((prev) => {
              return { ...prev, state: false };
            });
          }}
        >
          Cancel
        </Button>

        <Button
          className="submit-btn"
          radius="none"
          size="md"
          onClick={() => {
            updateDoc(colorsRef, {
              colors: [
                {
                  label: valueInput.current.value,
                  value: {
                    label: valueInput.current.value,
                    value: colorRef,
                  },
                },
                ...submitAndState.data,
              ],
            });
            setSubmitAndState((prev) => {
              return {
                ...prev,
                value: valueInput.current.value,
                data: (() => {
                  prev.data.forEach((val) => {
                    console.log(val);
                    if (val.label === valueInput.current.value)
                      isDuplicate = true;
                  });
                  return isDuplicate === false
                    ? [
                        { label: valueInput.current.value, value: colorRef },
                        ...prev.data,
                      ]
                    : [...prev.data];
                })(),
                state: false,
              };
            });
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
