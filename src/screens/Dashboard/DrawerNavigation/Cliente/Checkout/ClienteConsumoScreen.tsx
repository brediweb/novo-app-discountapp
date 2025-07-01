import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { api } from '../../../../../service/api'
import { colors } from '../../../../../styles/colors'
import { useIsFocused } from '@react-navigation/native'
import H3 from '../../../../../components/typography/H3'
import H1 from '../../../../../components/typography/H1'
import Caption from '../../../../../components/typography/Caption'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderPrimary from '../../../../../components/header/HeaderPrimary'
import CardConsumo from '../../../../../components/cards/Cliente/CardConsumo'
import MainLayoutAutenticado from '../../../../../components/layout/MainLayoutAutenticado'

interface PropsConsumo {
  total_gasto: string,
  cupons_gerados: number,
  cupons_favoritos: number,
  cupons_consumidos: number,
  cupons_disponiveis: number,
}

export default function ClienteConsumoScreen() {
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(true)
  const [dadosConsumo, setDadosConsumo] = useState<PropsConsumo>()

  async function getConsumo() {
    setLoading(true)
    try {
      const jsonValue = await AsyncStorage.getItem('infos-user')
      if (jsonValue) {
        const newJson = JSON.parse(jsonValue)
        const headers = {
          Authorization: `Bearer ${newJson.token}`
        }
        const response = await api.get(`/consumo`, { headers })
        setDadosConsumo(response.data.results)
      }
    } catch (error: any) {
      console.log('ERROR GET - CONSUMO', error.response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getConsumo()
  }, [])

  useEffect(() => {
    if (isFocused) {
      getConsumo()
    }
  }, [isFocused])

  return (
    <MainLayoutAutenticado marginTop={0} marginHorizontal={0} loading={loading}>
      <HeaderPrimary titulo='Consumo' />
      <View className='mx-7 mt-5 min-h-full'>
        <View className='rounded-lg p-3' style={{ borderWidth: 3, borderColor: colors.tertiary20, backgroundColor: '#EEF0FF' }}>
          <H3 color={colors.tertiary20} >Total gasto</H3>
          <H1 title={`R$ ${dadosConsumo?.total_gasto ?? 0.00}`} fontsize={36} fontWeight={'500'} color={colors.tertiary20} />
        </View>

        {/* <View className='mt-8'>
          <View className='flex-row mt-4'>
            <View className='rounded-tl rounded-bl w-1/3 h-9' style={{ backgroundColor: '#296FF5' }}></View>
            <View className=' w-1/3 h-9' style={{ backgroundColor: colors.tertiary20 }}></View>
            <View className='rounded-tr rounded-br w-1/3 h-9' style={{ backgroundColor: colors.tertiary80 }}></View>
          </View>
          <View className='flex-row mt-2'>
            <View className='rounded-tl rounded-bl w-1/3 h-9'>
              <Caption >
                Disponíveis
              </Caption>
            </View>
            <View className=' w-1/3 h-9'>
              <Caption align={'right'}>
                Consumidos
              </Caption>
            </View>
            <View className='rounded-tr rounded-br w-1/3 h-9'>
              <Caption align={'right'}>
                Gerados
              </Caption>
            </View>
          </View>
        </View> */}

        <CardConsumo
          titulo='Cupons disponíveis'
          quantidade={dadosConsumo?.cupons_disponiveis ?? "0"}
        />
        <CardConsumo
          titulo='Cupons gerados'
          quantidade={dadosConsumo?.cupons_gerados ?? "0"}
        />
        <CardConsumo
          titulo='Cupons consumidos'
          quantidade={dadosConsumo?.cupons_consumidos ?? "0"}
        />
        <CardConsumo
          titulo='Cupons favoritos'
          quantidade={dadosConsumo?.cupons_favoritos ?? "0"}
        />

      </View>
    </MainLayoutAutenticado>
  );
}
