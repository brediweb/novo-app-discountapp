import QRCode from 'react-native-qrcode-svg'
import Toast from 'react-native-toast-message'
import IcoCopy from '../../../../../svg/IcoCopy'
import { api } from '../../../../../service/api'
import { useEffect, useRef, useState } from 'react'
import { colors } from '../../../../../styles/colors'
import { useIsFocused } from '@react-navigation/native'
import H3 from '../../../../../components/typography/H3'
import H5 from '../../../../../components/typography/H5'
import 'text-encoding';
import Clipboard from '@react-native-clipboard/clipboard'
import { useNavigate } from '../../../../../hooks/useNavigate'
import Caption from '../../../../../components/typography/Caption'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputOutlined from '../../../../../components/forms/InputOutlined'
import FilledButton from '../../../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../../../components/header/HeaderPrimary'
import { useDadosPagamento } from '../../../../../stores/useDadosPagamento'
import { Dimensions, Image, Animated, View, TouchableOpacity } from 'react-native'
import MainLayoutAutenticado from '../../../../../components/layout/MainLayoutAutenticado'
import InputArea from '../../../../../components/forms/InputArea'
import { usePaymentPix } from '../../../../../hooks/usePaymentPix'

interface IDadosPix {
  codigo_pix: string,
  id: number,
  uuid: string,
  endereco_entrega: string,
  status: string,
  data: string,
  total: string,
  forma_pagamento: string,
}
interface IDadosUsuario {
  cpf_represetante: string,
  endereco: string,
  nome_represetante: string,
  telefone: string,
  id: string,
  cnpj: string,
  email: string,
}

export default function ClientePagamentoPixScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const { getPaymentPixStatus, paymentPixStatus } = usePaymentPix();
  const [seconds, setSeconds] = useState(300)
  const [timeOut, setTimeOut] = useState(false)
  const [loading, setLoading] = useState(true)
  const { dadosPagamento } = useDadosPagamento()
  const [codigoPix, setCodigoPix] = useState('')
  const [dadosPix, setDadosPix] = useState<IDadosPix>()
  const progressAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (seconds === 300) {
      progressAnimation.setValue(0); // Reset the animation value

      Animated.timing(progressAnimation, {
        toValue: 1,
        duration: seconds * 1000, // 5 minutes in milliseconds
        useNativeDriver: false,
      }).start(); // Restart the animation
    }
  }, [seconds]);

  async function postPix() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    const jsonPerfil = await AsyncStorage.getItem('dados-perfil')

    if (jsonValue && jsonPerfil) {
      const newJson = JSON.parse(jsonValue)
      const newJsonPerfil = JSON.parse(jsonPerfil)
      const responseJuridico = await api.get(`/perfil/pessoa-juridica/${newJsonPerfil.id}`) as any

      try {
        const formData = {
          // cep: "123",
          // uf: "remove",
          // numero: "remove",
          // cidade: "remove",
          // endereco: "remove",
          plano_id: dadosPagamento.id_pacote,
          email: responseJuridico.data.results.email,
          telefone: responseJuridico.data.results.telefone,
          cpf: responseJuridico.data.results.cpf_represetante,
          nome: responseJuridico.data.results.nome_represetante,
        }
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.post(`/pagamento/avulso/pix`, formData, { headers })
        setTimeOut(false)
        setSeconds(300)
        setDadosPix(response.data.results.transacao)
        setCodigoPix(response.data.results.transacao.codigo_pix)
      } catch (error: any) {
        console.error('ERRO dados Pix Avulso: ', error)
      }
      setLoading(false)
    }
  }

  const widthInterpolation = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })

  function formatTime(seconds: any) {
    const minutos = Math.floor(seconds / 60);
    const segundosRestantes = seconds % 60;
    if (segundosRestantes < 10) {
      return `0${minutos}:0${segundosRestantes}`;
    }
    return `0${minutos}:${segundosRestantes}`;
  }

  const copyToClipboard = () => {
    Clipboard.setString(codigoPix)
    Toast.show({
      type: 'success',
      text1: 'Código copiado com sucesso!',
    })
  }

  useEffect(() => {
    if (!timeOut) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (seconds === 0) {
        clearInterval(interval);
        setTimeOut(true);
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, timeOut]);

  useEffect(() => {
    if (isFocused) {
      let checkPaymentInterval: any;

      if (!paymentPixStatus && dadosPix?.id) {
        checkPaymentInterval = setInterval(() => {
          getPaymentPixStatus(dadosPix?.id);
        }, 5000);
      }

      return () => {
        if (checkPaymentInterval) {
          clearInterval(checkPaymentInterval);
        }
      };
    }
  }, [paymentPixStatus, dadosPix, isFocused]);

  useEffect(() => {
    postPix()
    setSeconds(300)
  }, [isFocused])

  return (
    <MainLayoutAutenticado loading={loading} marginTop={0} marginHorizontal={0}>
      <HeaderPrimary voltarScreen={() => navigate('ClienteTipoPagamentoScreen')} titulo='Realizar pagamento' />
      <View className='mx-7 mt-5 justify-between'>
        <View>
          <H5>Seu pedido está aguardando o pagamento</H5>
          <Caption>
            Ao clicar no botão abaixo, você vai copiar o código pix. Utilize o Pix copia e cola no aplicativo que você vai fazer o pagamento.
          </Caption>
          <View className='h-2'></View>
          <View
            className='flex-row items-center justify-center rounded mt-4 px-4 py-4'
            style={{ backgroundColor: '#E9E8E8' }}
          >
            <Image className='mr-1' source={require('../../../../../../assets/img/icons/pix.png')} />
            <H5>Pagar com pix</H5>
          </View>
          <View>
            <View className='my-8 w-full'>
              {dadosPix &&
                <View className='mx-auto mb-4'>
                  <H3 color={colors.secondary70}>Valor total R$:{dadosPix.total}</H3>
                </View>
              }
              {codigoPix && codigoPix.length > 0 && !timeOut &&
                <View className='mx-auto'>
                  <QRCode
                    size={180}
                    logoSize={40}
                    value={codigoPix}
                    logoBackgroundColor='transparent'
                  />
                </View>
              }
              {codigoPix && codigoPix.length > 0 && !timeOut &&
                <View className='relative'>
                  <InputArea
                    mt={20}
                    height={172}
                    label=''
                    editable={false}
                    keyboardType={''}
                    value={codigoPix}
                    onChange={() => { }}
                  />
                  <TouchableOpacity onPress={copyToClipboard} className='absolute top-[40px] right-2 z-50'>
                    <IcoCopy color={colors.secondary70} />
                  </TouchableOpacity>
                </View>
              }
            </View>
            <Caption align={'center'}>
              Você tem até 5 minutos para fazer o pagamento.
            </Caption>
            <View className='mt-4'>
              <Caption color='#ADAAAF'>
                O tempo para pagamento acaba em:
              </Caption>

              <H5 color='#2F009C'>{formatTime(seconds)}</H5>

              <View style={{ width: '100%', height: 4, backgroundColor: colors.primary80 }}>
                <Animated.View
                  style={{
                    width: widthInterpolation,
                    height: '100%',
                    backgroundColor: colors.primary20,
                  }}
                />
              </View>
            </View>
          </View>

        </View>
        <View className='h-4'></View>
        <View>
          {timeOut &&
            <View className='mb-2 mt-4'>
              <FilledButton
                title='Voltar e tentar novamente'
                onPress={() => navigate('ClienteTipoPagamentoScreen')}
              />
            </View>
          }
        </View>

      </View>

    </MainLayoutAutenticado>
  );
}