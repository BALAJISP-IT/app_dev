// src/components/ScrollingImages.jsx

import React from 'react';
import { Box } from '@mui/material';
import './ScrollingImages.css'; // Import the CSS file

const ScrollingImages = () => {
  return (
    <Box 
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '200px', // Adjust height as needed
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          width: '300%', // Adjust based on the number of images
          height: '100%',
          animation: 'scrollImages 30s linear infinite', // Adjust timing as needed
        }}
      >
        <Box 
          component="img"
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDk2NzN8MHwxfGFsbHwxfHx8fHx8fHx8MTY5NDY4MjI2MA&ixlib=rb-1.2.1&q=80&w=1080"
          alt="Image 1"
          sx={{
            width: '33.33%', // Adjust based on the number of images
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box 
          component="img"
          src="https://images.unsplash.com/photo-1516748686214-9a4a8b7b4a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDk2NzN8MHwxfGFsbHwxfHx8fHx8fHx8MTY5NDY4MjI2MA&ixlib=rb-1.2.1&q=80&w=1080"
          alt="Image 2"
          sx={{
            width: '33.33%', // Adjust based on the number of images
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box 
          component="img"
          src="https://images.unsplash.com/photo-1533680614692-4e945b11d2a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDk2NzN8MHwxfGFsbHwxfHx8fHx8fHx8MTY5NDY4MjI2MA&ixlib=rb-1.2.1&q=80&w=1080"
          alt="Image 3"
          sx={{
            width: '33.33%', // Adjust based on the number of images
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default ScrollingImages;
