import React, { useContext, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Features } from "../Components/Home";
import { GlobalContext } from "../App";

// Import Libraries
import uniqid from "uniqid";

// Import Icons
import { BiX } from "react-icons/bi";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/grid";
import "swiper/scss/pagination";
import "swiper/scss/free-mode";
import "swiper/scss/thumbs";
import "swiper/scss/navigation";

// import required modules
import {
  Grid,
  Pagination,
  FreeMode,
  Thumbs,
  Navigation,
  Autoplay,
  Scrollbar,
  Mousewheel,
} from "swiper";

// import data
import { CategoryP, FeautreP, Products_Catalog } from "../Website-Assets";
import { Cards, Card } from "./Card";
import { useParams } from "react-router-dom";

//* --------------------------- Our Products component --------------------------- */

export default function Products({ ourProducts }) {
  return (
    <>
      <Swiper
        modules={[Grid, Pagination]}
        slidesPerView={2}
        grid={{
          rows: 2,
        }}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        className="swiper-products mySwiper"
      >
        {ourProducts.map((card) => {
          return (
            <SwiperSlide key={card.id}>
              {" "}
              <Cards {...card} currentProduct={card} />{" "}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

//* -------------------------------- Category Slider -------------------------------- */

export function Category() {
  return (
    <>
      <div className=" section">
        <h2>Ecplore By Category</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          breakpoints={{
            767: {
              spaceBetween: 20,
              slidesPerView: 5,
            },
            576: {
              spaceBetween: 10,
              slidesPerView: 4,
            },
            300: {
              spaceBetween: 5,
              slidesPerView: 3,
            },
          }}
          slidesPerView={"3"}
          pagination={{}}
          className="cards Category"
        >
          {CategoryP.map((Category, index) => {
            return (
              <SwiperSlide className="category" key={uniqid.time()}>
                <Card {...Category} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="feautres">
        <Features />
      </div>
    </>
  );
}

//* ------------------------ Product Detail Show Media ----------------------- */

export function MediaSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const Pics = [
    require("../Website-Assets/image-1.png"),
    require("../Website-Assets/image-2.png"),
    require("../Website-Assets/image-3.png"),
    require("../Website-Assets/image-4.png"),
    require("../Website-Assets/image-5.png"),
  ];
  return (
    <>
      <Swiper
        loop={true}
        modules={[Navigation, FreeMode, Thumbs, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="media-slider"
      >
        {Pics.map((Pic, index) => {
          return (
            <SwiperSlide key={index}>
              <object data={Pic} alt="">
                <param name="control" value="false" />
              </object>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        modules={[FreeMode, Thumbs, Navigation, Pagination]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={16}
        freeMode={true}
        className="media-slider-thumb"
      >
        {Pics.map((Pic, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={Pic} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

//* ---------------------------- You May Also Like --------------------------- */

export function SuggestedProducts() {
  const [filteredSuggestedProducts, setFilteredSuggestedProducts] = useState(
    []
  );
  let { pickRandomProducts, ProductsCatalog } = useContext(GlobalContext);
  let { productId } = useParams();
  useEffect(() => {
    console.log("is it rerender too");
    setFilteredSuggestedProducts(pickRandomProducts(ProductsCatalog, 8));
  }, [productId]);

  return (
    <>
      <div className="suggested_products section">
        <h2>You May Also Like</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          slidesPerGroup={1}
          breakpoints={{
            767: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            567: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            380: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
          }}
          modules={[Pagination, Navigation]}
          navigation={true}
          pagination={{ clickable: true }}
          className="suggested-swiper  "
        >
          {filteredSuggestedProducts.map((Product) => {
            return (
              <SwiperSlide key={uniqid.time()}>
                <Cards {...Product} currentProduct={Product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

//* --------------------------- Shopping Cart List --------------------------- */

export function ShoppingCartList() {
  const { ProductsCatalog } = useContext(GlobalContext);
  return (
    <Swiper
      direction="vertical"
      slidesPerView={3}
      spaceBetween={50}
      className="product_list_swiper"
    >
      {ProductsCatalog.slice(0, 8).map((Product) => {
        return (
          <SwiperSlide>
            <li className="unique_card product-info">
              <div className="img_name">
                <img
                  src={Product.img}
                  alt={Product.name}
                  className="product_image"
                />
                <div className="product_title">
                  <h5>{Product.name}</h5>
                  <h4>{Product.category}</h4>
                </div>
              </div>
              <label htmlFor="Qty-input" className="product_quantity">
                {" "}
                Qty:&nbsp;
                <input
                  type="number"
                  name="Qty-input"
                  id="Qty-input"
                  defaultValue={4}
                />
              </label>
              <h4 className="product_price">{Product.price} DZD</h4>
              <BiX className="remove-icon" />
            </li>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
