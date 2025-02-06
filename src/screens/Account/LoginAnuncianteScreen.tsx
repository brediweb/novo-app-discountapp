import { api } from '../../service/api'
import { colors } from '../../styles/colors'
import Toast from 'react-native-toast-message'
import H2 from '../../components/typography/H2'
import DeviceInfo from 'react-native-device-info'
import React, { useEffect, useState } from 'react'
import { OneSignal } from 'react-native-onesignal'
import { useNavigate } from '../../hooks/useNavigate'
import IcoCelularLogin from '../../svg/IcoCelularLogin'
import Caption from '../../components/typography/Caption'
import MainLayout from '../../components/layout/MainLayout'
import { Image, TouchableOpacity, View } from 'react-native'
import Paragrafo from '../../components/typography/Paragrafo'
import { useGlobal } from '../../context/GlobalContextProvider'
import InputOutlined from '../../components/forms/InputOutlined'
import FilledButton from '../../components/buttons/FilledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

export default function LoginAnuncianteScreen() {
  const { navigate } = useNavigate()
  const [email, setEmail] = useState('')
  const versionName = DeviceInfo.getVersion()
  const [playerId, setPlayerId] = useState('')
  const [loadign, setLoading] = useState(false)
  const [password, onChangePassword] = useState('')
  const { setTipoUser, setUsuarioLogado } = useGlobal()

  const submitStorageLogin = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('infos-user', jsonValue)
    } catch (error: any) {
      console.error(error)
    }
  }

  const tutorialCheck = async () => {
    try {
      const response = await AsyncStorage.getItem('tutorial')
      if (response == null) {
        await AsyncStorage.setItem('tutorial', 'true')
        return navigate('OnBoardingScreen')
      }
      navigate('HomeDrawerNavigation')
    } catch (error) {
      console.log(error)
    }
  }

  async function onSubmit() {
    setLoading(true)
    try {
      const response = await api.post(`/login`, {
        email: email,
        password: password,
        role: "Anunciante",
        player_id: playerId,
      })
      if (!response.data.error) {
        const storageEmail = await AsyncStorage.setItem('user-email', email)
        submitStorageLogin(response.data.results)
        setTipoUser('Anunciante')
        Toast.show({
          type: 'success',
          text1: 'Login realizado com sucesso!',
        })
        setUsuarioLogado(true)
        tutorialCheck()
      } else {
        Toast.show({
          type: 'error',
          text1: response.data.message ?? 'Ocorreu um erro, tente novamente!',
        })
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message ?? 'Ocorreu um erro, tente novamente!',
      })
      console.log('ERROR Login: ', error)
    }
    setLoading(false)
  }

  async function getEmail() {
    setLoading(true)
    try {
      const storageEmail = await AsyncStorage.getItem('user-email')
      if (storageEmail != null) {
        setEmail(storageEmail)
      }
    } catch (error: any) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getEmail()
    OneSignal.User.getOnesignalId().then((id) => {
      setPlayerId(id ?? '')
    })
  }, [])

  return (
    <MainLayout carregando={loadign} scroll={true}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className='flex-1 px-4'>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <IcoCelularLogin />
            <View className='w-full mb-4'>
              <H2 title='Login (Anunciante)' />
              <View className='mb-5 mt-3'>
                <InputOutlined
                  onChange={setEmail}
                  label='Email'
                  value={email}
                  keyboardType={'email-address'}
                />
                <InputOutlined
                  onChange={onChangePassword}
                  label='Senha'
                  secureTextEntry={true}
                  keyboardType={'default'}
                />
                <View className='flex-row justify-between mt-2 mb-8'>
                  <TouchableOpacity onPress={() => navigate('FormPessoaJuridicaScreen')}>
                    <Paragrafo title='Criar conta' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigate('RecuperaSenhaScreen')}>
                    <Paragrafo title='Esqueceu a senha?' />
                  </TouchableOpacity>
                </View>
                <FilledButton
                  onPress={onSubmit}
                  title='Entrar'
                  disabled={email.length <= 0 || password.length <= 0 ? true : false}
                />
                <View className="mt-2"></View>
                <FilledButton
                  onPress={() => navigate('LoginScreen')}
                  title='Trocar perfil'
                  backgroundColor={colors.secondary60}
                />
              </View>
              <View className='absolute bottom-0 right-0'>
                <Caption fontWeight={'bold'}>{versionName ?? ''}</Caption>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </MainLayout >
  );
}

