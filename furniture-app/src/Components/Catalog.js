import React, { useContext, useEffect, useState, lazy, Suspense } from "react";

// import Icons
import { BiFilter, BiSearchAlt, BiChevronLeft, BiX } from "react-icons/bi";

// import SVG's
import NOT_FOUND from "../Website-Assets/SVG/NOT_FOUND.svg";
import NO_RESULT from "../Website-Assets/SVG/NO_RESULT.svg";

// import Components needed
import { Cards } from "./Card";

// import DATA
import { Products_Catalog } from "../Website-Assets";

// import Styles
import "../styles/index.scss";
import { GlobalContext } from "../App";

//* -------------------------------- Mini Hero ------------------------------- */

export function MiniHero() {
  return (
    <div className="mHero">
      <div className="title">
        <h1>Product Catalog</h1>
        <span>Home &gt;&gt; Catalog</span>
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
}) {
  const [searchFilterText, setSearchFilterText] = useState([]);
  return (
    <div className="search-bar onTop" id="search-bar">
      <div className="filter">
        <button onClick={() => setIsFilterBarActive(!isFilterBarAcitve)}>
          <BiFilter className="filter-icon" id="filter-icon" />
          <label>Filter</label>
        </button>
      </div>
      <div className="search-type ">
        <button
          className=""
          onClick={() => {
            setSearchFilter(searchFilterText);
            window.scrollTo(0, 270);
          }}
        >
          <BiSearchAlt />
        </button>
        <input
          className="search-type-input"
          placeholder="Search by product name or category"
          onChange={(e) => setSearchFilterText(e.target.value.toLowerCase())}
        />
      </div>
      <div className="sort">
        <label htmlFor="sorting">Sort by: </label>
        <select name="sorting" id="sorting" defaultValue="recommended">
          <option value="popular">Popular</option>
          <option value="newest">Newest</option>
          <option value="recommended">Recommended</option>
        </select>
      </div>
    </div>
  );
}

//* ---------------------------- Catalog Products ---------------------------- */

function ProductsCatalogList({
  filteredProductList,
  setFilteredProductList,
  setFilters,
}) {
  const [productNumberLimite, setProductNumberLimite] = useState(15);

  function setFiltersToDefault() {
    setFilters({ category: [], markName: [] });
    window.scrollTo(0, 270);
  }
  // if (filteredProductList.length <= 0) {
  //   var setToDefaultTimeOut = setTimeout(setFiltersToDefault, 2000);
  // }
  return (
    <div className="products-catalog btns">
      <div className="products">
        {filteredProductList.map((card, index) => {
          if (index < productNumberLimite) {
            return <Cards currentProduct={card} {...card} key={index} />;
          }
        })}
      </div>
      {filteredProductList.length > 0 ? (
        <button
          className="btn CTA-3"
          onClick={() => setProductNumberLimite(productNumberLimite + 10)}
        >
          Show More
        </button>
      ) : (
        <div className="svg-interactions btns">
          <img loading="lazy" src={NO_RESULT} />
          <h3>NO RESULT</h3>
          <button
            className="btn CTA-3"
            onClick={() => {
              setFiltersToDefault();
            }}
          >
            Show All
          </button>
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

  // filter categories and delete duplicated
  var uniq_categories = [
    ...new Set(
      ProductsCatalog.map((product) => {
        return product.category;
      })
    ),
  ];

  // filter marks and delete duplicated
  var uniq_marks = [
    ...new Set(
      ProductsCatalog.map((product) => {
        return product.markName;
      })
    ),
  ];
  // toggle filters, function that filter products by the type u assigned
  function toggleSubFilter(event, type, filter) {
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
            ...lastFilters[type].filter((eachFilter) => eachFilter !== filter),
          ],
        };
      });
    }
  }
  useEffect(() => {
    uniq_categories.forEach((category) => {
      if (filters.category.some((filter) => category === filter)) {
        console.log("make it true");
        document.getElementById(category).checked = true;
      } else {
        document.getElementById(category).checked = false;
      }
    });
    uniq_marks.forEach((mark) => {
      if (filters.markName.some((filter) => mark === filter)) {
        console.log("make it true");
        document.getElementById(mark).checked = true;
      } else {
        document.getElementById(mark).checked = false;
      }
    });
  }, [filters]);
  return (
    <div className={isFilterBarActive ? "active filter-bar" : "filter-bar"}>
      <div className="filter-wrapper">
        <BiX
          className="exit-icon icon"
          onClick={() => setIsFilterBarActive(false)}
        />
        <div className="filter-categories filter-box">
          <details className="filter-checkbox" open>
            <summary>
              Categories <BiChevronLeft className="chevron" />
            </summary>
            {uniq_categories.map((category, index) => {
              return (
                <div className="col" key={index}>
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
            <div className="col">
              <input type="range" className="range" />
            </div>
          </details>
        </div>

        <div className="filter-marks filter-box">
          <details className="filter-checkbox" open>
            <summary>
              Marks <BiChevronLeft className="chevron" />
            </summary>
            {uniq_marks.map((mark, index) => {
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

//* --------------------------------- Catalog -------------------------------- */

function Catalog({ searchFilter, setSearchFilter, filters, setFilters }) {
  const { ProductsCatalog } = useContext(GlobalContext);

  const [filteredProductList, setFilteredProductList] = useState([
    ...ProductsCatalog,
  ]);
  const [categoryProductList, setCategoryProductList] = useState([
    ...ProductsCatalog,
  ]);
  const [searchFilteredProducts, setSearchFilteredProducts] = useState([]);
  const [isFilterBarActive, setIsFilterBarActive] = useState(false);

  let setFiltersToProducts = (filtersType, filtersTypesNames) => {
    let filteredProduct = [...ProductsCatalog];
    filtersType
      .filter((filtersType) => filtersType.length > 0)
      .map((filterTypeArray, index) => {
        return (filteredProduct = [
          ...filteredProduct.filter((product) => {
            console.log(index);
            if (filtersType[0].length == 0) index = 1;
            return filterTypeArray.some(
              (eachFilter) => product[filtersTypesNames[index]] === eachFilter
            );
          }),
        ]);
      });
    return filteredProduct;
  };

  function searchFiltering() {
    let searchProductList = filteredProductList.filter((filteredProduct) =>
      ["name", "category", "markName"].some((eachType) =>
        filteredProduct[eachType].toLowerCase().includes(searchFilter)
      )
    );
    setSearchFilteredProducts(searchProductList);
  }
  useEffect(() => {
    searchFiltering();
  }, [searchFilter]);
  useEffect(() => {
    setFilteredProductList(
      setFiltersToProducts(
        [filters.category, filters.markName],
        ["category", "markName"]
      )
    );
  }, [filters]);

  return (
    <div className="Catalog">
      <MiniHero />
      <div className="container">
        <SearchBar
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          searchFiltering={searchFiltering}
          isFilterBarAcitve={isFilterBarActive}
          setIsFilterBarActive={setIsFilterBarActive}
        />
        <div className="wrapper">
          <FilterBar
            setFilters={setFilters}
            filters={filters}
            setIsFilterBarActive={setIsFilterBarActive}
            isFilterBarActive={isFilterBarActive}
          />

          <ProductsCatalogList
            filteredProductList={
              searchFilter.length > 0
                ? searchFilteredProducts
                : filteredProductList
            }
            setFilters={setFilters}
            setFilteredProductList={setFilteredProductList}
          />
        </div>
      </div>
    </div>
  );
}

export default Catalog;
