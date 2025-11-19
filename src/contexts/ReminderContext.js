import React, { createContext, useState, useContext, useEffect } from 'react';

const ReminderContext = createContext();

export const useReminder = () => {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminder must be used within a ReminderProvider');
  }
  return context;
};

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load reminders from localStorage on mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('localHealthReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('localHealthReminders', JSON.stringify(reminders));
  }, [reminders]);

  // Check for due reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkDueReminders();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = (reminderData) => {
    const newReminder = {
      id: Date.now(),
      ...reminderData,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    
    setReminders(prev => [...prev, newReminder]);
    return newReminder;
  };

  const updateReminder = (reminderId, updates) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === reminderId ? { ...reminder, ...updates } : reminder
      )
    );
  };

  const deleteReminder = (reminderId) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
  };

  const markAsCompleted = (reminderId) => {
    updateReminder(reminderId, { completed: true, completedAt: new Date().toISOString() });
  };

  const checkDueReminders = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    reminders.forEach(reminder => {
      if (!reminder.completed && isReminderDue(reminder, currentTime)) {
        showNotification(reminder);
      }
    });
  };

  const isReminderDue = (reminder, currentTime) => {
    const reminderTime = reminder.time.split(':');
    const reminderMinutes = parseInt(reminderTime[0]) * 60 + parseInt(reminderTime[1]);
    
    // Check if it's time for the reminder (±2 minutes)
    return Math.abs(reminderMinutes - currentTime) <= 2;
  };

  const showNotification = (reminder) => {
    // Check if notification already shown in this minute
    const notificationExists = notifications.some(
      notif => notif.reminderId === reminder.id && 
      new Date(notif.shownAt).getMinutes() === new Date().getMinutes()
    );

    if (!notificationExists) {
      const newNotification = {
        id: Date.now(),
        reminderId: reminder.id,
        title: `💊 Time for ${reminder.medicineName}`,
        message: `Take ${reminder.dosage} of ${reminder.medicineName}`,
        shownAt: new Date().toISOString(),
      };

      setNotifications(prev => [...prev, newNotification]);

      // Show browser notification if supported
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(newNotification.title, {
          body: newNotification.message,
          icon: '/favicon.ico',
          requireInteraction: true,
        });
      }

      // Auto-remove notification after 5 minutes
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
      }, 300000);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    return reminders
      .filter(reminder => !reminder.completed)
      .sort((a, b) => {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
      });
  };

  const getTodaySchedule = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return reminders.filter(reminder => 
      !reminder.completed && reminder.days.includes(today.toLowerCase())
    );
  };

  const value = {
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
  };

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
};