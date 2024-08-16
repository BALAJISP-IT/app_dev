// src/components/Dashboard/Dashboard.jsx

import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SummaryCard from './SummaryCard';
import ActivityLog from '../ActivityLog/ActivityLog';
import FoodEntryForm from '../NutritionLog/FoodEntryForm';
import SleepTracker from '../WellnessMetrics/SleepTracker';
import WaterIntakeTracker from '../WellnessMetrics/WaterIntakeTracker';

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
    <Container maxWidth="lg" sx={{ padding: 4 ,marginTop:5}}>
      <Typography variant="h3" align="center" gutterBottom>
        Health and Wellness Dashboard
      </Typography>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <SummaryCard title="Activities" component={<ActivityLog />} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <SummaryCard title="Nutrition" component={<FoodEntryForm />} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <SummaryCard title="Sleep Tracker" component={<SleepTracker />} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <SummaryCard title="Water Intake" component={<WaterIntakeTracker />} />
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
    </div>
  );
};

export default Dashboard;
