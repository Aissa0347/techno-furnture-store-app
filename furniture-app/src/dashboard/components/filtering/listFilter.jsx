import { ActionIcon, Chip, TextInput } from "@mantine/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { capitalizeSentence } from "../../../App";
import { db } from "../../../firebase/firebaseConfig";
import { search } from "../icons";

//* ------------------- Search Event and Regetting the data ------------------ */

function ListFilter({ setFilteredValues, chipsFilter, col, RightButton }) {
  const [searchType, setSearchType] = useState("name");
  const searchRef = useRef();
  const searchIconRef = useRef();

  console.log("here is search type : ", searchType);
  useEffect(() => {
    searchRef.current.onkeypress = (press) => {
      if (press.key === "Enter") {
        searchIconRef.current.click();
      }
    };
  }, []);

  function getFilteredData() {
    console.log("we are in filtered data : ");
    const customerRef = collection(db, col);
    const searchValue = capitalizeSentence(searchRef.current.value);
    console.log("here is the search Value : ", searchValue);
    let customersList = [];
    setFilteredValues([]);
    let customerQuery;
    if (
      chipsFilter.find((chip) => chip.value === searchType)?.format === "number"
    ) {
      customerQuery = query(
        customerRef,
        where(searchType, ">=", ~~searchValue)
      );
    } else {
      customerQuery = query(customerRef, where(searchType, "<=", searchValue));
    }

    getDocs(customerQuery)
      .then((res) => {
        res.docs.map((doc) => customersList.push(doc.data()));
        console.log("filters are here sir : ", res.docs);
        setFilteredValues([...customersList]);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
      });
  }

  return (
    <>
      <div className="filters newProducts">
        <TextInput
          id="customer-search"
          placeholder="Search Customers..."
          className=" dash-search-filter"
          size="lg"
          radius="none"
          autoFocus
          ref={searchRef}
          icon={<ActionIcon size={15}>{search}</ActionIcon>}
          rightSection={
            <ActionIcon
              variant="filled"
              color={"red"}
              style={{ marginRight: "15px" }}
              size={"lg"}
              ref={searchIconRef}
              onClick={() => {
                searchRef.current.value
                  ? getFilteredData()
                  : setFilteredValues();
              }}
            >
              <BiRightArrowAlt />
            </ActionIcon>
          }
        />
        {RightButton ? <RightButton radius="none" size="lg" /> : null}
      </div>
      <Chip.Group
        position="left"
        value={searchType}
        onChange={(value) => setSearchType(value)}
        style={{ margin: "0.5rem 0" }}
      >
        {chipsFilter.map((chip, index) => {
          return (
            <Chip radius="none" value={chip.value} key={index}>
              {chip.label}
            </Chip>
          );
        })}
      </Chip.Group>
    </>
  );
}

export default ListFilter;
