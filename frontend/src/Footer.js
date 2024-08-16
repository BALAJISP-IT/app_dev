// src/components/Footer/Footer.jsx

import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{
        width: '100%',
        padding: 2,
        backgroundColor: '#282c34',
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Your Company Name
      </Typography>
      <Typography variant="body2">
        <Link href="#" color="inherit" underline="none">Privacy Policy</Link> | 
        <Link href="#" color="inherit" underline="none"> Terms of Service</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
