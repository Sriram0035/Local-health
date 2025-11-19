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
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Switch,
  Alert,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import {
  Close,
  Add,
  Notifications,
  NotificationsActive,
  MedicalServices,
  CheckCircle,
  Schedule,
  Delete,
} from '@mui/icons-material';
import { useReminder } from '../../contexts/ReminderContext';

const MedicineReminder = ({ open, onClose }) => {
  const {
    reminders,
    notifications,
    addReminder,
    updateReminder,
    deleteReminder,
    markAsCompleted,
    requestNotificationPermission,
    clearNotification,
    clearAllNotifications,
    getUpcomingReminders,
    getTodaySchedule,
  } = useReminder();

  const [activeTab, setActiveTab] = useState(0);
  const [newReminder, setNewReminder] = useState({
    medicineName: '',
    dosage: '',
    frequency: 'daily',
    time: '',
    days: [],
    notes: '',
  });

  const daysOfWeek = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  const handleAddReminder = () => {
    if (!newReminder.medicineName || !newReminder.dosage || !newReminder.time) {
      alert('Please fill in all required fields');
      return;
    }

    addReminder(newReminder);
    setNewReminder({
      medicineName: '',
      dosage: '',
      frequency: 'daily',
      time: '',
      days: [],
      notes: '',
    });
  };

  const handleDayToggle = (day) => {
    setNewReminder(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      alert('Notification permission granted! You will receive reminders.');
    } else {
      alert('Please enable notifications to receive medicine reminders.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const upcomingReminders = getUpcomingReminders();
  const todaySchedule = getTodaySchedule();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="reminder-dialog"
    >
      <DialogTitle className="reminder-header">
        <Box className="reminder-title">
          <Notifications sx={{ mr: 1 }} />
          Medicine Reminders
          <Badge 
            badgeContent={notifications.length} 
            color="error" 
            sx={{ ml: 2 }}
          >
            <NotificationsActive />
          </Badge>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="reminder-content">
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Add Reminder" />
          <Tab label="Today's Schedule" />
          <Tab label="All Reminders" />
          <Tab label={
            <Badge badgeContent={notifications.length} color="error">
              Notifications
            </Badge>
          } />
        </Tabs>

        {/* Add Reminder Tab */}
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Add New Medicine Reminder
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Medicine Name"
                  value={newReminder.medicineName}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, medicineName: e.target.value }))}
                  placeholder="e.g., Paracetamol 500mg"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dosage"
                  value={newReminder.dosage}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, dosage: e.target.value }))}
                  placeholder="e.g., 1 tablet"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    value={newReminder.frequency}
                    label="Frequency"
                    onChange={(e) => setNewReminder(prev => ({ ...prev, frequency: e.target.value }))}
                  >
                    <MenuItem value="once">Once</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  Repeat on Days
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {daysOfWeek.map(day => (
                    <Chip
                      key={day}
                      label={day.charAt(0).toUpperCase() + day.slice(1)}
                      onClick={() => handleDayToggle(day)}
                      color={newReminder.days.includes(day) ? 'primary' : 'default'}
                      variant={newReminder.days.includes(day) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  multiline
                  rows={3}
                  value={newReminder.notes}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special instructions..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddReminder}
                  className="btn btn-primary"
                  fullWidth
                >
                  Add Reminder
                </Button>
              </Grid>
            </Grid>

            {/* Notification Permission */}
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                Enable notifications to receive medicine reminders
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleRequestPermission}
                startIcon={<Notifications />}
                sx={{ mt: 1 }}
              >
                Enable Notifications
              </Button>
            </Alert>
          </Box>
        )}

        {/* Today's Schedule Tab */}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Schedule /> Today's Schedule
            </Typography>
            {todaySchedule.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <MedicalServices sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No reminders for today
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add reminders to see them here
                </Typography>
              </Box>
            ) : (
              <List>
                {todaySchedule.map(reminder => (
                  <Card key={reminder.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6">
                            {reminder.medicineName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {reminder.dosage} at {reminder.time}
                          </Typography>
                          {reminder.notes && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              📝 {reminder.notes}
                            </Typography>
                          )}
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<CheckCircle />}
                          onClick={() => markAsCompleted(reminder.id)}
                        >
                          Mark Taken
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </List>
            )}
          </Box>
        )}

        {/* All Reminders Tab */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              All Medicine Reminders ({reminders.length})
            </Typography>
            {reminders.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <MedicalServices sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No reminders set
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add your first medicine reminder to get started
                </Typography>
              </Box>
            ) : (
              <List>
                {reminders.map(reminder => (
                  <ListItem
                    key={reminder.id}
                    sx={{ border: 1, borderColor: 'divider', borderRadius: 2, mb: 1 }}
                  >
                    <ListItemIcon>
                      <MedicalServices color={reminder.completed ? 'success' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ textDecoration: reminder.completed ? 'line-through' : 'none' }}>
                            {reminder.medicineName}
                          </Typography>
                          {reminder.completed && (
                            <Chip label="Completed" size="small" color="success" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            {reminder.dosage} • {reminder.time} • {reminder.frequency}
                          </Typography>
                          {reminder.days.length > 0 && (
                            <Typography variant="body2" color="text.secondary">
                              Days: {reminder.days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => deleteReminder(reminder.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}

        {/* Notifications Tab */}
        {activeTab === 3 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Active Notifications ({notifications.length})
              </Typography>
              {notifications.length > 0 && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearAllNotifications}
                >
                  Clear All
                </Button>
              )}
            </Box>
            {notifications.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Notifications sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No active notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Notifications will appear here when it's time for your medicine
                </Typography>
              </Box>
            ) : (
              <List>
                {notifications.map(notification => (
                  <Alert
                    key={notification.id}
                    severity="info"
                    sx={{ mb: 1 }}
                    action={
                      <IconButton
                        size="small"
                        onClick={() => clearNotification(notification.id)}
                      >
                        <Close />
                      </IconButton>
                    }
                  >
                    <Typography variant="subtitle2">
                      {notification.title}
                    </Typography>
                    <Typography variant="body2">
                      {notification.message}
                    </Typography>
                  </Alert>
                ))}
              </List>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MedicineReminder;