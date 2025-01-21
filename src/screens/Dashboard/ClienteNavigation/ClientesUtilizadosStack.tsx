import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClienteUtilizadosScreen from './ClienteUtilizadosScreen';


const Stack = createNativeStackNavigator();

export default function ClientesUtilizadosStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="ClienteUtilizadosScreen"
      >
        <Stack.Screen name="ClienteUtilizadosScreen" component={ClienteUtilizadosScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
