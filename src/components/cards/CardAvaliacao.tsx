import React from 'react'
import H6 from '../typography/H6'
import { View, Image, Text } from 'react-native'
import CardAvaliacaoEstrelasGeral from './CardAvaliacaoEstrelasGeral'

interface PropsCard {
  data: string
  avatar?: any
  title: string
  media?: number
}

export default function CardAvaliacao({ title, data, media, avatar }: PropsCard) {
  return (
    <View className='flex-row gap-2 mt-3'>
      <View className='bg-[#F0F0F0] w-12 h-12 items-center justify-center rounded-full'>
        {avatar
          ? <Image source={{ uri: avatar }} />
          : <Image source={require('../../../assets/img/icons/user.png')} />
        }
      </View>

      <View className='flex-1'>
        <H6>{title}</H6>
        <View className='flex-row w-full relative'>
          <H6>{media} </H6>
          <CardAvaliacaoEstrelasGeral estrelas={media ?? 0} />
          <View className='absolute right-0 bottom-0'>
            <Text className='text-[#ADAAAF] font-medium'>{data}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
