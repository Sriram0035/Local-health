import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
} from '@mui/material';
import {
  LocalHospital,
  MedicalServices,
  Science,
  Emergency,
  AccessTime,
  Security,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
  const services = [
    {
      icon: <LocalHospital />,
      title: 'Consult Doctors',
      description: 'Video consultation with top doctors',
      color: 'var(--primary-main)',
    },
    {
      icon: <MedicalServices />,
      title: 'Medicines',
      description: 'Get medicines delivered to your doorstep',
      color: '#1976D2',
    },
    {
      icon: <Science />,
      title: 'Lab Tests',
      description: 'Book tests and checkups',
      color: '#ED6C02',
    },
    {
      icon: <Emergency />,
      title: 'Emergency Care',
      description: '24/7 emergency services',
      color: '#D32F2F',
    },
  ];

  const features = [
    {
      icon: <AccessTime />,
      title: '24/7 Available',
      description: 'Round the clock healthcare services',
    },
    {
      icon: <Security />,
      title: 'Safe & Secure',
      description: 'Your health data is protected',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg" className="hero-container">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-text"
              >
                <Typography variant="h1" className="hero-title">
                  Your Health, Our Priority
                </Typography>
                <Typography variant="h6" className="hero-subtitle">
                  Comprehensive healthcare solutions at your fingertips. 
                  Consult doctors, order medicines, book lab tests - all in one place.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  className="btn btn-primary btn-lg"
                >
                  Book Appointment
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-image"
              >
                <Box
                  component="img"
                  src="/api/placeholder/600/400"
                  alt="Healthcare"
                  className="w-100 rounded-xl shadow-lg"
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" className="services-section">
        <Typography variant="h2" className="services-title text-center">
          Our Services
        </Typography>
        <Grid container spacing={4} className="services-grid">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="service-card">
                  <CardContent>
                    <Box
                      className="service-icon"
                      style={{ color: service.color }}
                    >
                      {service.icon}
                    </Box>
                    <Typography variant="h6" className="service-title">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" className="service-description">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box className="features-section">
        <Container maxWidth="lg" className="features-container">
          <Grid container spacing={4} className="features-grid">
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper className="feature-card">
                  <Box className="feature-icon">
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" className="feature-title">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" className="feature-description">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;