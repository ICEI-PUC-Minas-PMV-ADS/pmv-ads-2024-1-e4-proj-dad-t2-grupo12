import React from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <Text style={styles.headerText}>Profile</Text>
        <Text style={styles.headerText}>Logout</Text>
      </View>
      <Image 
        source={{ uri: 'https://example.com/user-photo.jpg' }} 
        style={styles.profileImage} 
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.department}>Technology Department</Text>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Email: john.doe@example.com</Text>
        <Text style={styles.label}>CPF: 123.456.789-00</Text>
        <Text style={styles.label}>Data de Nascimento: 01/01/1990</Text>
        <Text style={styles.label}>Endereço: Rua Exemplo, 123</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Trocar Senha" 
          onPress={() => alert('Trocar Senha')} 
          color="#841584"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  department: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  userInfo: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: '10%',
  },
});

export default Profile;
