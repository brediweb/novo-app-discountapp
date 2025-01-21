import { colors } from '../../../styles/colors'
import React, { useEffect, useState } from 'react'
import H5 from '../../../components/typography/H5'
import { View, Image, Platform } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { MaskedTextInput } from 'react-native-mask-text'
import { useNavigate } from '../../../hooks/useNavigate'
import MainLayout from '../../../components/layout/MainLayout'
import { useGlobal } from '../../../context/GlobalContextProvider'
import FilledButton from '../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../components/header/HeaderPrimary'

export default function TelefoneScreen({ navigation }: { navigation: any }) {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [telefone, setTelefone] = useState('')
  const [erroChecked, setErroChecked] = useState(false)
  const { setTelefoneDigitado, telefoneDigitado } = useGlobal()

  async function postTelefone() {
    navigation.navigate('ValidaCodigoScreen')
  }


  useEffect(() => {
    setTelefone(telefoneDigitado)
  }, [isFocused])

  return (
    <MainLayout>
      <View className='flex-1 justify-between items-center mb-8'>
        <HeaderPrimary
          titulo='Validação do número do telefone'
          descricao='Vamos validar o número do seu telefone para a sua maior segurança.'
        />

        <View className='w-full items-center px-4'>
          <H5>Digite o número do seu telefone</H5>

          <View className='w-full max-w-xs border-spacing-1 border-[#79747E] border-2 rounded-md mt-4'>
            <Image
              className='absolute top-[8px] left-2'
              source={require('../../../../assets/img/icons/brasil.png')}
            />
            {Platform.OS === 'android' ?
              <View className='absolute left-14 top-[8px]'>
                <H5 color={colors.blackbase}>+55</H5>
              </View>
              :
              <View className='absolute left-14 top-[12px]'>
                <H5 color={colors.blackbase}>+55</H5>
              </View>
            }

            {telefoneDigitado === '' ? (
              <MaskedTextInput
                mask={'(99) 99999-9999'}
                maxLength={15}
                keyboardType='numeric'
                onChangeText={setTelefone}
                style={{ color: colors.blackbase }}
                className='h-[46px] pb-1 ml-24 text-xl font-medium'
              />
            ) : (
              <MaskedTextInput
                mask={'(99) 99999-9999'}
                maxLength={15}
                value={telefoneDigitado}
                keyboardType='numeric'
                onChangeText={setTelefone}
                placeholder={telefoneDigitado}
                style={{ color: colors.blackbase }}
                className='h-[46px] pb-1 ml-24 text-xl font-medium'
              />
            )}
          </View>
        </View>

        <View className='w-full mt-4 px-8'>
          <FilledButton
            title='Confirmar'
            onPress={() => postTelefone()}
          />
        </View>
      </View >
    </MainLayout>
  );
}


