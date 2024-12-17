import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const organizationData = {
    name: 'Acme Corporation',
    plan: 'Standard Plan',
    status: 'Active',
    renewalDate: '2024-12-31',
    totalUsers: 15,
    activeUsers: 12,
    storageUsed: 12,
    storageLimit: 20,
    lastBillingAmount: 74985,
  };

  const quickStats = [
    {
      title: 'Total Users',
      value: organizationData.totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#00ACC1' }} />,
      change: '+3 this month',
    },
    {
      title: 'Storage Used',
      value: `${organizationData.storageUsed}GB`,
      icon: <StorageIcon sx={{ fontSize: 40, color: '#FF7043' }} />,
      change: '60% utilized',
    },
    {
      title: 'Active Users',
      value: organizationData.activeUsers,
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#43A047' }} />,
      change: '80% active rate',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg,rgb(30, 60, 114) 0%, #2A5298 100%)',
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 800,
              mb: 2,
            }}
          >
            Admin Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            An  Admin Panel for organization
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: '#FFFFFF',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {stat.icon}
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: '#757575',
                    mt: 1,
                    fontStyle: 'italic',
                  }}
                >
                  {stat.change}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Organization Overview */}
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: '#F8F9FA',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Organization Overview
                </Typography>
                <Chip
                  label={organizationData.status}
                  color="success"
                  size="small"
                />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Current Plan
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {organizationData.plan}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" mt={2}>
                    Renewal Date
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {new Date(organizationData.renewalDate).toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Billing Amount
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ₹{organizationData.lastBillingAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" mt={2}>
                    Active Users
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {organizationData.activeUsers} / {organizationData.totalUsers}
                  </Typography>
                </Grid>
              </Grid>

              <Box mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/admin/manage-users')}
                  startIcon={<GroupAddIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Manage Users
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/admin/dashboard')}
                  startIcon={<SettingsIcon />}
                  sx={{
                    ml: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Organization Settings
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Resource Usage */}
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Resource Usage
              </Typography>
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  User Licenses
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(organizationData.activeUsers / organizationData.totalUsers) * 100}
                  sx={{ mb: 2, height: 10, borderRadius: 5, backgroundColor: '#E3F2FD' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {organizationData.activeUsers} of {organizationData.totalUsers} licenses used
                </Typography>
              </Box>

              <Box mt={3}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Storage
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(organizationData.storageUsed / organizationData.storageLimit) * 100}
                  sx={{ mb: 2, height: 10, borderRadius: 5, backgroundColor: '#FFECB3' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {organizationData.storageUsed}GB of {organizationData.storageLimit}GB used
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AdminDashboard;
