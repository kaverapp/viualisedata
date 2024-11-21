import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

export const BarChartComponent = ({ data }) => {
  return (
    <>
      <h2>Bar Chart</h2>
      <ResponsiveContainer className="responsive-container" width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Brush dataKey="Day" height={30} stroke="#8884d8" />
          <Bar dataKey="A" fill="#8884d8" />
          <Bar dataKey="B" fill="#82ca9d" />
          <Bar dataKey="C" fill="#ff7300" />
          <Bar dataKey="D" fill="#ff0000" />
          <Bar dataKey="E" fill="#00ff00" />
          <Bar dataKey="F" fill="#00f0ff" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
