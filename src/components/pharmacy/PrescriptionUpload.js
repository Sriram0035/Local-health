import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  Close,
  Upload,
  Description,
  Delete,
  LocalPharmacy,
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';

const PrescriptionUpload = ({ open, onClose }) => {
  const { addToCart } = useCart();
  const [uploadedPrescriptions, setUploadedPrescriptions] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Mock medicine suggestions based on common prescriptions
  const suggestedMedicines = [
    { id: 1, name: 'Azithromycin 250mg', brand: 'Azee', price: '₹120' },
    { id: 2, name: 'Amoxicillin 500mg', brand: 'Amoxyl', price: '₹85' },
    { id: 3, name: 'Paracetamol 500mg', brand: 'Crocin', price: '₹25' },
    { id: 4, name: 'Cetirizine 10mg', brand: 'Alatrol', price: '₹35' },
  ];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      for (const file of files) {
        // Simulate file processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newPrescription = {
          id: Date.now(),
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          uploadDate: new Date().toISOString(),
          fileUrl: URL.createObjectURL(file),
          status: 'under_review',
        };

        setUploadedPrescriptions(prev => [newPrescription, ...prev]);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDeletePrescription = (id) => {
    setUploadedPrescriptions(prev => prev.filter(p => p.id !== id));
  };

  const handleAddToCart = (medicine) => {
    addToCart({
      ...medicine,
      image: '/api/placeholder/150/150',
      inStock: true,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="prescription-upload-dialog"
    >
      <DialogTitle className="prescription-upload-header">
        <Typography variant="h5" className="prescription-upload-title">
          Upload Prescription
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="prescription-upload-content">
        <Grid container spacing={3} className="prescription-upload-grid">
          {/* Upload Section */}
          <Grid item xs={12} md={6}>
            <Card className="prescription-upload-section">
              <CardContent>
                <Box className="prescription-upload-card">
                  <Upload className="prescription-upload-icon" />
                  <Typography variant="h6" className="prescription-upload-heading">
                    Upload Prescription
                  </Typography>
                  <Typography variant="body2" className="prescription-upload-description">
                    Upload a clear image of your prescription
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleUploadClick}
                    disabled={uploading}
                    startIcon={<Upload />}
                    className="btn btn-primary"
                  >
                    {uploading ? 'Uploading...' : 'Upload Prescription'}
                  </Button>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="prescription-upload-input"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Uploaded Prescriptions */}
            {uploadedPrescriptions.length > 0 && (
              <Card className="prescription-uploaded-section">
                <CardContent>
                  <Typography variant="h6" className="prescription-uploaded-title">
                    Uploaded Prescriptions
                  </Typography>
                  <List className="prescription-uploaded-list">
                    {uploadedPrescriptions.map((prescription) => (
                      <ListItem
                        key={prescription.id}
                        className="prescription-uploaded-item"
                      >
                        <ListItemIcon>
                          <Description color="primary" />
                        </ListItemIcon>
                        <Box className="prescription-uploaded-details">
                          <Typography variant="body1" className="prescription-uploaded-name">
                            {prescription.fileName}
                          </Typography>
                          <Typography variant="body2" className="prescription-uploaded-meta">
                            {prescription.fileSize} • {new Date(prescription.uploadDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Chip
                          label="Under Review"
                          color="warning"
                          size="small"
                          className="prescription-uploaded-status"
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleDeletePrescription(prescription.id)}
                          color="error"
                          className="prescription-delete-button"
                        >
                          <Delete />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Suggested Medicines */}
          <Grid item xs={12} md={6}>
            <Card className="prescription-suggestions">
              <CardContent>
                <Box className="prescription-suggestions-header">
                  <LocalPharmacy className="prescription-suggestions-icon" />
                  <Typography variant="h6" className="prescription-suggestions-title">
                    Suggested Medicines
                  </Typography>
                </Box>
                <Typography variant="body2" className="prescription-suggestions-description">
                  Based on common prescriptions, our pharmacists recommend:
                </Typography>
                
                <List className="prescription-suggestions-list">
                  {suggestedMedicines.map((medicine) => (
                    <ListItem
                      key={medicine.id}
                      className="prescription-suggestion-item"
                    >
                      <Box className="prescription-suggestion-details">
                        <Typography variant="body1" className="prescription-suggestion-name">
                          {medicine.name}
                        </Typography>
                        <Typography variant="body2" className="prescription-suggestion-meta">
                          {medicine.brand} • {medicine.price}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAddToCart(medicine)}
                        className="prescription-suggestion-button btn btn-outline btn-sm"
                      >
                        Add to Cart
                      </Button>
                    </ListItem>
                  ))}
                </List>

                <Box className="prescription-tip">
                  <Typography variant="body2">
                    💡 Our pharmacists will review your prescription and contact you if any clarification is needed.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionUpload;