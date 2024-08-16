// src/components/VideoBackground.jsx
import React from 'react';
import { Box } from '@mui/material';

const VideoBackground = ({src}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1, // Ensure video is behind the content
        '& video': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }
      }}
    >
      <video autoPlay muted loop>
        <source
          src={"/"+src+".mp4"} // Replace with your video URL
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoBackground;
