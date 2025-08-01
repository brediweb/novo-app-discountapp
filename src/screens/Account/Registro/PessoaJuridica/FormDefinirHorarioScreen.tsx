import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import RadioSimples from './RadioSimples'
import { api } from '../../../../service/api'
import Toast from 'react-native-toast-message'
import { useNavigate } from '../../../../hooks/useNavigate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobal } from '../../../../context/GlobalContextProvider'
import FilledButton from '../../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../../components/header/HeaderPrimary'
import MainLayoutAutenticadoSemScroll from '../../../../components/layout/MainLayoutAutenticadoSemScroll'
import InputOutlined from '@components/forms/InputOutlined'
import { colors } from 'src/styles/colors'

const diasDaSemana = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
]

export default function FormDefinirHorarioScreen({ route }: { route: any }) {
  const infoForm = route.params
  const { navigate } = useNavigate()
  const [loading, setLoading] = useState(false)
  const { setSenhaUser, setTelefoneDigitado, setTipoUser } = useGlobal()

  // State com horários e flags de fechado
  const [horarios, setHorarios] = useState<Record<string, string>>(
    diasDaSemana.reduce((acc, dia) => ({ ...acc, [dia]: '' }), {})
  )
  const [fechados, setFechados] = useState<Record<string, boolean>>(
    diasDaSemana.reduce((acc, dia) => ({ ...acc, [dia]: false }), {})
  )

  const toggleFechado = (dia: string) => {
    setFechados(prev => ({ ...prev, [dia]: !prev[dia] }))
  }

  const alterarHorario = (dia: string, novoHorario: string) => {
    setHorarios(prev => ({ ...prev, [dia]: novoHorario }))
  }

  async function onSubmit() {
    setLoading(true)
    if (!infoForm) {
      Toast.show({
        type: 'error',
        text1: 'Não conseguimos exibir algumas informações !',
      })
      return;
    }

    const novaImage = { uri: infoForm?.dataform?.logomarca?.path ?? '', type: 'image/.png', name: ' ' }

    const formdata = new FormData()

    formdata.append('nome_fantasia', `${infoForm.dataform.nome_fantasia}`)
    formdata.append('nome_empresarial', `${infoForm.dataform.nome_empresarial}`)
    formdata.append('cnpj', `${infoForm.dataform.cnpj}`)
    formdata.append('endereco', `${infoForm.dataform.endereco}`)
    formdata.append('estado', `${infoForm.dataform.estado}`)
    formdata.append('cidade', `${infoForm.dataform.cidade}`)
    formdata.append('cep', `${infoForm.dataform.cep}`)
    formdata.append('bairro', `${infoForm.dataform.bairro}`)
    formdata.append('rua', `${infoForm.dataform.rua}`)
    formdata.append('numero', `${infoForm.dataform.numero}`)
    formdata.append('email', `${infoForm.dataform.email}`)
    formdata.append('telefone', `${infoForm.dataform.telefone}`)
    formdata.append('nome_representante', `${infoForm.dataform.nome_represetante}`)
    formdata.append('endereco_representante', `${infoForm.dataform.endereco_represetante}`)
    formdata.append('cpf_representante', `${infoForm.dataform.cpf_represetante}`)
    formdata.append('senha', `${infoForm.dataform.senha}`)
    formdata.append('perfil_id', `${infoForm.categorias}`)
    formdata.append('latitude', infoForm.dataform.latitude as any)
    formdata.append('longitude', infoForm.dataform.longitude as any)
    if (infoForm?.dataform?.logomarca) {
      if (infoForm?.dataform?.logomarca?.path != undefined && infoForm?.dataform?.logomarca?.path != '') {
        formdata.append('logomarca', novaImage as any)
      }
    }
    try {
      const response = await api.post("/cadastro/pessoa-juridica", formdata,
        { headers: { 'Content-Type': 'multipart/form-data' } })
      if (!response.data.error) {
        await AsyncStorage.setItem('user-email', infoForm?.dataform.email)
        await AsyncStorage.setItem('id-user', response.data.results.id.toString())
        setSenhaUser(infoForm?.dataform.senha)
        setTipoUser('Anunciante')
        Toast.show({
          type: 'success',
          text1: 'Cadastro realizado !',
        })
        // console.log('Cadastrado:', response.data);

        setTelefoneDigitado(infoForm.dataform.telefone)
        navigate('ValidaCodigoScreen')
      } else {
        Toast.show({
          type: 'error',
          text1: response.data.erro.message ?? 'Ocorreu um erro, tente novamente mais tarde !',
        })
        console.error('Cadastro Pessoa Jurídica: ', response.data.erro.message)
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data.message ?? 'Ocorreu um erro, tente novamente mais tarde !',
      })
      console.error('Cadastro Pessoa Jurídica2 ', error.response.data)
    }
    setLoading(false)
  }

  const mascaraHorario = (valor: string): string => {
    // Remove tudo que não for número
    const numeros = valor.replace(/\D/g, '');

    // Limita a 4 dígitos (HHMM)
    const limitado = numeros.slice(0, 4);

    // Formata para HH:MM
    if (limitado.length >= 3) {
      return `${limitado.slice(0, 2)}:${limitado.slice(2, 4)}`;
    } else if (limitado.length >= 1) {
      return limitado;
    }

    return '';
  };

  return (
    <MainLayoutAutenticadoSemScroll loadign={loading} marginTop={0} marginHorizontal={0}>
      <HeaderPrimary titulo='Informe os horários de funcionamento' />
      <ScrollView className='mt-4 mx-4' contentContainerStyle={{ paddingBottom: 40 }}>
        {diasDaSemana.map((dia) => (
          <View key={dia} className='mb-4'>
            <TouchableOpacity
              onPress={() => toggleFechado(dia)}
              className='mb-2 flex flex-row justify-start items-center gap-x-2'
            >
              <View
                style={{
                  backgroundColor: fechados[dia] ? colors.danger : 'transparent',
                  borderColor: fechados[dia] ? colors.dark : colors.danger,
                }}
                className='w-4 h-4 border-solid border-2 rounded-full'
              />
              <Text>Está fechado para esse dia</Text>
            </TouchableOpacity>

            <InputOutlined
              label={dia}
              value={horarios[dia]}
              onChange={(text: string) => alterarHorario(dia, text)}
              placeholder={dia}
              keyboardType={'default'}
              edicao={!fechados[dia]}
            />
          </View>
        ))}
      </ScrollView>

      <View className='mx-4 mt-6'>
        <FilledButton
          title='Próximo'
          onPress={onSubmit}
        />
      </View>
    </MainLayoutAutenticadoSemScroll>
  )
}
