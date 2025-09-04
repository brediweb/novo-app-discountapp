import { colors } from '../../../../styles/colors'
import React, { useState, useEffect } from 'react'
import { Image, View, Linking } from 'react-native'
import H3 from '../../../../components/typography/H3'
import { useIsFocused } from '@react-navigation/native'
import { useNavigate } from '../../../../hooks/useNavigate'
import IcoLocalizacao from '../../../../svg/IcoLocalizacao'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Caption from '../../../../components/typography/Caption'
import HeaderPrimary from '../../../../components/header/HeaderPrimary'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'

interface IPropsOferta {
  cnpj: string
  empresa: string
  latitude: string
  longitude: string
  data_criacao: string
  titulo_oferta: string
  imagem_empresa: string
  vantagem_reais: string
  categoria_cupom: string
  descricao_oferta: string
  imagem_anunciante: string
  descricao_empresa: string
}

export default function FiltroDetalheLocalizacaoScreen({ route }: { route?: any }) {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [listaOfertas, setListaOfertas] = useState<IPropsOferta>()

  useEffect(() => {
    setListaOfertas([] as any)
    setListaOfertas(route?.params?.item)
  }, [])

  useEffect(() => {
    if (isFocused) {
      setListaOfertas([] as any)
      setListaOfertas(route?.params?.item)
    }
  }, [isFocused])

  return (
    <MainLayoutAutenticado marginTop={0} marginHorizontal={0} bottomDrawer>
      <HeaderPrimary titulo='Resultado da busca' voltarScreen={() => navigate('FiltroLocalizacaoScreen')} />
      <View className='mx-6 pb-20'>
        <Caption fontSize={14} fontWeight={'400'}>1 estabelecimento encontrado na área</Caption>

        <View
          className='rounded-xl bg-[#EEF0FF] mt-6 p-4'
          style={{ borderColor: colors.secondary50, borderWidth: 3 }}
        >
          <Image
            className='w-full h-32 rounded-t-xl mb-2'
            source={{ uri: listaOfertas?.imagem_empresa }}
          />

          <H3>{listaOfertas?.empresa}</H3>

          <TouchableOpacity
            className='relative mt-1'
            onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${listaOfertas?.latitude},${listaOfertas?.longitude}`)}
          >
            <View className="absolute left-0">
              <IcoLocalizacao />
            </View>

            <View className='ml-4'>
              <Caption fontSize={14} color={'#296FF5'}>Traçar rota do endereço Endereço</Caption>
            </View>
            <View className='mt-2'>
              <Caption fontSize={14} color={'#1C1B1F'}>CNPJ: {listaOfertas?.cnpj}</Caption>
            </View>
          </TouchableOpacity>

          <View className='h-4'></View>
          <Caption fontSize={16}>
            {listaOfertas?.descricao_empresa}
          </Caption>
        </View>
      </View>
    </MainLayoutAutenticado>
  );
}
