import { api } from '../../../service/api'
import { useEffect, useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'
import CardDepoimento from '../../../components/cards/CardDepoimento'
import H2 from '../../../components/typography/H2'
import Paragrafo from '../../../components/typography/Paragrafo'
import { useNavigate } from '../../../hooks/useNavigate'

interface IDepoimento {
  id: number
  anunciante_id: number
  created_at: string
  descricao: string
  imagem: string
  nome: string
}

export default function ListaDepoimentosScreen() {
  const { navigate } = useNavigate()
  const [depoimentos, setDepoimentos] = useState<IDepoimento[]>([])
  const [loading, setLoading] = useState(true)

  async function getDepoimentos() {
    setLoading(true)
    try {
      const jsonValue = await AsyncStorage.getItem('infos-user');
      if (jsonValue) {
        const newJson = JSON.parse(jsonValue);
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        };
        const response = await api.get(`/landing-page/depoimentos`, { headers });
        if (response.data.results?.depoimentos) {
          setDepoimentos(response.data.results.depoimentos);
        }
      }
    } catch (error: any) {
      console.error('ERROR GET Depoimentos: ', error.response?.data || error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDepoimentos()
  }, [])

  return (
    <MainLayoutAutenticado loading={loading}>
      <View className='mx-4'>
        {depoimentos.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} className='mb-4'>
            {depoimentos.map((depoimento: IDepoimento) => (
              <CardDepoimento
                key={depoimento.id}
                nome={depoimento.nome}
                descricao={depoimento.descricao}
                imagem={depoimento.imagem}
                created_at={depoimento.created_at}
              />
            ))}
          </ScrollView>
        ) : (
          !loading && (
            <View className='items-center justify-center mt-8'>
              <Paragrafo title="Nenhum depoimento disponível no momento." align="center" />
            </View>
          )
        )}
      </View>
    </MainLayoutAutenticado>
  );
}

