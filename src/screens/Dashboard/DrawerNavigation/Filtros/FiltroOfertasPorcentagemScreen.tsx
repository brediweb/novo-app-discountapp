import { api } from '../../../../service/api'
import React, { useEffect, useState } from 'react'
import { useNavigate } from '../../../../hooks/useNavigate'
import { FlatList, RefreshControl, View } from 'react-native'
import Caption from '../../../../components/typography/Caption'
import CardEmpresa from '../../../../components/cards/CardEmpresa'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CardNotFound from '../../../../components/cards/CardNotFound'
import HeaderPrimary from '../../../../components/header/HeaderPrimary'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'
import CardProduto from '@components/cards/CardProduto'

export default function FiltroOfertasPorcentagemScreen() {
  const { navigate } = useNavigate()
  const [totalCupons, setTotalCupons] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [cuponsPorcentagem, setCuponsPorcentagem] = useState([])

  async function getOfertas() {
    const jsonValue = await AsyncStorage.getItem('infos-user')
    setIsRefreshing(true)
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
          'Content-Type': 'multipart/form-data'
        }
        const formData = {
          vantagem: "vantagem_porcentagem"
        }
        const response = await api.get(`/cupons/melhores-ofertas`, {
          headers,
          params: formData
        })
        setCuponsPorcentagem(response.data.results)
        setTotalCupons(response.data.results.length)
        console.log(response.data.results[0].anunciante_id);

      } catch (error: any) {
        console.error('ERROR - Filtro Melhores Ofertas: ', error.response.data)
      }
      setIsRefreshing(false)
    }
  }

  const renderItem = ({ item }: any) => (
    <CardProduto
      key={item.id}
      id_oferta={item.id}
      dados_gerais={item}
      imagem_capa={item.imagem_cupom}
      get_produtos={getOfertas}
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
  )

  const handleRefresh = () => {
    getOfertas()
  }

  useEffect(() => {
    getOfertas()
  }, [])

  return (
    <MainLayoutAutenticado notScroll={true} bottomDrawer marginTop={0} marginHorizontal={0}>
      <HeaderPrimary titulo='Resultado da busca' voltarScreen={() => navigate('FiltroOfertasScreen')} />
      <View className='mx-6'>
        {totalCupons &&
          <Caption fontSize={14} fontWeight={'400'}>{totalCupons} oferta(s) encontrada(s)</Caption>
        }

        <View className='mt-6'>
          {cuponsPorcentagem &&
            <FlatList
              data={cuponsPorcentagem as any}
              className='mb-16'
              renderItem={renderItem as any}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
            />}

          {!isRefreshing && cuponsPorcentagem.length <= 0 &&
            <CardNotFound titulo='Não encontramos cupons no momento para você' />
          }
        </View>
      </View>
    </MainLayoutAutenticado>
  )
}
