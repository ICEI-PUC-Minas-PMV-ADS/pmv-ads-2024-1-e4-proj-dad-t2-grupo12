import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaInicial from './src/pages/PaginaInicial';
import RegistroPonto from './src/pages/RegistroPonto';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PaginaInicial">
                <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{ headerShown: false }} />
                <Stack.Screen name="RegistroPonto" component={RegistroPonto} options={{ title: 'Registro de Ponto' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
