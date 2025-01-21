import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../../styles/colors'
import H3 from '../../../components/typography/H3'
import { useNavigate } from '../../../hooks/useNavigate'
import Caption from '../../../components/typography/Caption'
import FilledButton from '../../../components/buttons/FilledButton'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'

export default function PageScreenDefault() {
  const { navigate } = useNavigate()

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      marginTop: 40,
      borderRadius: 8,
    },
    closeButton: {
      marginTop: 10,
      alignSelf: 'flex-end',
    },
  })

  function onLogin() {
    navigate('LoginAnuncianteScreen')
  }

  function onCreate() {
    navigate('FormPessoaJuridicaScreen')
  }

  return (
    <MainLayoutAutenticado marginTop={0} notScroll={true}>
      <View style={styles.modalContent}>
        <View className='mt-4'>
          <H3 align={'center'} color='#000'>Para acessar essa área você precisa estar logado!</H3>
          <Caption align={'center'}>
            Crie uma conta ou faça login em uma conta existente
          </Caption>
          <View className='h-2'></View>
          <FilledButton backgroundColor={colors.secondary50} onPress={onCreate} title='Criar conta' />
          <View className='h-2'></View>
          <FilledButton backgroundColor={colors.secondary50} onPress={onLogin} title='Fazer login' />
        </View>
      </View>
    </MainLayoutAutenticado>
  )
}
