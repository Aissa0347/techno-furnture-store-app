import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  LabelList,
  Legend,
  Tooltip,
} from "recharts";

let data = [
  { name: "completed", value: 352, value2: "198" },
  { name: "returned", value: 410, value2: "265" },
  { name: "ongoing", value: 821, value2: "695" },
  { name: "cancelled", value: 452, value2: "760" },
];

let colors = ["red", "grey", "purple", "yellow"];

function Orders() {
  return (
    <div className="order-chart">
      <h2>Order Overview</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              // cx="25%"
              // cy="50%"
              outerRadius={100}
              innerRadius={60}
            >
              {data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={colors[index]} />;
              })}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Orders;
