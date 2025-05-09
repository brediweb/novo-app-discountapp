import axios from 'axios'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { colors } from '../../../../../styles/colors'
import H5 from '../../../../../components/typography/H5'
import { api, api_ibge } from '../../../../../service/api'
import { useNavigate } from '../../../../../hooks/useNavigate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FilledButton from '../../../../../components/buttons/FilledButton'
import InputOutlined from '../../../../../components/forms/InputOutlined'
import HeaderPrimary from '../../../../../components/header/HeaderPrimary'
import { useDadosPagamento } from '../../../../../stores/useDadosPagamento'
import ModalTemplate from '../../../../../components/Modals/ModalTemplate'
import InputMascaraPaper from '../../../../../components/forms/InputMascaraPaper'
import MainLayoutAutenticado from '../../../../../components/layout/MainLayoutAutenticado'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'


export default function ClientePagamentoEndereco() {
  const { navigate } = useNavigate()
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')
  const [modalUf, setModalUf] = useState(false)
  const [logradouro, setLogradouro] = useState('')
  const [estado, setEstado] = useState('' as string)
  const [complemento, setComplemento] = useState('')
  const [listaCidades, setListaCidades] = useState([])
  const [errorEstado, setErrorEstado] = useState(false)
  const [errorCidade, setErrorCidade] = useState(false)
  const [modalCidade, setModalCidade] = useState(false)
  const [loading, setLoading] = useState(false)
  const [listaEstados, setListaEstados] = useState([])
  const [estadoSelecionado, setEstadoSelecionado] = useState('')
  const estados = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"
  ]
  const { dadosPagamento, setDadosPagamento } = useDadosPagamento()

  const handleCEPChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, '');

    let formattedCEP = cleanedText;
    if (cleanedText.length > 5) {
      formattedCEP = `${cleanedText.slice(0, 5)}-${cleanedText.slice(5, 8)}`;
    }

    setCep(formattedCEP);
  }

  const handleCep = () => {
    const newCep = cep.replace(/\D/g, '')
    console.log('CEP:', newCep);

    getCEP(newCep)
  }

  async function getCEP(novoCep: any) {
    setLoading(true)
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${novoCep}`)
      setLogradouro(response.data.street)
      setCidade(response.data.city)
      setUf(response.data.state)
      setEstadoSelecionado(response.data.state)

    } catch (error: any) {
      console.log('Error GET CEP (Cartão):', error)
      // Tentativa caso a primeira API V2 falhar
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${novoCep}`)
      setLogradouro(response.data.street)
      setCidade(response.data.city)
      setUf(response.data.state)
      setEstadoSelecionado(response.data.state)
    }
    setLoading(false)
  }

  const handleSubmit = () => {
    if (!estadoSelecionado) {
      Toast.show({
        type: 'error',
        text1: 'Selecione um estado',
      })
      return;
    }
    if (!cidade) {
      Toast.show({
        type: 'error',
        text1: 'Informe uma cidade',
      })
      return;
    }
    if (cep.length <= 7) {
      Toast.show({
        type: 'error',
        text1: 'Informe um CEP válido',
      })
      return;
    }
    if (logradouro?.length <= 4) {
      Toast.show({
        type: 'error',
        text1: 'Informe um logradouro válido',
      })
      return;
    }
    if (numero.length <= 1) {
      Toast.show({
        type: 'error',
        text1: 'Informe um número válido',
      })
      return;
    }
    setDadosPagamento({
      ...dadosPagamento,
      endereco_uf: estadoSelecionado,
      endereco_cidade: cidade,
      endereco_cep: cep,
      endereco_cobranca: logradouro,
      endereco_numero: numero,
    })
    navigate('ClienteSucessoPagamentoScreen')
  }

  async function getDadosEndereco() {
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)

      try {
        const response = await api.get(`/perfil/pessoa-juridica/${newJson.id}`)
        setLogradouro(response.data.results.endereco)
      } catch (error: any) {
        console.log(error.response.data)
      }
    }
  }

  async function getEstados() {
    try {
      const response = await api_ibge.get(`/localidades/estados`)
      setListaEstados(response.data)
    } catch (error: any) {
      console.log('ERRO', error)
    }
  }

  async function getCidades() {
    try {
      const response = await api_ibge.get(`/localidades/estados/${uf}/municipios`)
      setListaCidades(response.data)
    } catch (error: any) {
      console.log('ERRO', error)
    }
  }

  function openModalCidades() {
    if (uf) {
      getCidades()
      setModalCidade(true)
    } else {
      Toast.show({
        type: 'error',
        text1: 'Selecione o seu Estado(UF) !',
      });
      setErrorEstado(true)
    }
  }

  useEffect(() => {
    getDadosEndereco()
    getEstados()
  }, [])

  return (
    <MainLayoutAutenticado loading={loading} marginTop={0} marginHorizontal={0}>
      <ModalTemplate onClose={() => setModalUf(false)} visible={modalUf}>
        <View className=''>
          <Text className='text-xl font-bold mt-4'>Selecione o seu Estado(UF):</Text>
          <ScrollView className='w-full h-40'>
            {listaEstados && listaEstados
              .sort((a: any, b: any) => a.nome.localeCompare(b.nome))
              .map((item: any, index: any) => (
                <TouchableOpacity
                  className=' rounded-md my-1 px-2 py-2'
                  style={{
                    backgroundColor: colors.primary90
                  }}
                  key={index}
                  onPress={() => {
                    setEstado(item.nome)
                    setCidade('')
                    setErrorEstado(false)
                    setUf(item.sigla)
                    setModalUf(false)
                    getCidades()
                  }}
                >
                  <Text className='text-md font-semibold'>{item.nome} - ({item.sigla})</Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </ModalTemplate>
      <ModalTemplate onClose={() => setModalCidade(false)} visible={modalCidade}>
        <View className=''>
          <Text className='text-xl font-bold mt-4'>Selecione o sua cidade:</Text>
          <ScrollView className='w-full h-40'>
            {listaCidades && listaCidades
              .sort((a: any, b: any) => a.nome.localeCompare(b.nome))
              .map((item: any, index: any) => (
                <TouchableOpacity
                  className=' rounded-md my-1 px-2 py-2'
                  style={{
                    backgroundColor: colors.primary90
                  }}
                  key={index}
                  onPress={() => {
                    setCidade(item.nome)
                    setModalCidade(false)
                  }}
                >
                  <Text className='text-md font-semibold'>{item.nome}</Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </ModalTemplate>
      <ScrollView>
        <HeaderPrimary voltarScreen={() => navigate('ClientePagamentoCartaoScreen')} titulo='Realizar pagamento' />
        <View className='mx-7 mt-5 flex-1 justify-between' >
          <View>
            <H5>Endereço de cobrança</H5>
            <View className='my-4'>
              <InputMascaraPaper
                mt={8}
                label='CEP'
                required
                value={cep}
                keyboardType={'number-pad'}
                onChangeText={handleCEPChange}
                onBlur={handleCep}
              />
              <View className='w-full mt-4'>
                <TouchableOpacity onPress={() => setModalUf(true)}>
                  <View
                    style={{ borderColor: errorEstado ? '#f01' : '#49454F' }}
                    className='bg-white text-base overflow-scroll justify-center border-solid border-[1px] rounded-md h-[52px] pl-2'>
                    {uf ?
                      <Text className='text-[#000]'>{uf}</Text>
                      :
                      <Text style={{ color: errorEstado ? '#f01' : '#49454F' }}>UF*</Text>
                    }
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity className='' onPress={openModalCidades}>
                <View className='bg-white text-base overflow-scroll justify-center border-solid border-[1px] border-[#49454F] rounded-md h-[52px] mt-3 pl-2'>
                  {cidade ?
                    <Text className='text-[#49454F]'>{cidade}</Text>
                    :
                    <Text className='text-[#49454F]'>Cidade*</Text>
                  }
                </View>
              </TouchableOpacity>
              <InputOutlined
                mt={8}
                required
                value={logradouro}
                label='Logradouro'
                keyboardType={'default'}
                onChange={setLogradouro}
              />
              <InputOutlined
                mt={8}
                label='Número'
                keyboardType={'number-pad'}
                onChange={setNumero}
              />
              <InputOutlined
                mt={8}
                label='Complemento'
                keyboardType={'default'}
                onChange={setComplemento}
              />
            </View>
          </View>
          <FilledButton
            title='Confirmar Pagamento'
            disabled={cep.length <= 0 || logradouro?.length <= 0 || numero.length <= 0 ? true : false}
            onPress={handleSubmit}
          />
        </View>
        <View className='w-full h-[440px]' />
      </ScrollView>
    </MainLayoutAutenticado>
  );
}