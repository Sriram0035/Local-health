import React, { useState } from 'react';
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
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import { Search, LocalPharmacy, ShoppingCart, Upload } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import PrescriptionUpload from '../components/pharmacy/PrescriptionUpload';

const Pharmacy = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState(0);
  const [prescriptionUploadOpen, setPrescriptionUploadOpen] = useState(false);

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      brand: 'Crocin',
      price: '₹25',
      discount: '20% off',
      image: '/api/placeholder/150/150',
      inStock: true,
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      brand: 'HealthVit',
      price: '₹299',
      discount: '15% off',
      image: '/api/placeholder/150/150',
      inStock: true,
    },
    {
      id: 3,
      name: 'Multivitamin Tablets',
      brand: 'Supradyn',
      price: '₹450',
      discount: '10% off',
      image: '/api/placeholder/150/150',
      inStock: false,
    },
    {
      id: 4,
      name: 'Azithromycin 250mg',
      brand: 'Azee',
      price: '₹120',
      discount: '25% off',
      image: '/api/placeholder/150/150',
      inStock: true,
    },
    {
      id: 5,
      name: 'Cetirizine 10mg',
      brand: 'Alatrol',
      price: '₹35',
      discount: '30% off',
      image: '/api/placeholder/150/150',
      inStock: true,
    },
    {
      id: 6,
      name: 'Omeprazole 20mg',
      brand: 'Omez',
      price: '₹85',
      discount: '20% off',
      image: '/api/placeholder/150/150',
      inStock: true,
    },
  ];

  const categories = [
    'All Medicines',
    'Prescription',
    'Over the Counter',
    'Health Care',
    'Personal Care',
  ];

  const handleAddToCart = (medicine) => {
    if (!medicine.inStock) return;
    addToCart(medicine);
    setIsCartOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getDiscountedPrice = (price, discount) => {
    const numericPrice = parseInt(price.replace('₹', ''));
    const discountPercent = parseInt(discount);
    return numericPrice - (numericPrice * discountPercent / 100);
  };

  return (
    <Container maxWidth="lg" className="pharmacy-container">
      {/* Header */}
      <Box className="pharmacy-header">
        <Box className="pharmacy-title">
          <LocalPharmacy className="pharmacy-title-icon" />
          <Typography variant="h1" className="pharmacy-title-text">
            Pharmacy
          </Typography>
        </Box>
        <Typography variant="h6" className="pharmacy-subtitle">
          Get medicines delivered to your doorstep
        </Typography>
        
        {/* Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} className="pharmacy-tabs">
          <Tab label="Browse Medicines" />
          <Tab label="Upload Prescription" />
        </Tabs>

        {/* Search Bar - Only show for Browse Medicines tab */}
        {activeTab === 0 && (
          <>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search medicines, brands, symptoms..."
              className="pharmacy-search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            {/* Categories */}
            <Box className="pharmacy-categories">
              {categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  variant={index === 0 ? 'filled' : 'outlined'}
                  color="primary"
                  clickable
                />
              ))}
            </Box>
          </>
        )}

        {/* Prescription Upload Section */}
        {activeTab === 1 && (
          <Card className="pharmacy-upload-section">
            <CardContent className="pharmacy-upload-card">
              <Upload className="pharmacy-upload-icon" />
              <Typography variant="h5" className="pharmacy-upload-title">
                Upload Your Prescription
              </Typography>
              <Typography variant="body2" className="pharmacy-upload-description">
                Upload a clear image of your prescription and our pharmacists will prepare your medicines
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Upload />}
                onClick={() => setPrescriptionUploadOpen(true)}
                className="btn btn-primary btn-lg"
              >
                Upload Prescription
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Medicines Grid - Only show for Browse Medicines tab */}
      {activeTab === 0 && (
        <Grid container spacing={4} className="pharmacy-grid">
          {medicines.map((medicine) => {
            const actualPrice = medicine.discount 
              ? getDiscountedPrice(medicine.price, medicine.discount)
              : parseInt(medicine.price.replace('₹', ''));
            
            return (
              <Grid item xs={12} sm={6} md={4} key={medicine.id}>
                <Card className="medicine-card">
                  <CardContent>
                    <Box
                      component="img"
                      src={medicine.image}
                      alt={medicine.name}
                      className="medicine-image"
                    />
                    
                    <Typography variant="h6" className="medicine-name">
                      {medicine.name}
                    </Typography>
                    
                    <Typography variant="body2" className="medicine-brand">
                      {medicine.brand}
                    </Typography>

                    <Box className="medicine-price">
                      <Typography variant="h6" className="medicine-current-price">
                        ₹{actualPrice}
                      </Typography>
                      {medicine.discount && (
                        <>
                          <Typography variant="body2" className="medicine-original-price">
                            {medicine.price}
                          </Typography>
                          <Chip
                            label={medicine.discount}
                            className="medicine-discount"
                          />
                        </>
                      )}
                    </Box>

                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      fullWidth
                      disabled={!medicine.inStock}
                      onClick={() => handleAddToCart(medicine)}
                      className="medicine-button btn btn-primary"
                    >
                      {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Prescription Upload Modal */}
      <PrescriptionUpload
        open={prescriptionUploadOpen}
        onClose={() => setPrescriptionUploadOpen(false)}
      />
    </Container>
  );
};

export default Pharmacy;