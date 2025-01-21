import React, { useState } from 'react'
import H1 from '../typography/H1'
import Caption from '../typography/Caption'
import { View, Image, Linking, Modal, TouchableOpacity, ScrollView } from 'react-native'
import ButtonOutline from '../buttons/ButtonOutline'
import { useNavigate } from '../../hooks/useNavigate'
import { useIsFocused } from '@react-navigation/native'
import H3 from '../typography/H3'

interface ICardAnuncio {
  nome: string
  imagem: string
  latitude: string
  descricao: string
  longitude?: string
  descricao_oferta?: string
}

export default function CardAnuncio(
  {
    nome,
    imagem,
    latitude,
    descricao,
    longitude,
    descricao_oferta
  }: ICardAnuncio) {

  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [modalVisibleDetalhes, setModalVisibleDetalhes] = useState(false)

  return (
    <>
      <Modal visible={modalVisibleDetalhes} animationType='slide' >
        <View className='flex-1 w-full ' style={{ backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
          <View className='flex-1  bg-white pt-4 my-20 mx-4 rounded-lg'>
            <TouchableOpacity onPress={() => setModalVisibleDetalhes(false)} className='flex-row w-full px-2'>
              <Image source={require('../../.././assets/img/icons/seta-esquerda.png')} />
              <H3>Detalhes da oferta</H3>
            </TouchableOpacity>
            <ScrollView className='my-4 px-4'>
              <Caption fontSize={12} >
                {descricao_oferta}
              </Caption>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View
        className='rounded-t-xl rounded-b-xl drop-shadow-md mx-1.5 mb-3 mt-3'
        style={{
          shadowColor: "#000000",
          backgroundColor: '#F7F2F9',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.40,
          shadowRadius: 4.05,
          elevation: 5,
        }}>
        <View className='items-center py-3 mb-3'>
          <View className='mx-auto my-4 px-2'>
            <View className='bg-[#EEF0FF] border-solid border-[1px] border-[#BFC6FF] mx-auto px-4 py-1 rounded-2xl'>
              <Caption>
                Anúncio
              </Caption>
            </View>
            <H1
              align={'center'}
              title={nome}
            />
          </View>

          <Image
            resizeMode='contain'
            source={{ uri: imagem }}
            className='w-[90%] h-80 rounded-xl'
          />

          <View className='mx-3 my-4'>
            <Caption>
              {descricao}
            </Caption>
          </View>

          <View className=' w-2/3 mt-6'>
            <ButtonOutline
              title='Ver mais'
              onPress={() => setModalVisibleDetalhes(true)}
            />
          </View>
        </View >
      </View >
    </>

  )
}



