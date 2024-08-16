import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Avatar,
  Paper,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import LoginContext from "../../context";
import axios, { HttpStatusCode } from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useContext(LoginContext);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://127.0.0.1:7777/user/login", {
        username: email,
        password: password
      });
    //   try{
    //   const response1 = await axios.post("http://127.0.0.1:8080/auth/login", {
    //     username: email,
    //     password: password
    //   });
    //   console.log(response1.data);
      
    // }
    // catch(err)
    // {
    //   console.log(err);
    // }
      console.log(response.data);
      
      setUser(response.data);
      console.log("Login successful:", response.data);
      setSuccess(true);
      navigate('/');  // Redirect to the home page after successful login
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "User Not Found");
    }

    setEmail('');
    setPassword('');
  };

  const handleSignUpRedirect = () => {
    navigate('/register');  // Redirect to the register page
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 20 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Log in
          </Typography>
          {success && <Alert severity="success">Logged In successfully!</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 1 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '1.5rem', padding: '0.75rem' }}
            >
              Login
            </Button>
          </form>
          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2" align="center">
              New user?{" "}
              <Button
                onClick={handleSignUpRedirect}
                color="secondary"
                sx={{ textTransform: 'none',marginBottom:0.5 }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
