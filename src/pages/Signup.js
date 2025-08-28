// src/pages/Signup.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!displayName) {
      setError("Please enter a valid name");
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    if (!validateForm()) return;
    setError("");

    // Load existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email exists
    if (users.find((u) => u.email === email)) {
      setError("Email already registered, please login");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: displayName,
      email,
      password, // ⚠️ plain password only for demo
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login
    login({ id: newUser.id, name: newUser.name, email: newUser.email });

    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up for E-Shop
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Sign Up
        </Button>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
