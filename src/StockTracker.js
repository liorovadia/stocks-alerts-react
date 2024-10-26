import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const StockTracker = ({ stockSymbol, upperThreshold, lowerThreshold }) => {
  const [price, setPrice] = useState(null);
  const lastPrice = useRef(null); // Track last price to detect threshold crossings

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get(`https://render-stocks-alerts-flask.onrender.com/stock?symbol=${stockSymbol}`);
        console.log("API Response:", response.data);

        if (response.data && response.data.price) {
          const fetchedPrice = response.data.price;
          setPrice(fetchedPrice);

          // Only notify when crossing above or below thresholds
          if (lastPrice.current !== null) {
            if (fetchedPrice >= upperThreshold && lastPrice.current < upperThreshold) {
              toast.success(`${stockSymbol} has crossed above your upper threshold of $${upperThreshold.toFixed(2)}!`, { autoClose: false });
            } else if (fetchedPrice <= lowerThreshold && lastPrice.current > lowerThreshold) {
              toast.warn(`${stockSymbol} has crossed below your lower threshold of $${lowerThreshold.toFixed(2)}!`, { autoClose: false });
            }
          }
          lastPrice.current = fetchedPrice; // Update last price
        } else {
          console.error("Price data is missing in response:", response.data);
          setPrice(null);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        toast.error("Failed to fetch stock price.", { autoClose: false });
        setPrice(null);
      }
    };

    fetchStockPrice();
    const interval = setInterval(fetchStockPrice, 24 * 60 * 60 * 1000); // Fetch every day
    return () => clearInterval(interval);
  }, [stockSymbol, upperThreshold, lowerThreshold]);

  return (
    <div className="stock-item">
      <h3>{stockSymbol}</h3>
      <p>Current Price: {price !== null ? `$${price.toFixed(2)}` : "Loading..."}</p>
      <p>Upper Threshold: ${upperThreshold.toFixed(2)}</p>
      <p>Lower Threshold: ${lowerThreshold.toFixed(2)}</p>
    </div>
  );
};

export default StockTracker;
