// src/components/UserGoals/GoalProgressChart.jsx

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GoalProgressChart = ({ caloriesProgress, proteinsProgress, sleepProgress, waterProgress }) => {
  const data = [
    { name: 'Calories', Progress: caloriesProgress },
    { name: 'Proteins', Progress: proteinsProgress },
    { name: 'Sleep', Progress: sleepProgress },
    { name: 'Water', Progress: waterProgress },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Progress" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GoalProgressChart;
