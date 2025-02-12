const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
const PORT = process.env.PORT || 5000;
app.get("/api/dashboard-data", async (req, res) => {
    try {
        const sheetDbUrl = "https://sheetdb.io/api/v1/f0kvugsj6sshy";
        const response = await axios.get(sheetDbUrl);
        const data = response.data;

        const validData = data.filter(entry => entry["Total Sales"] && entry["Transactions"]);
        if (validData.length === 0) {
            console.log("Invalid data");
            return res.status(400).json({invalid:"Invalid data"}); 
        }

        const totalSales = validData.reduce((sum, entry) => sum + (parseInt(entry["Total Sales"]) || 0), 0);
        const totalTransactions = validData.reduce((sum, entry) => sum + (parseInt(entry["Transactions"]) || 0), 0);
        const averageTransactions = validData.length > 0 ? Math.round(totalTransactions / validData.length) : 0;

        const highestSellingLocation = validData.reduce((max, entry) => { 
        return parseInt(entry["Total Sales"]) > parseInt(max["Total Sales"]) ? entry : max;}, 
        validData[0]).Location || "N/A";

        const rawData = validData.map(entry => ({
            Date: entry.Date || "Unknown",
            Location: entry.Location || "Unknown",
            MachineID: entry["MachineID"] || "N/A",
            TotalSales: parseInt(entry["Total Sales"]) || 0,
            Transactions: parseInt(entry["Transactions"]) || 0,
            StockLeft: parseInt(entry["StockLeft"]) || 0,
        }));
        res.json({
            totalSales,
            averageTransactions,
            highestSellingLocation,
            rawData
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Google Sheets" });
    }
});
app.listen(PORT);