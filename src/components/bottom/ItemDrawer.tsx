
import React from 'react'
import { useNavigate } from '../../hooks/useNavigate'
import { Text, TouchableOpacity, Image } from 'react-native'

export default function ItemDrawer(
  {
    onPress,
    titulo,
    imagem
  }:
    {
      onPress: any,
      titulo: string,
      imagem: any
    }
) {
  const { navigate } = useNavigate();

  return (
    <TouchableOpacity onPress={onPress} className='items-center'>
      <Image className='mb-4' source={imagem} />
      <Text className='text-white'>{titulo}</Text>
    </TouchableOpacity>
  );
}
