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

      } catch (error: any) {
        console.log('ERROR - Filtro Melhores Ofertas: ', error.response.data)
      }
      setIsRefreshing(false)
    }
  }

  const renderItem = ({ item }: any) => (
    <CardEmpresa
      title={item.anunciante}
      imagem={item.imagem_anunciante}
      tituloOferta={item.titulo_oferta}
      descricao={item.descricao_oferta}
      link={() => navigate('OfertaDetalhesGeraCupomScreen', item)}
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
