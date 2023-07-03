import React, { useState } from 'react';
import { View, SafeAreaView, Button, TextInput  } from 'react-native';
import { database, ref, set, push, query, orderByChild, equalTo, get } from "../fb"
import styles from '../styles/style';

const dataRef = ref(database, "boards");   // 디비 설정

const WriteBoardScreen = ({ navigation, route }) => {
    const { username, isAdmin } = route.params;

    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [authour] = useState(username);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const currenttime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
    const onWriteSuc = () => {  // 게시판 완료
        if(!title || !discription){
            alert(`제목과 본문을 입력해주세요.`)
        } else {
            console.log(currenttime)
            const newPostRef = push(dataRef);
            set(newPostRef, {                          // 디비 입력
                title: title,
                discription: discription,
                authour: authour,
                time: currenttime,
            })
            alert('게시글 작성이 완료되었습니다.')
            navigation.navigate('Home', { username, isAdmin })
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            </View>
            <View style={styles.content}>
                <TextInput
                    placeholder="제목을 입력해주세요."
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholder="본문을 입력해주세요."
                    value={discription}
                    onChangeText={setDiscription}
                />
            </View>
            <View style={styles.footer}>  
                <Button title="완료" onPress={onWriteSuc}/>
            </View>
        </SafeAreaView>
    )
}
export default WriteBoardScreen;