import React from 'react'
import { View, Image, Text } from 'react-native'
import H6 from '../typography/H6'
import Paragrafo from '../typography/Paragrafo'
import { colors } from '../../styles/colors'

interface PropsCardDepoimento {
  nome: string
  descricao: string
  imagem?: string
  created_at: string
}

export default function CardDepoimento({ nome, descricao, imagem, created_at }: PropsCardDepoimento) {
  const getInitials = (fullName: string = ''): string => {
    const names = fullName.trim().split(' ').filter(Boolean);
    if (names.length === 0) return '';
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <View 
      className='rounded-xl p-4 mb-4'
      style={{
        backgroundColor: '#F7F2F9',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3.05,
        elevation: 3,
      }}
    >
      <View className='flex-row items-start mb-3'>
        {imagem && imagem !== '-' ? (
          <Image 
            source={{ uri: imagem }} 
            className='w-14 h-14 rounded-full mr-3'
            style={{ backgroundColor: colors.primary40 }}
          />
        ) : (
          <View 
            className='w-14 h-14 rounded-full items-center justify-center mr-3'
            style={{ backgroundColor: colors.primary40 }}
          >
            <Text className='text-lg text-white font-semibold'>
              {getInitials(nome)}
            </Text>
          </View>
        )}
        <View className='flex-1'>
          <H6>{nome}</H6>
          {created_at && (
            <Text className='text-xs text-[#ADAAAF] mt-1'>{created_at}</Text>
          )}
        </View>
      </View>
      <Paragrafo title={descricao} color={colors.blackdark} />
    </View>
  )
}

