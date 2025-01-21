import React, { useState } from 'react'
import Caption from '../typography/Caption'
import { colors } from '../../styles/colors'
import { View, TouchableOpacity, Text, Image, Modal, SafeAreaView } from 'react-native'
import { format } from 'date-fns';

interface PropsProduto {
  titulo: string
  imagem?: any
  codigo: string
  data_utilizado: string
  gerado: string
  data_gerado: string
  onPress: any
  status: string
}

export default function CardProdutoUtilizado(
  {
    titulo,
    imagem,
    codigo,
    data_utilizado,
    data_gerado,
    onPress,
    status
  }: PropsProduto) {

  const dataConvertidaCriacao = new Date(data_gerado)
  const dataConvertidaValidacao = new Date(data_utilizado)
  const dataFormatadaValidacao = format(dataConvertidaValidacao, 'dd/MM/yyyy')
  const dataFormatadaCriacao = format(dataConvertidaCriacao, 'dd/MM/yyyy')

  return (
    <TouchableOpacity onPress={onPress} className='flex-row rounded bg-[#F0F0F0] mt-3'>
      {imagem &&
        <Image source={{ uri: imagem }} className='w-16 h-full' />
      }

      <View className='mx-3 my-4'>
        <View className='w-4/5'>
          <Caption fontSize={16} fontWeight={'700'} color={colors.blackbase}>
            {titulo}
          </Caption>
        </View>
        {status === 'N'
          ?
          <Caption fontSize={14} fontWeight={'400'} color={colors.blackbase}>Criado: {dataFormatadaCriacao}</Caption>
          :
          <Caption fontSize={14} fontWeight={'400'} color={colors.blackbase}>Data de utilização: {dataFormatadaValidacao}</Caption>
        }
        <Caption fontSize={14} fontWeight={'400'} color={colors.blackbase}>Código do Cupom: {codigo}</Caption>
      </View>
    </TouchableOpacity>
  )
}



