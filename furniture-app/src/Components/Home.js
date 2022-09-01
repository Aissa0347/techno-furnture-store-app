import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../App";
import { brands } from "../Website-Assets";
import { Card, Cards } from "./Card";
import { CategoryP } from "../Website-Assets/index";
import { FeautreP } from "../Website-Assets/index";
import { semiCategory } from "../Website-Assets/index";
import { Products_Catalog } from "../Website-Assets";
import Products from "./Products";
import { Category } from "./Products";
import { scrollToTop } from "../App";

//* ---------------------------------- Api's --------------------------------- */
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

//* -------------------------------- Libraries ------------------------------- */
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiWhatsappLine,
} from "react-icons/ri";
import uniqid from "uniqid";

//* -------------------------------------------------------------------------- */
//*                                 Components                                 */
//* -------------------------------------------------------------------------- */

//* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <>
      <div className="Hero">
        <div className="BigTitle">
          <h1>
            Find Your Best
            <br /> <b>Furniture.</b>
          </h1>
          <h5>
            We are the best in the world, just find your best chair and buy it
            in easy way
          </h5>
          <div className="btns">
            <Link to="/catalog" onClick={() => scrollToTop()}>
              <button className="btn CTA">Explore More</button>
            </Link>
            {/* <Link to="/catalog">
              <button className="btn CTA-2">Explore More</button>
            </Link> */}
          </div>
        </div>
      </div>
      <Brands />
    </>
  );
}

function Brands() {
  return (
    <div className="brands">
      <img src={brands.Brand1} alt="" />
      <img src={brands.Brand2} alt="" />
      <img src={brands.Brand3} alt="" />
      <img src={brands.Brand4} alt="" />
      <img src={brands.Brand5} alt="" />
      <img src={brands.Brand6} alt="" />
    </div>
  );
}

//* -------------------------------- Feautres -------------------------------- */

export function Features() {
  return (
    <>
      {FeautreP.map((feautre, index) => {
        const { text, img, key = index } = feautre;
        return (
          <div className="feautre" key={uniqid.time()}>
            <img src={img} alt={text} />
            <h4 className="ft">{text}</h4>
          </div>
        );
      })}
    </>
  );
}

//* -------------------------------- ProductsM ------------------------------- */

function ProductsM() {
  const [limits, setLimits] = useState(10);
  const [isSmaller, setSmaller] = useState(false);

  let { pickRandomProducts, ProductsCatalog } = useContext(GlobalContext);
  let ourProducts = pickRandomProducts(ProductsCatalog, 8);

  function checkIsSmaller() {
    if (window.innerWidth > 767) {
      setSmaller(false);
    } else {
      setSmaller(true);
    }
  }

  let i = 0;

  useEffect(() => {
    const resize = function () {
      checkIsSmaller();
      var Height = document.querySelector(".bx").offsetHeight;
      if (document.querySelector(".swiper-products")) {
        document.querySelector(".swiper-products").style.height =
          2 * Height + 60 + "px";
      }
    };
    window.addEventListener("resize", resize);
    checkIsSmaller();
    return () => document.removeEventListener("resize", resize);
  });

  return (
    <div className="ProductsM section ">
      <h2>Our Products</h2>
      {/* <Control /> */}
      {(() => {
        if (isSmaller) {
          return <Products ourProducts={ourProducts} />;
        } else {
          return (
            <div className="main-Products cards">
              {ourProducts.map((card) => {
                return <Cards {...card} currentProduct={card} key={card.id} />;
              })}
            </div>
          );
        }
      })()}
      <div className="btns">
        <Link
          to="/catalog"
          onClick={() => {
            window.screenTop();
          }}
        >
          <button className="btn CTA-3">All Products</button>
        </Link>
      </div>
    </div>
  );
}

//* --------------------------------- Control -------------------------------- */

function Control() {
  return (
    <div className="control">
      <div className="type">
        {semiCategory.map((Category, index) => {
          return (
            <span className={Category.state} key={index}>
              {Category.name}
              <span className="slash">/</span>
            </span>
          );
        })}
      </div>
      {/* <div className="direction">
        <BiChevronLeftCircle />
        <BiChevronRightCircle />
      </div> */}
    </div>
  );
}

//* ---------------------------------- Info ---------------------------------- */
const center = { lat: 36.755345, lng: 3.227116 };
export function GeoInfo() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });
  if (!isLoaded) {
    return <h2>Nothing work perfectly</h2>;
  }
  return (
    <div className="GeoInfo" style={{ width: "100vw", height: "70vh" }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      ></GoogleMap>
    </div>
  );
}

//* ------------------------------- NewsLetter ------------------------------- */

export function NewsLetter() {
  return (
    <div className="newsletter container section">
      <h2>Subscribe Our Newsletter</h2>
      <div className="input-email btns">
        <input
          type="email"
          name="news-email"
          id="news-email"
          placeholder="Your Email"
        />
        <button className="btn CTA">subscribe</button>
      </div>
    </div>
  );
}

//* --------------------------------- Footer --------------------------------- */

export function Footer() {
  return (
    <div className="footer section ">
      <div className="wrapper container">
        <div className="f-block">
          <h5>Contact Us</h5>
          <span>Tel: 055095914857</span>
          <span>Email: SEMOAUI0347@GMAIL.COM</span>
          <span>Address: Bordj El-Kiffan lot 483 grp 15</span>
        </div>
        <div className="f-block social-media">
          <h5>Social Media</h5>
          <div className="social-media-links">
            <RiFacebookFill />
            <RiInstagramLine />
            <RiWhatsappLine />
          </div>
        </div>
        <div className="f-block">
          <h5>Useful links</h5>
          <ul className="nav-links-footer">
            <li className="link N-1">Home</li>
            <li className="link N-2">All Products</li>
            <li className="link N-3">Contact</li>
          </ul>
        </div>
      </div>
      <div className="copyright">© Techno Cheraga 2022</div>
    </div>
  );
}

//* -------------------------------------------------------------------------- */
//*                                    Home                                    */
//* -------------------------------------------------------------------------- */

function Home() {
  return (
    <>
      <Hero />
      <div className="container">
        <Category />
        <ProductsM />
      </div>
      <GeoInfo />
      <NewsLetter />
    </>
  );
}

export default Home;
