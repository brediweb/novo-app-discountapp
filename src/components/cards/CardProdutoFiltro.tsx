import React, { useState } from 'react'
import Paragrafo from '../typography/Paragrafo'
import { View, TouchableOpacity, Text, Image } from 'react-native'

interface PropsProduto {
  nome_empresa?: string,
  nome_filial?: string,
  imagem_capa?: any,
  foto_user?: any,
  nome_produto?: string,
  data_validade?: string,
  descricao_simples?: string,
  descricao_completa?: string,
  qr_code?: any,
  like_produto?: any,
}

export default function CardProdutoFiltro(
  { nome_empresa,
    nome_filial,
    imagem_capa,
    foto_user,
    nome_produto,
    data_validade,
    descricao_completa,
    descricao_simples,
    like_produto,
    qr_code
  }: PropsProduto) {

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleDetalhes, setModalVisibleDetalhes] = useState(false)

  return (
    <>
      <View
        className='rounded-t-xl rounded-b-xl drop-shadow-md mb-3 mt-3'
        style={{
          backgroundColor: '#F7F2F9',
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.40,
          shadowRadius: 4.05,
          elevation: 5,
        }}>
        <View className='flex-row items-center py-3 px-2 mb-2'>
          <View className='flex-row w-full items-center justify-start'>
            {foto_user ?
              <Image className='mr-2' source={{ uri: foto_user }} />
              :
              <Image className='mr-2' source={require('../../../assets/img/temporarios/people.png')} />
            }
            <View className='w-full' style={{ maxWidth: '78%' }}>
              <Text className='text-base font-medium' >{nome_empresa}</Text>
              <Text className='text-sm'>{nome_filial}</Text>
            </View>
            <TouchableOpacity onPress={() => { }} className='absolute right-0'>
              <Image source={require('../../../assets/img/icons/favorito.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View className='w-full bg-red-600'>
          <Image source={require('../../../assets/img/temporarios/produto-capa.png')} className='w-full' resizeMode='cover' />
        </View>
        <View className="px-4 mt-4 mb-4">
          <Text
            className='text-base'
          >{nome_produto}</Text>
          <Text
            className='text-sm mb-8'
          >Validade até {data_validade}</Text>
          <Paragrafo title={descricao_simples ?? ''} />
        </View>
      </View>
    </>

  )
}



