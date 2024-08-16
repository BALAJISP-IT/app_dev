import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import ActivityList from './ActivityList';
import ActivityChart from './ActivityChart';
import VideoBackground from '../UserGoals/ImageCarousel';
import LoginContext from '../../context';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
export default function ActivityEntryForm() {
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [activityDate, setActivityDate] = useState('');
const [user,setUser]=useContext(LoginContext);
const [click,setClick]=useState(false);
function sortByDateDesc(array) {
  return array.sort((a, b) => new Date(b.date) - new Date(a.date));
}
useEffect(() => {
  if (!user) {
    return;
  }

  const fetchActivities = async () => {
    if(!user)
    {
      console.log("user not logged yet");
    }
    try {
      const response = await axios.post(`http://127.0.0.1:7777/users/activities`, user);
      response.data=sortByDateDesc(response.data);
      setActivities(response.data.slice(0,5));
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  fetchActivities();
}, [user,click]);

const getCurrentDate = (date = new Date()) => {
  const d = new Date(date); // Ensure the date is a Date object
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
  const handleAddActivity = () => {
    try {
      const res=axios.post("http://127.0.0.1:7777/goal/addCalories",{
        activityName:activityName,
        caloriesBurned:caloriesBurned,
        date:getCurrentDate(activityDate),
        user:user
      })
       
    } catch (error) {
      console.log(error);
    }
    console.log(user);
    setActivityName('');
    setCaloriesBurned('');
    setActivityDate('');
    setClick(!click);
  };
   
  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      {/* Main Content */}
      <VideoBackground src="3125907-uhd_3840_2160_25fps"/>
      <Box
        sx={{
          width: '80%', // Adjust this value as needed for box size
          maxWidth: '500px', // Maximum width for the box
          margin: '100px auto', // Center the box horizontally and vertically
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background color
          backdropFilter: 'blur(10px)', // Optional: Adds a blur effect to the background
          borderRadius: '8px', // Rounded corners
          position: 'relative',
          zIndex: 1,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Optional: Box shadow for depth
          textAlign: 'center', // Center align the text within the box
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#333',
            fontFamily: 'Roboto, sans-serif',
            marginBottom: 4, // Add some space below the title
          }}
        >
          Log Your Activity
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              <Grid item xs={6}>
                <TextField
                  label="Activity Name"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center', // Center text inside the TextField
                  }}
                  inputProps={{ style: { textAlign: 'center' } }} // Center input text
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Calories Burned"
                  type="number"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date"
                  type="date"
                  value={activityDate}
                  onChange={(e) => setActivityDate(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddActivity}
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop: 3 }}
            >
              Add Activity
            </Button>
          </motion.div>
        </Box>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          sx={{ marginTop: 4 }} // Add some space above the list and chart
        >
          <ActivityList activities={activities} />
          <ActivityChart data={activities} />
        </motion.div>
      </Box>
    </Box>
  );
}
