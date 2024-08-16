import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import GoalProgressChart from './GoalProgressChart';
import { motion } from 'framer-motion';
import VideoBackground from './ImageCarousel'; // Correct import
import LoginContext from '../../context';
import axios from 'axios';

const UserGoals = ({ activities, nutrition, sleep, waterIntake }) => {
 const [user,setUser]=useContext(LoginContext);
 const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [proteinsGoal, setProteinsGoal] = useState(0);
  const [sleepGoal, setSleepGoal] = useState(0);
  const [waterGoal, setWaterGoal] = useState(0); // in ml
  const [caloriesEntry,setCaloriesEntry]=useState(0);
  const [proteinEntry,setproteinEntry]=useState(0);
  const [waterEntry,setwaterEntry]=useState(0);
  const [sleepEntry,setsleepEntry]=useState(0);
  const [click,setClick]=useState(false);
useEffect(()=>{
  if(user)
  {
  try {
    const fetch=async()=>
    {
    const res1=await axios.post('http://127.0.0.1:7777/goal/get?date='+getCurrentDate(),user);//goal
    console.log(res1.status);
    const res2=await axios.post('http://127.0.0.1:7777/goal/?date='+getCurrentDate(),user)//goalEntries
    console.log(res2);
    if(res1.data!=null)
    {
      setCaloriesGoal(res1.data.caloriesGoal||0);
      setProteinsGoal(res1.data.proteinsGoal||0)
      setWaterGoal(res1.data.waterGoal||0);
      setSleepGoal(res1.data.sleepGoal||0);
    }
      setCaloriesEntry(res2.data.calories);
      setproteinEntry(res2.data.protein);
      setsleepEntry(res2.data.sleep);
      setwaterEntry(res2.data.water);
  }
  fetch()
} catch (error) {
    console.log(error);
  }

}
},[user,click])
  const [caloriesInput, setCaloriesInput] = useState('');
  const [proteinsInput, setProteinsInput] = useState('');
  const [sleepInput, setSleepInput] = useState('');
  const [waterInput, setWaterInput] = useState('');

  const caloriesProgress = caloriesGoal ? (caloriesEntry / caloriesGoal) * 100 : 0;
  const proteinsProgress = proteinsGoal ? (proteinEntry / proteinsGoal) * 100 : 0;
  const sleepProgress = sleepGoal ? (sleepEntry / sleepGoal) * 100 : 0;
  const waterProgress = waterGoal ? (waterEntry / waterGoal) * 100 : 0;

  const handleSetGoals = () => {
    if (caloriesInput) setCaloriesGoal(parseInt(caloriesInput, 10));
    if (proteinsInput) setProteinsGoal(parseInt(proteinsInput, 10));
    if (sleepInput) setSleepGoal(parseInt(sleepInput, 10));
    if (waterInput) setWaterGoal(parseInt(waterInput, 10));
    console.log(caloriesInput+"\n");
     try{
      const res=axios.post("http://127.0.0.1:7777/goal/add",{
      user:user,
      caloriesGoal:caloriesInput,
      proteinsGoal:proteinsInput,
      waterGoal:waterInput,
      sleepGoal:sleepInput,
      date:getCurrentDate()
     })

 }
     catch(error)
     {
      console.log(error);
     }
     setClick(!click);
    setCaloriesInput('');
    setProteinsInput('');
    setSleepInput('');
    setWaterInput('');
  };
  const completedMessageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300 } },
    shake: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.6 } }
  };
  return (

    <Box sx={{ position: 'relative',marginTop:'140px',zIndex: 1 }}>
      <VideoBackground src="3125907-uhd_3840_2160_25fps"/>

      <Box
        sx={{
          width: '80%', 
          maxWidth: '700px', 
          margin: '100px auto', 
          padding: '25px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(0px)', 
          borderRadius: '20px', 
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
            marginBottom: 4,
          }}
        >
          Set Your Goals
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
                  label="Calories Goal"
                  type="number"
                  value={caloriesInput}
                  onChange={(e) => setCaloriesInput(e.target.value)}
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
                  label="Proteins Goal (g)"
                  type="number"
                  value={proteinsInput}
                  onChange={(e) => setProteinsInput(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Sleep Goal (hrs)"
                  type="number"
                  value={sleepInput}
                  onChange={(e) => setSleepInput(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Water Intake Goal (ml)"
                  type="number"
                  value={waterInput}
                  onChange={(e) => setWaterInput(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
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
              onClick={handleSetGoals}
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop: 3 }}
            >
              Set Goals
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
          <GoalProgressChart
            caloriesProgress={caloriesProgress}
            proteinsProgress={proteinsProgress}
            sleepProgress={sleepProgress}
            waterProgress={waterProgress}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default UserGoals;
