import React, { useState } from 'react';
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
  TextField,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
} from '@mui/material';
import {
  Close,
  Add,
  TrendingUp,
  MonitorHeart,
  FitnessCenter,
  Kitchen,
  Water,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HealthTracker = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [healthData, setHealthData] = useState({
    bloodPressure: { systolic: '', diastolic: '' },
    bloodSugar: '',
    weight: '',
    temperature: '',
    steps: '',
    water: '',
    sleep: '',
  });

  // Mock health data for charts
  const bloodPressureData = [
    { date: 'Mon', systolic: 120, diastolic: 80 },
    { date: 'Tue', systolic: 122, diastolic: 82 },
    { date: 'Wed', systolic: 118, diastolic: 78 },
    { date: 'Thu', systolic: 125, diastolic: 85 },
    { date: 'Fri', systolic: 119, diastolic: 79 },
    { date: 'Sat', systolic: 121, diastolic: 81 },
    { date: 'Sun', systolic: 117, diastolic: 77 },
  ];

  const bloodSugarData = [
    { date: 'Mon', fasting: 95, postMeal: 140 },
    { date: 'Tue', fasting: 92, postMeal: 138 },
    { date: 'Wed', fasting: 98, postMeal: 145 },
    { date: 'Thu', fasting: 94, postMeal: 142 },
    { date: 'Fri', fasting: 96, postMeal: 139 },
    { date: 'Sat', fasting: 91, postMeal: 137 },
    { date: 'Sun', fasting: 93, postMeal: 141 },
  ];

  const weightData = [
    { date: 'Week 1', weight: 75 },
    { date: 'Week 2', weight: 74.5 },
    { date: 'Week 3', weight: 74 },
    { date: 'Week 4', weight: 73.5 },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field, value) => {
    setHealthData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveRecord = () => {
    // In real app, this would save to backend
    console.log('Saving health data:', healthData);
    alert('Health record saved successfully!');
    setHealthData({
      bloodPressure: { systolic: '', diastolic: '' },
      bloodSugar: '',
      weight: '',
      temperature: '',
      steps: '',
      water: '',
      sleep: '',
    });
  };

  const getBloodPressureStatus = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) return { status: 'Normal', color: 'success' };
    if (systolic < 130 && diastolic < 80) return { status: 'Elevated', color: 'warning' };
    if (systolic < 140 || diastolic < 90) return { status: 'High Stage 1', color: 'error' };
    return { status: 'High Stage 2', color: 'error' };
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      className="health-tracker-dialog"
    >
      <DialogTitle className="health-tracker-header">
        <Box className="health-tracker-title">
          <MonitorHeart sx={{ mr: 1 }} />
          Health Tracker
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="health-tracker-content">
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Dashboard" />
          <Tab label="Add Record" />
          <Tab label="Trends" />
        </Tabs>

        {/* Dashboard Tab */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Blood Pressure Card */}
            <Grid item xs={12} md={6}>
              <Card className="health-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUp /> Blood Pressure
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={bloodPressureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="systolic" stroke="#ff6b6b" name="Systolic" />
                      <Line type="monotone" dataKey="diastolic" stroke="#4ecdc4" name="Diastolic" />
                    </LineChart>
                  </ResponsiveContainer>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Latest: 120/80 mmHg
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Status: Normal
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Blood Sugar Card */}
            <Grid item xs={12} md={6}>
              <Card className="health-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MonitorHeart /> Blood Sugar
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={bloodSugarData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="fasting" stroke="#ffa726" name="Fasting" />
                      <Line type="monotone" dataKey="postMeal" stroke="#ab47bc" name="Post Meal" />
                    </LineChart>
                  </ResponsiveContainer>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Latest: 95 mg/dL (Fasting)
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Status: Normal
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Weight Card */}
            <Grid item xs={12} md={6}>
              <Card className="health-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FitnessCenter /> Weight
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#26c6da" name="Weight (kg)" />
                    </LineChart>
                  </ResponsiveContainer>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Current: 73.5 kg
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Progress: -1.5 kg this month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Daily Goals Card */}
            <Grid item xs={12} md={6}>
              <Card className="health-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Daily Goals
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Steps</Typography>
                      <Typography variant="body2">8,432/10,000</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={84} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Water</Typography>
                      <Typography variant="body2">1.8/2.0 L</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={90} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Sleep</Typography>
                      <Typography variant="body2">7.2/8.0 hrs</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={90} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Add Record Tab */}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Add Health Record
            </Typography>
            <Grid container spacing={3}>
              {/* Blood Pressure */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Blood Pressure
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Systolic"
                        type="number"
                        value={healthData.bloodPressure.systolic}
                        onChange={(e) => handleInputChange('bloodPressure', {
                          ...healthData.bloodPressure,
                          systolic: e.target.value
                        })}
                        placeholder="120"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Diastolic"
                        type="number"
                        value={healthData.bloodPressure.diastolic}
                        onChange={(e) => handleInputChange('bloodPressure', {
                          ...healthData.bloodPressure,
                          diastolic: e.target.value
                        })}
                        placeholder="80"
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Blood Sugar */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Blood Sugar
                  </Typography>
                  <TextField
                    fullWidth
                    label="Blood Sugar (mg/dL)"
                    type="number"
                    value={healthData.bloodSugar}
                    onChange={(e) => handleInputChange('bloodSugar', e.target.value)}
                    placeholder="95"
                  />
                </Card>
              </Grid>

              {/* Weight */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Weight
                  </Typography>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    value={healthData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="75.0"
                  />
                </Card>
              </Grid>

              {/* Temperature */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Temperature
                  </Typography>
                  <TextField
                    fullWidth
                    label="Temperature (°C)"
                    type="number"
                    value={healthData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    placeholder="36.6"
                  />
                </Card>
              </Grid>

              {/* Activity */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Activity
                  </Typography>
                  <TextField
                    fullWidth
                    label="Steps"
                    type="number"
                    value={healthData.steps}
                    onChange={(e) => handleInputChange('steps', e.target.value)}
                    placeholder="10000"
                  />
                </Card>
              </Grid>

              {/* Hydration */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Water /> Hydration
                  </Typography>
                  <TextField
                    fullWidth
                    label="Water (Liters)"
                    type="number"
                    value={healthData.water}
                    onChange={(e) => handleInputChange('water', e.target.value)}
                    placeholder="2.0"
                  />
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleSaveRecord}
                  className="btn btn-primary"
                  fullWidth
                  size="large"
                >
                  Save Health Record
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Trends Tab */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Health Trends & Insights
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Monthly Progress
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" color="primary.main">
                            -1.5kg
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Weight Change
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" color="success.main">
                            95%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Goal Completion
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" color="info.main">
                            28
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Records Logged
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Health Insights
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          ✅ Your blood pressure has been stable this month
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          ⚠️ Consider increasing your daily water intake
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          💡 Great job on maintaining consistent exercise
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recommendations
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Increase fiber intake"
                          secondary="Add more vegetables and whole grains to your diet"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Evening walk"
                          secondary="Consider a 30-minute walk after dinner"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Sleep schedule"
                          secondary="Try to maintain consistent sleep timing"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HealthTracker;