import React, { useState } from 'react';
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
  MonitorHeart,
  Notifications,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

// Import modal components
import SymptomChecker from '../components/ai/SymptomChecker';
import MedicineReminder from '../components/reminders/MedicineReminder';
import HealthTracker from '../components/health/HealthTracker';

const Home = () => {
  const navigate = useNavigate();
  const { openBookingModal } = useBooking();
  const { user, setIsLoginModalOpen } = useAuth();
  const { setIsCartOpen } = useCart();

  // State for modals
  const [symptomCheckerOpen, setSymptomCheckerOpen] = useState(false);
  const [medicineReminderOpen, setMedicineReminderOpen] = useState(false);
  const [healthTrackerOpen, setHealthTrackerOpen] = useState(false);

  const services = [
    {
      icon: <LocalHospital />,
      title: 'Consult Doctors',
      description: 'Video consultation with top doctors',
      color: 'var(--primary-main)',
      action: () => navigate('/doctors'),
    },
    {
      icon: <MedicalServices />,
      title: 'Medicines',
      description: 'Get medicines delivered to your doorstep',
      color: '#1976D2',
      action: () => navigate('/pharmacy'),
    },
    {
      icon: <Science />,
      title: 'Lab Tests',
      description: 'Book tests and checkups',
      color: '#ED6C02',
      action: () => navigate('/lab-tests'),
    },
    {
      icon: <Emergency />,
      title: 'Emergency Care',
      description: '24/7 emergency services',
      color: '#D32F2F',
      action: () => handleEmergencyCare(),
    },
    {
      icon: <MonitorHeart />,
      title: 'Symptom Checker',
      description: 'AI-powered preliminary health assessment',
      color: '#9C27B0',
      action: () => setSymptomCheckerOpen(true),
    },
    {
      icon: <Notifications />,
      title: 'Medicine Reminder',
      description: 'Never miss your medication schedule',
      color: '#FF9800',
      action: () => setMedicineReminderOpen(true),
    },
    {
      icon: <TrendingUp />,
      title: 'Health Tracker',
      description: 'Monitor your vital signs and progress',
      color: '#2196F3',
      action: () => setHealthTrackerOpen(true),
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

  const handleBookAppointment = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    // Navigate to doctors page for booking
    navigate('/doctors');
  };

  const handleEmergencyCare = () => {
    // Mock emergency doctor for quick booking
    const emergencyDoctor = {
      id: 999,
      name: 'Emergency Physician',
      specialty: 'Emergency Medicine',
      experience: '10+ years',
      rating: 4.9,
      reviews: 2500,
      fee: '₹800',
      image: '/api/placeholder/200/200',
      available: true,
      location: 'Emergency Department',
    };

    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    openBookingModal(emergencyDoctor);
  };

  const handleServiceClick = (service) => {
    service.action();
  };

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
                  onClick={handleBookAppointment}
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
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="service-card"
                  onClick={() => handleServiceClick(service)}
                  sx={{ cursor: 'pointer' }}
                >
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

      {/* Modals */}
      <SymptomChecker 
        open={symptomCheckerOpen} 
        onClose={() => setSymptomCheckerOpen(false)} 
      />
      <MedicineReminder 
        open={medicineReminderOpen} 
        onClose={() => setMedicineReminderOpen(false)} 
      />
      <HealthTracker 
        open={healthTrackerOpen} 
        onClose={() => setHealthTrackerOpen(false)} 
      />
    </Box>
  );
};

export default Home;