import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PaginaInicial from "./src/pages/PaginaInicial";
import TabelaPonto from "./src/pages/TabelaPonto";
import RegistroPonto from "./src/pages/RegistroPonto";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistroPonto></RegistroPonto>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
