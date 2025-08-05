import { Text, View } from 'react-native'
import { api } from '../../../service/api'
import { useEffect, useState } from 'react'
import { useNavigate } from '../../../hooks/useNavigate'
import { useIsFocused } from '@react-navigation/native'
import FilledButton from '../../../components/buttons/FilledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderPrimary from '../../../components/header/HeaderPrimary'
import CardProdutoDetalhes from '../../../components/cards/CardProdutoDetalhes'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'

interface PropsOferta {
  id: number
  ativo: string
  imagem_cupom: any
  anuncio: string
  anunciante: string
  codigo_cupom: string
  data_criacao: string
  data_validade: string
  titulo_oferta: string
  imagem_anunciante: any
  vantagem_reais: string
  categoria_cupom: string
  descricao_oferta: string
  quantidade_cupons: number
  cupoms_disponiveis: number
  descricao_completa: string
  vantagem_porcentagem: string
}

export default function ClienteOfertaDetalheHistoricoScreen({ route }: { route?: any }) {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const idOferta = route?.params?.idOferta
  const [loading, setLoading] = useState(false)
  const [oferta, setOferta] = useState<PropsOferta[]>([])

  async function getOfertas() {
    setLoading(true)
    const jsonUsuario = await AsyncStorage.getItem('infos-user')
    if (jsonUsuario) {
      const newJson = JSON.parse(jsonUsuario)
      setOferta([])
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`
        }
        const response = await api.get(`/cupons/todos/${idOferta}`, {
          headers: headers
        })
        setOferta(response.data.results)
      } catch (error: any) {
        console.error('ERROR Ofertas:', error)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getOfertas()
  }, [])

  useEffect(() => {
    if (isFocused) {
      getOfertas()
    }
  }, [isFocused])

  return (
    <MainLayoutAutenticado marginTop={0} marginHorizontal={0} loading={loading}>
      <HeaderPrimary titulo='Detalhe do Anúncio' voltarScreen={() => navigate('Meus Cupons')} />
      <View className='mx-7 mt-5 min-h-full'>
        {oferta.length <= 0 && !loading &&
          <View className='flex justify-center items-center'>
            <Text className='text-brand-danger'>Não foi possível carregar as informações</Text>
          </View>
        }
        {oferta.length > 0 &&
          <View className='pb-4'>
            <FilledButton
              title='Avaliar Anunciante'
              onPress={() => navigate('AvaliacaoScreen', oferta)}
            />
          </View>
        }

        {oferta && oferta.slice(0, 1).map((item) => {
          if (!item.anuncio) {
            return (
              <View key={item.id}>
                <CardProdutoDetalhes
                  status={item.ativo}
                  codigo_cupom={item.codigo_cupom}
                  imagem_cupom={item.imagem_cupom}
                  data_validade={item.data_validade}
                  titulo_oferta={item.titulo_oferta}
                  vantagem_reais={item.vantagem_reais}
                  categoria_cupom={item.categoria_cupom}
                  descricao_oferta={item.descricao_oferta}
                  imagem_anunciante={item.imagem_anunciante}
                  quantidade_cupons={item.quantidade_cupons}
                  cupoms_disponiveis={item.cupoms_disponiveis}
                  descricao_completa={item.descricao_completa}
                  vantagem_porcentagem={item.vantagem_porcentagem}
                />
              </View>
            );
          }
        })}
      </View>
    </MainLayoutAutenticado >
  );
}
