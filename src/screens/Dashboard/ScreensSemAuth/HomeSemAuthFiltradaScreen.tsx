
import { api } from '../../../service/api'
import { colors } from '../../../styles/colors'
import React, { useEffect, useState } from 'react'
import { useNavigate } from '../../../hooks/useNavigate'
import CardAnuncio from '../../../components/cards/CardAnuncio'
import CardProduto from '../../../components/cards/CardProduto'
import CardNotFound from '../../../components/cards/CardNotFound'
import CardCategoria from '../../../components/cards/CardCategoria'
import ModalTemplateLogin from '../../../components/Modals/ModalTemplateLogin'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'
import { FlatList, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View, } from 'react-native'
import ButtonOutline from '../../../components/buttons/ButtonOutline'

export default function HomeSemAuthFiltradaScreen(route: any) {
  const { navigate } = useNavigate()
  const [listaprodutos, setProdutos] = useState([])
  const idCategoria = route.route.params.idCategoria
  const [listacategorias, setCategorias] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function getProdutos() {
    setIsRefreshing(true)
    try {
      setProdutos([])
      const response = await api.get(`/cupons/cupons/v2/categoria/${idCategoria}`)
      setProdutos(response.data.results)
    } catch (error: any) {
      console.log('Error Filtrar Categoria(no auth):', error)
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
    <MainLayoutAutenticado notScroll={true} marginTop={40} loading={isRefreshing}>
      <ModalTemplateLogin visible={modalVisible} onClose={() => setModalVisible(false)} />
      <View className='mt-6 mb-3'>
      </View>
      <SafeAreaView>
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className='w-full h-14 pb-2' >
          {listacategorias && listacategorias.map((categoria: any) => (
            <CardCategoria
              ativo={idCategoria === categoria.id ? true : false} // Destacar a categoria selecionada
              key={categoria.id}
              slug={categoria.id}
              titulo={categoria.categorias}
              onPress={() => navigate('HomeSemAuthFiltradaScreen', { idCategoria: categoria.id })}
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
            <View className='mt-3 mx-8'>
              <ButtonOutline title='Sugerir estabelecimentos' onPress={() => setModalVisible(true)} />
            </View>
          </View>
        }
      </SafeAreaView>
    </MainLayoutAutenticado>
  );
}
