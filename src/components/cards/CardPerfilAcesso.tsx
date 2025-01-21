import React from 'react'
import H2 from '../typography/H2'
import Container from '../layout/Container'
import Paragrafo from '../typography/Paragrafo'
import FilledButton from '../buttons/FilledButton'
import { Image, View, TouchableOpacity } from 'react-native'


export default function CardPerfilAcesso(
  {
    svg,
    titulo,
    imagem,
    buttons,
    descricao,
    navigation,
    imagemIndicator,
  }:
    {
      svg?: any,
      imagem?: any,
      titulo: string,
      navigation: any,
      buttons: boolean,
      descricao: string,
      imagemIndicator: any,
    }) {

  return (
    <Container>
      <View className='flex-1 items-center justify-center' >

        <View></View>

        <View className='items-center'>
          {imagem &&
            <Image resizeMode='cover' source={imagem} />
          }
          {svg &&
            svg
          }
          <H2 title={titulo} />
          <Paragrafo
            align={'center'}
            title={descricao}
          />
        </View>
        <Image source={imagemIndicator} className='mt-6' />
      </View>

      {buttons &&
        <TouchableOpacity
          onPress={() => navigation.navigate('TelefoneScreen')}
          className='absolute right-10 bottom-4 flex-row items-center'
        >
          <Paragrafo title='Pular' />
          <Image
            className='ml-2'
            source={require('../../../assets/img/icons/seta-direita.png')}
          />
        </TouchableOpacity>
      }

      {!buttons && <FilledButton onPress={() => navigation.navigate('TelefoneScreen')} title='Vamos lá' />}
    </Container>
  )
}
