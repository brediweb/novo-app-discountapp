import { api } from '../../../service/api'
import Toast from 'react-native-toast-message'
import { colors } from '../../../styles/colors'
import H3 from '../../../components/typography/H3'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useNavigate } from '../../../hooks/useNavigate'
import Caption from '../../../components/typography/Caption'
import Paragrafo from '../../../components/typography/Paragrafo'
import { View, Text, Image, TouchableOpacity, Modal, Touchable } from 'react-native'
import { useGlobal } from '../../../context/GlobalContextProvider'
import FilledButton from '../../../components/buttons/FilledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IcoCupomDescontoPequeno from '../../../svg/IcoCupomDescontoPequeno'
import InputMascaraPaper from '../../../components/forms/InputMascaraPaper'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'
import ButtonClienteSwitch from '../../../components/buttons/Cliente/ButtonClienteSwitch'
import ModalTemplateAtualizaCPF from '../../../components/Modals/ModalTemplateAtualizaCPF'

interface PropsConsumo {
  total_gasto: string,
  cupons_gerados: number,
  cupons_favoritos: number,
  cupons_consumidos: number,
  cupons_disponiveis: number,
}

export default function HomeClienteScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [loading, setLoading] = useState(true)
  const [ofertas, setOferta] = useState<any>([])
  const [primeiroNome, setPrimeiroNome] = useState('')
  const [dadosPerfil, setDadosPerfil] = useState<any>([])
  const [pacoteGratis, setPacoteGratis] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [cpfRepresetante, setCpfRepresetante] = useState('')
  const [dadosConsumo, setDadosConsumo] = useState<PropsConsumo>()
  const { statusTesteGratis, setStatusTesteGratis, usuarioLogado } = useGlobal()
  const [modalPacoteGratis, setModalPacoteGratis] = useState(false)

  async function getPacoteGratis() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      const headers = {
        Authorization: `Bearer ${newJson.token}`
      }
      try {
        const response = await api.post(`/verifiaca-teste-gratis`, {}, {
          headers: headers
        })
        setPacoteGratis(response.data.results.pacote_disponivel)
        setStatusTesteGratis(response.data.results.pacote_disponivel)
      } catch (error: any) {
        console.log('GET Pacote Gratuito: ', error.response.data.message)
      }
      getDadosPerfil()
      setLoading(false)
    }
    getDadosPerfil()
  }

  async function getDadosPerfil() {
    setDadosPerfil([])
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const dadosStorageUser = JSON.parse(jsonValue)

      try {
        const response = await api.get(`/perfil/pessoa-juridica/${dadosStorageUser.id}`)
        setDadosPerfil(response.data.results)
        setPrimeiroNome(response.data.results.nome_represetante.split(' ')[0])
        const jsonValue = JSON.stringify(response.data.results)
        await AsyncStorage.setItem('dados-perfil', jsonValue)
      } catch (error: any) {
        console.log('GET Dados Perfil(Anunciante): ', error.response.data.message)
      }
    }
    setLoading(false)
  }

  async function getOfertas() {
    setLoading(true)
    const jsonUsuario = await AsyncStorage.getItem('infos-user')
    if (jsonUsuario) {
      const newJson = JSON.parse(jsonUsuario)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
          'Content-Type': 'multipart/form-data'
        }
        const response = await api.get(`/meus-cupons/anunciante`, { headers })
        setOferta(response.data.results)
      } catch (error: any) {
        console.log('GET ERROR Minhas Ofertas: ', error)
      }
    }
    setLoading(false)
  }

  async function getConsumo() {
    setLoading(true)
    try {
      const jsonValue = await AsyncStorage.getItem('infos-user')
      if (jsonValue) {
        const newJson = JSON.parse(jsonValue)
        const headers = {
          Authorization: `Bearer ${newJson.token}`
        }
        console.log({Authorization: `Bearer ${newJson.token}`});
        
        const response = await api.get(`/consumo`, { headers })
        console.log('CONSUMO: ', response.data.results)
        setDadosConsumo(response.data.results)
      }
    } catch (error: any) {
      console.log('ERROR GET - CONSUMO', error.response.data)
    }
    setLoading(false)
  }

  async function onSubmit() {
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (cpfRepresetante.length < 14) {
      Toast.show({
        type: 'error',
        text1: 'CPF inválido',
      })
      return;
    }

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)

      const headers = {
        Authorization: `Bearer ${newJson.token}`
      }

      const formdata = {
        cpf_representante: cpfRepresetante,
      }

      try {
        const response = await api.post(`/altera/anunciante`, formdata, {
          headers: headers
        })
        if (!response.data.error) {
          setModalVisible(false)
          Toast.show({
            type: 'success',
            text1: 'Perfil atualizado !',
          })
        } else {
          setModalVisible(true)
          Toast.show({
            type: 'error',
            text1: response.data.message ?? 'Ocorreu um erro, tente novamente!',
          })
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error.response.data.erro ?? 'Ocorreu um erro, tente novamente!',
        })
        console.log(error)
      }
    }
  }

  const handleCPFMask = (value: any) => {
    let cpf = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{2})$/, "$1-$2");
    setCpfRepresetante(cpf);
  }

  const handleGo = () => {
    navigate('ClientePacotesScreen')
    setModalPacoteGratis(false)
  }

  useEffect(() => {
    if (isFocused) {
      getOfertas()
      getConsumo()
      getPacoteGratis()
      setModalVisible(dadosPerfil?.cpf_represetante == undefined || dadosPerfil?.cpf_represetante == '-' ? true : false)
    }
  }, [isFocused])

  useEffect(() => {
    getPacoteGratis()
  }, [statusTesteGratis])

  useEffect(() => {
    if (pacoteGratis && statusTesteGratis){
      setModalPacoteGratis(true)
    }
  }, [pacoteGratis, statusTesteGratis])

  return (
    <MainLayoutAutenticado loading={loading}>

      <View className='w-full'>

        <View className="flex-row">
          <Text className="text-[24px] font-semibold text-[#000] mb-3"> Boas-vindas, {primeiroNome ?? ''} 🎉</Text>
        </View>

        <View>
          <View className="flex flex-row bg-[#f1eeff] border-2 border-[#775aff] rounded-xl justify-between p-2 py-4 mt-3">
            <View className='w-[64vw]'>
              <Text className='font-semibold text-6xl text-[#2f009c]'>{dadosConsumo?.cupons_disponiveis}</Text>
              <Text className='font-semibold text-[#2f009c]'>Quantidade de anúncios vigentes</Text>
            </View>
            <View className='w-[18vw]'>
              <Image source={require('../../../../assets/img/icons/icoVigentes.png')} />
            </View>
          </View>
          <View className="flex flex-row bg-[#f1eeff] border-2 border-[#775aff] rounded-xl justify-between p-2 py-4 mt-3">
            <View className='w-[64vw]'>
              <Text className='font-semibold text-6xl text-[#2f009c]'>{dadosConsumo?.cupons_gerados}</Text>
              <Text className='font-semibold text-[#2f009c]'>Total de cupons publicados</Text>
            </View>
            <View className='w-[18vw]'>
              <Image source={require('../../../../assets/img/icons/icoPublicados.png')} />
            </View>
          </View>
          <View className="flex flex-row bg-[#f1eeff] border-2 border-[#775aff] rounded-xl justify-between p-2 py-4 mt-3">
            <View className='w-[64vw]'>
              <Text className='font-semibold text-6xl text-[#2f009c]'>{dadosConsumo?.cupons_consumidos}</Text>
              <Text className='font-semibold text-[#2f009c]'>Total de cupons consumidos</Text>
            </View>
            <View className='w-[18vw]'>
              <Image source={require('../../../../assets/img/icons/icoConsumidos.png')} />
            </View>
          </View>
          <View className="flex flex-row bg-[#f1eeff] border-2 border-[#775aff] rounded-xl justify-between p-2 py-4 mt-3">
            <View className='w-[64vw]'>
              <Text className='font-semibold text-6xl text-[#2f009c]'>{dadosConsumo?.cupons_favoritos}</Text>
              <Text className='font-semibold text-[#2f009c]'>Total de cupons favoritos</Text>
            </View>
            <View className='w-[18vw]'>
              <Image source={require('../../../../assets/img/icons/icoFavoritos.png')} />
            </View>
          </View>

        </View>

        {
          <Modal visible={modalPacoteGratis} transparent animationType='slide'>
            <View className='bg-black/70 flex-1 flex justify-center items-center'>
              <View className='w-80 flex-col items-end justify-end'>
                <TouchableOpacity onPress={() => setModalPacoteGratis(false)} className='mb-2'>
                  <Image source={require('../../../../assets/img/icons/icoClose.png')} className='h-6 w-6' resizeMode='contain' />
                </TouchableOpacity>
                <View className='w-80 h-80 bg-[#F9F9F9]'>
                  <View className='w-full bg-[#c9bfff] py-4'>
                    <Image source={require('../../../../assets/img/icons/icoGift.png')} className='h-12 w-12 mx-auto' resizeMode='contain' />
                  </View>
                  <View className='mx-auto p-3'>
                    <Text className='text-center text-4xl font-semibold text-[#313033]'>Receba!</Text>
                    <Text className='text-center text-lg font-semibold text-[#A6A2A8] mt-2'>Aproveite o pacote gratuito que temos para você</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={handleGo} className='w-48 bg-[#5D35F1] py-3 rounded-full mx-auto'>
                      <Text className='font-semibold text-xl text-white text-center'>Vamos lá</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        }

        {dadosPerfil?.latitude?.length <= 4 && dadosPerfil?.longitude?.length <= 4 &&
          <TouchableOpacity onPress={() => navigate('ClienteAtualizaLocal')} className="flex-row items-center bg-[#EEF0FF] border-4 border-solid border-[#002B72] rounded p-2 mt-4">
            <View className="flex-1">
              <Text className="text-[#002B72] text-[13px] font-bold">Não esqueça de atualizar o local de sua empresa</Text>
              <Text className="text-[#002B72] text-[36px] font-bold">Empresa</Text>
            </View>
            <View className='flex-1 items-end'>
              <Image className='w-24 h-24' source={require('../../../../assets/img/icons/mapa-atualiza.png')} />
            </View>
          </TouchableOpacity>
        }
      </View>
    </MainLayoutAutenticado >
  )
}
