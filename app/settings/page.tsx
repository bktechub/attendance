'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';

export default function Settings() {
  const [settings, setSettings] = useState({
    systemName: '',
    footer: '',
    emailReportRecipients: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setSettings(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch settings. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/api/settings', settings);
      setMessage('Settings updated successfully');
      setError('');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        System Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="System Name"
          value={settings.systemName}
          onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Footer"
          value={settings.footer}
          onChange={(e) => setSettings({ ...settings, footer: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email Report Recipients (comma-separated)"
          value={settings.emailReportRecipients}
          onChange={(e) => setSettings({ ...settings, emailReportRecipients: e.target.value })}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Save Settings
        </Button>
      </form>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
}