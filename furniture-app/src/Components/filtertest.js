const [filteredProductList, setFilteredProductList] = useState([
  ...Products_Catalog,
]);
const [categoryProductList, setCategoryProductList] = useState([
  ...Products_Catalog,
]);
const [searchFilterProducts, setSearchFilterProducts] = useState([
  ...Products_Catalog,
]);
const [filters, setFilters] = useState({
  category: [],
  markName: [],
});
let setFiltersToProducts = (filter, filterFrom) => {
  let finalTouch = [];
  finalTouch = [
    ...filterFrom.filter((filteredProduct) => {
      return filters[filter].some(
        (eachFilter) => filteredProduct[filter] === eachFilter
      );
    }),
  ];
  finalTouch = finalTouch.filter((Product, index) => {
    return (
      finalTouch.findIndex((product) => product.id === Product.id) === index
    );
  });
  if (filter === "category") setCategoryProductList(finalTouch);
  setFilteredProductList(finalTouch);
  return finalTouch;
};

function searchFilter() {
  let filteredProductSearchUpdate = filteredProductList.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchFilterProducts) ||
      product.category.toLowerCase().includes(searchFilterProducts)
    );
  });
  console.log("thats the filter", filteredProductSearchUpdate);
  setFilteredProductList(filteredProductSearchUpdate);
}
useEffect(() => {
  if (filters.category.length > 0)
    setFiltersToProducts("category", Products_Catalog);
  if (filters.markName.length > 0)
    setFiltersToProducts("markName", categoryProductList);
  if (filters.category.length === 0 && filters.markName.length === 0) {
    setFilteredProductList(Products_Catalog);
  }
}, [filters]);
