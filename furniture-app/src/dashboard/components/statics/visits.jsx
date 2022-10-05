import moment from "moment";
import { useContext } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { DashboardContext } from "../../Dashboard";

function Visits() {
  const { analyticsData } = useContext(DashboardContext);
  let data = analyticsData.map((day) => {
    let createdAtMoment = moment.unix(day.date?.seconds);
    let theDay = moment(createdAtMoment).format("DD MMM");
    return { day: theDay, visits: day.visits, customers: day.newCustomers };
  });

  console.log("visits data : ", data);

  return (
    <div className="visits-chart chart-height">
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
            <XAxis dataKey="day" />
            <YAxis fontSize={14} width={45} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="red"
              fill="#f1f1f1"
            />
            <Line
              type="monotone"
              dataKey="customers"
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
