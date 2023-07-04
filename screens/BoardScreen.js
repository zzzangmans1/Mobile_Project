import { useId, useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';

import styles from '../styles/style';

import {database ,ref,set, push, query, orderByChild, equalTo, get } from "../fb";


const dataRef = ref(database, "boards");   // 디비 설정

const BoardScreen = ({ navigation, route }) => {
    
    const { username, userid, isAdmin, boardId } = route.params;
    const [ title, setTitle] = useState('')
    const [ author, setAuthor] = useState('')
    const [ description, setDescription] = useState('')

    const readBoard = async() => {
        try{
            const snapshot = await get(dataRef); // 데이터 읽기
            const data = snapshot.val();
            setTitle(data[boardId].title)
            setAuthor(data[boardId].author)
            setDescription(data[boardId].description)

        } catch (error){
            console.log("err입니다.", error)
        }
    }
    readBoard()
    const onPreBtn = () => {
        navigation.navigate('Home', {username, userid, isAdmin})
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            </View>
            <View style={styles.content}>
                <Text>{title}</Text>
                <Text>{author}</Text>
                <Text>{description}</Text>
            </View>
            <View style={styles.footer}>  
                <Button title='완료' onPress={onPreBtn}></Button>
            </View>
        </SafeAreaView>
    )   
} 
export default BoardScreen;