import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PaginaInicial from "./src/pages/pagina-inicial/PaginaInicial";

export default function App() {
  return (
    <View style={styles.container}>
      <PaginaInicial></PaginaInicial>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
