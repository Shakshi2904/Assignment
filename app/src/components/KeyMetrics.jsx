import React from "react";
import "../App.css"; // Import the CSS

const KeyMetrics = ({ data }) => {
  return (
    <div className="metrics">
      <h1>📊 Key Metrics</h1>
      <p>💰 Total Sales: ₹{data.totalSales}</p>
      <p>📅 Average Transactions/Day: {data.averageTransactions}</p>
      <p>📍 Highest-Selling Location: {data.highestSellingLocation}</p>
    </div>
  );
};

export default KeyMetrics;
