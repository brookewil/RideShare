import * as React from 'react';
import { View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';

const Messages = [
    {
        id: '1',
        userName: 'John',
        userImg: require('../assets/user1.jpg'),
        messageTime: '4 mins ago',
        messageTest: 'Hello',
    },
    {
        id: '2',
        userName: 'Doug',
        userImg: require('../assets/user2.jpg')
    }

]

function MessageScreen() {
  return (
     <View style={{ flex: 1, alignItems:   
           'center', justifyContent: 'center' }}>
       <Text>Message Screen</Text>
     </View>
  );
}

export default MessageScreen;