import React from 'react'
import Caption from '../typography/Caption'
import { colors } from '../../styles/colors'
import { TouchableOpacity, Image, View } from 'react-native'
import IcoLocalizacao from '../../svg/IcoLocalizacao'

interface PropsFiltro {
  color?: any
  image?: any
  onPress?: any
  title: string
  fontsize?: number
  distancia?: number
}

export default function ButtonMapa({
  title,
  color,
  image,
  onPress,
  fontsize,
  distancia
}: PropsFiltro) {
  const limitadoTexto = title?.length > 26 ? `${title?.slice(0, 26)}...` : title;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ zIndex: 1000 }}
      className="rounded-3xl px-3 py-2 max-w-[152px] bg-[#C9BFFF]"
    >
      <View className='flex-row items-center max-w-[152px] gap-1'>
        <View className='bg-[#E5DEFF] p-1 rounded-full'>
          <IcoLocalizacao />
        </View>
        <View className='ml-2'>
          <Caption
            fontSize={12}
            color={colors.blackbase}
            fontWeight={'700'}
          >
            {limitadoTexto}
          </Caption>
        </View>
      </View>
    </TouchableOpacity>
  )
}

