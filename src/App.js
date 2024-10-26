import React, { useState } from "react";
import StockTracker from "./StockTracker"; // Import the StockTracker component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StockTracker.css"; // Import your CSS file

const App = () => {
  const [stocks, setStocks] = useState([
    { symbol: "AAPL", upperThreshold: 250, lowerThreshold: 200 },
    { symbol: "GOOG", upperThreshold: 200, lowerThreshold: 130 },
  ]);

  const [newSymbol, setNewSymbol] = useState("");
  const [newUpperThreshold, setNewUpperThreshold] = useState("");
  const [newLowerThreshold, setNewLowerThreshold] = useState("");

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newSymbol || !newUpperThreshold || !newLowerThreshold || isNaN(newUpperThreshold) || isNaN(newLowerThreshold)) {
      toast.error("Please enter a valid stock symbol and numeric thresholds.");
      return;
    }
    setStocks([
      ...stocks,
      { 
        symbol: newSymbol.toUpperCase(), 
        upperThreshold: parseFloat(newUpperThreshold), 
        lowerThreshold: parseFloat(newLowerThreshold) 
      },
    ]);
    setNewSymbol("");
    setNewUpperThreshold("");
    setNewLowerThreshold("");
  };

  return (
    <div>
      <h1>Stock Tracker Dashboard</h1>

      <form onSubmit={handleAddStock}>
        <input
          type="text"
          placeholder="Stock Symbol (e.g., AAPL)"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        />
        <input
          type="text"
          placeholder="Upper Threshold (e.g., 250)"
          value={newUpperThreshold}
          onChange={(e) => setNewUpperThreshold(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lower Threshold (e.g., 200)"
          value={newLowerThreshold}
          onChange={(e) => setNewLowerThreshold(e.target.value)}
        />
        <button type="submit">Add Stock</button>
      </form>

      <div className="stock-list">
        {stocks.map((stock, index) => (
          <StockTracker
            key={index}
            stockSymbol={stock.symbol}
            upperThreshold={stock.upperThreshold}
            lowerThreshold={stock.lowerThreshold}
          />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
