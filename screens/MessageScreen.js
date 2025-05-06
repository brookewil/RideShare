import * as React from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity} from 'react-native';
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
        userImg: require('../assets/user2.jpg'),
        messageTime: '1 hour ago',
        messageTest: 'Hello',
    },

]

const MessageScreen = ({navigation}) => {
    return (
        <View style={styles.Container}>
            <FlatList
                data={Messages}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.Card} onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <View style={styles.UserInfo}>
                            <View style={styles.UserImgWrapper}>
                                <Image style={styles.UserImg} source={item.userImg}/>
                            </View>
                            <View style = {styles.TextSection}>
                                <View style={styles.UserInfoText}>
                                    <Text style={styles.UserName}>{item.userName}</Text>
                                    <Text style={styles.PostTime}>{item.messageTime}</Text>
                                </View>
                                <Text style={styles.MessageText}>{item.messageText}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default MessageScreen;