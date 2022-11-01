import { ActionIcon, Button, Group } from "@mantine/core";
import { PDFViewer } from "@react-pdf/renderer";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { db } from "../../../firebase/firebaseConfig";
import MainPDF from "../../../invoicePDF/mainPDF";

function CustomerView({ data, id }) {
  const [invoicesList, setInvoicesList] = useState([]);
  const [isInvoicesOverview, setIsInvoicesOverview] = useState({
    state: true,
    data: [],
  });

  console.log("this is data props : ", data);
  const invoicesId = structuredClone(data.invoices);
  return (
    <div className="invoice-view customer-view">
      <div className="invoice-overview">
        <h4 className="sm-title">overview</h4>
        {isInvoicesOverview.state ? (
          <section className="invoice-overview-wrapper">
            <CustomerInvoices
              invoicesList={invoicesList}
              setInvoicesList={setInvoicesList}
              invoicesId={invoicesId}
              setIsInvoicesOverview={setIsInvoicesOverview}
            />
          </section>
        ) : (
          <>
            <section className="invoice-overview-wrapper">
              <PDFViewer
                children={<MainPDF data={isInvoicesOverview.data} />}
                height={"99%"}
                width={"100%"}
                className="pdf-viewer"
                showToolbar={false}
              />
            </section>
            <Group align={"center"} position="apart">
              <Button
                className="submit-btn"
                variant="light"
                radius="none"
                size="sm"
                onClick={() => setIsInvoicesOverview({ state: true, data: [] })}
              >
                Return
              </Button>
            </Group>
          </>
        )}
      </div>

      <div className="invoice-user-info">
        <h4 className="sm-title">Detail of user</h4>
        <div className=" user-info">
          <img
            loading="lazy"
            className="user-info-avatar"
            src={data.avatarImg}
          />
          <h5>{data?.firstName + " " + data?.lastName}</h5>
          <p>{data?.email}</p>
          <p>{data?.phoneNumber}</p>
          <p>
            <span>Total spent: </span>
            {data?.amountSpent} DZD
          </p>
          <p>
            <span>Number of orders : </span>
            {data?.numberOfOrders}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;

//* ------------------------- Customer Invoices List ------------------------- */

function CustomerInvoices({
  invoicesId,
  setIsInvoicesOverview,
  invoicesList,
  setInvoicesList,
}) {
  //* ---------------------------- Get invoices data --------------------------- */
  const getInvoicesData = async () => {
    const invoicesRef = collection(db, "Orders");
    let invoicesQuery;
    await invoicesId.forEach(async (id) => {
      invoicesQuery = query(invoicesRef, where("orderId", "==", id));
      await getDocs(invoicesQuery).then((invoiceData) => {
        console.log("what include invoice : ", invoiceData.docs[0]?.data());
        const currentInovice = invoiceData.docs[0]?.data();
        if (currentInovice)
          setInvoicesList((prev) => [...prev, currentInovice]);
      });
    });
  };

  console.log("this is the invoice list : ", invoicesList);

  useEffect(() => {
    if (invoicesList.length < 1) {
      setInvoicesList([]);
      getInvoicesData();
    }
  }, []);

  return (
    <div className="invoice-products-wrapper ">
      {invoicesList.map((invoice, index) => {
        return (
          <Invoice
            key={index}
            invoiceData={invoice}
            setIsInvoicesOverview={setIsInvoicesOverview}
          />
        );
      })}
    </div>
  );
}

//* ---------------------------- Single Invoice UI --------------------------- */

function Invoice({ invoiceData, setIsInvoicesOverview }) {
  let createdAtMoment = moment.unix(invoiceData?.orderDate.seconds);
  let createdAt = moment(createdAtMoment).format("MMM DD,y h:mm");

  console.log("show invoice data : ", invoiceData);

  return (
    <div className="unique_card product-info invoice-product-info">
      <div className="inline-product-info">
        <h4>{createdAt}</h4>
        {/* <p>{invoiceData?.fullName}</p> */}
        <p>{invoiceData?.willaya + ", " + invoiceData?.address}</p>
        <p>{invoiceData?.totalQuantity} order</p>
        <p>{invoiceData?.totalCost} DZD</p>
        <p className={invoiceData?.status}>{invoiceData?.status}</p>
        <ActionIcon
          variant="subtle"
          radius={"none"}
          onClick={() =>
            setIsInvoicesOverview({ state: false, data: invoiceData.orderList })
          }
        >
          <BiRightArrowAlt size={45} />
        </ActionIcon>
      </div>
    </div>
  );
}
