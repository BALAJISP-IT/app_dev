import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { drawLandmarks, drawConnectors } from '@mediapipe/drawing_utils';
import { Camera } from '@mediapipe/camera_utils';
import BicepCurlComponent from './BicepCurl';
import { Box, Typography, Container, Paper, Grid, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import SquatValidation from './Squat';
import speak from './speech';

const PoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mess, setMess] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [crt, setCrt] = useState(null);
  const [count, setCount] = useState(0);
  const [rep, setRep] = useState(0);
  const [pose, setPose] = useState(null);
  const [results, setResults] = useState(null);
  const [value, setValue] = useState(0); // State for the active tab
  const [last,setLast]=useState(null)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRep(0);
  };
  useEffect(() => {
    const poseInstance = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    poseInstance.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    poseInstance.onResults(onResults);
    setPose(poseInstance);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        try {
          await poseInstance.send({ image: videoRef.current });
        } catch (error) {
          console.error('Error sending image to pose model:', error);
        }
      },
      width: 1920, // Increased width
      height: 1080, // Increased height
    });
    camera.start();
  }, []);
  const onResults = useCallback((results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#00FF00', // Original green color for connectors
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: '#FF0000', // Original red color for landmarks
        lineWidth: 2,
      });
      setResults(results);
    } else {
      console.warn('Pose landmarks not detected');
      setCrt(false);
      setFeedback('Pose landmarks not detected.');
      canvasCtx.restore();
      return;
    }
    canvasCtx.restore();
  }, [count, rep, setCount, setRep]);
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        background: '#f0f0f0', // Light gray background
        p: 4,
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        minHeight: '90vh',
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
        <Typography variant="h4" gutterBottom color="textPrimary">{value===0?<span>Bicep</span>:<span>Squat</span>} Curl Feedback</Typography>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{mess}</Typography>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{feedback}</Typography>
        </motion.div>
        <Typography variant="body1" sx={{ fontSize: '1.25rem', mt: 1 }}>Reps: {rep / 2}</Typography>
      </Box>
      <Box sx={{ width: '100%', mb: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="exercise tabs">
          <Tab label="Bicep Curl" />
          <Tab label="Squat" />
        </Tabs>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: '8px' }}>
            <video ref={videoRef} style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {value === 0 ? (
            <BicepCurlComponent
              results={results}
              setFeedback={setFeedback}
              setMess={setMess}
              setCount={setCount}
              setRep={setRep}
            />
          ) : (
            <SquatValidation
              results={results}
              setFeedback={setFeedback}
              setMess={setMess}
              setCount={setCount}
              setRep={setRep}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PoseDetection;
