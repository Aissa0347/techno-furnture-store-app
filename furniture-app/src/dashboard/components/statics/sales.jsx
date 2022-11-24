import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { DashboardContext } from "../../Dashboard";

function Sales() {
  const { analyticsData } = useContext(DashboardContext);
  const [data, setData] = useState([]);

  let calculatedData = analyticsData
    .sort((prev, next) => prev.date.seconds - next.date.seconds)
    .map((day) => {
      let createdAtMoment = moment.unix(day.date?.seconds);
      let theDay = moment(createdAtMoment).format("DD MMM");
      return { Day: theDay, Sales: day.sales };
    });

  useEffect(() => {
    setData(calculatedData);
  }, [analyticsData]);

  return (
    <div className="sales-chart chart-height">
      <h2>Les ventes</h2>
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
            <XAxis dataKey="Day" />
            <Tooltip />
            <Bar type="monotone" dataKey="Sales" maxBarSize={35} fill="blue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Sales;
