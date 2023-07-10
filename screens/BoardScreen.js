import { useState } from 'react';
import { View, Text, Button, SafeAreaView, Image } from 'react-native';

import styles from '../styles/style';

import {database, ref, get, storage, getDownloadURL, storageRef } from "../fb";


const dataRef = ref(database, "boards");   // 디비 설정

const BoardScreen = ({ navigation, route }) => {
    
    const { username, userid, isAdmin, carrier, boardId } = route.params;
    const [ boardcarrier, setBoardCarrier] = useState('')
    const [ title, setTitle] = useState('')
    const [ author, setAuthor] = useState('')
    const [ description, setDescription] = useState('')
    
    const imageRef = storageRef(storage, 'images/my-image.jpeg');
    const [imageUrl, setImageUrl] = useState('')

    const readBoard = async() => {
        try{
            const imageURL = await getDownloadURL(imageRef);
            console.log(imageURL)
            console.log(imageUrl)
            setImageUrl(imageURL)
            const snapshot = await get(dataRef); // 데이터 읽기
            const data = snapshot.val();
            setBoardCarrier(data[boardId].carrier)
            setTitle(data[boardId].title)
            setAuthor(data[boardId].author)
            setDescription(data[boardId].description)

        } catch (error){
            console.log("err입니다.", error)
        }
    }
    readBoard()
    const onPreBtn = () => {
        navigation.navigate('Home', {username, userid, carrier, isAdmin})
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View style={styles.content}>
                <Text>{boardcarrier}</Text>
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