import React, { createContext, useState, useContext } from 'react';

const HealthRecordsContext = createContext();

export const useHealthRecords = () => {
  const context = useContext(HealthRecordsContext);
  if (!context) {
    throw new Error('useHealthRecords must be used within a HealthRecordsProvider');
  }
  return context;
};

export const HealthRecordsProvider = ({ children }) => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [isHealthRecordsOpen, setIsHealthRecordsOpen] = useState(false);

  const addHealthRecord = (record) => {
    const newRecord = {
      id: Date.now(),
      ...record,
      uploadDate: new Date().toISOString(),
    };
    setHealthRecords(prev => [newRecord, ...prev]);
    return newRecord;
  };

  const deleteHealthRecord = (recordId) => {
    setHealthRecords(prev => prev.filter(record => record.id !== recordId));
  };

  const updateHealthRecord = (recordId, updates) => {
    setHealthRecords(prev =>
      prev.map(record =>
        record.id === recordId ? { ...record, ...updates } : record
      )
    );
  };

  const getRecordsByType = (type) => {
    return healthRecords.filter(record => record.type === type);
  };

  const getRecentRecords = (limit = 5) => {
    return healthRecords
      .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
      .slice(0, limit);
  };

  const value = {
    healthRecords,
    addHealthRecord,
    deleteHealthRecord,
    updateHealthRecord,
    getRecordsByType,
    getRecentRecords,
    isHealthRecordsOpen,
    setIsHealthRecordsOpen,
  };

  return (
    <HealthRecordsContext.Provider value={value}>
      {children}
    </HealthRecordsContext.Provider>
  );
};