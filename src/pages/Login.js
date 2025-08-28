import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [forgotEmail, setForgotEmail] = useState(""); // for forgot password
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email);

    if (!user) return setError("Email not registered.");
    if (user.password !== password) return setError("Incorrect password.");

    login({ id: user.id, name: user.name, email: user.email });
    setSuccess("Login successful! Redirecting...");
    setTimeout(() => navigate("/"), 1000);
  };

  const handleForgotPassword = () => {
    setError(""); setSuccess("");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === forgotEmail);

    if (!user) return setError("Email not registered.");

    const newPassword = prompt("Enter your new password (min 6 chars):");
    if (!newPassword || newPassword.length < 6) return setError("Invalid password.");

    // Update password in localStorage
    const updatedUsers = users.map(u =>
      u.email === forgotEmail ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setSuccess("Password updated successfully! You can now login.");
    setShowForgot(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login to E-Shop</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {!showForgot ? (
        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required />
          <Button type="submit" variant="contained" color="primary">Login</Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
            <Link to="#" onClick={() => setShowForgot(true)}>Forgot Password?</Link>
          </Typography>

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Enter your registered email"
            type="email"
            value={forgotEmail}
            onChange={e => setForgotEmail(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleForgotPassword}>Reset Password</Button>
          <Button variant="text" onClick={() => setShowForgot(false)}>Back to Login</Button>
        </Box>
      )}
    </Container>
  );
};

export default Login;
