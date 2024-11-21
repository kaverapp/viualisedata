import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

export const LineChartComponent = ({ data }) => {
  return (
    <>
      <h2>Line Chart</h2>
      <ResponsiveContainer className="responsive-container" width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Brush dataKey="Day" height={30} stroke="#8884d8" />
          <Line type="monotone" dataKey="A" stroke="#8884d8" />
          <Line type="monotone" dataKey="B" stroke="#82ca9d" />
          <Line type="monotone" dataKey="C" stroke="#ff7300" />
          <Line type="monotone" dataKey="D" stroke="#ff0000" />
          <Line type="monotone" dataKey="E" stroke="#00ff00" />
          <Line type="monotone" dataKey="F" stroke="#00f0ff" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
