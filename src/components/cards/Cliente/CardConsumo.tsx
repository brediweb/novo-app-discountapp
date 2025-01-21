import React from 'react'
import { View } from 'react-native'
import H3 from '../../typography/H3'
import H1 from '../../typography/H1'
import { colors } from '../../../styles/colors'
import { useNavigate } from '../../../hooks/useNavigate'

interface PropsConsumo {
  titulo: string,
  quantidade: any,
}

export default function CardConsumo({ titulo, quantidade }: PropsConsumo) {
  const { navigate } = useNavigate()

  return (
    <View className='items-end mt-6' style={{ borderBottomColor: colors.tertiary20, borderBottomWidth: 1 }}>
      <H3 color={colors.tertiary20}>
        {titulo}
      </H3>
      <H1
        title={quantidade}
        fontWeight={'500'}
        fontsize={36}
        color={colors.tertiary20}
      />
    </View>
  )
}



