import { useState } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import H5 from '../../../../components/typography/H5'
import { useNavigate } from '../../../../hooks/useNavigate'
import Caption from '../../../../components/typography/Caption'
import InputOutlined from '../../../../components/forms/InputOutlined'
import FilledButton from '../../../../components/buttons/FilledButton'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'

export default function AlterarSenhaScreen() {
  const { navigate } = useNavigate()
  const [senha, setSenha] = useState('')
  const [senhaAtual, setSenhaAtual] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  async function onSubmit() {
    Toast.show({
      type: 'success',
      text1: 'Dados alterados com sucesso!',
    });
    navigate('ConfiguracoesScreen')
  }
  
  return (
    <MainLayoutAutenticado bottomDrawer >
      <H5>Alterar Senha</H5>
      <Caption>Altera a sua senha</Caption>
      <View className='mt-6 mb-10'>
        <InputOutlined
          keyboardType={''}
          label='Senha atual'
          onChange={setSenhaAtual}
        />
        <InputOutlined
          keyboardType={''}
          label='Nova senha'
          onChange={setSenha}
        />
        <InputOutlined
          keyboardType={''}
          label='Confirmar nova senha'
          onChange={setConfirmarSenha}
        />
      </View>
      <FilledButton
        title='Confirmar'
        onPress={onSubmit}
        disabled={senhaAtual.length <= 0 || senha.length <= 0 || confirmarSenha.length <= 0 ? true : false}
      />
    </MainLayoutAutenticado>
  );
}
