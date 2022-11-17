import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../App";
import { brands } from "../Website-Assets";
import { ProductsCard } from "./Card";
import { FeautreP } from "../Website-Assets/index";
import Products, { TechnoImages } from "./Products";
import { Category } from "./Products";
import { scrollToTop } from "../App";

//* ---------------------------------- Api's --------------------------------- */

//* -------------------------------- Libraries ------------------------------- */
import { BiMailSend, BiMapAlt, BiPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiLinkedinLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { Paper, TextInput } from "@mantine/core";
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  ActionIcon,
} from "@mantine/core";
//* ------------------------------ Import SVG's ------------------------------ */
import logo from "../Website-Assets/logo.png";
import NEWSLETTER_SVG from "../Website-Assets/SVG/NEWSLETTER.svg";

//* -------------------------------------------------------------------------- */
//*                                 Components                                 */
//* -------------------------------------------------------------------------- */

//* ---------------------------------- Hero ---------------------------------- */

const heroStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundImage:
    // "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
    paddingTop: "90px",
    paddingBottom: " 100px",
    [theme.fn.smallerThan("md")]: {
      paddingTop: "8vh",
      paddingBottom: " 15vh",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("sm")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 700,
    fontSize: 72,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export function Hero() {
  const { classes } = heroStyles();
  return (
    <>
      <div className={classes.root + " Hero"}>
        <Container size={1600}>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Find Your Best{" "}
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                >
                  Furniture.{" "}
                </Text>{" "}
              </Title>

              <Text className={classes.description} mt={30}>
                We are the best in the world, just find your best chair and buy
                it in easy way
              </Text>
              <Link to="/catalog" onClick={() => scrollToTop()}>
                <Button
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                  size="xl"
                  radius={"none"}
                  className={classes.control}
                  mt={40}
                >
                  Explore our collection
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Brands />
    </>
  );
}

function Brands() {
  return (
    <div className="brands">
      <img loading="lazy" src={brands.Brand1} alt="" />
      <img loading="lazy" src={brands.Brand2} alt="" />
      <img loading="lazy" src={brands.Brand3} alt="" />
      <img loading="lazy" src={brands.Brand4} alt="" />
      <img loading="lazy" src={brands.Brand5} alt="" />
      <img loading="lazy" src={brands.Brand6} alt="" />
    </div>
  );
}

//* -------------------------------- Feautres -------------------------------- */

export function Features() {
  return (
    <>
      {FeautreP.map((feautre, index) => {
        const { text, img } = feautre;
        return (
          <Paper
            shadow="xs"
            radius="none"
            px={5}
            py={10}
            className="feautre"
            withBorder
            key={text}
          >
            <img loading="lazy" src={img} alt={text} />
            <h4 className="ft">{text}</h4>
          </Paper>
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

      <div className="custom-simple-grid">
        {ourProducts.map((card) => {
          return <ProductsCard {...card} currentProduct={card} key={card.id} />;
        })}
      </div>

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

//* ---------------------------------- Geolocation info ---------------------------------- */

export function GeoInfo() {
  return (
    <>
      <section
        className="mapouter"
        style={{
          position: "relative",
          display: "flex",
          gap: "1rem",
          textAlign: "right",
          marginLeft: "auto",
          marginRight: "auto",
          overflow: "visible",
          padding: "1rem",
        }}
      >
        <div
          className="gmap_canvas"
          style={{
            overflow: "hidden",
            background: "none !important",
            height: "500px",
            width: "100%",
          }}
        >
          <iframe
            style={{ width: "100vw", height: "70vh" }}
            id="gmap_canvas"
            loading="lazy"
            src="https://maps.google.com/maps?q=techno%20cheraga&t=&z=19&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
        <Paper shadow="lg" radius="none" className="store-images-wrapper">
          <ContactUs />
          <TechnoImages />
          {/* <Text align="left" color={"white"} size="lg" mt={10}>
            Techno Chéraga Lot n1 Amara، 02 Rte de Ouled Fayet, شراقة 16000
          </Text> */}
        </Paper>
      </section>
    </>
  );
}

//* ------------------------------- Contact Us ------------------------------- */
const contactIcons = [
  {
    title: "Email",
    icon: <BiMailSend size={32} />,
    content: "technocheraga@techno-dz.com",
  },
  {
    title: "Telephone",
    icon: <BiPhoneCall size={32} />,
    content: `+213 ${55095914857}`,
  },
  {
    title: "Address",
    icon: <BiMapAlt size={32} />,
    content: "Route d'Ouled Fayet Lot n2 Amara-Chéraga",
  },
];

function ContactUs() {
  return (
    <div className="contact-wrapper">
      {contactIcons.map((contact) => {
        return (
          <div className="contact" key={contact.title}>
            <div className="contact-icon">{contact.icon}</div>
            <div className="contact-data">
              <h4>{contact.title}</h4>
              <p>{contact.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

//* ------------------------------- NewsLetter ------------------------------- */

export function NewsLetter() {
  return (
    <div className="newsletter container section">
      <div className="newsletter-input">
        <h3>
          Wait a minute... <br />
          Subscribe our NewsLetter !
        </h3>
        <p>You will never miss a special discounts and new updates</p>
      </div>
      <div className="newsletter-email">
        <TextInput
          radius="none"
          size="lg"
          type="email"
          id="news-email"
          className="newsletter-email-input"
          placeholder="Enter Your Email"
        />
        <Button radius="none" size="lg" variant="filled">
          SUBSCRIBE
        </Button>
      </div>
      {/* <div className="newsletter-img">
        <img src={NEWSLETTER_SVG} alt="NEWSLETTER" />
      </div> */}
    </div>
  );
}

//* --------------------------------- Footer --------------------------------- */

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    marginBottom: "56px",
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    [theme.fn.smallerThan("md")]: {
      marginTop: 90,
    },
    [theme.fn.smallerThan("sm")]: {
      marginTop: 60,
    },
    [theme.fn.smallerThan("xs")]: {
      marginTop: 40,
    },
  },

  logo: {
    maxHeight: "70px",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    gap: "10px",
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },

  link: {
    // border: "1px solid black",
  },

  copyright: {
    textAlign: "center",
    color: "grey",
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <NewsLetter />
      <Container className={classes.inner}>
        <div>
          <img
            src={logo}
            className={classes.logo}
            alt="Techno Cheraga logo"
            loading="lazy"
          />
        </div>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon
            size="lg"
            radius="none"
            variant="outline"
            className={classes.link}
          >
            <RiFacebookFill size={24} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            radius="none"
            variant="outline"
            className={classes.link}
          >
            <RiInstagramFill size={24} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            radius="none"
            variant="outline"
            className={classes.link}
          >
            <RiLinkedinFill size={24} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
      <div className={classes.copyright}>© Techno Cheraga 2022</div>
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
    </>
  );
}

export default React.memo(Home);
