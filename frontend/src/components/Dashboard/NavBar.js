import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar style={{backgroundColor:'white',color:'grey'}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Health and Wellness Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/activity-log">
          Activity Log
        </Button>
        <Button color="inherit" component={Link} to="/nutrition-log">
          Nutrition Log
        </Button>
        <Button color="inherit" component={Link} to="/sleep-tracker">
          Sleep Tracker
        </Button>
        <Button color="inherit" component={Link} to="/water-intake-tracker">
          Water Intake Tracker
        </Button>
        <Button color="inherit" component={Link} to="/exercise-validation">
         Exercise Validation
        </Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;