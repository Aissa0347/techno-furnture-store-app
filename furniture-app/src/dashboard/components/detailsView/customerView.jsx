import { ActionIcon, Button, Group } from "@mantine/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import {
  BiChevronRight,
  BiEdit,
  BiFile,
  BiRightArrowAlt,
  BiShowAlt,
} from "react-icons/bi";
import { db } from "../../../firebase/firebaseConfig";

function CustomerView({ data, id }) {
  console.log("this is data props : ", data);
  const invoicesId = structuredClone(data.invoices);
  return (
    <div className="invoice-view customer-view">
      <div className="invoice-overview">
        <h4 className="sm-title">overview</h4>
        <section className="invoice-overview-wrapper">
          <CustomerInvoices invoicesId={invoicesId} />
        </section>
        <Group align={"center"} position="apart">
          <Button
            className="submit-btn"
            variant="light"
            radius="none"
            size="sm"
          >
            Download
          </Button>
        </Group>
      </div>

      <div className="invoice-user-info">
        <h4 className="sm-title">Detail of user</h4>
        <div className=" user-info">
          <img
            loading="lazy"
            className="user-info-avatar"
            src={data.avatarImg}
          />
          <h5>{data?.name}</h5>
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

function CustomerInvoices({ invoicesId }) {
  const [invoicesList, setInvoicesList] = useState([]);

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
    setInvoicesList([]);
    getInvoicesData();
  }, []);

  return (
    <div className="invoice-products-wrapper ">
      {invoicesList.map((invoice, index) => {
        return <Invoice key={index} invoiceData={invoice} />;
      })}
    </div>
  );
}

//* ---------------------------- Single Invoice UI --------------------------- */

function Invoice({ invoiceData }) {
  let createdAtMoment = moment.unix(invoiceData?.orderDate.seconds);
  let createdAt = moment(createdAtMoment).format("MMM DD,y h:mm");
  return (
    <div className="unique_card product-info invoice-product-info">
      <div className="inline-product-info">
        <h4>{createdAt}</h4>
        {/* <p>{invoiceData?.fullName}</p> */}
        <p>{invoiceData?.willaya + ", " + invoiceData?.address}</p>
        <p>{invoiceData?.totalQuantity} order</p>
        <p>{invoiceData?.totalCost} DZD</p>
        <p className={invoiceData?.status}>{invoiceData?.status}</p>
        <ActionIcon variant="subtle" radius={"none"}>
          <BiRightArrowAlt size={45} />
        </ActionIcon>
      </div>
    </div>
  );
}
