import React from 'react'
import { Image } from 'react-native'
import { colors } from '../../styles/colors'
import CustomHeader from '../../components/header'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PageScreenDefault from '../../screens/Dashboard/ScreensSemAuth/PageScreenDefault'
import AnuncianteHomeSemAuth from '../../screens/Dashboard/ScreensSemAuth/Anunciante/AnuncianteHomeSemAuth'
import ModalTemplateLoginAnunciante from '../../components/Modals/ModalTemplateLoginAnunciante'

const Tab = createBottomTabNavigator();

export default function SemAuthTabNavigation() {

  const [modalLoginCliente, setModalLoginCliente] = React.useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          header: (props) => <CustomHeader {...props} />,

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('../../../assets/img/icons/house-focus.png')
                : require('../../../assets/img/icons/house.png')
            } else if (route.name === 'Anúncio') {
              iconName = focused
                ? require('../../../assets/img/icons/plus-focus.png')
                : require('../../../assets/img/icons/plus.png')
            } else if (route.name === 'Utilizados') {
              iconName = focused
                ? require('../../../assets/img/icons/utilizados-focus.png')
                : require('../../../assets/img/icons/utilizados.png')
            }
            return <Image source={iconName} />;
          },
          tabBarActiveTintColor: '#FFF',
          tabBarInactiveTintColor: '#FFF',
          tabBarStyle: {
            height: 82,
            borderTopColor: 'transparent',
            backgroundColor: colors.secondary50,
            paddingBottom: 8
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ headerTitle: 'Home' }}
          component={AnuncianteHomeSemAuth}
        />
        <Tab.Screen
          name="Anúncio"
          options={{ headerTitle: 'Home' }}
          component={PageScreenDefault}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setModalLoginCliente(true);
              e.preventDefault();
            },
          })}
        />
        <Tab.Screen
          name="Utilizados"
          options={{ headerTitle: 'Home' }}
          component={PageScreenDefault}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setModalLoginCliente(true);
              e.preventDefault();
            },
          })}
        />
      </Tab.Navigator>

      <ModalTemplateLoginAnunciante visible={modalLoginCliente} onClose={() => setModalLoginCliente(false)} />
    </>
  );
}
