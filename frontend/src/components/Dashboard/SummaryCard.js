// src/components/Dashboard/SummaryCard.jsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, component }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          {component}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SummaryCard;
