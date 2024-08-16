
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const NutritionChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="calories" fill="#8884d8" />
        <Bar dataKey="proteins" fill="#82ca9d" />
        <Bar dataKey="carbohydrates" fill="#ffc658" />
        <Bar dataKey="fats" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NutritionChart;
