import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  LabelList,
  Legend,
  Tooltip,
} from "recharts";

import { useEffect } from "react";
import { useState } from "react";

let data = [
  { name: "completed", value: 352, value2: "198" },
  { name: "returned", value: 410, value2: "265" },
  { name: "ongoing", value: 821, value2: "695" },
  { name: "cancelled", value: 452, value2: "760" },
];

let colors = ["red", "grey", "purple", "yellow"];

function CustomLegend(props) {
  console.log(props);
  const { payload } = props;
  return (
    <>
      {payload.map((entry) => {
        console.log(entry.payload);
        const { payload } = entry;
        return (
          <div className="one-legend">
            <h5 style={{ color: payload.fill }}>
              <span
                className="icon-legend"
                style={{ backgroundColor: payload.fill }}
              ></span>
              {payload.name}{" "}
            </h5>
            <span>{payload.value}</span>
          </div>
        );
      })}
    </>
  );
}

function Orders() {
  const [isSmall, setIsSmall] = useState(
    window.innerWidth > 967 ? false : true
  );

  window.onresize = () => {
    setIsSmall(window.innerWidth > 967 ? false : true);
    console.log("we resized");
  };

  console.log(isSmall);
  useEffect(() => {
    try {
      const pieChart = document.querySelector(".pie-serface svg");
      pieChart.setAttribute("viewBox", 0);
    } catch {
      setTimeout(() => {
        const pieChart = document.querySelector(".pie-serface svg");
        pieChart.setAttribute("viewBox", 0);
      }, 100);
    }
    console.log("inside use effects");
  }, [isSmall]);

  return (
    <div className="order-chart chart-height">
      <h2>Order Overview</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width={"99%"} height={"100%"}>
          <PieChart className={"pie-serface"}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx={isSmall ? "30%" : "50%"}
              cy={isSmall ? "100%" : "50%"}
              outerRadius={isSmall ? 120 : 100}
              innerRadius={isSmall ? 80 : 60}
            >
              {data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={colors[index]} />;
              })}
            </Pie>
            <Tooltip />
            <Legend
              iconType={"triangle"}
              content={<CustomLegend />}
              layout="vertical"
              wrapperStyle={{}}
              verticalAlign="bottom"
              align="center"
              className="legend"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Orders;
