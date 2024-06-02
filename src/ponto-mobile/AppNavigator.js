import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaInicial from './src/pages/PaginaInicial';
import RegistroPonto from './src/pages/RegistroPonto';
import Profile from "./src/pages/Profile";
import TabelaPonto from "./src/pages/TabelaPonto";
import Holerite from "./src/pages/Holerite";
import SolicitarAlteracao from "./src/pages/SolicitarAlteracao";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PaginaInicial">
                <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{ headerShown: false }} />
                <Stack.Screen name="RegistroPonto" component={RegistroPonto} options={{ title: 'Registro de Ponto' }} />
                <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
                <Stack.Screen name="TabelaPonto" component={TabelaPonto} options={{ title: 'TabelaPonto' }} />
                <Stack.Screen name="Holerite" component={Holerite} options={{ title: 'Holerite' }} />
                <Stack.Screen name="SocilitarAlteracao" component={SolicitarAlteracao} options={{ title: 'SocilitarAlteracao' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
