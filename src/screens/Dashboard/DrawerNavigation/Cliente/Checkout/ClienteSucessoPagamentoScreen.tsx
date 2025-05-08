import { View } from 'react-native'
import { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { api } from '../../../../../service/api'
import { colors } from '../../../../../styles/colors'
import H3 from '../../../../../components/typography/H3'
import { useNavigate } from '../../../../../hooks/useNavigate'
import Caption from '../../../../../components/typography/Caption'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FilledButton from '../../../../../components/buttons/FilledButton'
import { useDadosPagamento } from '../../../../../stores/useDadosPagamento'
import MainLayoutSecondary from '../../../../../components/layout/MainLayoutSecondary'
import { useIsFocused } from '@react-navigation/native'

export default function ClienteSucessoPagamentoScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [loading, setLoading] = useState(true)
  const [sucesso, setSucesso] = useState(false)
  const { dadosPagamento } = useDadosPagamento()
  const [messageErro, setMessageErro] = useState('')

  async function onSubmitPagamentoRecorrente() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const formData = {
          nome: dadosPagamento.nome_pessoa,
          numero_cartao: dadosPagamento.numero_cartao,
          validade: dadosPagamento.data_validade,
          cpf: dadosPagamento.cpf_titular,
          cvc: dadosPagamento.codigo_cvc,
          endereco: dadosPagamento.endereco_cobranca,
          numero: dadosPagamento.endereco_numero,
          cep: dadosPagamento.endereco_cep,
          uf: dadosPagamento.endereco_uf,
          cidade: dadosPagamento.endereco_cidade,
          planos: [
            dadosPagamento.id_pacote
          ]
        }

        console.log(formData)
        const response = await api.post(`/pagamento/assinatura`, formData, { headers })
        setSucesso(true)
      } catch (error: any) {
        console.log(error.response.data)
        setMessageErro(error.response.data.message)
      }
    }
    setLoading(false)
  }

  async function onSubmitPagamentoAvulso() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    const jsonPerfil = await AsyncStorage.getItem('dados-perfil')
    if (jsonValue && jsonPerfil) {
      const newJson = JSON.parse(jsonValue)
      const jsonPefil = JSON.parse(jsonPerfil)

      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const formData = {
          card_holder_name: dadosPagamento.nome_pessoa,
          card_cvv: dadosPagamento.codigo_cvc,
          card_number: dadosPagamento.numero_cartao,
          card_expiration_date: dadosPagamento.data_validade,
          cpf: dadosPagamento.cpf_titular,
          parcelas: "1",
          endereco: dadosPagamento.endereco_cobranca,
          numero: dadosPagamento.endereco_numero,
          cep: dadosPagamento.endereco_cep,
          uf: dadosPagamento.endereco_uf,
          cidade: dadosPagamento.endereco_cidade,
          plano_id: dadosPagamento.id_pacote
        }


        console.log(formData)
        const response = await api.post(`/pagamento/avulso/cartao`, formData, { headers })
        setSucesso(true)
      } catch (error: any) {
        console.log(error.response.data)
        setMessageErro(error.response.data.message)
      }
    }
    setLoading(false)
  }

  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + '...';
    }
  }

  useEffect(() => {
    if (dadosPagamento.tipo_assinatura === 'Recorrente') {
      onSubmitPagamentoRecorrente()
      return;
    } else {
      onSubmitPagamentoAvulso()
      return;
    }
  }, [isFocused])

  return (
    <MainLayoutSecondary loading={loading}>
      {!loading &&
        <>
          {sucesso ?
            <View className='mx-7 mt-5 justify-between flex-1' >
              <View></View>
              <View className='items-center'>
                <View className='mb-4  mt-4'>
                  <LottieView style={{ width: 280, height: 280 }} source={require('../../../../../animations/pacote-comprado.json')} autoPlay loop />
                </View>
                <View className='my-4 mt-2'>
                  <H3 align={'center'}>
                    Pagamento realizado com sucesso !
                  </H3>
                </View>
              </View>
              <FilledButton
                onPress={() => navigate('ClienteTabNavigation', { screen: 'HomeClienteScreen' })}
                title='Continuar' />
            </View>
            :
            <View className='mx-7 mt-5 justify-between flex-1' >
              <View></View>
              <View className='items-center'>
                <View className='mb-4  mt-4'>
                  <LottieView style={{ width: 280, height: 280 }} source={require('../../../../../animations/pagamento-falhou.json')} autoPlay loop />
                </View>
                <View className='my-4 mt-2'>
                  <H3 align={'center'}>
                    Ocorreu um erro ao finalizar seu pagamento, volte e tente novamente.
                  </H3>
                </View>
              </View>
              <FilledButton
                onPress={() => navigate('ClientePagamentoEndereco', { screen: 'HomeClienteScreen' })}
                title='Voltar e tentar novamente' />
            </View>
          }
        </>
      }
    </MainLayoutSecondary>
  );
}