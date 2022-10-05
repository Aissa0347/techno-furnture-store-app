import moment from "moment";
import { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { DashboardContext } from "../../Dashboard";

function Sales() {
  const { analyticsData } = useContext(DashboardContext);
  const [data, setData] = useState([]);

  let calculatedData = analyticsData.map((day) => {
    let createdAtMoment = moment.unix(day.date?.seconds);
    let theDay = moment(createdAtMoment).format("DD MMM");
    return { Day: theDay, Sales: day.sales };
  });

  useEffect(() => {
    setData(calculatedData);
  }, [analyticsData]);

  return (
    <div className="sales-chart chart-height">
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
            <XAxis dataKey="Day" />
            {/* <YAxis fontSize={14} width={45} tickBar={false} /> */}
            <Tooltip />
            <Bar
              type="monotone"
              dataKey="Sales"
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
