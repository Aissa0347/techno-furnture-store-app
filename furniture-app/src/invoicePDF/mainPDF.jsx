import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";
import { width } from "@mui/system";
import {
  Page,
  Text,
  Image,
  Document,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";
import { LOGO } from "../Website-Assets";

const MainPDF = ({ data }) => {
  let totalPriceHT = data.reduce((acc, current) => {
    return acc + current?.productTotalHT;
  }, 0);
  let totalTaxAmount = data.reduce((acc, current) => {
    return acc + current?.taxAmount;
  }, 0);
  let totalPrice = data.reduce((acc, current) => {
    return acc + current?.productTotal;
  }, 0);

  console.log(totalPrice);
  return (
    <Document>
      <Page style={header.body}>
        <View style={header.header} fixed>
          <View style={header.logo}>
            <Image src={LOGO}></Image>{" "}
          </View>
          <View style={header.addressInfo}>
            <Text>Hai Echahid nour eddine adel Gr(G) N18</Text>
            <Text>El-Hamiz</Text>
            <Text>Dar El-Beida 16000</Text>
            <Text>Algerie</Text>
          </View>
        </View>
        <View style={body.commandeInfo} fixed>
          <View style={body.factureHead}>
            <View>
              <Text style={body.textHeader}>Facture N° : INV-0021</Text>
              <Text style={body.textSm}>
                cheraga Le : {moment().format("DD-MM-YY")}
              </Text>
            </View>
            <Text style={body.textHeader}>Doit : SPA KNC CONSTRUCTION</Text>
          </View>
          <View style={body.info}>
            <View style={body.textWrap}>
              <Text style={body.textSmHeader}>Date de commande : </Text>
              <Text style={body.text}>21/09/2022</Text>
            </View>
            <View style={body.textWrap}>
              <Text style={body.textSmHeader}>Date de commande : </Text>
              <Text style={body.text}>21/09/2022</Text>
            </View>
            <View style={body.textWrap}>
              <Text style={body.textSmHeader}>Date de commande : </Text>
              <Text style={body.text}>21/09/2022</Text>
            </View>
          </View>
        </View>
        <View style={table.container}>
          <Table style={table.table} data={data}>
            <TableHeader
              includeBottomBorder={false}
              includeRightBorder={false}
              includeLeftBorder={false}
            >
              <TableCell style={table.headCell} weighting={3}>
                Description
              </TableCell>
              <TableCell style={table.headCell} weighting={1}>
                Quantite
              </TableCell>
              <TableCell style={table.headCell} weighting={1}>
                PU HT RRR. %
              </TableCell>
              <TableCell style={table.headCell} weighting={1}>
                Montant HT
              </TableCell>
              <TableCell style={table.headCell} weighting={1}>
                TVA
              </TableCell>
            </TableHeader>
            <TableBody
              includeTopBorder={false}
              includeBottomBorder={false}
              includeRightBorder={false}
              includeLeftBorder={false}
              evenRowColor={"#b8b8b8"}
            >
              <DataTableCell
                style={table.bodyCell}
                weighting={3}
                getContent={(content) => content?.productName}
              />
              <DataTableCell
                weighting={1}
                textAlign={"right"}
                style={table.bodyCell}
                getContent={(content) => content?.quantity}
              />
              <DataTableCell
                weighting={1}
                textAlign={"right"}
                style={table.bodyCell}
                getContent={(content) => `${content?.currentPriceHT}.00`}
              />
              <DataTableCell
                weighting={1}
                textAlign={"right"}
                style={table.bodyCell}
                getContent={(content) => `${content?.productTotalHT}.00`}
              />
              <DataTableCell
                weighting={1}
                textAlign={"right"}
                style={table.bodyCell}
                getContent={(content) => `${content?.tax} %`}
              />
            </TableBody>
          </Table>
          <View style={table.totalWrap}>
            <View style={table.totalSection}>
              <View style={table.subTotal}>
                <Text style={body.textSm}>Total H.T</Text>
                <Text style={body.text}>{totalPriceHT}.00 DA</Text>
              </View>
              <View style={table.subTotal}>
                <Text style={body.textSm}>TVA</Text>
                <Text style={body.text}>{totalTaxAmount}.00 DA</Text>
              </View>
              <View style={table.subTotal}>
                <Text style={body.textSm}>Total TTC</Text>
                <Text style={body.text}>{totalPrice}.00 DA</Text>
              </View>
              <View style={table.subTotal}>
                <Text style={body.textSm}>Timbre</Text>
                <Text style={body.text}>100.00 DA</Text>
              </View>
              <View style={table.total}>
                <Text style={body.textSmHeader}>Net a payer</Text>
                <Text style={body.text}>{`${totalPrice + 100}`}.00 DA</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={body.service}>Service Enterprise</Text>
        <View style={body.footerWrap}>
          <View style={body.footer}>
            <Text style={body.footerText}>0795914857 / 0550951515</Text>
            <Text style={body.footerText}>contact@bootika.dz</Text>
            <Text style={body.footerText}>http://bootika.dz</Text>
          </View>
        </View>
        <View style={body.pageNumber}>
          <Text
            style={body.text}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          ></Text>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Poppins",
});

const table = StyleSheet.create({
  container: {
    maxWidth: "100%",
    maxHeight: "100vh",
    margin: "0px",
    width: "550px",
    overflow: "hidden",
  },
  table: {
    maxWidth: "150px !important",
    margin: "0px !important",
  },
  headCell: {
    border: "none",
    padding: "5px",
    paddingLeft: "10px",
    fontSize: "11px",
    fontWeight: "700",
  },
  bodyCell: {
    border: "none",
    margin: "5px",
    paddingLeft: "10px",
    fontSize: "10px",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  totalWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalSection: {
    display: "flex",
    flexDirection: "column",
    width: "170px",
    maxWidth: "170px",
    marginTop: "10px",
  },
  subTotal: {
    width: "170px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2px 5px",
  },
  total: {
    width: "170px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid black",
    padding: "5px",
  },
});

const body = StyleSheet.create({
  commandeInfo: {
    height: "200px",
    marginTop: "15px",
  },
  textHeader: {
    fontSize: "14px",
    fontWeight: "900",
    marginVertical: "8px",
  },
  info: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  textWrap: {
    marginRight: "15px",
  },
  textSmHeader: {
    fontSize: "12px",
    fontWeight: "800",
    marginBottom: "5px",
  },
  textSm: {
    fontSize: "12px",
    fontWeight: "500",
  },
  text: {
    fontSize: "12px",
    fontWeight: "light",
  },
  factureHead: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    marginBottom: "1rem",
  },

  totalSection: {
    display: "flex",
    flexDirection: "column",
    fontSize: "11px",
    padding: "5px",
  },
  service: {
    marginLeft: "64px",
    fontSize: "9px",
  },
  footerWrap: {
    position: "absolute",
    bottom: "20px",
    right: "0px",
    left: "0px",
    margin: "0px 20px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid black",
    borderTop: "1px solid black",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
  },
  footerText: {
    fontSize: "12px",
    fontWeight: "light",
    marginRight: "15px",
  },
  pageNumber: {
    position: "absolute",
    bottom: "5px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#b8b8b8",
  },
});

const header = StyleSheet.create({
  body: {
    width: "100%",
    paddingHorizontal: "20px",
    marginBottom: "35px",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    padding: "15px 0",
    borderBottom: "1px solid gray",
    height: "100px",
    width: "100%",
  },
  logo: {
    height: "100%",
    width: "100px",
    objectFit: "contain",
  },
  addressInfo: {
    fontSize: "12px",
    fontWeight: "light",
    paddingLeft: "15px",
  },
});

export default MainPDF;
