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
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import LoginContext from "../../context";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useContext(LoginContext);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://127.0.0.1:7777/user/register", {
        username: email,
        password: password
      });
      if(response.status==HttpStatusCode.Conflict)
      {
        setError("User already exists");
      }
      else{
        // const response1 = await axios.post("http://127.0.0.1:8080/auth/signup", {
        //   username: email,
        //   password: password
        // });
        console.log("Registration successful:", response.data);
        setUser(response.data);
        setSuccess(true); // Set success to true on successful registration
        navigate('/'); // Redirect to the home page or any default page after registration
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "User Already Exists");
    }

    setEmail('');
    setPassword('');
  };

  const handleLoginRedirect = () => {
    navigate('/login');  // Redirect to the login page
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
            Register
          </Typography>
          {success && <Alert severity="success">Registration successful!</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleRegister} style={{ width: '100%', marginTop: 1 }}>
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
              Register
            </Button>
          </form>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Button
                onClick={handleLoginRedirect}
                color="secondary"
                sx={{ textTransform: 'none',marginBottom:0.5 }}
              >
                Login
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
