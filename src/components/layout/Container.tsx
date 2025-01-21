import React from 'react'
import { View } from 'react-native'

export default function Container({ children }: { children: any }) {
  return (
    <View className='mt-10 mx-4'>{children}</View>
  )
}
