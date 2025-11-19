import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
} from '@mui/material';
import {
  Close,
  CalendarToday,
  VideoCall,
  LocalHospital,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';

const DoctorBookingModal = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    selectedDoctor,
    bookAppointment,
  } = useBooking();
  
  const { user } = useAuth();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consultationType, setConsultationType] = useState('video');
  const [symptoms, setSymptoms] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = ['Select Slot', 'Add Details', 'Confirm & Pay'];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const appointmentData = {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        type: consultationType,
        symptoms: symptoms,
        paymentMethod: paymentMethod,
        fee: selectedDoctor.fee,
        patient: user,
      };

      const newAppointment = bookAppointment(appointmentData);
      console.log('Appointment booked:', newAppointment);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      handleNext(); // Move to success step
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setSelectedDate(null);
    setSelectedTime(null);
    setConsultationType('video');
    setSymptoms('');
    setPaymentMethod('card');
    closeBookingModal();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Date & Time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={setSelectedDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    minDate={new Date()}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Available Time Slots
                  </Typography>
                  <Grid container spacing={1}>
                    {timeSlots.map((slot) => (
                      <Grid item xs={4} key={slot}>
                        <Button
                          variant={selectedTime === slot ? 'contained' : 'outlined'}
                          fullWidth
                          onClick={() => setSelectedTime(slot)}
                          size="small"
                        >
                          {slot}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Consultation Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1" gutterBottom>
                    Consultation Type
                  </Typography>
                  <RadioGroup
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
                  >
                    <FormControlLabel
                      value="video"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <VideoCall sx={{ mr: 1 }} />
                          Video Consultation
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="clinic"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalHospital sx={{ mr: 1 }} />
                          Clinic Visit
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Symptoms or Reason for Visit"
                  multiline
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Please describe your symptoms or reason for consultation..."
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Confirm Booking
            </Typography>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Appointment Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Doctor
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {selectedDoctor?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Specialty
                    </Typography>
                    <Typography variant="body1">
                      {selectedDoctor?.specialty}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Date & Time
                    </Typography>
                    <Typography variant="body1">
                      {selectedDate && selectedDate.toLocaleDateString()} at {selectedTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Type
                    </Typography>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {consultationType} Consultation
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Fee
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {selectedDoctor?.fee}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                label="Payment Method"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="card">Credit/Debit Card</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="netbanking">Net Banking</MenuItem>
                <MenuItem value="wallet">Wallet</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <CalendarToday sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Appointment Confirmed!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your appointment with {selectedDoctor?.name} has been successfully booked.
            </Typography>
            <Button
              variant="contained"
              onClick={handleClose}
              size="large"
            >
              View Appointment
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  if (!selectedDoctor) return null;

  return (
    <Dialog
      open={isBookingModalOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Book Appointment
            </Typography>
            <Typography variant="body1" color="primary.main">
              Dr. {selectedDoctor.name} - {selectedDoctor.specialty}
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {activeStep < 3 && (
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {renderStepContent(activeStep)}

        {activeStep < 3 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === 2 ? handleSubmit : handleNext}
              disabled={
                (activeStep === 0 && (!selectedDate || !selectedTime)) ||
                (activeStep === 2 && isSubmitting)
              }
            >
              {activeStep === 2 ? (isSubmitting ? 'Processing...' : 'Confirm & Pay') : 'Next'}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DoctorBookingModal;