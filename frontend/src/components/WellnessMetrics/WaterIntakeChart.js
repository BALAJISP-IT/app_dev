// src/components/WellnessMetrics/WaterIntakeChart.jsx

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const WaterIntakeChart = ({ data }) => {
  // Extract and transform data for chart
  const chartData = data.map(entry => ({
    date: entry.date,
    amount: entry.amount, // Ensure the correct field is used
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'Milliliters', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="amount" // Use 'amount' for the data key
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WaterIntakeChart;
