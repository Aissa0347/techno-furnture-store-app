import { Doughnut } from "react-chartjs-2";
import { Charts as ChartJS } from "chart.js/auto";

function Orders() {
  return (
    <div className="order-chart">
      <h2>Order Overview</h2>
      <div className="chart-wrapper">
        <Doughnut
          data={{
            labels: ["completed", "pending", "returned"],
            datasets: [
              {
                label: "orders",
                data: [150, 26, 89],
                backgroundColor: ["red", "blue", "yellow"],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export default Orders;
