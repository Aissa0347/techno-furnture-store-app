import { useRef, useEffect } from "react";
import { TextInput, Button } from "@mantine/core";
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
          radius="xs"
          size="md"
          name="newCategory"
        />
      </div>
      <div className="dash-submit-btns">
        <Button
          className="cancel-btn"
          variant="subtle"
          radius="xs"
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
          radius="xs"
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
  const valueInput = useRef("");
  let isDuplicate = false;
  const colorsRef = doc(db, "new Product Filters", submitAndState.id);
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
          radius="xs"
          size="md"
          name="newCategory"
        />
      </div>
      <div className="dash-submit-btns">
        <Button
          className="cancel-btn"
          variant="subtle"
          radius="xs"
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
          radius="xs"
          size="md"
          onClick={() => {
            updateDoc(colorsRef, {
              colors: [valueInput.current.value, ...submitAndState.data],
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
