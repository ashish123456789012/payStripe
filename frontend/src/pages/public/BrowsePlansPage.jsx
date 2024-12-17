import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Container,
  CircularProgress,
} from '@mui/material';
import {
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function BrowsePlansPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5100/api/plans');
        const fetchedPlans = response.data.map(plan => ({
          _id: plan._id,
          name: plan.name,
          price: `INR ${plan.price}`,
          period: 'Per Year, Per User',
          features: [
            `Limited to ${plan.userLimit} users`,
            plan.description || 'Basic features access',
            `Valid for ${plan.daysValidity} days`,
            'Email support'
          ],
          buttonText: `Choose ${plan.name}`,
          recommended: false,
          totalEnrolled: plan.totalEnrolled || 0,
        }));
        setPlans(fetchedPlans);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch plans');
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelectPlan = (planId) => {
    navigate('/cart', { state: { planId } });
  };

  const dashboardPath = user?.role === 'User' ? '/admin/dashboard'
    : user?.role === 'Admin' ? '/superadmin/dashboard'
    : '/user/dashboard';

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          bgcolor: '#F0F4FF',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          bgcolor: '#FDEDED',
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100vw',
      bgcolor: '#F0F4FF',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar position="fixed" sx={{ bgcolor: '#1E88E5', color: 'white' }} elevation={2}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
            Plans & Pricing
          </Typography>

          <Button
            color="inherit"
            onClick={() => navigate(dashboardPath)}
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            Back to Dashboard
          </Button>

          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#43A047' }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 12, pb: 8 }}>
        <Container maxWidth={false} sx={{ px: { xs: 4, md: 8 } }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: '#1E88E5', mb: 6 }}
          >
            Choose Your Plan
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan) => {
              const isCurrentPlan = plan._id === user.plan;
              return (
                <Grid item xs={12} sm={6} md={4} key={plan.name}>
                  <Card
                    elevation={plan.recommended ? 8 : 2}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                      ...(plan.recommended && {
                        border: 2,
                        borderColor: '#1E88E5',
                      }),
                    }}
                  >
                    {plan.recommended && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: '#1E88E5',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        Recommended
                      </Box>
                    )}
                    {isCurrentPlan && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: '#43A047',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        Current Plan
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: '#1565C0' }}>
                        {plan.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
                        <Typography variant="h3" component="span" sx={{ fontWeight: 700, color: '#1E88E5' }}>
                          {plan.price}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
                          {plan.period}
                        </Typography>
                      </Box>
                      <List>
                        {plan.features.map((feature, index) => (
                          <ListItem key={index} disableGutters sx={{ py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <CheckIcon sx={{ color: '#43A047' }} />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <CardActions sx={{ p: 4, pt: 0 }}>
                      <Button
                        fullWidth
                        variant={plan.recommended ? 'contained' : 'outlined'}
                        size="large"
                        onClick={() => handleSelectPlan(plan._id)}
                        disabled={isCurrentPlan}
                        sx={{
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 600,
                          color: isCurrentPlan ? 'white' : '#1E88E5',
                          bgcolor: isCurrentPlan ? '#43A047' : 'inherit',
                          '&:hover': {
                            bgcolor: isCurrentPlan ? '#43A047' : '#E3F2FD',
                          },
                        }}
                      >
                        {isCurrentPlan ? 'Current Plan' : plan.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default BrowsePlansPage;
