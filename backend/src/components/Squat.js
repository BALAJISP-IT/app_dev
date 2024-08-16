import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const SquatValidation = ({ results, setFeedback, setMess, setCount, setRep }) => {
  const [constraints, setConstraints] = useState({ angle: null, straightBack: null });

  const validateSquat = (results) => {
    const requiredLandmarks = [11, 23, 25, 27];
    for (let i of requiredLandmarks) {
      if (!results.poseLandmarks[i] || results.poseLandmarks[i].visibility < 0.5) {
        setFeedback('Required landmarks are not detected or not visible.');
        return false;
      }
    }

    const hip = results.poseLandmarks[23]; // Left hip
    const knee = results.poseLandmarks[25]; // Left knee
    const ankle = results.poseLandmarks[27]; // Left ankle
    const shoulder = results.poseLandmarks[11]; // Left shoulder

    const calculateAngle = (point1, point2, point3) => {
      const vector1 = { x: point1.x - point2.x, y: point1.y - point2.y };
      const vector2 = { x: point3.x - point2.x, y: point3.y - point2.y };
      const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
      const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
      const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);
      const cosTheta = dotProduct / (magnitude1 * magnitude2);
      const angle = Math.acos(cosTheta) * (180 / Math.PI);
      return angle;
    };

    const kneeAngle = calculateAngle(hip, knee, ankle);
    const backAngle = calculateAngle(shoulder, hip,{x:hip.x,y:ankle.y});
    const standAngle=calculateAngle(shoulder,hip,knee);

    const isAngleCorrect = kneeAngle <=90;
    const isBackStraight = (180 - backAngle) <= 15;
    const isStanding=(180-standAngle<=90)
    console.log(standAngle);
    
  if(!isStanding)
  {
      if (!isAngleCorrect) {
          setFeedback('Your knee angle is too high. Lower your hips more.');
          setConstraints({ ...constraints, angle: false });
          return false;
        } 
        if (!isBackStraight) {
            setFeedback('Don\'t bend your back too much.');
            setConstraints({ ...constraints, straightBack: false });
            return false;
        } 
    }
    else{
    setCount(1);
    setFeedback('Lower your hips to atleast 90 degrees')
    setConstraints({angle:null,straightBack:null})
    return false;
}
  
    setConstraints({ angle:isAngleCorrect, straightBack:isBackStraight });
      setCount((prevCount) => {
        if (prevCount === 1) {
          setRep((prevRep) => prevRep + 1);
          return 0;
        }
        return prevCount;
      });
      setMess('Good');
      setFeedback('Squat is in correct form.');
      return true;
}

  useEffect(() => {
    if (results) {
      validateSquat(results);
    }
  }, [results]);

  const constraintBoxVariants = {
    initial: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const glowingBoxStyle = (status) => ({
    padding: '16px',
    backgroundColor: status === null ? 'grey' : status ? '#d4edda' : '#f8d7da',
    color: status === null ? 'white' : status ? '#155724' : '#721c24',
    width: '45%',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: status === null 
      ? '0 0 10px rgba(255, 255, 255, 0.5)' 
      : status 
        ? '0 0 20px rgba(40, 167, 69, 0.7)' 
        : '0 0 20px rgba(220, 53, 69, 0.7)',
    animation: status === null 
      ? '' 
      : status 
        ? 'none' 
        : 'shake 0.5s ease-in-out',
  });

  return (
    <Box display="flex" justifyContent="space-around" mt={2}>
      <motion.div
        initial="initial"
        animate="visible"
        variants={constraintBoxVariants}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={glowingBoxStyle(constraints.angle)}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Knee Angle</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>{constraints.angle ? 'Correct' : 'Incorrect'}</Typography>
        </Paper>
      </motion.div>
      <motion.div
        initial="initial"
        animate="visible"
        variants={constraintBoxVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper
          elevation={3}
          sx={glowingBoxStyle(constraints.straightBack)}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Straight Back</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>{constraints.straightBack ? 'Yes' : 'No'}</Typography>
        </Paper>
      </motion.div>
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            75% { transform: translateX(-10px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default SquatValidation;
