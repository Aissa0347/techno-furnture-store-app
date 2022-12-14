import React, { useContext, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Features } from "../Components/Home";
import { GlobalContext } from "../App";

// Import Libraries
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
// Import Icons
import { BiX } from "react-icons/bi";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/grid";
import "swiper/scss/pagination";
import "swiper/scss/free-mode";
import "swiper/scss/thumbs";
import "swiper/scss/navigation";
import "swiper/scss";
import "swiper/scss/effect-cards";

// import required modules

// import required modules
import {
  Grid,
  Pagination,
  FreeMode,
  Thumbs,
  Navigation,
  Autoplay,
} from "swiper";

// import data
import {
  CategoryP,
  FeautreP,
  Products_Catalog,
  technoImages,
} from "../Website-Assets";
import { ProductsCard, SmallCard } from "./Card";
import { useParams } from "react-router-dom";

//* -------------------------------- Category Slider -------------------------------- */

export function Category() {
  return (
    <>
      <div className=" section">
        <h2>Explorer par catégorie</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          breakpoints={{
            1280: {
              spaceBetween: 30,
              slidesPerView: 7,
            },
            967: {
              spaceBetween: 20,
              slidesPerView: 6,
            },
            767: {
              spaceBetween: 20,
              slidesPerView: 5,
            },
            576: {
              spaceBetween: 10,
              slidesPerView: 5,
            },
            300: {
              spaceBetween: 5,
              slidesPerView: 3,
            },
          }}
          slidesPerView={"7"}
          pagination={{}}
          className="cards categories"
        >
          {CategoryP.map((Category) => {
            return (
              <SwiperSlide className="category" key={Category.name}>
                <SmallCard {...Category} />
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

export function MediaSlider({ images, name }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={images.length > 1 && true}
        modules={[Navigation, FreeMode, Thumbs, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="media-slider"
      >
        {[...images].map((img) => {
          return (
            <SwiperSlide key={img.url} className="media-slider-active">
              <Zoom>
                <img src={img.url} alt={name} />
              </Zoom>
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
        {[...images].map((img) => {
          return (
            <SwiperSlide key={img.url}>
              <img loading="lazy" src={img.url} alt={name} />
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
        <h2>Peut vous intéresser</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          slidesPerGroup={1}
          breakpoints={{
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            767: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            567: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            380: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
          }}
          modules={[Pagination, Navigation]}
          navigation={true}
          pagination={{ clickable: true }}
          className="suggested-swiper  "
        >
          {filteredSuggestedProducts.map((Product) => {
            return (
              <SwiperSlide key={Product?.id}>
                <ProductsCard {...Product} currentProduct={Product} />
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
          <SwiperSlide key={Product.id}>
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

//* -------------------- Store Images on Google map embed -------------------- */

export function TechnoImages() {
  return (
    <div>
      <Swiper
        grabCursor={true}
        loop={true}
        height={250}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="store-images"
      >
        <SwiperSlide>
          <img src={technoImages.img1} alt="Techno cheraga image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={technoImages.img2} alt="Techno cheraga image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={technoImages.img3} alt="Techno cheraga image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={technoImages.img4} alt="Techno cheraga image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={technoImages.img5} alt="Techno cheraga image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
