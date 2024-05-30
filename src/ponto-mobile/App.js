import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PaginaInicial from "./src/pages/PaginaInicial";
import TabelaPonto from "./src/pages/TabelaPonto";
import Profile from './src/pages/Profile';

export default function App() {
  return (
    <View style={styles.container}>
      <Profile></Profile>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
