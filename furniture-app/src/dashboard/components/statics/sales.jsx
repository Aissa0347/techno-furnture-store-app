import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

let data = [
  { name: "day 1", value: "352", value2: "198" },
  { name: "day 2", value: "410", value2: "265" },
  { name: "day 3", value: "821", value2: "695" },
  { name: "day 4", value: "452", value2: "760" },
];

function Sales() {
  return (
    <div className="sales-chart">
      <h2>Sales</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 30,
              right: 0,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" opacity={0.5} /> */}
            {/* <XAxis dataKey="name" /> */}
            {/* <YAxis fontSize={14} width={45} tickBar={false} /> */}
            <Tooltip />
            <Bar
              type="monotone"
              dataKey="value"
              maxBarSize={35}
              fill="blue"
              // background={"#f1f1f1"}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Sales;
