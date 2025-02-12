import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import "../App.css"; // Import the CSS

const StockChart = ({ data }) => {
  return (
    <div className="stock-chart-container">
      <h1>📉 Stock Chart</h1>
      <div className="stock-chart">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Location" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="StockLeft" fill="#008080" />
        </BarChart>
      </div>
    </div>
  );
};

export default StockChart;
