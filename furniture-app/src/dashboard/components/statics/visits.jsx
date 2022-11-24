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
  console.log("analytics data : ", analyticsData);
  let data = analyticsData
    .sort((prev, next) => prev.date.seconds - next.date.seconds)
    .map((day) => {
      let createdAtMoment = moment.unix(day.date?.seconds);
      let theDay = moment(createdAtMoment).format("DD MMM");
      return { day: theDay, Visites: day.visits, Commandes: day.orders };
    });

  console.log("visits data : ", data);

  return (
    <div className="visits-chart chart-height">
      <h2>Les visites</h2>
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
              dataKey="Visites"
              stroke="red"
              fill="#f1f1f1"
            />
            <Line
              type="monotone"
              dataKey="Commandes"
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
