import React from 'react';
import H3 from '../typography/H3'
import Caption from '../typography/Caption'
import { useNavigate } from '../../hooks/useNavigate'
import { View, TouchableOpacity, Image } from 'react-native'

interface PropsHeader {
  titulo: string
  voltarScreen?: any
  descricao?: string
}

export default function HeaderPrimary({ titulo, descricao, voltarScreen }: PropsHeader) {
  const { goBack } = useNavigate();

  function handleGoBack() {
    goBack()
  }

  return (
    <View>
      <View className='flex-row px-2 mt-4 items-center'>
        {voltarScreen ?
          <TouchableOpacity onPress={voltarScreen} className='flex-row px-2'>
            <Image
              source={require('../../../assets/img/icons/seta-esquerda.png')}
            />
            <H3>{titulo}</H3>
          </TouchableOpacity>
          :
          <TouchableOpacity className='flex-row px-2' onPress={handleGoBack}>
            <Image
              source={require('../../../assets/img/icons/seta-esquerda.png')}
            />
            <H3>{titulo}</H3>
          </TouchableOpacity>
        }
      </View>

      {descricao &&
        <View className='flex-row w-full px-6 mt-2'>
          <Caption>{descricao}</Caption>
        </View>
      }
    </View>
  )
}
