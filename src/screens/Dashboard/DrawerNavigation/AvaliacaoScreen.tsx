import { useState } from 'react'
import { api } from '../../../service/api'
import Toast from 'react-native-toast-message'
import H3 from '../../../components/typography/H3'
import { useNavigate } from '../../../hooks/useNavigate'
import InputArea from '../../../components/forms/InputArea'
import RadioButton from '../../../components/forms/RadioButton'
import Paragrafo from '../../../components/typography/Paragrafo'
import FilledButton from '../../../components/buttons/FilledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'
import { Image, View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function AvaliacaoScreen({ route }: { route?: any }) {
  const { goBack } = useNavigate()
  const id_oferta = route?.params.id_oferta
  const [mensagem, setMensagen] = useState('')
  const [loading, setLoading] = useState(false)
  const [contato, setContato] = useState<boolean | any>()
  const [contatoMarcado, setContatoMarcado] = useState('')
  const [selecionaAvalaicao, setSelecionaAvalaicao] = useState('')

  async function onSubmit() {
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (!selecionaAvalaicao) {
      Alert.alert('Error', 'Selecione uma avaliação')
    }

    setLoading(true)
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)

      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const formData = {
          anunciante_id: route?.params[0]?.anunciante_id ?? route?.params?.dados_gerais?.anunciante_id,
          comentario: mensagem.length <= 1 ? 'Sem comentários' : mensagem,
          avaliacao: selecionaAvalaicao,
          permissao_contato: contato
        }
        const response = await api.post(`/avaliacoes/post`, formData, { headers })
        setMensagen('')
        setContato(null)
        setContatoMarcado('')
        setSelecionaAvalaicao('')
        Toast.show({
          type: 'success',
          text1: response.data.message ?? 'Avaliação realizada com sucesso',
        })
        goBack()
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error.response.data.message ?? 'Erro ao avaliar',
        })
        console.error('ERRR avaliações: ', error.response.data);
      }
    }
    setLoading(false)
  }

  const handleContato = (option: string) => {
    if (option === 'Sim') {
      setContato(true)
      setContatoMarcado('Sim')
    } else {
      setContato(false)
      setContatoMarcado('Não')
    }
  }

  return (
    <MainLayoutAutenticado loading={loading}>
      <View className='mx-4 pb-20'>
        <ScrollView
          contentContainerStyle={{ flex: 1, paddingBottom: 320 }}
        >
          <H3>Avalie a sua experiência</H3>
          <Paragrafo title='O que você achou da sua experiência com o anunciante ?' />

          <View className='flex-1 flex-row  justify-between mt-6'>
            <TouchableOpacity onPress={() => setSelecionaAvalaicao('1')}>
              {selecionaAvalaicao === '1' ?
                <View className='bg-[#D9D9D9] rounded-full p-2'>
                  <Image className='' source={require('../../../../assets/img/icons/avalia-1.png')} />
                </View>
                : <Image source={require('../../../../assets/img/icons/avalia-1.png')} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelecionaAvalaicao('2')}>
              {selecionaAvalaicao === '2' ?
                <View className='bg-[#D9D9D9] rounded-full p-2'>
                  <Image className='' source={require('../../../../assets/img/icons/avalia-2.png')} />
                </View>
                : <Image source={require('../../../../assets/img/icons/avalia-2.png')} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelecionaAvalaicao('3')}>
              {selecionaAvalaicao === '3' ?
                <View className='bg-[#D9D9D9] rounded-full p-2'>
                  <Image className='' source={require('../../../../assets/img/icons/avalia-3.png')} />
                </View>
                : <Image source={require('../../../../assets/img/icons/avalia-3.png')} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelecionaAvalaicao('4')}>
              {selecionaAvalaicao === '4' ?
                <View className='bg-[#D9D9D9] rounded-full p-2'>
                  <Image className='' source={require('../../../../assets/img/icons/avalia-4.png')} />
                </View>
                : <Image source={require('../../../../assets/img/icons/avalia-4.png')} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelecionaAvalaicao('5')}>
              {selecionaAvalaicao === '5' ?
                <View className='bg-[#D9D9D9] rounded-full p-2'>
                  <Image className='' source={require('../../../../assets/img/icons/avalia-5.png')} />
                </View>
                : <Image source={require('../../../../assets/img/icons/avalia-5.png')} />
              }
            </TouchableOpacity>
          </View>

          <View className='mt-16 mb-4'>
            <Paragrafo title='Tem algo que você queira compartilhar com a gente sobre a sua experiência ?' />
            <InputArea
              mt={2}
              height={120}
              value={mensagem}
              keyboardType={'default'}
              onChange={(text: string) => setMensagen(text)}
            />
          </View >

          <Paragrafo title='Você permite que os nossos consultores entrem em contato para saber mais sobre a sua resposta?' />
          <View className='mt-2'></View>

          <RadioButton
            options={['Sim', 'Não']}
            selectedOption={contatoMarcado}
            onSelectOption={handleContato}
          />
          <View className='mt-4'></View>
          <FilledButton
            title='Enviar'
            onPress={onSubmit}
            disabled={contato === null || selecionaAvalaicao.length <= 0 ? true : false}
          />
        </ScrollView>
      </View>
    </MainLayoutAutenticado>
  );
}
