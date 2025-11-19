import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  CreditCard,
  AccountBalance,
  Payment,
  LocalAtm,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const steps = ['Delivery Address', 'Payment Method', 'Confirm Order'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAddressChange = (field, value) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      handleNext();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Delivery Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  value={address.fullName}
                  onChange={(e) => handleAddressChange('fullName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  value={address.phone}
                  onChange={(e) => handleAddressChange('phone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  multiline
                  rows={3}
                  value={address.address}
                  onChange={(e) => handleAddressChange('address', e.target.value)}
                  placeholder="Street address, building, floor, etc."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  value={address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="State"
                  value={address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Pincode"
                  value={address.pincode}
                  onChange={(e) => handleAddressChange('pincode', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Payment Method
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Card sx={{ mb: 2, border: paymentMethod === 'card' ? 2 : 1, borderColor: paymentMethod === 'card' ? 'primary.main' : 'divider' }}>
                  <CardContent>
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CreditCard sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="subtitle1">Credit/Debit Card</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Pay with your card securely
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>

                <Card sx={{ mb: 2, border: paymentMethod === 'upi' ? 2 : 1, borderColor: paymentMethod === 'upi' ? 'primary.main' : 'divider' }}>
                  <CardContent>
                    <FormControlLabel
                      value="upi"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Payment sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="subtitle1">UPI</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Pay using UPI apps
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>

                <Card sx={{ mb: 2, border: paymentMethod === 'netbanking' ? 2 : 1, borderColor: paymentMethod === 'netbanking' ? 'primary.main' : 'divider' }}>
                  <CardContent>
                    <FormControlLabel
                      value="netbanking"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccountBalance sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="subtitle1">Net Banking</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Transfer from your bank account
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>

                <Card sx={{ border: paymentMethod === 'cod' ? 2 : 1, borderColor: paymentMethod === 'cod' ? 'primary.main' : 'divider' }}>
                  <CardContent>
                    <FormControlLabel
                      value="cod"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalAtm sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="subtitle1">Cash on Delivery</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Pay when you receive the order
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Items
                    </Typography>
                    <List>
                      {cartItems.map((item) => (
                        <ListItem key={item.id} divider>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.brand}
                              </Typography>
                              <Typography variant="body2">
                                Quantity: {item.quantity}
                              </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                            </Typography>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Price Details
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Subtotal:</Typography>
                      <Typography variant="body2">₹{getCartTotal()}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Delivery:</Typography>
                      <Typography variant="body2" color="success.main">
                        Free
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary.main">
                        ₹{getCartTotal()}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      sx={{ py: 1.5 }}
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${getCartTotal()}`}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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
              <Payment sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for your order. Your medicines will be delivered soon.
            </Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              Order ID: #{Date.now()}
            </Alert>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard')}
              size="large"
              sx={{ mr: 2 }}
            >
              View Orders
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              size="large"
            >
              Continue Shopping
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/pharmacy');
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      {activeStep < 3 && activeStep !== 2 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 2 ? 'Place Order' : 'Continue'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Checkout;