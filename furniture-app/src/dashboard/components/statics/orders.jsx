import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  LabelList,
  Legend,
  Tooltip,
} from "recharts";

import { useContext, useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { DashboardContext } from "../../Dashboard";

let data = [
  { name: "completed", value: 352, value2: "198" },
  { name: "returned", value: 410, value2: "265" },
  { name: "ongoing", value: 821, value2: "695" },
  { name: "cancelled", value: 452, value2: "760" },
];

let colors = ["red", "grey", "purple", "orange", "black"];

function CustomLegend(props) {
  console.log(props);
  const { payload } = props;
  return (
    <>
      {payload.map((entry) => {
        console.log(entry.payload);
        const { payload } = entry;
        return (
          <div className="one-legend" key={payload.value + payload.fill}>
            <h5 style={{ color: payload.fill }}>
              <span
                className="icon-legend"
                style={{ backgroundColor: payload.fill }}
              ></span>
              {payload.label}{" "}
            </h5>
            <span>{payload.value}</span>
          </div>
        );
      })}
    </>
  );
}

function Orders() {
  const { analyticsData } = useContext(DashboardContext);
  const [isSmall, setIsSmall] = useState(
    window.innerWidth > 967 ? false : true
  );
  const [data, setData] = useState([]);

  function getOrdersStatics() {
    let pending = 0;
    let completed = 0;
    let returned = 0;
    let ongoing = 0;
    let cancelled = 0;
    analyticsData.forEach((current) => {
      pending += ~~current.ordersStatus?.pending;
      completed += ~~current.ordersStatus?.completed;
      returned += ~~current.ordersStatus?.returned;
      ongoing += ~~current.ordersStatus?.ongoing;
      cancelled += ~~current.ordersStatus?.cancelled;
    });
    console.log(
      "is those status : ",
      pending,
      completed,
      returned,
      ongoing,
      cancelled
    );

    setData((prev) => [
      { label: "pending", value: ~~pending },
      { label: "completed", value: ~~completed },
      { label: "returned", value: ~~returned },
      { label: "ongoing", value: ~~ongoing },
      { label: "cancelled", value: ~~cancelled },
    ]);
    console.log("values are here : ", analyticsData);
  }

  useEffect(() => {
    getOrdersStatics();
  }, [analyticsData]);

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
              nameKey="label"
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
