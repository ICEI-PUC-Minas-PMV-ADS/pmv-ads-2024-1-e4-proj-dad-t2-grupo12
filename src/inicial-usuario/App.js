import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

export default function App() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const date = new Date().toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });
    setCurrentDate(date);

    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      });
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const userName = 'Leo'; // Substitua pelo nome do usuário

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity>
        <Image
          source={require('./assets/image15.png')}
          style={styles.headerImage}
        />
        </TouchableOpacity>
        <Text style={styles.welcome}>Bem vindo, {userName}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>{currentDate}</Text>
          <Text style={styles.time}>{currentTime}</Text>
        </View>
        <View style={styles.menu}>
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require('./assets/image11.png')}
                style={styles.menuItemImage}
              />
              <Text style={styles.menuItemText}>Registrar ponto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require('./assets/image12.png')}
                style={styles.menuItemImage}
              />
              <Text style={styles.menuItemText}>Perfil</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require('./assets/image13.png')}
                style={styles.menuItemImage}
              />
              <Text style={styles.menuItemText}>Saldos e holerite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require('./assets/image14.png')}
                style={styles.menuItemImage}
              />
              <Text style={styles.menuItemText}>Espelho</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sloganContainer}>
          <Image
            source={require('./assets/logotransparente21.png')}
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.footer}></View>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

          body {
            font-family: 'Inter', sans-serif;
          }
        `}
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

          body {
            font-family: 'DM Sans', sans-serif;
            font-weight: 500;
          }

          .medium {
            font-family: 'DM Sans Medium', sans-serif;
            font-weight: 700;
          }
        `}
      </style>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff', // Fundo branco
    padding: 20,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 26,
    color: 'rgba(252, 163, 17, 1)', // Amarelo
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  body: {
    flex: 1,
    backgroundColor: 'rgba(19, 33, 60, 1)', // Azul-marinho
    padding: 20,
    justifyContent: 'flex-start', // Alinhamento no topo
    alignItems: 'center',
    borderTopLeftRadius: 25, // Raio de canto superior esquerdo
    borderTopRightRadius: 25, // Raio de canto superior direito
    overflow: 'hidden', // Para garantir que o raio de canto seja exibido corretamente
  },
  dateTimeContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  date: {
    fontSize: 26,
    color: '#fff', // Branco
    marginBottom: 1,
    fontFamily: 'Inter',
  },
  time: {
    fontSize: 26,
    color: '#fff', // Branco
    fontFamily: 'Inter',
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: '#fff', // Fundo branco
    padding: 35,
    margin: 10,
    borderRadius: 15,
    width: '45%', // Ajuste a largura para caber lado a lado
    alignItems: 'center',
  },
  menuItemText: {
    color: 'rgba(19, 33, 60, 1)', // Azul-marinho
    fontSize: 13,
    alignItems: 'center',
    lineHeight: 30,
    letterSpacing: '-0.2px',
    textAlign: 'top',
    fontFamily: 'DM Sans Medium',
  },
  sloganContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footer: {
    backgroundColor: '#fff', // Fundo branco
    padding: 25,
  },
  headerImage: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -17,
    right: -175,
  },
});
