import { Bar as Bubble } from "react-chartjs-2";

function Sales() {
  return (
    <div className="sales-chart">
      <h2>Sales</h2>
      <div className="chart-wrapper">
        <Bubble
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
          width="100%"
          height="100%"
          options={{
            maintainAspectRatio: false,
            // responsive: true,
          }}
        />
      </div>
    </div>
  );
}

export default Sales;
