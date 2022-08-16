//* ---------------------------- Import Components --------------------------- */
import Statics from "../../components/statics/statics";

//* --------------------------- Duration Component --------------------------- */

export function DurationSelect() {
  return (
    <div className="dash-duration">
      <select name="status duration" id="status-duration">
        <option value="7">last 7 days</option>
        <option value="30">last month</option>
      </select>
    </div>
  );
}

//* ---------------------------- Widgets Component --------------------------- */

function Widgets() {
  return (
    <section className="widgets">
      <DurationSelect />
      <div className="widget-wrapper">
        <div className="widget">
          <h3>Total Visits</h3>
          <div className="widget-status">
            <h4>1688$</h4>
          </div>
          <div className="widget-rank">
            <span>3.8%</span>
          </div>
        </div>
        <div className="widget">
          <h3>Total Sales</h3>
          <div className="widget-status">
            <h4>1688$</h4>
          </div>
          <div className="widget-rank">
            <span>3.8%</span>
          </div>
        </div>
        <div className="widget">
          <h3>Total Orders</h3>
          <div className="widget-status">
            <h4>1688$</h4>
          </div>
          <div className="widget-rank">
            <span>3.8%</span>
          </div>
        </div>
        <div className="widget">
          <h3>Total Users</h3>
          <div className="widget-status">
            <h4>1688$</h4>
          </div>
          <div className="widget-rank">
            <span>3.8</span>
          </div>
        </div>
      </div>
    </section>
  );
}

//* ----------------------------- Main Component ----------------------------- */
function Main() {
  return (
    <section className="main in-dash-container">
      <h1 className="dash-title">Dashboard</h1>
      <Widgets />
      <Statics />
    </section>
  );
}

export default Main;
