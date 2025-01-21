import React from 'react'
import H3 from '../typography/H3'
import LottieView from 'lottie-react-native'
import { TouchableOpacity } from 'react-native'

interface PropsCategoria {
  titulo: string,
  onPress?: any
}

export default function CardNotFound({ titulo, onPress }: PropsCategoria) {

  return (
    <TouchableOpacity onPress={onPress ? onPress : () => { }} className='items-center'>
      <LottieView style={{ width: 180, height: 180 }} source={require('../../animations/not-found.json')} autoPlay loop />
      <H3 align={'center'}>{titulo}</H3>
    </TouchableOpacity>

  )
}



