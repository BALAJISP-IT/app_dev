// src/components/ActivityLog/ActivityChartRecharts.jsx

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ActivityChartRecharts = ({ data }) => {
  const transformedData = data.map((entry) => ({
    date: entry.date,
    caloriesBurned: entry.caloriesBurned,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={transformedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="caloriesBurned"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          dot={{ r: 5 }}
          animationDuration={2000} 
          animationEasing="ease-in-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActivityChartRecharts;
