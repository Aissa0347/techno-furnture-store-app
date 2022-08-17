//  import Charts
import Visits from "./visits";
import Sales from "./sales";
import Orders from "./orders";

//* ---------------------------- Statics Component --------------------------- */

function Statics() {
  return (
    <div className="statics-wrapper">
      <section className="analyse">
        <Visits />
        <Sales />
      </section>
      <Orders />
    </div>
  );
}

export default Statics;
