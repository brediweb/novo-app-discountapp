import React from 'react'
import { useNavigate } from '../../hooks/useNavigate'
import { View, TouchableOpacity, Text } from 'react-native'

interface PropsNotificacao {
  onPress: any
  titulo: string
  subtitulo: string
  descricao: string
  visualizado: boolean
}

export default function CardNotificacao(
  {
    titulo,
    subtitulo,
    descricao,
    onPress,
    visualizado
  }: PropsNotificacao) {

  const { navigate } = useNavigate()

  return (
    <TouchableOpacity onPress={onPress} className='mx-4'>
      <View className="mt-3">
        <View className="flex-row items-center gap-2">
          {visualizado === false &&
            <View className="bg-[#DE3730] w-3 h-3 rounded-full"></View>
          }
          <Text className="text-base font-bold">{titulo} - {subtitulo}</Text>
        </View>
        <Text>{descricao}</Text>
        <View className="border-[1px] border-solid border-[#CDCDCD] mt-4"></View>
      </View>
    </TouchableOpacity>
  )
}



