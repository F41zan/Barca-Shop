import React, { useContext, useMemo } from "react";
import ChartCard from "./ChartCard";
import { ResponsiveContainer } from "recharts";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  Pie,
  PieChart,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { CardContext } from "../../../Context/CardContext";
import { RechartsDevtools } from "@recharts/devtools";

const OrderVsRevenue = () => {
    const { orders } = useContext(CardContext);
  
  const last6Months = useMemo(() => {
    const months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      months.push(monthKey);
    }
    
    return months;
  }, []);

  // Order vs Revenue
  const ordersVsRevenue = useMemo(() => {
    return orders.reduce((acc, order) => {
      const month = new Date(order.orderDate).toLocaleString("en-US", {
        month: "short",
        year: "numeric", // Must include year to match last6Months
      });

      if (!last6Months.includes(month)) return acc;

      if (!acc[month]) {
        acc[month] = { month, orders: 0, revenue: 0 };
      }

      acc[month].orders += 1;
      acc[month].revenue += order.pricing.totalAmount;

      return acc;
    }, {});
  }, [orders, last6Months]);

  const orderVsRevenueData = useMemo(() => {
    return last6Months.map(
      (month) =>
        ordersVsRevenue[month] || {
          month,
          orders: 0,
          revenue: 0,
        }
    );
  }, [last6Months, ordersVsRevenue]);

  return (
    <ChartCard title="Order vs Revenue">
      <LineChart
        style={{
          width: "100%",
          maxWidth: "700px",
          height: "100%",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        responsive
        data={orderVsRevenueData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="revenue" stroke="#8b2346" />
        <RechartsDevtools />
      </LineChart>
    </ChartCard>
  );
};

export default OrderVsRevenue;
