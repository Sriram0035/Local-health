import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
} from '@mui/material';
import {
  Person,
  CalendarToday,
  LocalPharmacy,
  Science,
  Edit,
  AccessTime,
  CheckCircle,
  Pending,
  Upload,
  Description,
  Email,
  Phone,
  Cake,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useHealthRecords } from '../contexts/HealthRecordsContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { healthRecords, getRecentRecords, setIsHealthRecordsOpen } = useHealthRecords();
  const [activeTab, setActiveTab] = useState(0);

  // Mock data
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'confirmed',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      date: '2024-01-20',
      time: '02:30 PM',
      type: 'Clinic Visit',
      status: 'pending',
    },
  ];

  const orders = [
    {
      id: 1,
      items: ['Paracetamol 500mg', 'Vitamin C 1000mg'],
      date: '2024-01-10',
      status: 'delivered',
      total: '₹324',
    },
    {
      id: 2,
      items: ['Multivitamin Tablets'],
      date: '2024-01-12',
      status: 'shipped',
      total: '₹450',
    },
  ];

  const labTests = [
    {
      id: 1,
      name: 'Complete Blood Count',
      date: '2024-01-08',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Thyroid Profile',
      date: '2024-01-18',
      status: 'scheduled',
    },
  ];

  const recordTypes = [
    { value: 'prescription', label: 'Prescription', color: 'primary' },
    { value: 'lab_report', label: 'Lab Report', color: 'secondary' },
    { value: 'scan', label: 'Scan/Image', color: 'info' },
    { value: 'medical_certificate', label: 'Medical Certificate', color: 'warning' },
    { value: 'other', label: 'Other', color: 'default' },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'delivered':
      case 'completed':
        return 'success';
      case 'pending':
      case 'scheduled':
        return 'warning';
      case 'shipped':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
      case 'delivered':
      case 'completed':
        return <CheckCircle color="success" />;
      case 'pending':
      case 'scheduled':
        return <Pending color="warning" />;
      default:
        return <AccessTime color="info" />;
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return <Description color="error" />;
    if (fileType?.includes('image')) return <Description color="primary" />;
    return <Description color="action" />;
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <Container maxWidth="lg" className="dashboard-container">
      {/* Header */}
      <Box className="dashboard-header">
        <Box className="dashboard-profile-header">
          <Avatar
            src={user.avatar}
            alt={user.name}
            className="dashboard-main-avatar"
          />
          <Box className="dashboard-profile-info">
            <Typography variant="h1" className="dashboard-title">
              Welcome back, {user.name}!
            </Typography>
            <Typography variant="h6" className="dashboard-subtitle">
              Here's your health overview
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            className="btn btn-outline"
          >
            Edit Profile
          </Button>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} className="dashboard-stats-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-stat-card">
              <CardContent>
                <Box className="dashboard-stat-content">
                  <CalendarToday className="dashboard-stat-icon appointment" />
                  <Box>
                    <Typography variant="h4" className="dashboard-stat-number">
                      {appointments.filter(a => a.status === 'confirmed' || a.status === 'pending').length}
                    </Typography>
                    <Typography variant="body2" className="dashboard-stat-label">
                      Upcoming Appointments
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-stat-card">
              <CardContent>
                <Box className="dashboard-stat-content">
                  <LocalPharmacy className="dashboard-stat-icon pharmacy" />
                  <Box>
                    <Typography variant="h4" className="dashboard-stat-number">
                      {orders.length}
                    </Typography>
                    <Typography variant="body2" className="dashboard-stat-label">
                      Medicine Orders
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-stat-card">
              <CardContent>
                <Box className="dashboard-stat-content">
                  <Science className="dashboard-stat-icon lab" />
                  <Box>
                    <Typography variant="h4" className="dashboard-stat-number">
                      {labTests.length}
                    </Typography>
                    <Typography variant="body2" className="dashboard-stat-label">
                      Lab Tests
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-stat-card">
              <CardContent>
                <Box className="dashboard-stat-content">
                  <Description className="dashboard-stat-icon records" />
                  <Box>
                    <Typography variant="h4" className="dashboard-stat-number">
                      {healthRecords.length}
                    </Typography>
                    <Typography variant="body2" className="dashboard-stat-label">
                      Medical Records
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Paper className="dashboard-main">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className="dashboard-tabs"
        >
          <Tab icon={<CalendarToday />} label="Appointments" />
          <Tab icon={<LocalPharmacy />} label="Medicine Orders" />
          <Tab icon={<Science />} label="Lab Tests" />
          <Tab icon={<Person />} label="Medical Records" />
          <Tab icon={<Person />} label="Profile" />
        </Tabs>

        {/* Appointments Tab */}
        {activeTab === 0 && (
          <Box className="dashboard-tab-content">
            <Box className="dashboard-section-header">
              <Typography variant="h2" className="dashboard-section-title">
                My Appointments
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/doctors')}
                className="btn btn-primary"
              >
                Book New Appointment
              </Button>
            </Box>
            <List className="dashboard-list">
              {appointments.map((appointment) => (
                <ListItem key={appointment.id} className="dashboard-list-item">
                  <ListItemIcon>
                    {getStatusIcon(appointment.status)}
                  </ListItemIcon>
                  <Box className="dashboard-list-content">
                    <Typography className="dashboard-list-primary">
                      {appointment.doctor}
                    </Typography>
                    <Typography className="dashboard-list-secondary">
                      {appointment.specialty} • {appointment.date} at {appointment.time} • {appointment.type}
                    </Typography>
                  </Box>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    variant="outlined"
                    className="dashboard-list-chip"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Medicine Orders Tab */}
        {activeTab === 1 && (
          <Box className="dashboard-tab-content">
            <Box className="dashboard-section-header">
              <Typography variant="h2" className="dashboard-section-title">
                Medicine Orders
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/pharmacy')}
                className="btn btn-primary"
              >
                Order Medicines
              </Button>
            </Box>
            <List className="dashboard-list">
              {orders.map((order) => (
                <ListItem key={order.id} className="dashboard-list-item">
                  <Box className="dashboard-list-content">
                    <Typography className="dashboard-list-primary">
                      Order #{order.id}
                    </Typography>
                    <Typography className="dashboard-list-secondary">
                      {order.items.join(', ')} • Ordered on {order.date} • Total: {order.total}
                    </Typography>
                  </Box>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    variant="outlined"
                    className="dashboard-list-chip"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Lab Tests Tab */}
        {activeTab === 2 && (
          <Box className="dashboard-tab-content">
            <Box className="dashboard-section-header">
              <Typography variant="h2" className="dashboard-section-title">
                Lab Tests
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/lab-tests')}
                className="btn btn-primary"
              >
                Book Lab Test
              </Button>
            </Box>
            <List className="dashboard-list">
              {labTests.map((test) => (
                <ListItem key={test.id} className="dashboard-list-item">
                  <ListItemIcon>
                    {getStatusIcon(test.status)}
                  </ListItemIcon>
                  <Box className="dashboard-list-content">
                    <Typography className="dashboard-list-primary">
                      {test.name}
                    </Typography>
                    <Typography className="dashboard-list-secondary">
                      Scheduled for {test.date}
                    </Typography>
                  </Box>
                  <Chip
                    label={test.status}
                    color={getStatusColor(test.status)}
                    variant="outlined"
                    className="dashboard-list-chip"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Medical Records Tab */}
        {activeTab === 3 && (
          <Box className="dashboard-tab-content">
            <Box className="dashboard-section-header">
              <Typography variant="h2" className="dashboard-section-title">
                Medical Records
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Upload />}
                onClick={() => setIsHealthRecordsOpen(true)}
                className="btn btn-primary"
              >
                Upload Records
              </Button>
            </Box>

            {healthRecords.length === 0 ? (
              <Box className="dashboard-empty-state">
                <Description className="dashboard-empty-icon" />
                <Typography variant="h6" className="dashboard-empty-title">
                  No medical records yet
                </Typography>
                <Typography variant="body2" className="dashboard-empty-description">
                  Upload your medical records to keep them organized and accessible
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => setIsHealthRecordsOpen(true)}
                  className="btn btn-primary"
                >
                  Upload Your First Record
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <List className="dashboard-list">
                    {getRecentRecords().map((record) => {
                      const recordType = recordTypes.find(type => type.value === record.type);
                      
                      return (
                        <ListItem key={record.id} className="dashboard-list-item">
                          <ListItemIcon>
                            {getFileIcon(record.fileType)}
                          </ListItemIcon>
                          <Box className="dashboard-list-content">
                            <Typography className="dashboard-list-primary">
                              {record.fileName}
                            </Typography>
                            <Typography className="dashboard-list-secondary">
                              {record.fileSize} • {new Date(record.uploadDate).toLocaleDateString()}
                            </Typography>
                            {recordType && (
                              <Chip 
                                label={recordType.label} 
                                size="small" 
                                color={recordType.color}
                                sx={{ mt: 0.5 }}
                              />
                            )}
                          </Box>
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Record Summary
                      </Typography>
                      <Box className="dashboard-stats-item">
                        <Typography className="dashboard-stats-primary">Total Records:</Typography>
                        <Typography className="dashboard-stats-secondary">{healthRecords.length}</Typography>
                      </Box>
                      <Box className="dashboard-stats-item">
                        <Typography className="dashboard-stats-primary">Prescriptions:</Typography>
                        <Typography>{healthRecords.filter(r => r.type === 'prescription').length}</Typography>
                      </Box>
                      <Box className="dashboard-stats-item">
                        <Typography className="dashboard-stats-primary">Lab Reports:</Typography>
                        <Typography>{healthRecords.filter(r => r.type === 'lab_report').length}</Typography>
                      </Box>
                      <Box className="dashboard-stats-item">
                        <Typography className="dashboard-stats-primary">Scans/Images:</Typography>
                        <Typography>{healthRecords.filter(r => r.type === 'scan').length}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        )}

        {/* Profile Tab */}
        {activeTab === 4 && (
          <Box className="dashboard-tab-content">
            <Typography variant="h2" className="dashboard-section-title">
              Profile Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                    <Box className="profile-info-list">
                      <Box className="profile-info-item">
                        <Person className="profile-info-icon" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Full Name
                          </Typography>
                          <Typography variant="body1">
                            {user.name}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="profile-info-item">
                        <Email className="profile-info-icon" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Email Address
                          </Typography>
                          <Typography variant="body1">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="profile-info-item">
                        <Phone className="profile-info-icon" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Phone Number
                          </Typography>
                          <Typography variant="body1">
                            {user.phone}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="profile-info-item">
                        <Cake className="profile-info-icon" />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Member Since
                          </Typography>
                          <Typography variant="body1">
                            {new Date(user.joinedDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Account Settings
                    </Typography>
                    <Box className="profile-actions">
                      <Button variant="outlined" fullWidth className="btn btn-outline">
                        Change Password
                      </Button>
                      <Button variant="outlined" fullWidth className="btn btn-outline">
                        Update Email
                      </Button>
                      <Button variant="outlined" fullWidth className="btn btn-outline">
                        Notification Settings
                      </Button>
                      <Button variant="outlined" fullWidth className="btn btn-outline">
                        Privacy Settings
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;