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

  console.log(colorRef);
  return (
    <div className="new-category mini-popup">
      <Stack mb={10}>
        <ColorPicker
          format="rgb"
          swatches={[
            "rgb(37, 38, 43)",
            "rgb(134, 142, 150)",
            "rgb(250, 82, 82)",
            "rgb(230, 73, 128)",
            "rgb(190, 75, 219)",
            "rgb(121, 80, 242)",
            "rgb(76, 110, 245)",
            "rgb(34, 139, 230)",
            "rgb(21, 170, 191)",
            "rgb(18, 184, 134)",
            "rgb(64, 192, 87)",
            "rgb(130, 201, 30)",
            "rgb(250, 176, 5)",
            "rgb(253, 126, 20)",
          ]}
          size="md"
          value={colorRef}
          onChange={setColorRef}
        />
        <TextInput
          label="Add color name"
          placeholder="color name"
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
                  colorName: valueInput.current.value,
                  colorRef: colorRef,
                },
                ...submitAndState.data,
              ],
            });
            setSubmitAndState((prev) => {
              return {
                ...prev,
                value: [],
                data: (() => {
                  prev.data.forEach((val) => {
                    console.log(val);
                    if (val.colorName === valueInput.current.value)
                      isDuplicate = true;
                  });
                  return isDuplicate === false
                    ? [
                        {
                          colorName: valueInput.current.value,
                          colorRef,
                        },
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
