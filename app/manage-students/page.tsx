'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import axios from 'axios';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`/api/students?name=${searchName}&gender=${searchGender}&class=${searchClass}`);
      setStudents(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch students. Please try again.');
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('/api/students', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setError('');
      fetchStudents();
    } catch (err) {
      setError('Failed to upload students. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Students
      </Typography>
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".xlsx,.xls"
        />
        <Button variant="contained" color="primary" type="submit">
          Upload Students
        </Button>
      </form>
      <TextField
        label="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        margin="normal"
      />
      <TextField
        select
        label="Gender"
        value={searchGender}
        onChange={(e) => setSearchGender(e.target.value)}
        margin="normal"
      >
        <option value="">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </TextField>
      <TextField
        select
        label="Class"
        value={searchClass}
        onChange={(e) => setSearchClass(e.target.value)}
        margin="normal"
      >
        <option value="">All</option>
        <option value="Class A">Class A</option>
        <option value="Class B">Class B</option>
      </TextField>
      <Button variant="contained" color="primary" onClick={fetchStudents}>
        Search
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>RFID</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student: any) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rfid}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}