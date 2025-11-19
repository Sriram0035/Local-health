import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [activeChats, setActiveChats] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const startChat = (doctor) => {
    const existingChat = activeChats.find(chat => chat.doctor.id === doctor.id);
    
    if (!existingChat) {
      const newChat = {
        id: Date.now(),
        doctor: doctor,
        messages: [
          {
            id: 1,
            text: `Hello! I'm Dr. ${doctor.name}. How can I help you today?`,
            sender: 'doctor',
            timestamp: new Date().toISOString(),
          }
        ],
        unread: 0,
      };
      setActiveChats(prev => [newChat, ...prev]);
      setSelectedDoctor(newChat);
    } else {
      setSelectedDoctor(existingChat);
    }
    
    setIsChatOpen(true);
  };

  const sendMessage = (chatId, messageText) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'patient',
      timestamp: new Date().toISOString(),
    };

    setActiveChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastActivity: new Date().toISOString(),
            }
          : chat
      )
    );

    // Simulate doctor's reply after 2-5 seconds
    setTimeout(() => {
      const doctorReplies = [
        "I understand. Can you tell me more about your symptoms?",
        "How long have you been experiencing this?",
        "Have you taken any medication for this?",
        "I recommend you come in for a check-up. Would you like to book an appointment?",
        "That sounds concerning. Let me schedule a video consultation for you.",
      ];
      
      const randomReply = doctorReplies[Math.floor(Math.random() * doctorReplies.length)];
      
      const doctorMessage = {
        id: Date.now() + 1,
        text: randomReply,
        sender: 'doctor',
        timestamp: new Date().toISOString(),
      };

      setActiveChats(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, doctorMessage],
                lastActivity: new Date().toISOString(),
              }
            : chat
        )
      );
    }, 2000 + Math.random() * 3000);
  };

  const closeChat = (chatId) => {
    setActiveChats(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedDoctor?.id === chatId) {
      setSelectedDoctor(null);
    }
  };

  const getUnreadCount = () => {
    return activeChats.reduce((total, chat) => total + chat.unread, 0);
  };

  const value = {
    activeChats,
    startChat,
    sendMessage,
    closeChat,
    isChatOpen,
    setIsChatOpen,
    selectedDoctor,
    setSelectedDoctor,
    getUnreadCount,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};