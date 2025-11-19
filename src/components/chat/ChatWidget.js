import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Badge,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  Close,
  Send,
  Chat as ChatIcon,
  MedicalServices,
} from '@mui/icons-material';
import { useChat } from '../../contexts/ChatContext';

const ChatWidget = () => {
  const {
    activeChats,
    isChatOpen,
    setIsChatOpen,
    selectedDoctor,
    setSelectedDoctor,
    sendMessage,
  } = useChat();

  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedDoctor?.messages]);

  const handleSendMessage = () => {
    if (message.trim() && selectedDoctor) {
      const chat = activeChats.find(chat => chat.doctor.id === selectedDoctor.doctor.id);
      if (chat) {
        sendMessage(chat.id, message.trim());
        setMessage('');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat FAB */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setIsChatOpen(true)}
        className="chat-fab"
      >
        <Badge badgeContent={activeChats.length} color="error">
          <ChatIcon />
        </Badge>
      </Fab>

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        className="chat-drawer"
      >
        <Box className="chat-content">
          {/* Header */}
          <Box className="chat-header">
            <Box className="chat-header-content">
              <Typography variant="h6" className="chat-title">
                Medical Chat
              </Typography>
              <IconButton onClick={() => setIsChatOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Chat List or Active Chat */}
          <Box style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {selectedDoctor ? (
              // Active Chat
              <>
                {/* Chat Header */}
                <Box className="chat-active-header">
                  <Box className="chat-doctor-info">
                    <Avatar src={selectedDoctor.doctor.image} className="chat-doctor-avatar" />
                    <Box className="chat-doctor-details">
                      <Typography variant="subtitle1" className="chat-doctor-name">
                        Dr. {selectedDoctor.doctor.name}
                      </Typography>
                      <Typography variant="body2" className="chat-doctor-specialty">
                        {selectedDoctor.doctor.specialty}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Messages */}
                <Box className="chat-messages">
                  {selectedDoctor.messages.map((msg) => (
                    <Box
                      key={msg.id}
                      className={`chat-message ${msg.sender}`}
                    >
                      <Paper className="chat-message-bubble">
                        <Typography variant="body2" className="chat-message-text">
                          {msg.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="chat-message-time"
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input */}
                <Box className="chat-input">
                  <Box className="chat-input-form">
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      multiline
                      maxRows={3}
                      size="small"
                      className="chat-input-field"
                    />
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="chat-send-button"
                    >
                      <Send />
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              // Chat List
              <>
                {activeChats.length === 0 ? (
                  <Box className="chat-list-empty">
                    <MedicalServices className="chat-list-empty-icon" />
                    <Typography variant="h6" className="chat-list-empty-title">
                      No Active Chats
                    </Typography>
                    <Typography variant="body2" className="chat-list-empty-description">
                      Start a chat with your doctor
                    </Typography>
                  </Box>
                ) : (
                  <List className="chat-list">
                    {activeChats.map((chat) => (
                      <ListItem
                        key={chat.id}
                        button
                        onClick={() => setSelectedDoctor(chat)}
                        className="chat-list-item"
                      >
                        <ListItemAvatar>
                          <Avatar src={chat.doctor.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Dr. ${chat.doctor.name}`}
                          secondary={
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                              className="chat-list-preview"
                            >
                              {chat.messages[chat.messages.length - 1]?.text}
                            </Typography>
                          }
                          className="chat-list-details"
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatWidget;