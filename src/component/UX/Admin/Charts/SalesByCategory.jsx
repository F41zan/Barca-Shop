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

const SalesByCategory = () => {
    const {orders} = useContext(CardContext);
  const allCategories = ["Apparel", "kits"];

  const categorySales = useMemo(() => {
    return orders.reduce((acc, order) => {
      order.items.forEach((item) => {
        const category = item.category;
        const revenue = item.quantity * item.price;

        acc[category] = (acc[category] || 0) + revenue;
      });
      return acc;
    }, {});
  }, [orders]);

  const finalCategorySales = allCategories.reduce((acc, category) => {
    acc[category] = categorySales[category] || 0;
    return acc;
  }, {});

  const pieChartData = Object.entries(finalCategorySales).map(
    ([name, revenue]) => ({
      name,
      revenue: revenue || 0,
    }),
  );

  const totalValue = useMemo(() => {
    return pieChartData.reduce((sum, item) => sum + item.revenue, 0);
  }, [pieChartData]);

  const COLORS = ["#002596", "#8B2346"]; // Apparel, Kits

  return (
    <ChartCard title="Sales by Category">
      {totalValue === 0 ? (
        <p className="no-data">No sales data available</p>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: "1.618",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label={({ name, value }) => `${name}: ₹${value}`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
};

export default SalesByCategory;
