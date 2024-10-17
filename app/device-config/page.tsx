'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

export default function DeviceConfig() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: '',
    ipAddress: '',
    port: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get('/api/devices');
      setDevices(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch devices. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/devices', newDevice);
      setMessage('Device added successfully');
      setError('');
      fetchDevices();
      setNewDevice({ name: '', type: '', ipAddress: '', port: '' });
    } catch (err) {
      setError('Failed to add device. Please try again.');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Biometric Device Configuration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Device Name"
          value={newDevice.name}
          onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Device Type</InputLabel>
          <Select
            value={newDevice.type}
            onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
            required
          >
            <MenuItem value="ZKTeco">ZKTeco</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="IP Address"
          value={newDevice.ipAddress}
          onChange={(e) => setNewDevice({ ...newDevice, ipAddress: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Port"
          value={newDevice.port}
          onChange={(e) => setNewDevice({ ...newDevice, port: e.target.value })}
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Add Device
        </Button>
      </form>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h5" component="h2" gutterBottom>
        Configured Devices
      </Typography>
      {devices.map((device: any) => (
        <div key={device.id}>
          <Typography>
            {device.name} - {device.type} - {device.ipAddress}:{device.port}
          </Typography>
        </div>
      ))}
    </Container>
  );
}