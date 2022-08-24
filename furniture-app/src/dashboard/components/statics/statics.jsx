//  import Charts
import Visits from "./visits";
import Sales from "./sales";
import Orders from "./orders";
import LastInvoicesTable from "../tables/lastInvoicesTable";
import { rows } from "../../pages/invoices/invoices";
//* ---------------------------- Statics Component --------------------------- */

function Statics() {
  return (
    <div className="statics-wrapper">
      <section className="analyse">
        <Visits />
        <Sales />
      </section>
      <section className="statics-order-invoices">
        <Orders />
        <div className="last-invoices">
          <LastInvoicesTable rows={rows} />
        </div>
      </section>
    </div>
  );
}

export default Statics;
