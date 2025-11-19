import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Rating,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Search, Work, LocationOn } from '@mui/icons-material';
import { useLocation } from '../contexts/LocationContext';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';

const Doctors = () => {
  const { selectedLocation } = useLocation();
  const { openBookingModal } = useBooking();
  const { user, setIsLoginModalOpen } = useAuth();
  const { startChat } = useChat();

  const doctors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '15 years',
      rating: 4.8,
      reviews: 1247,
      fee: '₹500',
      image: '/api/placeholder/200/200',
      available: true,
      location: 'New Delhi',
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Neurologist',
      experience: '12 years',
      rating: 4.9,
      reviews: 893,
      fee: '₹600',
      image: '/api/placeholder/200/200',
      available: true,
      location: 'Mumbai',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      specialty: 'Pediatrician',
      experience: '10 years',
      rating: 4.7,
      reviews: 1562,
      fee: '₹400',
      image: '/api/placeholder/200/200',
      available: false,
      location: 'Bangalore',
    },
    {
      id: 4,
      name: 'Rajesh Kumar',
      specialty: 'Dermatologist',
      experience: '8 years',
      rating: 4.6,
      reviews: 945,
      fee: '₹550',
      image: '/api/placeholder/200/200',
      available: true,
      location: 'New Delhi',
    },
    {
      id: 5,
      name: 'Anjali Mehta',
      specialty: 'Gynecologist',
      experience: '14 years',
      rating: 4.9,
      reviews: 1123,
      fee: '₹650',
      image: '/api/placeholder/200/200',
      available: true,
      location: 'Mumbai',
    },
    {
      id: 6,
      name: 'Amit Patel',
      specialty: 'Orthopedic',
      experience: '11 years',
      rating: 4.7,
      reviews: 876,
      fee: '₹600',
      image: '/api/placeholder/200/200',
      available: true,
      location: 'Bangalore',
    },
  ];

  const handleBookAppointment = (doctor) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    openBookingModal(doctor);
  };

  const handleStartChat = (doctor) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    startChat(doctor);
  };

  // Filter doctors based on selected location
  const filteredDoctors = selectedLocation 
    ? doctors.filter(doctor => doctor.location === selectedLocation.name)
    : doctors;

  return (
    <Container maxWidth="lg" className="doctors-container">
      {/* Header */}
      <Box className="doctors-header">
        <Typography variant="h1" className="doctors-title">
          Find Your Doctor
        </Typography>
        
        {/* Location Info */}
        {selectedLocation && (
          <Box className="doctors-location-info">
            <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" color="primary.main">
              Showing doctors in {selectedLocation.name}, {selectedLocation.state}
            </Typography>
          </Box>
        )}
        
        <Typography variant="h6" className="doctors-subtitle">
          Book appointments with top-rated healthcare professionals
        </Typography>
        
        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search doctors, specialties, symptoms..."
          className="doctors-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Location Filter Chip */}
      {selectedLocation && (
        <Box className="doctors-location-chip">
          <Chip
            icon={<LocationOn />}
            label={`Location: ${selectedLocation.name}`}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}

      {/* Doctors Grid */}
      <Grid container spacing={4} className="doctors-grid">
        {filteredDoctors.map((doctor) => (
          <Grid item xs={12} md={6} lg={4} key={doctor.id}>
            <Card className="doctor-card">
              <CardContent className="doctor-card-content">
                <Box className="doctor-info">
                  <Box
                    component="img"
                    src={doctor.image}
                    alt={doctor.name}
                    className="doctor-image"
                  />
                  <Box className="doctor-details">
                    <Typography variant="h6" className="doctor-name">
                      Dr. {doctor.name}
                    </Typography>
                    <Typography variant="body2" className="doctor-specialty">
                      {doctor.specialty}
                    </Typography>
                    
                    <Box className="doctor-meta">
                      <LocationOn sx={{ fontSize: 14 }} />
                      <Typography variant="body2">
                        {doctor.location}
                      </Typography>
                    </Box>
                    
                    <Box className="doctor-rating">
                      <Rating value={doctor.rating} readOnly size="small" />
                      <Typography variant="body2">
                        ({doctor.reviews})
                      </Typography>
                    </Box>
                    
                    <Box className="doctor-meta">
                      <Work sx={{ fontSize: 16 }} />
                      <Typography variant="body2">
                        {doctor.experience}
                      </Typography>
                    </Box>
                    
                    <Box className="doctor-actions">
                      <Typography variant="h6" className="doctor-fee">
                        {doctor.fee}
                      </Typography>
                      <Box className="doctor-buttons">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleStartChat(doctor)}
                          className="btn btn-outline btn-sm"
                        >
                          Chat
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          disabled={!doctor.available}
                          onClick={() => handleBookAppointment(doctor)}
                          className="btn btn-primary btn-sm"
                        >
                          {doctor.available ? 'Book Now' : 'Not Available'}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Doctors Message */}
      {filteredDoctors.length === 0 && (
        <Box className="no-doctors">
          <Typography variant="h6" className="no-doctors-title">
            No doctors found in {selectedLocation?.name}
          </Typography>
          <Typography variant="body2" className="no-doctors-description">
            Try changing your location or search for different specialties
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Doctors;