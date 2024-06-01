import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PaginaInicial from "./src/pages/PaginaInicial";
import TabelaPonto from "./src/pages/TabelaPonto";

import Profile from './src/pages/Profile';
import RegistroPonto from "./src/pages/RegistroPonto";


export default function App() {
  return (
    <View style={styles.container}>
      <PaginaInicial></PaginaInicial>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
