import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "../App.css"; // Import the CSS

const SalesChart = ({ data }) => {
  return (
    <div className="sales-chart-container">
      <h1>📈 Total Sales</h1>
      <div className="sales-chart">
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="TotalSales" stroke="#008080" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </div>
    </div>
  );
};

export default SalesChart;
