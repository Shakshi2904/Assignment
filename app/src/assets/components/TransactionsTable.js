import React from "react";
import "../App.css"; // Import the CSS

const TransactionsTable = ({ data }) => {
  return (
    <div className="transactions-table-container">
      <h1>📋 Transactions Table</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Machine ID</th>
            <th>Total Sales</th>
            <th>Transactions</th>
            <th>Stock Left</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.Date}</td>
              <td>{entry.Location}</td>
              <td>{entry["MachineID"]}</td>
              <td>₹{entry["TotalSales"]}</td>
              <td>{entry["Transactions"]}</td>  
              <td>{entry["StockLeft"]}%</td>   
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
