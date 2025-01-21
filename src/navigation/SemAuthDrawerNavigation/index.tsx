import * as React from 'react'
import SemAuthTabNavigation from '../SemAuthTabNavigation'
import { useGlobal } from '../../context/GlobalContextProvider'
import { createDrawerNavigator } from '@react-navigation/drawer'
import SemAuthHeaderTab from '../../components/header/SemAuthHeaderTab'
import SemAuthClienteTabNavigation from '../SemAuthClienteTabNavigation'
import { SemAuthCustomDrawerContent } from './SemAuthCustomDrawerContent'
import HomeSemAuth from '../../screens/Dashboard/ScreensSemAuth/HomeSemAuth'
import HomeSemAuthFiltradaScreen from '../../screens/Dashboard/ScreensSemAuth/HomeSemAuthFiltradaScreen'
import AnuncianteHomeSemAuth from '../../screens/Dashboard/ScreensSemAuth/Anunciante/AnuncianteHomeSemAuth'

const Drawer = createDrawerNavigator()

export default function SemAuthDrawerNavigation() {
  const { tipoUser } = useGlobal()

  return (
    <Drawer.Navigator
      drawerContent={(props) => <SemAuthCustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        header: (props) => <SemAuthHeaderTab {...props} />
      })}
    >
      {tipoUser === 'Anunciante' &&
        <>
          <Drawer.Screen options={{ headerTitle: 'Seja Bem-Vindo' }} name="SemAuthTabNavigation" component={SemAuthTabNavigation} />
          <Drawer.Screen options={{ headerTitle: 'Anunciante' }} name="AnuncianteHomeSemAuth" component={AnuncianteHomeSemAuth} />
        </>
      }
      {tipoUser === 'Cliente' &&
        <>
          <Drawer.Screen options={{ headerTitle: 'Seja Bem-Vindo' }} name="SemAuthCliennteTabNavigation" component={SemAuthClienteTabNavigation} />
          <Drawer.Screen options={{ headerTitle: 'Seja Bem-Vindo' }} name="HomeSemAuth" component={HomeSemAuth} />
          <Drawer.Screen options={{ headerTitle: 'Seja Bem-Vindo' }} name="HomeSemAuthFiltradaScreen" component={HomeSemAuthFiltradaScreen} />
        </>
      }
    </Drawer.Navigator>
  )
}
