import * as React from 'react';
import { View, Text, Button, FlatList, Image} from 'react-native';
import {styles} from '../styles.js';
import styled from 'styled-components/native';

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
    },

]

const MessageScreen = ({navigation}) => {
    return (
        <Container>
            <FlatList
                data={Messages}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <Card onPress={() => navigation.navigate('Chat')}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.userImg}/>
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.userName}</UserName>
                                </UserInfoText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    );
};

// Message Styling

const Container = styled.View`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
    background-color: #ffffff
`;

const Card = styled.TouchableOpacity`
    width: 100%
`;

const UserInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const UserImgWrapper = styled.View`
    padding-top: 15px;
    padding-bottom: 15px;
`;

const UserImg = styled.Image`
    width: 50px;
    height 50px;
    border-radius: 25px;
`;

const TextSection = styled.View`
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    padding-left: 0;
    margin-left: 10px;
    width: 300px;
    border-bottom-width: 1px;
    border-bottom-color: #cccccc;
`;

const UserInfoText = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;


export default MessageScreen;