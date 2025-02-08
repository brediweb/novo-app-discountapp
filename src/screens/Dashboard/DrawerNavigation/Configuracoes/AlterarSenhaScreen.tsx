import { api } from 'src/service/api'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { ScrollView, View } from 'react-native'
import H5 from '../../../../components/typography/H5'
import { useNavigate } from '../../../../hooks/useNavigate'
import Caption from '../../../../components/typography/Caption'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputOutlined from '../../../../components/forms/InputOutlined'
import FilledButton from '../../../../components/buttons/FilledButton'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'

export default function AlterarSenhaScreen() {
  const { goBack } = useNavigate()
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [senhaAtual, setSenhaAtual] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  async function onSubmit() {
    if (senha.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'A senha deve ter no mínimo 8 caracteres',
      });
      return;
    }
    if (senha !== confirmarSenha) {
      Toast.show({
        type: 'error',
        text1: 'As senhas não coincidem',
      });
      return;
    }
    setLoading(true)
    const jsonUsuario = await AsyncStorage.getItem('infos-user') as any
    if (jsonUsuario) {
      const novo_json = JSON.parse(jsonUsuario)
      try {
        if (novo_json.tipo_usuario === 'Anunciante') {
          const response = await api.post('/altera/anunciante', {
            password: senha,
            password_confirmation: confirmarSenha
          }, {
            headers: {
              Authorization: `Bearer ${novo_json.token}`
            }
          })
          Toast.show({
            type: 'success',
            text1: 'Senha alterada com sucesso!',
          });
          goBack()
        } else if (novo_json.tipo_usuario === 'cliente') {
          const response = await api.post('/altera/cliente', {
            password: senha,
            password_confirmation: confirmarSenha
          }, {
            headers: {
              Authorization: `Bearer ${novo_json.token}`
            }
          })
          Toast.show({
            type: 'success',
            text1: 'Senha alterada com sucesso!',
          });
          goBack()
        } else {
          Toast.show({
            type: 'error',
            text1: 'Verifique sua conexão com a internet',
          });
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao alterar senha',
          text2: error.message,
        });
      }
      setLoading(false)
    } else {
      Toast.show({
        type: 'error',
        text1: 'Verifique sua conexão com a internet !',
      });
      setLoading(false)
    }
  }

  return (
    <MainLayoutAutenticado bottomDrawer loading={loading}>
      <H5>Alterar Senha</H5>
      <Caption>Altera a sua senha</Caption>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 220 }}>
        <View className='mt-6 mb-10'>
          {/* <InputOutlined
          keyboardType={''}
          secureTextEntry
          label='Senha atual'
          onChange={setSenhaAtual}
        /> */}
          <InputOutlined
            keyboardType={''}
            label='Nova senha'
            secureTextEntry
            onChange={setSenha}
          />
          <InputOutlined
            keyboardType={''}
            secureTextEntry
            label='Confirmar nova senha'
            onChange={setConfirmarSenha}
          />
        </View>
        <FilledButton
          title='Confirmar'
          onPress={onSubmit}
          disabled={senhaAtual.length <= 0 || senha.length <= 0 || confirmarSenha.length <= 0 ? true : false}
        />
      </ScrollView>
    </MainLayoutAutenticado>
  );
}
