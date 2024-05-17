import React, { useState } from 'react';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';


export default function LoginDs({navigation}) {
  
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const entrar = () => {
    console.log("entrou")
    console.log(email)
    console.log(password)

    }
    
   return (
    <View style={[styles.container, specificStyle.specificContainer]}>
      <Text h3>Entrar no App </Text>
      <Input 
      placeholder='E-mail'
      leftIcon = {{type: 'font-awesome', name:'envelope'}}
      onChangeText={value => setEmail(value)}
      keyboardType='email-address'> 
      </Input>
      <Input 
      placeholder='Digite a senha'
      leftIcon = {{type: 'font-awesome', name:'lock'}}
      onChangeText={value => setPassword(value)}
      secureTextEntry = {true}> 
      </Input>
      
      <Button
        icon={
          <Icon 
            name="check"
            size={15}
            color="white"
          />
        }
        title="Entrar"
        onPress={() => entrar()}
      />
    </View>
  );
}
const specificStyle = StyleSheet.create({
  specificContainer:{
    backgroundColor: '#fff'
  }
})

