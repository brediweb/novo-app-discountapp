import Toast from 'react-native-toast-message'
import React, { useState, useEffect } from 'react'
import { colors } from '../../../../styles/colors'
import Loading from '../../../../components/Loading'
import H3 from '../../../../components/typography/H3'
import { useIsFocused } from '@react-navigation/native'
import { api_ibge_locais } from '../../../../service/api'
import { useNavigate } from '../../../../hooks/useNavigate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FilledButton from '../../../../components/buttons/FilledButton'
import { View, Alert, Modal, Text, TouchableOpacity, FlatList } from 'react-native'

export default function FiltroCidadeScreen() {
  const isFocused = useIsFocused()
  const { navigate, goBack } = useNavigate()
  const [cidades, setCidades] = useState([])
  const [estados, setEstados] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [estadoSelecionado, setEstadoSelecionado] = useState<any>(null)
  const [cidadeSelecionada, setCidadeSelecionada] = useState<any>(null)
  const [modalVisibleCidades, setModalVisibleCidades] = useState(false)

  const fetchEstados = async () => {
    setLoading(true)
    try {
      const response = await api_ibge_locais.get('/estados')
      setEstados(response.data)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os estados')
    }
    setLoading(false)
  }

  const fetchCidades = async (estadoSigla: string) => {
    setCidades([])
    setLoading(true)
    try {
      const response = await api_ibge_locais.get(`/estados/${estadoSigla}/municipios`)
      setCidades(response.data)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as cidades')
    }
    setLoading(false)
  }

  async function setLocalidade() {
    await AsyncStorage.setItem('cidade', JSON.stringify(cidadeSelecionada))
    await AsyncStorage.setItem('estado', JSON.stringify(estadoSelecionado))
    goBack()
  }

  const handleEstadoChange = (estado: any) => {
    fetchCidades(estado.sigla)
    setEstadoSelecionado(estado)
    setCidadeSelecionada(null)
  }

  const handleCidadeChange = (cidade: string) => {
    setCidadeSelecionada(cidade)
  }

  async function getStorage() {
    const jsonCidade = await AsyncStorage.getItem('cidade')
    const jsonEstado = await AsyncStorage.getItem('estado')
    if (jsonEstado != null && jsonCidade != null) {
      setEstadoSelecionado(JSON.parse(jsonEstado))
      setCidadeSelecionada(JSON.parse(jsonCidade))
      fetchCidades(JSON.parse(jsonEstado).sigla)
    } else {
      setEstadoSelecionado(null)
      setCidadeSelecionada(null)
    }
  }

  async function limparFiltro() {
    await AsyncStorage.removeItem('cidade')
    await AsyncStorage.removeItem('estado')
    setEstadoSelecionado(null)
    setCidadeSelecionada(null)
    Toast.show({
      type: 'success',
      text1: 'Filtro limpo com sucesso',
    })
    goBack()
  }

  useEffect(() => {
    fetchEstados()
    getStorage()
  }, [])

  return (
    <>
      {loading &&
        <Loading />
      }
      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className='flex-1 items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='bg-white rounded-xl w-[80%] max-h-[60%] px-4 py-8'>
            <H3> Selecione seu Estado </H3>
            <FlatList
              data={estados.sort((a: any, b: any) => a.nome.localeCompare(b.nome))}
              keyExtractor={(item: any) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className='rounded-xl my-1 py-2 px-2'
                  onPress={() => handleEstadoChange(item)}
                  style={{
                    backgroundColor: estadoSelecionado?.sigla === item.sigla ? colors.secondary20 : colors.secondary80,
                  }}
                >
                  <Text
                    style={{
                      color: estadoSelecionado?.sigla === item.sigla ? colors.white : colors.dark,
                    }}
                  >{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
            <View className='h-4'></View>
            <FilledButton
              title='Confirmar'
              onPress={() => setModalVisible(false)}
            />

          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType='slide'
        visible={modalVisibleCidades}
        onRequestClose={() => setModalVisibleCidades(false)}
      >
        <View className='flex-1 ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='bg-white absolute w-full px-6 py-4'>
            <H3> Selecione sua Cidade </H3>
            <FlatList
              data={cidades.sort((a: any, b: any) => a.nome.localeCompare(b.nome))}
              className='h-[80vh]'
              keyExtractor={(item: any) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className='rounded-xl my-1 py-2 px-2'
                  onPress={() => handleCidadeChange(item)}
                  style={{
                    backgroundColor: cidadeSelecionada?.nome === item.nome ? colors.secondary20 : colors.secondary80,
                  }}
                >
                  <Text
                    style={{
                      color: cidadeSelecionada?.nome === item.nome ? colors.white : colors.dark,
                    }}
                  >{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
            <FilledButton
              title='Confirmar'
              onPress={() => setModalVisibleCidades(false)}
            />
          </View>
        </View>
      </Modal>
      <View className='flex-1 items-baseline justify-between mt-16'>
        <View className='my-4 w-[90%] mx-auto flex-1 justify-between'>
          <View className=''>
            <FilledButton
              title={estadoSelecionado ? estadoSelecionado.nome : 'Selecione um Estado'}
              onPress={() => setModalVisible(true)}
            />
            <View className='h-2'></View>
            <FilledButton
              title={cidadeSelecionada ? cidadeSelecionada.nome : 'Selecione uma Cidade'}
              onPress={() => setModalVisibleCidades(true)}
            />
          </View>
          <View className=''>
            <FilledButton
              title='Limpar Filtro'
              backgroundColor={colors.gray}
              onPress={limparFiltro}
            />
            <View className='h-2'></View>
            <FilledButton
              title='Filtrar'
              disabled={!cidadeSelecionada || !estadoSelecionado}
              backgroundColor={colors.secondary20}
              onPress={setLocalidade}
            />
          </View>
        </View>
      </View>
    </>
  );
}

