import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { colors } from '../../../styles/colors'

interface PropsMenuItem {
  titulo: string,
  icon: any,
  onPress: any,
}

export default function MenuItem({ titulo, icon, onPress }: PropsMenuItem) {
  return (
    <TouchableOpacity onPress={onPress} className='pl-4 py-4 pr-6 flex-row gap-2 items-center'>
      <Image source={icon} />
      <Text
        className='text-base font-medium leading-6'
        style={{ color: colors.primary20 }}
      >{titulo}</Text>
    </TouchableOpacity>
  )
}
