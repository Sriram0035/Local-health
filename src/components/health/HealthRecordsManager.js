import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Close,
  Upload,
  PictureAsPdf,
  Image,
  Description,
  MoreVert,
  Delete,
  Download,
  Visibility,
} from '@mui/icons-material';
import { useHealthRecords } from '../../contexts/HealthRecordsContext';

const HealthRecordsManager = () => {
  const {
    healthRecords,
    addHealthRecord,
    deleteHealthRecord,
    isHealthRecordsOpen,
    setIsHealthRecordsOpen,
  } = useHealthRecords();

  const [uploading, setUploading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const fileInputRef = useRef(null);

  const recordTypes = [
    { value: 'prescription', label: 'Prescription', color: 'primary' },
    { value: 'lab_report', label: 'Lab Report', color: 'secondary' },
    { value: 'scan', label: 'Scan/Image', color: 'info' },
    { value: 'medical_certificate', label: 'Medical Certificate', color: 'warning' },
    { value: 'other', label: 'Other', color: 'default' },
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
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 1000));

        const recordType = determineRecordType(file);
        
        const newRecord = {
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          fileType: file.type,
          type: recordType,
          uploadDate: new Date().toISOString(),
          // In real app, you would upload the file and get a URL
          fileUrl: URL.createObjectURL(file),
        };

        addHealthRecord(newRecord);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      event.target.value = ''; // Reset file input
    }
  };

  const determineRecordType = (file) => {
    if (file.type.includes('pdf')) return 'lab_report';
    if (file.type.includes('image')) return 'scan';
    if (file.name.toLowerCase().includes('prescription')) return 'prescription';
    return 'other';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <PictureAsPdf color="error" />;
    if (fileType.includes('image')) return <Image color="primary" />;
    return <Description color="action" />;
  };

  const handleMenuOpen = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const handleDelete = () => {
    if (selectedRecord) {
      deleteHealthRecord(selectedRecord.id);
    }
    handleMenuClose();
  };

  const handleDownload = () => {
    if (selectedRecord?.fileUrl) {
      const link = document.createElement('a');
      link.href = selectedRecord.fileUrl;
      link.download = selectedRecord.fileName;
      link.click();
    }
    handleMenuClose();
  };

  const handleView = () => {
    if (selectedRecord?.fileUrl) {
      window.open(selectedRecord.fileUrl, '_blank');
    }
    handleMenuClose();
  };

  return (
    <Dialog
      open={isHealthRecordsOpen}
      onClose={() => setIsHealthRecordsOpen(false)}
      maxWidth="md"
      fullWidth
      className="health-records-dialog"
    >
      <DialogTitle className="health-records-dialog-title">
        <Typography variant="h5" className="health-records-dialog-title-text">
          Health Records
        </Typography>
        <IconButton onClick={() => setIsHealthRecordsOpen(false)}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="health-records-dialog-content">
        {/* Upload Section */}
        <Card className="health-records-upload-card">
          <CardContent>
            <Box className="health-records-upload-content">
              <Upload className="health-records-upload-icon" />
              <Typography variant="h6" className="health-records-upload-title">
                Upload Medical Records
              </Typography>
              <Typography variant="body2" className="health-records-upload-description">
                Upload prescriptions, lab reports, scans, and other medical documents
              </Typography>
              <Button
                variant="contained"
                onClick={handleUploadClick}
                disabled={uploading}
                startIcon={<Upload />}
                className="health-records-upload-button"
              >
                {uploading ? 'Uploading...' : 'Choose Files'}
              </Button>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="health-records-upload-input"
                accept=".pdf,.jpg,.jpeg,.png,.dicom,.txt"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Records List */}
        <Typography variant="h6" className="health-records-section-title">
          Your Records ({healthRecords.length})
        </Typography>

        {healthRecords.length === 0 ? (
          <Box className="health-records-empty">
            <Description className="health-records-empty-icon" />
            <Typography variant="h6" className="health-records-empty-title">
              No records yet
            </Typography>
            <Typography variant="body2" className="health-records-empty-description">
              Upload your first medical record to get started
            </Typography>
          </Box>
        ) : (
          <List className="health-records-list">
            {healthRecords.map((record) => {
              const recordType = recordTypes.find(type => type.value === record.type);
              
              return (
                <ListItem
                  key={record.id}
                  className="health-records-item"
                >
                  <ListItemIcon className="health-records-item-icon">
                    {getFileIcon(record.fileType)}
                  </ListItemIcon>
                  <Box className="health-records-item-content">
                    <Box className="health-records-item-name">
                      <Typography variant="subtitle1" className="health-records-item-title">
                        {record.fileName}
                      </Typography>
                      <Chip
                        label={recordType?.label}
                        color={recordType?.color}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" className="health-records-item-meta">
                      {record.fileSize} • {new Date(record.uploadDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box className="health-records-item-actions">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, record)}
                      className="health-records-item-button"
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        )}
      </DialogContent>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="health-records-context-menu"
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Dialog>
  );
};

export default HealthRecordsManager;