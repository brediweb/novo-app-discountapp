import { api } from '../../../service/api'
import Toast from 'react-native-toast-message'
import { colors } from '../../../styles/colors'
import { useNavigate } from '../../../hooks/useNavigate'
import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../../components/layout/MainLayout'
import Paragrafo from '../../../components/typography/Paragrafo'
import { useGlobal } from '../../../context/GlobalContextProvider'
import FilledButton from '../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../components/header/HeaderPrimary'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Keyboard } from 'react-native'


export default function ValidaCodigoScreen({ navigation }: { navigation: any }) {
  const { navigate } = useNavigate()
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')
  const [input4, setInput4] = useState('')
  const [input5, setInput5] = useState('')
  const [input6, setInput6] = useState('')
  const input1Ref = useRef<TextInput>(null)
  const input2Ref = useRef<TextInput>(null)
  const input3Ref = useRef<TextInput>(null)
  const input4Ref = useRef<TextInput>(null)
  const input5Ref = useRef<TextInput>(null)
  const input6Ref = useRef<TextInput>(null)
  const [seconds, setSeconds] = useState(30)
  const [loading, setLoading] = useState(false)
  const { telefoneDigitado, tipoUser } = useGlobal()

  const focusNextInput = (nextInput: React.RefObject<TextInput>) => {
    nextInput.current?.focus()
  }

  const hideKeyboard = () => {
    Keyboard.dismiss()
  }

  async function reenviaCodigo() {
    setLoading(true)
    const jsonPerfil = await AsyncStorage.getItem('dados-perfil')

    if (jsonPerfil) {
      const jsonPefil = JSON.parse(jsonPerfil)
      try {
        const response = await api.post(`/valida-codigo/reenvia`, {
          id: jsonPefil
        })
        Toast.show({
          type: 'success',
          text1: response.data.message ?? 'Código reenviado com sucesso',
        })
        setSeconds(30)
      } catch (error: any) {
        console.log('ERROR reenvio de código POST: ', error.response.data)
        Toast.show({
          type: 'error',
          text1: error.response.data.message ?? 'Ocorreu um erro, tente novamente!',
        })
      }
    }
    setLoading(false)
  }

  async function validaCodigo() {
    if (telefoneDigitado.length < 11) {
      Toast.show({
        type: 'error',
        text1: 'Edite e informe um telefone válido !',
      })
      return;
    }

    setLoading(true)
    const jsonPerfil = await AsyncStorage.getItem('id-user')

    if (jsonPerfil) {
      try {
        const response = await api.post(`/valida-codigo/valida`, {
          id: jsonPerfil,
          codigo: `${input1}${input2}${input3}${input4}${input5}${input6}`
        })
        Toast.show({
          type: 'success',
          text1: response.data.message ?? 'Código validado com sucesso',
        })
        setSeconds(30)
        if (tipoUser === 'Anunciante') {
          navigation.navigate('CadastroSucessoAnuncianteScreen')
        } else {
          navigation.navigate('CadastroSucessoScreen')
        }
      } catch (error: any) {
        console.log('ERROR reenvio de código POST: ', error)
        Toast.show({
          type: 'error',
          text1: error.response.data.message ?? 'Ocorreu um erro, tente novamente!',
        })
      }
      setLoading(false)
      return;
    } else {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu algum erro, tente novamente mais tarde!',
      })
      setLoading(false)
      return;
    }
  }

  function skipValidacao() {
    if (tipoUser === 'Anunciante') {
      navigation.navigate('CadastroSucessoAnuncianteScreen')
    } else {
      navigation.navigate('CadastroSucessoScreen')
    }
  }



  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)

    if (seconds === 0) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  return (
    <MainLayout carregando={loading}>
      <HeaderPrimary titulo='Confirmação do código' />
      <View className='flex-1 justify-between items-center mb-8'>

        <View></View>

        <View className='w-full items-center px-4'>
          <Paragrafo
            align={'center'}
            title='Um código foi enviado para o número: '
          />
          <Paragrafo
            align={'center'}
            title={`+55 ${telefoneDigitado}`}
          />
          <TouchableOpacity onPress={() => navigation.navigate('TelefoneScreen')}>
            <Paragrafo
              color={colors.secondary30}
              title='Editar o número do telefone'
            />
          </TouchableOpacity>

          <View className='flex-row my-4'>

            <TextInput
              ref={input1Ref}
              className='text-2xl border-b-2 border-[#54006E] w-[50%] text-center'
              keyboardType="numeric"
              maxLength={6}
              onChangeText={(text) => {
                setInput1(text)
              }}
            />


          </View>


          <View className='flex-row mb-2'>
            {seconds == 0 ?
              <FilledButton onPress={reenviaCodigo} title='Enviar novamente' />
              :
              <>
                <Paragrafo
                  align={'center'}
                  title='Reenviando em '
                />
                <Text style={{
                  fontSize: 14,
                  lineHeight: 18,
                  fontWeight: '700',
                }}>{seconds}s</Text>

              </>
            }
          </View>
        </View>

        <View className='w-full items-center px-4'>
          <View className='w-full'>
            <FilledButton onPress={validaCodigo} title={'Confirmar'} />
          </View>
          <View className='w-full mt-2'>
            <FilledButton
              onPress={skipValidacao}
              title={'Pular verificação'}
              backgroundColor={colors.gray}
            />
          </View>
        </View>
      </View >
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
    width: 40,
    height: 40,
    fontSize: 24,
    borderRadius: 4,
    color: '#775AFF',
    borderWidth: 0.8,
    fontWeight: '500',
    textAlign: 'center',
    borderColor: colors.secondary70,
    backgroundColor: colors.primary90,
  },
});

function setSeconds(arg0: (prevSeconds: any) => number) {
  throw new Error('Function not implemented.')
}

