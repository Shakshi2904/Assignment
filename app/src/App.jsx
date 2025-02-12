import React, { useState, useEffect } from "react";
import axios from "axios";
import KeyMetrics from "./components/KeyMetrics.jsx";
import SalesChart from "./components/SalesChart.jsx";
import StockChart from "./components/StockChart.jsx";
import TransactionsTable from "./components/TransactionsTable.jsx";
import "./App.css"; // Import the CSS file

function App() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_SERVERURL}/api/dashboard-data`)
      .then((response) => {
        let formattedData = response.data.rawData.map((entry) => ({
          ...entry,
          TotalSales: Number(entry.TotalSales),
          StockLeft: Number(entry.StockLeft),
        }));
        setData({ ...response.data, rawData: formattedData });
        setFilteredData(formattedData);
        setError(null);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to fetch data. Please check your backend.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    let newData = data.rawData;

    // Filter by date
    if (selectedDate) {
      newData = newData.filter((entry) => 
        new Date(entry.Date).toISOString().split("T")[0] === selectedDate
      );
    }

    // Filter by search term
    if (searchTerm) {
      newData = newData.filter(
        (entry) =>
          entry.Location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.MachineID.toString().includes(searchTerm)
      );
    }

    setFilteredData(newData);
  }, [selectedDate, searchTerm, data]);

  if (error) return <p className="error-message">{error}</p>;
  if (loading) return <p className="loading-message">Loading...</p>;
  if (!data) return <p className="no-data-message">No data available</p>;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <h1 className="dashboard-title">📊 Dashboard</h1>

        {/* Date Filter */}
        <div className="date-filter">
          <label>📅 Select Date:</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>

        {/* Search Input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search Location or Machine ID "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={() => setSearchTerm(searchTerm)}>Search</button>
        </div>
        <button onClick={fetchData} className="refresh-button">🔄 Refresh Data</button>
      </div>

      {/* Key Metrics & Transactions Table */}
      <div className="grid-container">
        <div className="card"><KeyMetrics data={data} /></div>
        <div className="card"><TransactionsTable data={filteredData} /></div>
      </div>

      {/* Sales Chart & Stock Chart */}
      <div className="grid-container">
        <div className="card"><SalesChart data={filteredData} /></div>
        <div className="card"><StockChart data={filteredData} /></div>
      </div>
    </div>
  );
};

export default App;
