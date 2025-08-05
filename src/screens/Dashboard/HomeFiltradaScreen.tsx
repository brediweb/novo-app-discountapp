import { api } from '../../service/api'
import React, { useEffect, useState } from 'react'
import { useNavigate } from '../../hooks/useNavigate'
import CardProduto from '../../components/cards/CardProduto'
import CardNotFound from '../../components/cards/CardNotFound'
import CardCategoria from '../../components/cards/CardCategoria'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList, RefreshControl, SafeAreaView, ScrollView, View, } from 'react-native'
import MainLayoutAutenticado from '../../components/layout/MainLayoutAutenticado'
import CardAnuncio from '../../components/cards/CardAnuncio'

export default function HomeFiltradaScreen(route: any) {
  const { navigate } = useNavigate()
  const [listaprodutos, setProdutos] = useState([])
  const idCategoria = route.route.params.idCategoria
  const [listacategorias, setCategorias] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function getProdutos() {
    setIsRefreshing(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {

      const newJson = JSON.parse(jsonValue)
      try {
        setProdutos([])
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.get(`/cupons/categoria/${idCategoria}`, { headers })
        setProdutos(response.data.results)
      } catch (error: any) {
        console.error('Error Filtrar Categoria:', error)
      }
    }
    setIsRefreshing(false);
  }

  async function getCategorias() {
    setIsRefreshing(true);
    try {
      const response = await api.get(`/categorias`)
      setCategorias(response.data.results)
    } catch (error: any) {
      console.log('Error Listar Categorias: ', error);
    }
    setIsRefreshing(false);
  }

  const handleRefresh = () => {
    getProdutos();
  };

  const renderItem = ({ item }: any) => (
    item.anuncio ?
      <CardAnuncio
        key={item.id}
        nome={item.nome}
        imagem={item.imagem}
        latitude={item.latitude}
        longitude={item.longitude}
        descricao={item.descricao}
      />
      :
      <CardProduto
        key={item.id}
        dados_gerais={item}
        id_oferta={item.id}
        get_produtos={getProdutos}
        qr_code={item.codigo_cupom}
        nome_empresa={item.anunciante}
        imagem_capa={item.imagem_cupom}
        categoria={item.categoria_cupom}
        nome_produto={item.titulo_oferta}
        id_anunciante={item.anunciante_id}
        data_validade={item.data_validade}
        foto_user={item.imagem_anunciante}
        vantagem_reais={item.vantagem_reais}
        status_favorito={item.status_favorito}
        descricao_simples={item.descricao_oferta}
        descricao_completa={item.descricao_completa}
        vantagem_porcentagem={item.vantagem_porcentagem}
      />
  )

  useEffect(() => {
    getProdutos()
    getCategorias()
  }, [])

  useEffect(() => {
    getProdutos()
    getCategorias()
  }, [idCategoria])

  return (
    <MainLayoutAutenticado notScroll={true} marginTop={80} loading={isRefreshing}>
      <SafeAreaView>
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className='w-full h-14 pb-2' >
          <CardCategoria
            ativo={false}
            titulo={"Discontoken"}
            slug={"discontoken-teste"}
            onPress={() => navigate('Discontoken')}
          />
          {listacategorias && listacategorias.map((categoria: any) => (
            <CardCategoria
              ativo={idCategoria === categoria.id ? true : false} // Destacar a categoria selecionada
              key={categoria.id}
              slug={categoria.id}
              titulo={categoria.categorias}
              onPress={() => navigate('Categorias', { idCategoria: categoria.id })}
            />
          ))}
        </ScrollView>

        {listaprodutos && listaprodutos.length >= 1 &&
          <FlatList
            data={listaprodutos}
            className='mb-60'
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          />}
        {!isRefreshing && listaprodutos.length <= 0 &&
          <View className=''>
            <CardNotFound titulo='Não há cupons disponíveis para esta categoria no momento.' />
          </View>
        }
      </SafeAreaView>
    </MainLayoutAutenticado>
  );
}
