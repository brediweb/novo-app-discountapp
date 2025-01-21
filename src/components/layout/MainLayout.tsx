import React from 'react'
import Main from './Main'
import Loading from '../Loading'
import { ScrollView, View } from 'react-native'

interface PropsMainLayout {
  scroll?: any
  children: any
  carregando?: boolean
}

export default function MainLayout({ children, carregando, scroll }: PropsMainLayout) {

  return (
    <Main>
      {carregando && <Loading />}
      {scroll ?
        <View className='flex-1 mt-6'>
          {children}
        </View>
        :
        <ScrollView contentContainerStyle={{ flex: 1, marginTop: 24 }}>
          {children}
        </ScrollView>
      }
      <View className='h-8'></View>
    </Main>
  )
}
