import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import WaterIntakeChart from './WaterIntakeChart';
import VideoBackground from '../UserGoals/ImageCarousel';
import LoginContext from '../../context';
import axios from 'axios';

const WaterIntakeTracker = () => {
  const [waterData, setWaterData] = useState([]);
  const [waterAmount, setWaterAmount] = useState('');
  const [date, setDate] = useState('');
  const [user,setUser]=useContext(LoginContext);
  const [click,setClick]=useState(false);
  function sortByDateDesc(array) {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  useEffect(()=>{
    if(user)
    {
    const fetch=async()=>{
      const res=await axios.post("http://127.0.0.1:7777/water/get",user)
      res.data=sortByDateDesc(res.data);
      console.log(res.data);
      setWaterData(res.data.slice(0,5));
    }
    fetch();
  }
  },[user,click])
  const getCurrentDate = (date = new Date()) => {
    const d = new Date(date); // Ensure the date is a Date object
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleAddWaterData = () => {
    if (!waterAmount || !date) {
      alert('Please fill in all fields');
      return;
    }
    if(user)
    {
    const addData=async()=>{
      const res=await axios.post("http://127.0.0.1:7777/goal/addWater",{
        user:user,
        amount:parseFloat(waterAmount),
        date:getCurrentDate(date)
      })
    }
    addData()
  }
  
    setClick(!click);
    setWaterAmount('');
    setDate('');
  };

  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
    <VideoBackground src="4069110-uhd_3840_2160_30fps"/>
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
          Track Your Water Intake
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
                  label="Water Amount (ml)"
                  type="number"
                  value={waterAmount}
                  onChange={(e) => setWaterAmount(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center', // Center text inside the TextField
                  }}
                  inputProps={{ style: { textAlign: 'center' }, min: 0 }} // Center input text
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
              onClick={handleAddWaterData}
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop: 3 }}
            >
              Add Water Intake
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
         <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        maxWidth: 400,
        mx: 'auto', // centers the component horizontally
      }}
    >
          <List sx={{ textAlign: 'left', marginTop: 2 }}>
            {waterData.map((entry, index) => (
              <ListItem key={index}  sx={{
              bgcolor: index % 2 === 0 ? 'grey.100' : 'background.default',
              mb: 1,
              borderRadius: 1,
            }}>
                <ListItemText
                  primary={`Date: ${entry.date}`}
                  secondary={`Water Intake: ${entry.amount} ml`}
                  primaryTypographyProps={{
                fontWeight: 'bold',
                color: 'text.primary',
              }}
              secondaryTypographyProps={{
                color: 'text.secondary',
              }}
                />
              </ListItem>
            ))}
          </List>
</Box>
          <WaterIntakeChart data={waterData} />
        </motion.div>
      </Box>
    </Box>
  );
};

export default WaterIntakeTracker;
