import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'; // Adicionado View e StyleSheet
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import styles from '../style/MainStyle';
import PaginaInicial from "./PaginaInicial";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const entrar = () => {
        navigation.reset({
            index:0,
            routes: [{name:"PaginaInicial"}]
        })
    };
    //
    // const cadastrar = () => {
    //     navigation.navigate("Cadastro")
    // };


    return (
        <View style={[styles.container, styles.specificContainer]}>
            <Text h3>Entrar no App</Text>
            <Input
                placeholder='E-mail'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={value => setEmail(value)}
                keyboardType='email-address'
            />
            <Input
                placeholder='Digite a senha'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
            />
            <Button
                icon={
                    <Icon
                        name="check"
                        size={15}
                        color="white"
                    />
                }
                title=" Entrar"
                buttonStyle={styles.button}
                onPress={() =>entrar()}
            />


            {/*<Button*/}
            {/*    icon={*/}
            {/*        <Icon*/}
            {/*            name="user"*/}
            {/*            size={15}*/}
            {/*            color="white"*/}
            {/*        />*/}
            {/*    }*/}
            {/*    title=" Cadastrar"*/}
            {/*    buttonStyle={styles.button}*/}
            {/*    onPress={() => cadastrar()}*/}
            {/*/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    specificContainer: {
        backgroundColor: '#fff'
    },
    button:{
        width: "100%",
        marginTop: 10
    },
    container:{
        flex: 1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
    },
    maskedInput:{
        flexGrow:1,
        height:40,
        fontSize:18,
        borderBottomColor:"#999",
        borderBottomWidth:1,
        borderStyle:"solid",
        alignSelf:"flex-start"
    },
    containerMask:{
        flexDirection:"row",
        marginBottom:5,
        marginLeft:10,
        marginRight:10
    },
    errorMessage:{
        alignSelf:"flex-start",
        marginLeft: 10,
        color:"#f00",
        fontSize:12,
    }
});

export default Login;
