// src/pages/Profile.js
import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = () => {
    setError(""); setSuccess("");
    if (!name) return setError("Name cannot be empty");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(u => u.email === email);

    if (!currentUser) return setError("User not found");

    // Update password if provided
    if (currentPassword || newPassword) {
      if (currentUser.password !== currentPassword) return setError("Current password is incorrect");
      if (!newPassword || newPassword.length < 6) return setError("New password must be at least 6 characters");
      currentUser.password = newPassword;
    }

    // Update name
    currentUser.name = name;

    // Save back to localStorage
    const updatedUsers = users.map(u => u.email === email ? currentUser : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update AuthContext
    login({ id: currentUser.id, name: currentUser.name, email: currentUser.email });

    setCurrentPassword("");
    setNewPassword("");
    setSuccess("Profile updated successfully!");
  };

  if (!user) return <Container sx={{ mt: 5 }}><Typography>Please login to view your profile.</Typography></Container>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
        <TextField label="Email" value={email} disabled fullWidth />
        <TextField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          fullWidth
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>Update Profile</Button>
      </Box>
    </Container>
  );
};

export default Profile;
