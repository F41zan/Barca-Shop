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

const MonthlySalesPerformance = () => {
  const { orders } = useContext(CardContext);
  
  const last6Months = useMemo(() => {
    const months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = date.toLocaleString("en-US", {
        month: "short",
        // year: "numeric",
      });
      months.push(monthKey);
    }
    
    return months;
  }, []);

  const chartData = useMemo(() => {
    // Group sales by month
    const salesByMonth = orders.reduce((acc, order) => {
      const orderDate = new Date(order.orderDate);
      const monthKey = orderDate.toLocaleString("en-US", {
        month: "short",
        // year: "numeric",
      });

      if (last6Months.includes(monthKey)) {
        acc[monthKey] = (acc[monthKey] || 0) + order.pricing.totalAmount;
      }

      return acc;
    }, {});

    // Map to chart data format, ensuring all 6 months are present
    return last6Months.map(month => ({
      month,
      sales: salesByMonth[month] || 0,
    }));
  }, [orders, last6Months]);
  return (
    <ChartCard title="Monthly Sales Performance">
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="sales"
          fill="#8884d8"
          activeBar={{ fill: "#8b2346", stroke: "blue" }}
          radius={[10, 10, 0, 0]}
        />
        <RechartsDevtools />
      </BarChart>
    </ChartCard>
  );
};

export default MonthlySalesPerformance;

