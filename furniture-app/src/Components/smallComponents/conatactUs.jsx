import { Paper } from "@mantine/core";
import { BiMailSend, BiMapAlt, BiPhoneCall } from "react-icons/bi";
import { TechnoImages } from "../Products";

//* ---------------------------------- Geolocation info ---------------------------------- */
function GeoInfo() {
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

export default GeoInfo;
