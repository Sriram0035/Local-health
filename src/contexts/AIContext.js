import React, { createContext, useState, useContext } from 'react';

const AIContext = createContext();

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider = ({ children }) => {
  const [symptomAnalysis, setSymptomAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSymptoms = async (symptoms, userInfo = {}) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis - In real app, this would call an AI API
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAnalysis = {
        id: Date.now(),
        symptoms: symptoms,
        possibleConditions: generatePossibleConditions(symptoms),
        recommendedActions: generateRecommendedActions(symptoms),
        severity: assessSeverity(symptoms),
        timestamp: new Date().toISOString(),
        suggestedDoctors: suggestDoctors(symptoms),
        emergency: checkEmergency(symptoms)
      };
      
      setSymptomAnalysis(mockAnalysis);
      return mockAnalysis;
    } catch (error) {
      console.error('AI analysis failed:', error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePossibleConditions = (symptoms) => {
    const conditions = {
      fever: ['Common Cold', 'Flu', 'COVID-19', 'Viral Infection'],
      cough: ['Bronchitis', 'Pneumonia', 'Asthma', 'Allergies'],
      headache: ['Migraine', 'Tension Headache', 'Sinusitis'],
      'chest pain': ['Angina', 'Heartburn', 'Anxiety', 'Pulmonary Embolism'],
      'abdominal pain': ['Gastritis', 'Appendicitis', 'Food Poisoning'],
    };

    const possible = new Set();
    symptoms.toLowerCase().split(' ').forEach(symptom => {
      if (conditions[symptom]) {
        conditions[symptom].forEach(condition => possible.add(condition));
      }
    });

    return Array.from(possible).slice(0, 3);
  };

  const generateRecommendedActions = (symptoms) => {
    const recommendations = [
      'Rest and stay hydrated',
      'Monitor your temperature',
      'Avoid strenuous activities',
      'Take over-the-counter pain relief if needed',
      'Consult a doctor if symptoms persist for more than 3 days'
    ];

    if (symptoms.toLowerCase().includes('fever')) {
      recommendations.push('Use cold compresses to reduce fever');
    }
    if (symptoms.toLowerCase().includes('cough')) {
      recommendations.push('Use a humidifier and stay hydrated');
    }

    return recommendations;
  };

  const assessSeverity = (symptoms) => {
    const emergencyKeywords = ['chest pain', 'difficulty breathing', 'severe pain', 'unconscious'];
    const urgentKeywords = ['high fever', 'persistent vomiting', 'severe headache'];
    
    if (emergencyKeywords.some(keyword => symptoms.toLowerCase().includes(keyword))) {
      return 'emergency';
    } else if (urgentKeywords.some(keyword => symptoms.toLowerCase().includes(keyword))) {
      return 'urgent';
    } else {
      return 'routine';
    }
  };

  const suggestDoctors = (symptoms) => {
    const suggestions = [];
    
    if (symptoms.toLowerCase().includes('chest') || symptoms.toLowerCase().includes('heart')) {
      suggestions.push({ specialty: 'Cardiologist', priority: 'high' });
    }
    if (symptoms.toLowerCase().includes('fever') || symptoms.toLowerCase().includes('cough')) {
      suggestions.push({ specialty: 'General Physician', priority: 'medium' });
    }
    if (symptoms.toLowerCase().includes('headache') || symptoms.toLowerCase().includes('migraine')) {
      suggestions.push({ specialty: 'Neurologist', priority: 'medium' });
    }
    
    return suggestions.length > 0 ? suggestions : [{ specialty: 'General Physician', priority: 'low' }];
  };

  const checkEmergency = (symptoms) => {
    const emergencyIndicators = [
      'chest pain',
      'difficulty breathing',
      'severe bleeding',
      'unconscious',
      'severe burn',
      'sudden paralysis'
    ];
    
    return emergencyIndicators.some(indicator => 
      symptoms.toLowerCase().includes(indicator)
    );
  };

  const clearAnalysis = () => {
    setSymptomAnalysis(null);
  };

  const value = {
    symptomAnalysis,
    isAnalyzing,
    analyzeSymptoms,
    clearAnalysis,
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};