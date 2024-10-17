'use client';
import React, { useState } from 'react';
import { TextField, Button, Alert, Container, Typography } from '@mui/material';
import axios from 'axios';

export default function TakeAttendance() {
  const [rfid, setRfid] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/attendance', { rfid });
      setMessage(response.data.message);
      setError('');
      setRfid('');
    } catch (err) {
      setError('Failed to record attendance. Please try again.');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Take Attendance
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="RFID"
          value={rfid}
          onChange={(e) => setRfid(e.target.value)}
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Record Attendance
        </Button>
      </form>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
}