import { api } from '../../service/api'
import React, { useEffect, useState } from 'react'
import { useNavigate } from '../../hooks/useNavigate'
import { useIsFocused } from '@react-navigation/native'
import Caption from '../../components/typography/Caption'
import CardProduto from '../../components/cards/CardProduto'
import CardAnuncio from '../../components/cards/CardAnuncio'
import CardNotFound from '../../components/cards/CardNotFound'
import CardCategoria from '../../components/cards/CardCategoria'
import ButtonOutline from '../../components/buttons/ButtonOutline'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MainLayoutAutenticado from '../../components/layout/MainLayoutAutenticado'
import { FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [primeiroNome, setPrimeiroNome] = useState('')
  const [listaprodutos, setProdutos] = useState([])
  const [listacategorias, setCategorias] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [estadoSelecionado, setEstado] = useState<any>(null)
  const [cidadeSelecionada, setCidade] = useState<any>(null)


  async function getProdutos() {
    setProdutos([])
    setIsRefreshing(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }

        const jsonCidade = await AsyncStorage.getItem("cidade")
        const jsonEstado = await AsyncStorage.getItem('estado')

        if (jsonCidade && jsonEstado) {
          setProdutos([])
          const atualCidade = JSON.parse(jsonCidade)
          const atualEstado = JSON.parse(jsonEstado)
          setEstado(atualEstado)
          setCidade(atualCidade)
          const response = await api.get(`/cupons?estado=${atualEstado.sigla}&cidade=${atualCidade.nome}`, { headers })
          setProdutos(response.data.results)

        } else {
          const response = await api.get(`/cupons`, { headers })
          setProdutos(response.data.results)
          console.log(response.data.results);
          setEstado(null)
          setCidade(null)
        }

      } catch (error: any) {
        console.log('ERROR Lista Cupons: ', error.response.data)
      }
    }
    setIsRefreshing(false)
  }

  async function getCategorias() {
    setIsRefreshing(true)
    try {
      const response = await api.get(`/categorias`)
      setCategorias(response.data.results)
    } catch (error: any) {
      console.log('ERROR Categorias: ', error.response.data)
    }
    setIsRefreshing(false)
  }

  async function getDadosPerfil() {
    setIsRefreshing(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)

      try {
        const response = await api.get(`/perfil/pessoa-fisica/${newJson?.id}`)
        setPrimeiroNome(response.data.results.nome_completo.split(' ')[0])
        const novoJson = JSON.stringify(response.data.results)
        await AsyncStorage.setItem('dados-perfil', novoJson)
      } catch (error: any) {
        console.error('GET Dados Perfil (Cliente): ', error.response.data.message)
      }
    }
    setIsRefreshing(false)
  }

  const handleRefresh = () => {
    getProdutos()
  }

  const renderItem = ({ item }: any) => (
    item.anuncio === false ?
      <CardProduto
        key={item.id}
        id_oferta={item.id}
        dados_gerais={item}
        imagem_capa={item.imagem}
        get_produtos={getProdutos}
        qr_code={item.codigo_cupom}
        nome_empresa={item.anunciante}
        categoria={item.categoria_cupom}
        nome_produto={item.titulo_oferta}
        id_anunciante={item.anunciante_id}
        data_validade={item.data_validade}
        foto_user={item.imagem_anunciante}
        vantagem_reais={item.vantagem_reais}
        total_avaliacao={item.qtd_avaliacoes}
        status_favorito={item.status_favorito}
        media_avaliacao={item.media_avaliacoes}
        descricao_simples={item.descricao_oferta}
        descricao_completa={item.descricao_completa}
        vantagem_porcentagem={item.vantagem_porcentagem}
      />
      :
      <CardAnuncio
        key={item.id}
        nome={item.nome}
        latitude={item.latitude}
        imagem={item.imagem_cupom}
        descricao={item.descricao}
        descricao_oferta={item.descricao_oferta}
      />
  )

  useEffect(() => {
    getCategorias()
    getProdutos()
    getDadosPerfil()
  }, [])

  useEffect(() => {
    getCategorias()
    getProdutos()
  }, [isFocused])

  return (
    <MainLayoutAutenticado notScroll={true} loading={isRefreshing}>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className='w-full h-14 pb-0 -mt-4'>
        <CardCategoria
          ativo={false}
          titulo={"Discontoken"}
          slug={"discontoken-teste"}
          onPress={() => navigate('Discontoken')}
        />
        {listacategorias && listacategorias.map((categoria: any) => (
          <CardCategoria
            ativo={false}
            key={categoria.id}
            slug={categoria.id}
            titulo={categoria.categorias}
            onPress={() => navigate('Categorias', { idCategoria: categoria.id })}
          />
        ))}
      </ScrollView >

      <View className="flex-row">
        <Text className="text-[24px] font-semibold text-[#000] mb-3"> Boas-vindas, {primeiroNome ?? ''} 🎉</Text>
      </View>

      {estadoSelecionado && cidadeSelecionada &&
        <TouchableOpacity onPress={() => navigate('FiltroCidadeScreen')} className=' ml-2'>
          <Caption fontSize={14} fontWeight={"700"} >Filtrado para {cidadeSelecionada.nome} - {estadoSelecionado.sigla}</Caption>
        </TouchableOpacity>
      }
      {listaprodutos.length >= 1 &&
        <FlatList
          data={listaprodutos}
          className='mb-16'
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        />}
      {!isRefreshing && listaprodutos.length <= 0 &&
        <View className='w-full '>
          <CardNotFound titulo='Não encontramos cupons no momento para você' />
          <View className='mt-3 mx-8'>
            <ButtonOutline title='Sugerir estabelecimentos' onPress={() => navigate('SugerirEstabelecimentosScreen')} />
          </View>
        </View>
      }
    </MainLayoutAutenticado>
  );
}
