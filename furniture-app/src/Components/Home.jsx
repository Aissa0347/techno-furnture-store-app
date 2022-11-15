import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../App";
import { brands } from "../Website-Assets";
import { ProductsCard } from "./Card";
import { CategoryP } from "../Website-Assets/index";
import { FeautreP } from "../Website-Assets/index";
import { semiCategory } from "../Website-Assets/index";
import { Products_Catalog } from "../Website-Assets";
import Products, { TechnoImages } from "./Products";
import { Category } from "./Products";
import { scrollToTop } from "../App";

//* ---------------------------------- Api's --------------------------------- */

//* -------------------------------- Libraries ------------------------------- */
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiWhatsappLine,
} from "react-icons/ri";
import uniqid from "uniqid";
import { SimpleGrid } from "@mantine/core";
import { createStyles, Container, Title, Text, Button } from "@mantine/core";
import { TextInput, Textarea, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import { ThemeIcon, Box, Stack } from "@mantine/core";
import { IconSun, IconPhone, IconMapPin, IconAt } from "@tabler/icons";
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
    paddingTop: theme.spacing.xl * 3,
    paddingBottom: theme.spacing.xl * 3,
    marginTop: "6rem",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
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

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan("md")]: {
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

function Heros() {
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
      {FeautreP.map((feautre) => {
        const { text, img } = feautre;
        return (
          <div className="feautre" key={text}>
            <img loading="lazy" src={img} alt={text} />
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

  return (
    <div className="ProductsM section ">
      <h2>Our Products</h2>
      {/* <Control /> */}

      <SimpleGrid
        cols={5}
        breakpoints={[
          { maxWidth: 1400, cols: 4, spacing: "md" },
          { maxWidth: 981, cols: 3, spacing: "sm" },
          { maxWidth: 768, cols: 2, spacing: "sm" },
          { maxWidth: 400, cols: 1, spacing: "xs" },
        ]}
      >
        {ourProducts.map((card) => {
          return <ProductsCard {...card} currentProduct={card} key={card.id} />;
        })}
      </SimpleGrid>

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
        {semiCategory.map((Category) => {
          return (
            <span className={Category.state} key={Category.name}>
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

//* ---------------------------------- Geolocation info ---------------------------------- */

export function GeoInfo() {
  return (
    <>
      <section
        className="mapouter"
        style={{
          backgroundColor: "#004079",
          position: "relative",
          textAlign: "right",
          marginLeft: "auto",
          marginRight: "auto",
          overflow: "hidden",
          border: "1px solid blue",
          padding: "3rem",
        }}
      >
        <h2>TITLE LABIN</h2>
        <div className="slider-images">
          <div className="store-images-wrapper">
            <TechnoImages />
            <Text align="left" color={"white"} size="lg" mt={10}>
              Techno Chéraga Lot n1 Amara، 02 Rte de Ouled Fayet, شراقة 16000
            </Text>
          </div>
        </div>
        <div
          className="gmap_canvas"
          style={{
            overflow: "hidden",
            background: "none !important",
            height: "70vh",
            width: "100%",
          }}
        >
          <iframe
            style={{ width: "100vw", height: "70vh" }}
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=techno%20cheraga&t=&z=19&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </section>
    </>
  );
}

//* ------------------------------- Contact Us Icons ------------------------------- */

const iconsListStyles = createStyles((theme, { variant }) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === "gradient"
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][6]
          } 100%)`
        : "none",
    backgroundColor: "transparent",
  },

  title: {
    color:
      variant === "gradient"
        ? theme.colors.gray[6]
        : theme.colors[theme.primaryColor][0],
  },

  description: {
    color: variant === "gradient" ? theme.black : theme.white,
  },
}));

function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = "gradient",
  className,
  ...others
}) {
  const { classes, cx } = iconsListStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {variant === "gradient" ? (
        <ThemeIcon size={40} radius="md" className={classes.icon}>
          <Icon size={24} />
        </ThemeIcon>
      ) : (
        <Box mr="md">
          <Icon size={24} />
        </Box>
      )}

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: "Email", description: "hello@mantine.dev", icon: IconAt },
  { title: "Phone", description: "+49 (800) 335 35 35", icon: IconPhone },
  { title: "Address", description: "844 Morris Park avenue", icon: IconMapPin },
  { title: "Working hours", description: "8 a.m. – 11 p.m.", icon: IconSun },
];

export function ContactIconsList({ data = MOCKDATA, variant }) {
  const items = data.map((item, index) => (
    <ContactIcon key={index} variant={variant} {...item} />
  ));
  return <Stack>{items}</Stack>;
}

export function ContactIcons() {
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <ContactIconsList />
      </Box>

      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundImage: `linear-gradient(135deg, ${
            theme.colors[theme.primaryColor][6]
          } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
        })}
      >
        <ContactIconsList variant="white" />
      </Box>
    </SimpleGrid>
  );
}

//* ------------------------------- Contact Us ------------------------------- */

const contactStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    borderRadius: "none",
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: "none",
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    "&:hover": {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export function ContactUs() {
  const { classes } = contactStyles();

  const icons = social.map((Icon, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
    >
      <Icon size={22} stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <section className="section contactUs">
      <div className={classes.wrapper}>
        <SimpleGrid
          cols={2}
          spacing={30}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <div>
            <Title className={classes.title}>Contact us</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              Leave your email and we will get back to you within 24 hours
            </Text>

            <ContactIconsList variant="white" />

            <Group mt="xl">{icons}</Group>
          </div>
          <div className={classes.form}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              classNames={{ input: classes.input, label: classes.inputLabel }}
              radius="none"
            />
            <TextInput
              label="Name"
              placeholder="John Doe"
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              radius="none"
            />
            <Textarea
              required
              label="Your message"
              placeholder="I want to order your goods"
              minRows={4}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              radius="none"
            />

            <Group position="right" mt="md">
              <Button className={classes.control} radius="none">
                Send message
              </Button>
            </Group>
          </div>
        </SimpleGrid>
      </div>
    </section>
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
      <ContactUs />
    </>
  );
}

export default Home;
