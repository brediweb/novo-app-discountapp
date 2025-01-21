import Main from './Main'
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import ContentBottomDrawer from '../bottom/ContentBottomDrawer'
import { useGlobal } from '../../context/GlobalContextProvider'
import ContentBottomCliente from '../bottom/ContentBottomCliente'
import ButtonsTecladoCamera from '../buttons/Cliente/ButtonsTecladoCamera'
import Loading from '../Loading'

interface PropsMainLayoutAuth {
  children: any,
  marginTop?: number,
  bottomDrawer?: boolean,
  buttonCamera?: boolean,
  marginHorizontal?: number,
  loadign?: boolean
}

export default function MainLayoutAutenticadoSemScroll(
  {
    children,
    marginTop,
    buttonCamera,
    bottomDrawer,
    marginHorizontal,
    loadign
  }: PropsMainLayoutAuth) {
  const { tipoUser } = useGlobal()

  return (
    <Main>
      { loadign &&
        <Loading />
      }
      <View className='flex-1' style={{ marginTop: marginTop ?? 80, marginHorizontal: marginHorizontal ?? 16 }}>
        {children}
      </View>
      <View className='h-12'></View>

      {buttonCamera &&
        <ButtonsTecladoCamera />
      }
      {bottomDrawer &&
        <>
          {tipoUser === 'Anunciante'
            ? <ContentBottomCliente />
            : <ContentBottomDrawer />
          }
        </>
      }
    </Main>
  )
}
