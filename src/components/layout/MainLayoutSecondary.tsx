import React from 'react'
import Main from './Main'
import Loading from '../Loading'
import { ScrollView } from 'react-native'
import { Dimensions, View } from 'react-native'

interface PropsLayoutSecondary {
  align?: any
  children: any
  loading?: boolean
}

export default function MainLayoutSecondary({ children, align, loading }: PropsLayoutSecondary) {
  const { height } = Dimensions.get('window');

  return (
    <Main>
      {loading &&
        <Loading />
      }
      <ScrollView contentContainerStyle={{ justifyContent: align ?? 'center', marginTop: 24 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {children}
        <View className='h-16'></View>
      </ScrollView>
    </Main>
  )
}
