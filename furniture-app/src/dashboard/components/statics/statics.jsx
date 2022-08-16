//  import Charts
import Visits from "./visits";
import Sales from "./sales";
import Orders from "./orders";

//* ---------------------------- Statics Component --------------------------- */

function Statics() {
  return (
    <div className="statics-wrapper">
      <Visits />
      <Sales />
      <Orders />
    </div>
  );
}

export default Statics;
