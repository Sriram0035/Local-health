import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, Science, Schedule, VerifiedUser } from '@mui/icons-material';

const LabTests = () => {
  const tests = [
    {
      name: 'Complete Blood Count (CBC)',
      description: 'Measures different components of your blood',
      price: '₹499',
      originalPrice: '₹799',
      duration: '24 hours',
      image: '/api/placeholder/150/150',
    },
    {
      name: 'Thyroid Profile',
      description: 'Comprehensive thyroid function test',
      price: '₹899',
      originalPrice: '₹1200',
      duration: '24 hours',
      image: '/api/placeholder/150/150',
    },
    {
      name: 'Diabetes Screening',
      description: 'Blood sugar level analysis',
      price: '₹399',
      originalPrice: '₹600',
      duration: '6 hours',
      image: '/api/placeholder/150/150',
    },
  ];

  const features = [
    {
      icon: <Schedule sx={{ fontSize: 30 }} />,
      title: 'Same Day Reports',
      description: 'Get reports within 24 hours',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 30 }} />,
      title: 'Accurate Results',
      description: 'Certified labs and technicians',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Lab Tests
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Book diagnostic tests from certified labs
        </Typography>
        
        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search lab tests, packages..."
          sx={{ maxWidth: 600, mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Features */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Tests Grid */}
      <Grid container spacing={4}>
        {tests.map((test, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Science sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {test.name}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {test.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Schedule sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Report in: {test.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                  <Box>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                      {test.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      {test.originalPrice}
                    </Typography>
                  </Box>
                  <Button variant="contained" color="primary">
                    Book Test
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LabTests;