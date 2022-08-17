import { Line } from "react-chartjs-2";
import { Charts as ChartJs } from "chart.js/auto";

function Visits() {
  return (
    <div className="visits-chart">
      <h2>Visits</h2>
      <div className="chart-wrapper">
        <Line
          data={{
            labels: [1, 2, 4, 5, 6, 7, 8, 9, 0],
            datasets: [
              {
                id: 1,
                label: " visits",
                data: [4500, 334, 222, 433, 895, 4677, 8, 332, 111],
                backgroundColor: "red",
              },
              {
                id: 2,
                label: " orders",
                data: [889, 89, 222, 744, 85, 995, 8, 332, 5111],
                backgroundColor: "blue",
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

export default Visits;
