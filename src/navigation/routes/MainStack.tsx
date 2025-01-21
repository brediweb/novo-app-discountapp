import React from 'react'
import HomeDrawerNavigation from '../HomeDrawerNavigation'
import LoginScreen from '../../screens/Account/LoginScreen'
import SplashScreen from '../../screens/Account/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import SemAuthDrawerNavigation from '../SemAuthDrawerNavigation'
import LoginClienteScreen from '../../screens/Account/LoginClienteScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RecuperaSenhaScreen from '../../screens/Account/RecuperaSenhaScreen'
import SlidesScreen from '../../screens/Account/PrimeiroAcesso/SlidesScreen'
import LoginAnuncianteScreen from '../../screens/Account/LoginAnuncianteScreen'
import TelefoneScreen from '../../screens/Account/ValidaTelefone/TelefoneScreen'
import TermoModeloScreen from '../../screens/Account/ValidaTelefone/TermoModeloScreen'
import ValidaCodigoScreen from '../../screens/Account/ValidaTelefone/ValidaCodigoScreen'
import CadastroSucessoScreen from '../../screens/Account/Registro/CadastroSucessoScreen'
import FormPerfilScreen from '../../screens/Account/Registro/PessoaJuridica/FormPerfilScreen'
import TermosCadastrosScreen from '../../screens/Account/ValidaTelefone/TermosCadastrosScreen'
import FormPessoaFisicaScreen from '../../screens/Account/Registro/PessoaFisica/FormPessoaFisicaScreen'
import FormPessoaJuridicaScreen from '../../screens/Account/Registro/PessoaJuridica/FormPessoaJuridicaScreen'
import CadastroSucessoAnuncianteScreen from '../../screens/Account/Registro/PessoaJuridica/CadastroSucessoAnuncianteScreen'
import OnBoardingScreen from '../../screens/Account/OnBoardingScreen'

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SlidesScreen" component={SlidesScreen} />
        <Stack.Screen name="TelefoneScreen" component={TelefoneScreen} />
        <Stack.Screen name="ValidaCodigoScreen" component={ValidaCodigoScreen} />
        <Stack.Screen name="FormPessoaFisicaScreen" component={FormPessoaFisicaScreen} />
        <Stack.Screen name="FormPessoaJuridicaScreen" component={FormPessoaJuridicaScreen} />
        <Stack.Screen name="FormPerfilScreen" component={FormPerfilScreen} />
        <Stack.Screen name="TermosCadastrosScreen" component={TermosCadastrosScreen} />
        <Stack.Screen name="TermoModeloScreen" component={TermoModeloScreen} />
        <Stack.Screen name="CadastroSucessoScreen" component={CadastroSucessoScreen} />
        <Stack.Screen name="CadastroSucessoAnuncianteScreen" component={CadastroSucessoAnuncianteScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoginClienteScreen" component={LoginClienteScreen} />
        <Stack.Screen name="LoginAnuncianteScreen" component={LoginAnuncianteScreen} />
        <Stack.Screen name="RecuperaSenhaScreen" component={RecuperaSenhaScreen} />
        <Stack.Screen name="HomeDrawerNavigation" component={HomeDrawerNavigation} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen options={{ headerTitle: 'SemAuthDrawerNavigation' }} name="SemAuthDrawerNavigation" component={SemAuthDrawerNavigation} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
