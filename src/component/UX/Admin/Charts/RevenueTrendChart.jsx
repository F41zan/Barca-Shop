import  { useContext, useMemo } from "react";
import ChartCard from "./ChartCard";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { CardContext } from "../../../Context/CardContext";
import { RechartsDevtools } from "@recharts/devtools";

const RevenueTrendChart = () => {
  const { orders } = useContext(CardContext);
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayWiseSales = useMemo(() => {
    return orders.reduce((acc, order) => {
      const day = new Date(order.orderDate).toLocaleDateString("en-US", {
        weekday: "short", // Mon, Tue, Wed
      });
      acc[day] = (acc[day] || 0) + order.pricing.totalAmount;
      return acc;
    }, {});
  }, [orders]);

  const data = weekDays.map((day) => ({
    day,
    revenue: dayWiseSales[day] || 0,
  }));
  return (
    <ChartCard title="Revenue Trend" subTitle="Revenue">
      <AreaChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis width="auto" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <RechartsDevtools />
      </AreaChart>
    </ChartCard>
  );
};

export default RevenueTrendChart;
