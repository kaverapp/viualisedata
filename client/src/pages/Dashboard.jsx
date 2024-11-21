import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { LineChartComponent,BarChartComponent } from "../components/helper";

import { fetchAndNormalizeData } from "../utils/dataUtils";
import { useSearchParams, useNavigate } from "react-router-dom";

import "./dash.css";

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [genderFilter, setGenderFilter] = useState("All");
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); 

  useEffect(() => {
    // Initialize filters from query parameters
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const gender = searchParams.get("gender");

    if (startDate && endDate) {
      setDateRange([new Date(startDate), new Date(endDate)]);
    }

    if (gender) {
      setGenderFilter(gender);
    }
  }, [searchParams]);

    // Fetch data from the server

  useEffect(() => {
    const fetchData = async () => {
      try {
        const normalizedData = await fetchAndNormalizeData("http://localhost:3000/data");
        setData(normalizedData);
        if (normalizedData.length > 0) {
          const dates = normalizedData.map((item) => new Date(item.Day));
          setDateRange([new Date(Math.min(...dates)), new Date(Math.max(...dates))]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

    // Update URL query parameters when filters change

  useEffect(() => {
    const params = {};
    if (dateRange[0]) params.startDate = dateRange[0].toISOString().split("T")[0];
    if (dateRange[1]) params.endDate = dateRange[1].toISOString().split("T")[0];
    if (genderFilter !== "All") params.gender = genderFilter;

    setSearchParams(params);
  }, [dateRange, genderFilter]);
    
  // Handle errors and loading states

  if (error) return <div className="error-text">Error: {error}</div>;
  if (!data) return <div className="loading-text">Loading...</div>;
 
  // Apply filters to data

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.Day);
    const dateCondition =
      dateRange[0] && dateRange[1] && itemDate >= dateRange[0] && itemDate <= dateRange[1];
    const genderCondition =
      genderFilter === "All" || item.Gender === genderFilter;

    return dateCondition && genderCondition;
  });


  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied to clipboard!");
  };


  return (
    <div className="dashboard-container">
      <h3>Select Date Range</h3>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Start Date"
          endText="End Date"
          value={dateRange}
          onChange={(newValue) => setDateRange(newValue)}
          renderInput={(startProps, endProps) => (
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <TextField {...startProps} />
              <TextField {...endProps} />
            </Box>
          )}
        />
      </LocalizationProvider>

      <h3>Select Gender</h3>
      <select
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <LineChartComponent data={filteredData} />
      <BarChartComponent data={filteredData} />

      <button onClick={copyToClipboard}>Copy URL to Share</button>

    </div>
  );
};
