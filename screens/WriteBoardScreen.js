import React, { useState } from 'react';
import { View, SafeAreaView, Button, TextInput  } from 'react-native';
import { database, ref, set, push, query, orderByChild, equalTo, get } from "../fb"
import styles from '../styles/style';

const dataRef = ref(database, "boards");   // 디비 설정

const WriteBoardScreen = ({ navigation, route }) => {
    const { username, isAdmin } = route.params;

    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');

    const onWriteSuc = () => {  // 로그아웃 로직 구현
        const newPostRef = push(dataRef);
        set(newPostRef, {                          // 디비 입력
            title: title,
            discription: discription,
        });
        alert('게시글 작성이 완료되었습니다.')
        navigation.navigate('Home', { username, isAdmin })
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