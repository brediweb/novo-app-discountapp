import React from 'react'
import { View } from 'react-native'
import H3 from '../../../components/typography/H3'
import Paragrafo from '../../../components/typography/Paragrafo'
import HeaderPrimary from '../../../components/header/HeaderPrimary'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'

export default function TermoModeloScreen({ route }: any) {
  const termos = route.params.documento

  return (
    <>
      <MainLayoutAutenticado marginTop={0} marginHorizontal={0}>
        <HeaderPrimary
          titulo='Termos e Políticas'
        />
        <View className='mx-6 mt-4'>
          <H3>{termos.titulo}</H3>
          <Paragrafo
            title={termos.descricao_completa}
          />
        </View>
      </MainLayoutAutenticado>
    </>
  );
}


