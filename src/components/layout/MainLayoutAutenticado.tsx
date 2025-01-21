import Main from './Main'
import React from 'react'
import Loading from '../Loading'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import ContentBottomDrawer from '../bottom/ContentBottomDrawer'
import { useGlobal } from '../../context/GlobalContextProvider'
import ContentBottomCliente from '../bottom/ContentBottomCliente'
import ButtonsTecladoCamera from '../buttons/Cliente/ButtonsTecladoCamera'

interface PropsMainLayoutAuth {
  children: any,
  notScroll?: any,
  loading?: boolean,
  marginTop?: number,
  bottomDrawer?: boolean,
  buttonCamera?: boolean,
  marginHorizontal?: number,
}

export default function MainLayoutAutenticado(
  {
    loading,
    children,
    notScroll,
    marginTop,
    buttonCamera,
    bottomDrawer,
    marginHorizontal,
  }: PropsMainLayoutAuth) {
  const { tipoUser } = useGlobal()

  return (
    <Main>
      {loading &&
        <Loading />
      }
      {notScroll ?
        <View style={{ marginTop: marginTop ?? 96, marginHorizontal: marginHorizontal ?? 16 }}>
          {children}
          < View className='h-24'></View>
        </View>
        :
        <ScrollView contentContainerStyle={{ marginTop: marginTop ?? 80, marginHorizontal: marginHorizontal ?? 16 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          {children}
          <View className='h-24'></View>
        </ScrollView>
      }
      {
        buttonCamera &&
        <ButtonsTecladoCamera />
      }
      {
        bottomDrawer &&
        <>
          {tipoUser === 'Anunciante'
            ? <ContentBottomCliente />
            : <ContentBottomDrawer />
          }
        </>
      }
    </Main >
  )
}
