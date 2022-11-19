import { CloseButton } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

// const datas = [{ colorName: 'Red', colorRef: '#42122' }, { colorName: 'Purple', colorRef: '#974411' }, { colorName: 'Yellow', colorRef: '#785465' },{ colorName: 'Yellow', colorRef: '#785465' },{ colorName: 'Yellow', colorRef: '#785465' },{ colorName: 'Yellow', colorRef: '#785465' },{ colorName: 'Yellow', colorRef: '#785465' }];

//

// export default function App() {
//   const [data, setData] = useState(datas);
//   const [colors, setColors] = useState([]);

//   return (
//     <main>
//       <MultiSelectColors {...{ data, colors, setColors }} />
//     </main>
//   )
// }

export function MultiSelectColors({ data, colors, setColors }) {
  const [inputValue, setInputValue] = useState("");
  const [menuItems, setMenuItems] = useState(data);
  const [filteredMenuItems, setFilteredMenuItems] = useState(data);
  const [expandMenu, setExpandMenu] = useState(false);
  const multiSelectBox = useRef();
  const inputRef = useRef();
  const outsideMultiSelect = useClickOutside(() => {
    setExpandMenu(false);
    multiSelectBox.current.style.outline = "none";
  });

  function selectColor(item) {
    setInputValue("");
    setColors((prev) => ({ ...prev, value: [...prev.value, item] }));
    setMenuItems((prev) => prev.filter((menuItem) => menuItem !== item));
  }

  function removeColor(item) {
    setColors((prev) => ({
      ...prev,
      value: prev.value.filter((menuItem) => menuItem !== item),
    }));
    setMenuItems((prev) => [...prev, item]);
  }

  function touchMultiSelect() {
    setExpandMenu(true);
    inputRef.current.focus();
    multiSelectBox.current.style.outline = "1px solid #d96b52";
  }

  function filterMenuItems(text) {
    text.toLowerCase();
    if (text === "") {
      setFilteredMenuItems([]);
    } else {
      let filteredList = menuItems.filter((item) =>
        item.colorName.toLowerCase().includes(text)
      );
      setFilteredMenuItems(filteredList);
    }
  }

  useEffect(() => {
    filterMenuItems(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setMenuItems(data);
    setColors((prev) => ({ ...prev, value: [] }));
  }, [data]);

  return (
    <div className="multi-select" ref={outsideMultiSelect}>
      <label className="multi-select-label">Avaible colors of product</label>
      <div
        className="multi-select-input"
        ref={multiSelectBox}
        onClick={touchMultiSelect}
      >
        <div className="input-values">
          {colors.value.map((color) => (
            <div
              className="selected-value"
              key={color.colorRef + color.colorName}
            >
              <span
                className="color-shower"
                style={{ backgroundColor: color.colorRef }}
              ></span>
              <span>{color.colorName}</span>
              <CloseButton
                variant="transparent"
                size={"xs"}
                style={{ color: "#495057" }}
                onClick={() => removeColor(color)}
              />
            </div>
          ))}
          <input
            className="input-text"
            ref={inputRef}
            value={inputValue}
            onChange={(event) => {
              if (event.currentTarget.value !== "+ ADD NEW COLOR")
                setInputValue(event.currentTarget.value);
            }}
            placeholder={colors.value.length ? "" : "Pick Colors"}
          />
        </div>
        <span>
          <BiChevronDown size={18} color="#4F4F4F" />
        </span>
      </div>
      {expandMenu && (
        <div className="multi-select-menu">
          {(inputValue.length ? filteredMenuItems : menuItems).map(
            (item, index) => (
              <div
                className="menu-item color-label"
                key={index}
                onClick={() => selectColor(item)}
              >
                <span
                  className="color-shower"
                  style={{ backgroundColor: item?.colorRef }}
                ></span>
                <span>{item?.colorName}</span>
              </div>
            )
          )}
          <div
            className="menu-item"
            onClick={() => setColors((prev) => ({ ...prev, state: true }))}
          >
            + ADD NEW COLOR
          </div>
        </div>
      )}
    </div>
  );
}
