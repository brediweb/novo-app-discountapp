import React from 'react'
import { View, Text } from 'react-native'
import { useNavigate } from '../../hooks/useNavigate'

interface PropsNotificacao {
  data: string
  hora: string
  titulo: string
  descricao: string
}

export default function CardDetalheNotificacao(
  {
    data,
    hora,
    titulo,
    descricao,
  }: PropsNotificacao) {

  const { navigate } = useNavigate()

  return (
    <View className='mx-4'>
      <View className="mt-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-md font-medium">{data} - {hora}</Text>
        </View>
        <Text className='font-bold mt-2'>{titulo}</Text>
        {descricao &&
          <Text>{descricao}</Text>
        }
      </View>
    </View>
  )
}



