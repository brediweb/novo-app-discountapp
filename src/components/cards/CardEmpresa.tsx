import React from 'react'
import Caption from '../typography/Caption'
import { colors } from '../../styles/colors'
import { View, Image, Text, TouchableOpacity } from 'react-native'

interface propsNotificacao {
  link?: any,
  imagem?: any
  title: string,
  descricao?: string,
  tituloOferta: string,
}

export default function CardEmpresa({ title, tituloOferta, link, descricao, imagem }: propsNotificacao) {

  const getInitials = (fullName: any): any => {
    const names = fullName.split(' ')

    if (names.length >= 2) {
      const firstNameInitial = names[0][0].toUpperCase()
      const secondNameInitial = names[1][0].toUpperCase()
      return `${firstNameInitial}${secondNameInitial}`
    } else if (names.length === 1) {
      // Se houver apenas um nome, retorne a inicial desse único nome.
      return names[0][0].toUpperCase()
    } else {
      // Caso não haja nenhum nome, retorne uma string vazia ou uma mensagem de erro.
      return ''
    }
  }

  return (
    <TouchableOpacity onPress={link} className='flex-row items-center rounded-lg p-4 mb-2' style={{ backgroundColor: colors.primary90 }}>
      {imagem ?
        <Image source={{ uri: imagem }} className='h-10 w-10 rounded-full' />
        :
        <View className='h-10 w-10 rounded-full items-center justify-center' style={{ backgroundColor: colors.primary40 }} >
          <Text className='text-base text-[#ffffff] font-medium' >{getInitials(title)}</Text>
        </View>

      }
      <View className='ml-2 w-[80%]'>
        <Caption fontSize={16} fontWeight={'500'} color={colors.primary20}>{title}</Caption>
        <View className='mt-1'></View>
        <Caption fontSize={14} fontWeight={'400'} color={colors.primary20}>{tituloOferta}</Caption>
        <View className='mt-1'></View>
        <Caption fontSize={14} fontWeight={'400'} color={colors.primary20}>{descricao}</Caption>
      </View>
    </TouchableOpacity>
  )
}
