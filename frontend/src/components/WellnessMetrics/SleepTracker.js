import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import SleepChart from './SleepChart';
import VideoBackground from '../UserGoals/ImageCarousel';
import LoginContext from '../../context';
import axios from 'axios';

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState([]);
  const [hoursOfSleep, setHoursOfSleep] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [date, setDate] = useState('');
const [user,setuser]=useContext(LoginContext);
const [click,setClick]=useState(false);
function sortByDateDesc(array) {
  return array.sort((a, b) => new Date(b.date) - new Date(a.date));
}
useEffect(()=>{
  if(user)
  {
  const fetch=async()=>{
    const res=await axios.post("http://127.0.0.1:7777/sleep/get",user);
    res.data=sortByDateDesc(res.data);
    setSleepData(res.data.slice(0,5));
  }
  fetch();
}
},[user,click])
  const handleAddSleepData = () => {
    if (!hoursOfSleep || !sleepQuality || !date) {
      alert('Please fill in all fields');
      return;
    }
    const getCurrentDate = (date = new Date()) => {
      const d = new Date(date); // Ensure the date is a Date object
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
      const addData=async()=>{
        await axios.post("http://127.0.0.1:7777/goal/addSleep",{
          user:user,
          hoursOfSleep:parseFloat(hoursOfSleep),
          sleepQuality:sleepQuality,
          date:getCurrentDate(date)
        });
      }
      addData();
    setHoursOfSleep('');
    setSleepQuality('');
    setDate('');
    setClick(!click);
  };

  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      {/* Main Content */}
      <VideoBackground src="5248200-hd_1920_1080_30fps"/>
      <Box
        sx={{
          width: '80%', 
          maxWidth: '500px', 
          margin: '100px auto', 
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(0px)', 
          borderRadius: '8px', 
          position: 'relative',
          zIndex: 1,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
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
          Track Your Sleep
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              <Grid item xs={12}>
                <TextField
                  label="Hours of Sleep"
                  type="number"
                  value={hoursOfSleep}
                  onChange={(e) => setHoursOfSleep(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center', // Center text inside the TextField
                  }}
                  inputProps={{ style: { textAlign: 'center' }, min: 0, max: 24, step: 0.1 }} // Center input text
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Sleep Quality"
                  select
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                >
                  <MenuItem value="Poor">Poor</MenuItem>
                  <MenuItem value="Average">Average</MenuItem>
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Excellent">Excellent</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{
                width: '100%',
                marginTop: 3,
                fontFamily: 'Roboto, sans-serif',
                textAlign: 'center',
              }}
              inputProps={{ style: { textAlign: 'center' } }}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
              onClick={handleAddSleepData}
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop: 3 }}
            >
              Add Sleep Data
            </Button>
          </motion.div>
        </Box>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          sx={{ marginTop: 4 }} // Add some space above the chart
        >
          <SleepChart data={sleepData} />
        </motion.div>
      </Box>
    </Box>
  );
};

export default SleepTracker;
