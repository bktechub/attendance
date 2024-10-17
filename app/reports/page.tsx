'use client';
import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import axios from 'axios';

export default function Reports() {
  const [date, setDate] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/attendance?date=${date}&class=${classFilter}`);
      setAttendanceData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch attendance data. Please try again.');
      setAttendanceData([]);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Attendance Reports
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          select
          label="Class"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          margin="normal"
        >
          <option value="">All Classes</option>
          <option value="Class A">Class A</option>
          <option value="Class B">Class B</option>
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          Generate Report
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      {attendanceData.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((student: any, index) => (
                <TableRow key={index}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{new Date(student.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}