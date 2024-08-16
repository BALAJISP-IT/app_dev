import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import speak from './speech';

const BicepCurlValidation = ({ results, setFeedback, setMess, setCount, setRep}) => {
  const [constraints, setConstraints] = useState({ elbowStable: null, straightBack: null });
  const [lastSpokenFeedback, setLastSpokenFeedback] = useState('');
  const validateBicepCurl = (results) => {
    const requiredLandmarks = [11, 13, 15,23,25]; // Left shoulder, left elbow, left wrist

    for (let i of requiredLandmarks) {
      if (!results.poseLandmarks[i] || results.poseLandmarks[i].visibility < 0.5) {
        const message="Required landmarks are not detected";

        // if (message !== lastSpokenFeedback) {
        //   speak(message);
        //   setLastSpokenFeedback(message);
        // }
        setFeedback(message);
        return false;
      }
    }
    const hip = results.poseLandmarks[23]; // Left hip
    const knee = results.poseLandmarks[25]; // Left knee
    const shoulder = results.poseLandmarks[11]; // Left shoulder
    const elbow = results.poseLandmarks[13]; // Left elbow
    const wrist = results.poseLandmarks[15]; // Left wrist
    
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

    const elbowAngle = calculateAngle(shoulder, elbow, wrist);
    const backAngle = calculateAngle(shoulder, hip, knee);

    const isElbowStable = (currentElbow) => {
      return currentElbow.x > hip.x;
    };

    const elbowMovementStable = isElbowStable(elbow);
    const straightBack = (180 - backAngle) <= 6;

    if (!elbowMovementStable) {
      const message="Elbow is moving too much";

      setFeedback(message);
      setConstraints({ ...constraints, elbowStable: false });
      if (message !== lastSpokenFeedback&&straightBack) {
        speak(message);
        setLastSpokenFeedback(message);
      }
      //return false;
    }

    if (!straightBack) {
      const message="Keep a straight back";

      setFeedback(message);
      setConstraints({ ...constraints, straightBack: false });
      if (message !== lastSpokenFeedback&&elbowMovementStable) {
        speak(message);
        setLastSpokenFeedback(message);
      }
     // return false;
    }
    // if(!straightBack&&!elbowMovementStable)
    // {
    //   if(lastSpokenFeedback!="keep you elbow stable and back straight")
    //   {
    //     if(lastSpokenFeedback==="Elbow is moving too much")
    //     {

    //       speak("Keep your back straight")
    //       setLastSpokenFeedback(" Keep you back straight")
    //     }
    //     else{
    //       speak("your elbow is not stable ")
    //       setLastSpokenFeedback("your elbow is not stable ")

    //     }
    //   }
    // }

    setConstraints({ elbowStable: elbowMovementStable, straightBack: straightBack });

    if (elbowAngle <= 90&&straightBack&&elbowMovementStable) {
      speechSynthesis.cancel()
      const message="Bicep curl is performed correctly";
      setMess('curl down');
      setCount(1);
      setFeedback(message);
      if(lastSpokenFeedback!="Form is correct")
      {
        speak("Form is correct");
        setLastSpokenFeedback('Form is correct')
      }
      return true;
    }
    
    if (elbowAngle >= 150&&straightBack&&elbowMovementStable) {
      speechSynthesis.cancel()
      setCount((prevCount) => {
        if (prevCount === 1) {
          setRep((prevRep) => prevRep + 1);
          return 0;
        }
        return prevCount;
      });
      setMess('curl up');
      setFeedback('Bicep curl is performed correctly.');
      setLastSpokenFeedback('')
      if(lastSpokenFeedback!="Form is correct")
      {
        speak("Form is correct");
        setLastSpokenFeedback('Form is correct')
      }
      return true;
    }
    
    return false;
  };

  useEffect(() => {
    if (results) {
      validateBicepCurl(results);
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
          sx={glowingBoxStyle(constraints.elbowStable)}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Elbow Stability</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>{constraints.elbowStable ? 'Stable' : 'Unstable'}</Typography>
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

export default BicepCurlValidation;
