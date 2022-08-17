import {
  ResponsiveContainer,
  LineChart,
  Line,
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

function Visits() {
  return (
    <div className="visits-chart">
      <h2>Visits</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 30,
              right: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3" vertical={false} opacity={0.5} />
            <XAxis dataKey="name" />
            <YAxis fontSize={14} width={45} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="red" fill="#f1f1f1" />
            <Line
              type="monotone"
              dataKey="value2"
              stroke="blue"
              fill="#f1f1f1"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Visits;
