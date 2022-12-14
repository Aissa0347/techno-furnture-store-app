import React, { useCallback, useContext, useEffect, useState } from "react";

// import Icons
import {
  BiFilter,
  BiSearchAlt,
  BiChevronLeft,
  BiX,
  BiRightArrowAlt,
  BiFilterAlt,
} from "react-icons/bi";

// import SVG's
import NOT_FOUND from "../Website-Assets/SVG/NOT_FOUND.svg";
import NO_RESULT from "../Website-Assets/SVG/NO_RESULT.svg";

// import Components needed
import { ProductsCard } from "./Card";

// import DATA

// import Styles
import "../styles/index.scss";
import { GlobalContext } from "../App";
import {
  ActionIcon,
  Button,
  Group,
  NumberInput,
  Pagination,
  RangeSlider,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useRef } from "react";
import Bradcrumbs from "./smallComponents/bradcrumbs";
import { useLocation } from "react-router-dom";
import { useClickOutside } from "@mantine/hooks";

//* -------------------------------- Mini Hero ------------------------------- */

export function MiniHero() {
  const locations = [
    { label: "ACCUEIL", path: "/" },
    { label: "TOUS LES PRODUITS" },
  ];

  return (
    <div className="mHero">
      <div className="title">
        <h1>Product Catalog</h1>
        <Bradcrumbs locations={locations} />
      </div>
    </div>
  );
}

//* ------------------------------- Search Bar ------------------------------- */

function SearchBar({
  searchFilter,
  setSearchFilter,
  isFilterBarAcitve,
  setIsFilterBarActive,
  filterTextToDefault,
}) {
  const [searchFilterText, setSearchFilterText] = useState([]);
  const submitRef = useRef();
  const searchWrapperRef = useRef();

  // useEffect(() => {
  //   searchWrapperRef.current.onkeyup = (press) => {
  //     submitRef.current.click();
  //   };
  // });

  useEffect(() => {
    searchWrapperRef.current.onkeypress = (press) => {
      if (press.key === "Enter" || press.keyCode === 13)
        submitRef.current.click();
    };
  }, []);

  useEffect(() => {
    if (searchWrapperRef.current.value === "") setSearchFilter("");
  });

  useEffect(() => {
    setSearchFilterText("");
    setSearchFilter("");
  }, [filterTextToDefault]);

  return (
    <div className="search-bar onTop" id="search-bar">
      <ActionIcon
        size={"xl"}
        id="filter-icon"
        variant="filled"
        color="gray"
        radius="none"
        onClick={() => setIsFilterBarActive(!isFilterBarAcitve)}
      >
        <BiFilterAlt size={24} />
      </ActionIcon>

      <div className="search-type">
        <TextInput
          icon={<BiSearchAlt size={24} stroke={1.5} />}
          radius="none"
          color="gray"
          size="lg"
          ref={searchWrapperRef}
          className="search-type-input"
          rightSection={
            <ActionIcon
              className="search-type"
              ref={submitRef}
              onClick={() => {
                setSearchFilter(searchFilterText);
                window.scrollTo({ left: 0, top: 165, behavior: "smooth" });
              }}
              size="xl"
              radius="none"
              mr={7}
              variant="filled"
            >
              <BiRightArrowAlt size={20} stroke={1.5} />
            </ActionIcon>
          }
          onChange={(e) => setSearchFilterText(e.target.value.toLowerCase())}
          placeholder="Search questions"
          rightSectionWidth={42}
        />
      </div>
    </div>
  );
}

//* ---------------------------- Catalog Products ---------------------------- */

function ProductsCatalogList({
  productsList,
  setfilterTextToDefault,
  setProductsList,
  setFilters,
}) {
  const [page, setPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(25);

  let pageData = productsList.slice(
    (page - 1) * productPerPage,
    page * productPerPage
  );

  const setFiltersToDefault = () => {
    setfilterTextToDefault((prev) => !prev);
    setFilters({ category: [], markName: [] });
    window.scrollTo({ left: 0, top: 165, behavior: "smooth" });
  };

  useEffect(() => {
    setPage(1);
  }, [productsList]);

  // if (productsList?.length <= 0) {
  //   var setToDefaultTimeOut = setTimeout(setFiltersToDefault, 2000);
  // }
  return (
    <div className="products-catalog ">
      {pageData.length > 0 ? (
        <Text size="sm" my={5} pl={5} color="gray">
          {productsList.length} Produit found
        </Text>
      ) : null}
      <div className="products-catalog-wrapper">
        {pageData.map((card, index) => {
          if (index < productPerPage) {
            return (
              <ProductsCard currentProduct={card} {...card} key={card.id} />
            );
          }
        })}
      </div>
      {productsList?.length > 0 ? (
        <Group
          align={"center"}
          position={"center"}
          className="catalog-pagination"
        >
          <Pagination
            size={"md"}
            radius={"none"}
            page={page}
            onChange={(e) => {
              setPage(e);
              window.scrollTo({ left: 0, top: 165, behavior: "smooth" });
            }}
            total={Math.ceil(productsList?.length / productPerPage)}
          />
        </Group>
      ) : (
        <div className="svg-interactions btns">
          <img loading="lazy" src={NO_RESULT} />
          <h3>NO RESULT</h3>
          <Button
            variant="white"
            radius="none"
            size="lg"
            my={8}
            className="CTA-3"
            onClick={() => {
              setFiltersToDefault();
            }}
          >
            Afficher tout{" "}
          </Button>
        </div>
      )}
    </div>
  );
}

//* ------------------------------- Filter Bar ------------------------------- */

function FilterBar({
  setFilters,
  filters,
  setIsFilterBarActive,
  isFilterBarActive,
}) {
  const { ProductsCatalog } = useContext(GlobalContext);
  const [uniqCategories, setUniqCategories] = useState([]);
  const [uniqMarks, setUniqMarks] = useState([]);
  const [isWider, setIsWider] = useState(true);
  const outerRef = useClickOutside(() => setIsFilterBarActive(false));

  // toggle filters, function that filter products by the type u assigned
  function toggleSubFilter(event, type, filter) {
    if (type === "price") {
      setFilters((lastFilters) => {
        return {
          ...lastFilters,
          [type]: filter,
        };
      });
    } else {
      if (event.target.checked) {
        setFilters((lastFilters) => {
          return {
            ...lastFilters,
            [type]: [...lastFilters[type], filter],
          };
        });
        console.log(type, event);
      } else {
        setFilters((lastFilters) => {
          return {
            ...lastFilters,
            [type]: [
              ...lastFilters[type].filter(
                (eachFilter) => eachFilter !== filter
              ),
            ],
          };
        });
      }
    }
  }

  function removeSubFilter(type) {
    setFilters((lastFilters) => ({ ...lastFilters, [type]: [] }));
  }

  useEffect(() => {
    // filter categories and delete duplicated
    setUniqCategories([
      ...new Set(
        ProductsCatalog.map((product) => {
          return product?.category;
        })
      ),
    ]);

    // filter marks and delete duplicated
    setUniqMarks([
      ...new Set(
        ProductsCatalog.map((product) => {
          return product?.markName;
        })
      ),
    ]);
  }, [ProductsCatalog]);

  useEffect(() => {
    console.log("proplems are here : ", filters);
    if (filters?.category)
      uniqCategories.forEach((category) => {
        if (filters.category.some((filter) => category === filter)) {
          console.log("make it true");
          document.getElementById(category).checked = true;
        } else {
          document.getElementById(category).checked = false;
        }
      });

    if (filters?.markName)
      uniqMarks.forEach((mark) => {
        if (filters.markName.some((filter) => mark === filter)) {
          console.log("make it true");
          document.getElementById(mark).checked = true;
        } else {
          document.getElementById(mark).checked = false;
        }
      });
    console.log("or here : ", filters);
  }, [filters]);

  useEffect(() => {
    const isItWide = () => {
      if (window.innerWidth > 767) {
        setIsWider(true);
      } else {
        setIsWider(false);
      }
    };
    isItWide();
    window.addEventListener("resize", isItWide);
    return window.removeEventListener("resize", isItWide);
  }, []);

  return (
    <div
      ref={isWider ? null : outerRef}
      className={isFilterBarActive ? "active filter-bar" : "filter-bar"}
    >
      <ActionIcon
        color="red"
        size="lg"
        radius="none"
        className="exit-icon"
        onClick={() => setIsFilterBarActive(false)}
      >
        <BiX size={24} />
      </ActionIcon>
      <div className="filter-wrapper">
        <div className="filter-categories filter-box">
          <details className="filter-checkbox" open>
            <summary>
              Categories <BiChevronLeft className="chevron" />
            </summary>
            {uniqCategories.map((category) => {
              return (
                <div className="col" key={category}>
                  <input
                    type="checkbox"
                    name={category}
                    id={category}
                    className={category}
                    onChange={(event) =>
                      toggleSubFilter(event, "category", category)
                    }
                  />
                  <label htmlFor={category}> {category}</label>
                </div>
              );
            })}
          </details>
        </div>

        <div className="filter-prices filter-box">
          <details>
            <summary>
              Price range <BiChevronLeft className="chevron" />
            </summary>
            <div className="col price-range">
              <PriceRange
                toggleSubFilter={toggleSubFilter}
                removeSubFilter={removeSubFilter}
              />
            </div>
          </details>
        </div>

        <div className="filter-marks filter-box">
          <details className="filter-checkbox" open>
            <summary>
              Marks <BiChevronLeft className="chevron" />
            </summary>
            {uniqMarks.map((mark) => {
              return (
                <div className="col" key={mark}>
                  <input
                    type="checkbox"
                    name={mark}
                    id={mark}
                    onChange={(event) =>
                      toggleSubFilter(event, "markName", mark)
                    }
                  />
                  <label htmlFor={mark}> {mark}</label>
                </div>
              );
            })}
          </details>
        </div>
      </div>
    </div>
  );
}

function PriceRange({ toggleSubFilter, removeSubFilter }) {
  const [localRange, setLocalRange] = useState([0, 15000]);
  let min, max;
  min = localRange[0];
  max = localRange[1];

  useEffect(() => {});

  let defaultMarks = [
    { value: 10000, label: "10.000 DZD" },
    { value: 100000, label: "100.000 DZD" },
  ];

  return (
    <>
      <RangeSlider
        value={localRange}
        onChange={setLocalRange}
        step={100}
        max={300000}
        // marks={defaultMarks}
      />
      <Group align={"center"} position={"apart"} mt={"md"} mb={"md"}>
        <NumberInput
          label="Min"
          value={min}
          onChange={(current) => setLocalRange([current, max])}
          step={1000}
          min={0}
          radius={"none"}
          style={{ width: "90px" }}
        />
        <NumberInput
          label="Max"
          value={max}
          onChange={(current) => setLocalRange([min, current])}
          step={1000}
          min={0}
          radius={"none"}
          style={{ width: "90px" }}
        />
      </Group>
      <Group>
        <Button
          variant="light"
          color={"red"}
          size={"sm"}
          radius={"none"}
          onClick={(event) => removeSubFilter("price")}
        >
          Remove
        </Button>
        <Button
          variant="light"
          size={"sm"}
          radius={"none"}
          onClick={(event) => toggleSubFilter(event, "price", localRange)}
        >
          Apply
        </Button>
      </Group>
    </>
  );
}

//* --------------------------------- Catalog -------------------------------- */

function Catalog() {
  const { ProductsCatalog } = useContext(GlobalContext);
  const [searchFilter, setSearchFilter] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    markName: [],
    price: [],
  });
  const [productsList, setProductsList] = useState([...ProductsCatalog]);
  const [searchFilteredProducts, setSearchFilteredProducts] = useState([]);
  const [isFilterBarActive, setIsFilterBarActive] = useState(false);
  const [filterTextToDefault, setfilterTextToDefault] = useState();
  const location = useLocation();

  let setFiltersToProducts = useCallback(
    (filtersType, filtersTypesNames) => {
      let filteredProduct = [...ProductsCatalog];
      console.log(filtersType, filtersTypesNames);
      filtersType.forEach((filterTypeArray, index) => {
        if (filterTypeArray?.length > 0) {
          filteredProduct = [
            ...filteredProduct.filter((product) => {
              console.log(index);
              if (filtersTypesNames[index] === "price") {
                return (
                  product.price >= filterTypeArray[0] &&
                  product.price <= filterTypeArray[1]
                );
              }
              return filterTypeArray.some(
                (eachFilter) => product[filtersTypesNames[index]] === eachFilter
              );
            }),
          ];
        }
      });
      return filteredProduct;
    },
    [filters]
  );

  function searchFiltering() {
    let searchProductList = productsList.filter((filteredProduct) =>
      ["name", "category", "markName"].some((eachType) =>
        filteredProduct[eachType].toLowerCase().includes(searchFilter)
      )
    );
    setSearchFilteredProducts(searchProductList);
  }
  useEffect(() => {
    searchFiltering();
  }, [searchFilter, productsList]);

  useEffect(() => {
    setProductsList(
      setFiltersToProducts(
        [filters.category, filters.markName, filters.price],
        ["category", "markName", "price"]
      )
    );
    window.scrollTo({ left: 0, top: 165, behavior: "smooth" });
  }, [filters]);

  useEffect(() => {
    console.log("here is location : ", location.state);
    if (location?.state) {
      setFilters(location.state);
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      location.state = "";
      console.log("i am i ther reason");
    }
  }, []);

  return (
    <div className="Catalog">
      <MiniHero />
      <SearchBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        searchFiltering={searchFiltering}
        isFilterBarAcitve={isFilterBarActive}
        setIsFilterBarActive={setIsFilterBarActive}
        filterTextToDefault={filterTextToDefault}
      />
      <div className="container">
        <div className="wrapper ">
          <FilterBar
            setFilters={setFilters}
            filters={filters}
            setIsFilterBarActive={setIsFilterBarActive}
            isFilterBarActive={isFilterBarActive}
          />

          <ProductsCatalogList
            productsList={
              searchFilter?.length > 0 ? searchFilteredProducts : productsList
            }
            setFilters={setFilters}
            setProductsList={setProductsList}
            setfilterTextToDefault={setfilterTextToDefault}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Catalog);
