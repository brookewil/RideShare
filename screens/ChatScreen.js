import React, { useState, useEffect, useCallback } from 'react';
import { View, Text} from 'react-native';
import {styles} from '../styles.js';
import {GiftedChat} from 'react-native-gifted-chat'

export function ChatScreen() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id:1,
        text: 'Hello Developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('../assets/user1.jpg')
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
    />
  );
}