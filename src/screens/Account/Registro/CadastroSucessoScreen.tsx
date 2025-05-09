import { View } from 'react-native'
import { api } from '../../../service/api'
import H2 from '../../../components/typography/H2'
import React, { useEffect, useState } from 'react'
import { useNavigate } from '../../../hooks/useNavigate'
import IcoMulherSucesso from '../../../svg/IcoMulherSucesso'
import MainLayout from '../../../components/layout/MainLayout'
import { useGlobal } from '../../../context/GlobalContextProvider'
import FilledButton from '../../../components/buttons/FilledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CadastroSucessoScreen() {
  const { navigate } = useNavigate()
  const [loading, setLoading] = useState(false)
  const { senhaUser, setTipoUser, setUsuarioLogado } = useGlobal()
  const [emailStorage, setEmailStorage] = useState('')

  async function getEmail() {
    setLoading(true)
    try {
      const storageEmail = await AsyncStorage.getItem('user-email')
      if (storageEmail !== null && senhaUser !== null) {
        setEmailStorage(storageEmail)
      }
    } catch (error: any) {
      console.log('Error Storage: ', error)
    }
    setLoading(false)
  }

  const submitStorageLogin = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('infos-user', jsonValue)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onSubmit() {
    setLoading(true)

    const formData = {
      email: emailStorage,
      password: senhaUser,
      role: 'Cliente'
    }

    try {
      const response = await api.post(`/login`, formData)

      if (response.status === 200) {
        const storageEmail = await AsyncStorage.setItem('dados-user', emailStorage)
        setTipoUser('Cliente')
        submitStorageLogin(response.data.results)
        navigate('OnBoardingScreen')
        setUsuarioLogado(true)
      } else {
        navigate('LoginScreen')
      }
    } catch (error: any) {
      console.log('Error Login: ', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getEmail()
  }, [])

  return (
    <MainLayout carregando={loading}>
      <View className='flex-1 items-center justify-around'>
        <View></View>
        <View>
          <IcoMulherSucesso />
          <View className='mt-2 mx-4'>
            <H2 align={'center'} title='Cadastro realizado com sucesso!' />
          </View>
        </View>
        <View className='w-full px-4 mb-4'>
          <FilledButton onPress={onSubmit} title='Continuar' />
        </View>
      </View>
    </MainLayout>
  );
}



