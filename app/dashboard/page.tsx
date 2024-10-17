'use client';
import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { PeopleAlt, EventNote, Settings, Assessment } from '@mui/icons-material';
import Link from 'next/link';

const DashboardItem = ({ title, icon, link }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Link href={link} passHref style={{ textDecoration: 'none' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
        {icon}
        <Typography variant="h6" component="h2" mt={2}>
          {title}
        </Typography>
      </Paper>
    </Link>
  </Grid>
);

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <DashboardItem title="Take Attendance" icon={<PeopleAlt fontSize="large" />} link="/attendance" />
        <DashboardItem title="Reports" icon={<Assessment fontSize="large" />} link="/reports" />
        <DashboardItem title="Manage Students" icon={<EventNote fontSize="large" />} link="/manage-students" />
        <DashboardItem title="System Settings" icon={<Settings fontSize="large" />} link="/settings" />
      </Grid>
    </Container>
  );
}